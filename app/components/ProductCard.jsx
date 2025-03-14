"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Eye } from "lucide-react"

export default function ProductCard({ product }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-dark-800 rounded-lg overflow-hidden">
      <div className="relative overflow-hidden group">
        <Image
          src={product?.images[0] || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg"}
          alt={product?.nom || "Ceramic product"}
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-dark-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button className="bg-dark-900/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link
            href={`/product/${product?._id}`}
            className="bg-dark-900/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-1">{product?.nom}</h3>
        <p className="text-accent-green mb-2">${product?.prix}</p>
        <p className="text-sm text-white/60">{product?.category}</p>
        {product?.stock <= 0 && (
          <p className="text-red-500 text-sm mt-1">Out of Stock</p>
        )}
      </div>
    </motion.div>
  )
}
