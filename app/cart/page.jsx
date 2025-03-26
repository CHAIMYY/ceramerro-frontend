"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add auth token to every request
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cart/");
      setCartItems(response.data);
      setError("");
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      if (error.response && error.response.status === 401) {
        setError("Please log in to view your cart");
      } else {
        setError("Failed to load your cart. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await api.put("/cart/update", {
        productId: id,
        quantity: newQuantity,
      });

      setCartItems(response.data);
      setError("");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update quantity. Please try again.");
      }
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await api.delete(`/cart/remove/${id}`);
      setCartItems(response.data);
      setError("");
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setError("");

    try {
      // Prepare order data with the fixed values
      const orderData = {
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        address: "123 Main Street, NY",
        city: "New York",
        country: "USA",
        zipCode: "10001",
        paymentMethod: "paypal",
      };

      // Send order to API
      await api.post("/order/placeOrder", orderData);

      // Order successful
      setOrderSuccess(true);
    } catch (error) {
      console.error("Failed to place order:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to place your order. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-display text-white mb-12">Your Cart</h1>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-white">Loading your cart...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 bg-red-900/20 rounded-lg border border-red-900">
              <p className="text-red-400">{error}</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-white/30 mx-auto mb-6" />
              <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
              <p className="text-white/70 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
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
              <h2 className="text-2xl text-white mb-4">
                Order Placed Successfully!
              </h2>
              <p className="text-white/70 mb-8">
                Thank you for your order. We'll send you a confirmation email
                shortly.
              </p>
              <p className="text-white/70 mb-8">
                Order Total: ${total.toFixed(2)}
              </p>
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
                    <h2 className="text-xl text-white">
                      Shopping Cart ({cartItems.length} items)
                    </h2>
                  </div>

                  <div className="divide-y divide-dark-700">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 flex flex-col md:flex-row items-start md:items-center"
                      >
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mb-4 md:mb-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="md:ml-6 flex-grow">
                          <h3 className="text-white font-medium">
                            {item.name}
                          </h3>
                          <p className="text-accent-green mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center mt-4 md:mt-0">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-dark-700 text-white rounded-l-md hover:bg-dark-600 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center bg-dark-700 text-white">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
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

                    <div className="p-4 bg-dark-700 rounded-md">
                      <p className="text-white/70 text-sm mb-2">
                        Delivery Information:
                      </p>
                      <p className="text-white text-sm">
                        Address: 123 Main Street, NY
                      </p>
                      <p className="text-white text-sm">Payment: PayPal</p>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className={`w-full bg-accent-green text-dark-900 py-3 rounded-md font-medium transition-colors ${
                        isProcessing
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-accent-green/90"
                      }`}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </button>

                    {error && (
                      <div className="bg-red-900/20 p-3 rounded-md border border-red-900">
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    <Link
                      href="/shop"
                      className="block text-center text-white/70 hover:text-white transition-colors mt-4 flex items-center justify-center"
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
  );
}
