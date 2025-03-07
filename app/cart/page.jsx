"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCurrency } from "../contexts/CurrencyContext"
import { useState } from "react"


const initialCartItems = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    price: { USD: 129.99, EUR: 109.99, GBP: 99.99 },
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Ceramic Dinner Plate Set",
    price: { USD: 89.99, EUR: 75.99, GBP: 69.99 },
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const { currency } = useCurrency()

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price[currency] * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  {item.price[currency]} {currency}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                  className="w-20"
                />
                <Button onClick={() => removeItem(item.id)} variant="outline">
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl">
              {total.toFixed(2)} {currency}
            </span>
          </div>
          <div className="flex justify-end">
            <Button asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
