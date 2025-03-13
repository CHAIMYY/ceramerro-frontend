"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"

const API_URL = "http://localhost:3001/api"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Get auth context safely with error handling
  const auth = useAuth()
  const user = auth?.user
  const isAuthenticated = auth?.isAuthenticated

  // Fetch cart on user change
  useEffect(() => {
    if (isAuthenticated && isAuthenticated()) {
      fetchCart()
    } else {
      // If not authenticated, try to get cart from localStorage
      try {
        const localCart = JSON.parse(localStorage.getItem("cart") || '{"items":[],"total":0}')
        setCart(localCart)
      } catch (err) {
        console.error("Error parsing cart data:", err)
        localStorage.removeItem("cart") // Clear invalid data
        setCart({ items: [], total: 0 })
      }
    }
  }, [user, isAuthenticated])

  // Save cart to localStorage when it changes (for non-authenticated users)
  useEffect(() => {
    if (isAuthenticated && !isAuthenticated() && cart) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isAuthenticated])

  const fetchCart = async () => {
    if (isAuthenticated && !isAuthenticated()) return

    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCart(response.data)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cart")
      return null
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true)
    setError(null)

    try {
      if (isAuthenticated && isAuthenticated()) {
        // Add to server cart if authenticated
        const token = localStorage.getItem("token")
        const response = await axios.post(
          `${API_URL}/cart/add`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setCart(response.data)
        return { success: true, cart: response.data }
      } else {
        // Add to local cart if not authenticated
        // This is a simplified version - in a real app, you'd need to fetch product details
        const newCart = { ...cart }
        const existingItem = newCart.items.find((item) => item.product._id === productId)

        if (existingItem) {
          existingItem.quantity += quantity
        } else {
          // Fetch product details
          const productResponse = await axios.get(`${API_URL}/product/${productId}`)
          newCart.items.push({
            product: productResponse.data,
            quantity,
          })
        }

        // Recalculate total
        newCart.total = newCart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

        setCart(newCart)
        return { success: true, cart: newCart }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item to cart")
      return { success: false, error: err.response?.data?.message || "Failed to add item to cart" }
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    setLoading(true)
    setError(null)

    try {
      if (isAuthenticated && isAuthenticated()) {
        // Update server cart if authenticated
        const token = localStorage.getItem("token")
        const response = await axios.put(
          `${API_URL}/cart/quantity`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setCart(response.data)
        return { success: true, cart: response.data }
      } else {
        // Update local cart if not authenticated
        const newCart = { ...cart }
        const existingItem = newCart.items.find((item) => item.product._id === productId)

        if (existingItem) {
          existingItem.quantity = quantity

          // Recalculate total
          newCart.total = newCart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

          setCart(newCart)
          return { success: true, cart: newCart }
        } else {
          throw new Error("Item not found in cart")
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update cart")
      return { success: false, error: err.response?.data?.message || "Failed to update cart" }
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    setLoading(true)
    setError(null)

    try {
      if (isAuthenticated && isAuthenticated()) {
        // Remove from server cart if authenticated
        const token = localStorage.getItem("token")
        const response = await axios.delete(`${API_URL}/cart/remove`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productId },
        })
        setCart(response.data)
        return { success: true, cart: response.data }
      } else {
        // Remove from local cart if not authenticated
        const newCart = { ...cart }
        newCart.items = newCart.items.filter((item) => item.product._id !== productId)

        // Recalculate total
        newCart.total = newCart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

        setCart(newCart)
        return { success: true, cart: newCart }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item from cart")
      return { success: false, error: err.response?.data?.message || "Failed to remove item from cart" }
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
    localStorage.removeItem("cart")
  }

  const mergeLocalCartWithServer = async () => {
    if (isAuthenticated && !isAuthenticated()) return

    const localCart = JSON.parse(localStorage.getItem("cart") || '{"items":[],"total":0}')
    if (localCart.items.length === 0) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")

      // Add each local cart item to server cart
      for (const item of localCart.items) {
        await axios.post(
          `${API_URL}/cart/add`,
          { productId: item.product._id, quantity: item.quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      }

      // Fetch updated cart
      await fetchCart()

      // Clear local cart
      localStorage.removeItem("cart")

      return { success: true }
    } catch (err) {
      setError("Failed to merge cart")
      return { success: false, error: "Failed to merge cart" }
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        mergeLocalCartWithServer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}