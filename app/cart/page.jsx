"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from "lucide-react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Handcrafted Ceramic Vase",
      price: 129.99,
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
    },
    {
      id: 2,
      name: "Ceramic Dinner Plate Set",
      price: 89.99,
      quantity: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
    },
  ])

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    paymentMethod: "credit_card",
  })

  const [showOrderForm, setShowOrderForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 12.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    setShowOrderForm(true)
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call to place order
    setTimeout(() => {
      setIsProcessing(false)
      setOrderSuccess(true)
      // Clear cart after successful order
      // setCartItems([])
    }, 2000)
  }

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-display text-white mb-12">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-white/30 mx-auto mb-6" />
              <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
              <p className="text-white/70 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link
                href="/shop"
                className="inline-block bg-accent-green text-dark-900 px-6 py-3 rounded-md font-medium hover:bg-accent-green/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : orderSuccess ? (
            <div className="text-center py-16 bg-dark-800 rounded-lg">
              <div className="w-16 h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-dark-900" />
              </div>
              <h2 className="text-2xl text-white mb-4">Order Placed Successfully!</h2>
              <p className="text-white/70 mb-8">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
              <p className="text-white/70 mb-8">Order Total: ${total.toFixed(2)}</p>
              <Link
                href="/shop"
                className="inline-block bg-accent-green text-dark-900 px-6 py-3 rounded-md font-medium hover:bg-accent-green/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-dark-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-dark-700">
                    <h2 className="text-xl text-white">Shopping Cart ({cartItems.length} items)</h2>
                  </div>

                  <div className="divide-y divide-dark-700">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mb-4 md:mb-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="md:ml-6 flex-grow">
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-accent-green mt-1">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center mt-4 md:mt-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-dark-700 text-white rounded-l-md hover:bg-dark-600 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center bg-dark-700 text-white">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-dark-700 text-white rounded-r-md hover:bg-dark-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-white/50 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-dark-800 rounded-lg overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-dark-700">
                    <h2 className="text-xl text-white">Order Summary</h2>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-dark-700 pt-4 flex justify-between text-white font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {!showOrderForm ? (
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-accent-green text-dark-900 py-3 rounded-md font-medium hover:bg-accent-green/90 transition-colors mt-6"
                      >
                        Place Order
                      </button>
                    ) : (
                      <form onSubmit={handleSubmitOrder} className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-white mb-1 text-sm">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={orderInfo.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent-green"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-white mb-1 text-sm">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={orderInfo.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent-green"
                          />
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-white mb-1 text-sm">
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={orderInfo.address}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent-green"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="city" className="block text-white mb-1 text-sm">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={orderInfo.city}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent-green"
                            />
                          </div>
                          <div>
                            <label htmlFor="zipCode" className="block text-white mb-1 text-sm">
                              Zip Code
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={orderInfo.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent-green"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-white mb-1 text-sm">
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={orderInfo.country}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent-green"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-1 text-sm">Payment Method</label>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center text-white/70">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="credit_card"
                                checked={orderInfo.paymentMethod === "credit_card"}
                                onChange={handleInputChange}
                                className="mr-2 accent-accent-green"
                              />
                              Credit Card
                            </label>
                            <label className="flex items-center text-white/70">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="paypal"
                                checked={orderInfo.paymentMethod === "paypal"}
                                onChange={handleInputChange}
                                className="mr-2 accent-accent-green"
                              />
                              PayPal
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={`w-full bg-accent-green text-dark-900 py-3 rounded-md font-medium transition-colors ${
                            isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-accent-green/90"
                          }`}
                        >
                          {isProcessing ? "Processing..." : "Confirm Order"}
                        </button>
                      </form>
                    )}

                    <Link
                      href="/shop"
                      className="block text-center text-white/70 hover:text-white transition-colors mt-4 items-center justify-center"
                    >
                      Continue Shopping
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

