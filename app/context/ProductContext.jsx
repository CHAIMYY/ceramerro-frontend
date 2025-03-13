"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"

const API_URL = "http://localhost:3001/api"

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
//   const { user } = useAuth()

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_URL}/product/products`)
      setProducts(response.data)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products")
      return []
    } finally {
      setLoading(false)
    }
  }

  const fetchProductById = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_URL}/product/${id}`)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product")
      return null
    } finally {
      setLoading(false)
    }
  }

//   const fetchProductsByArtisan = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.get(`${API_URL}/artisan/products`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return response.data
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch artisan products")
//       return []
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createProduct = async (productData) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.post(`${API_URL}/product/create`, productData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       // Update products list
//       setProducts([...products, response.data])

//       return { success: true, product: response.data }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create product")
//       return { success: false, error: err.response?.data?.message || "Failed to create product" }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateProduct = async (id, productData) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.put(`${API_URL}/product/update/${id}`, productData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       // Update products list
//       setProducts(products.map((product) => (product._id === id ? response.data : product)))

//       return { success: true, product: response.data }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update product")
//       return { success: false, error: err.response?.data?.message || "Failed to update product" }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteProduct = async (id) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const token = localStorage.getItem("token")
//       await axios.delete(`${API_URL}/product/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       // Update products list
//       setProducts(products.filter((product) => product._id !== id))

//       return { success: true }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete product")
//       return { success: false, error: err.response?.data?.message || "Failed to delete product" }
//     } finally {
//       setLoading(false)
//     }
//   }

  // Load products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        fetchProductById,
        // fetchProductsByArtisan,
        // createProduct,
        // updateProduct,
        // deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)

