"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: "all", name: "All Products" },
    { id: "vases", name: "Vases & Containers" },
    { id: "tableware", name: "Tableware" },
    { id: "decor", name: "Home Decor" },
    { id: "lighting", name: "Lighting" },
  ]

  const featuredCollections = [
    {
      id: 1,
      name: "Summer Essentials",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
    },
    {
      id: 2,
      name: "Minimalist Collection",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
    },
    {
      id: 3,
      name: "Artisan Favorites",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg",
    },
  ]

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg"
            alt="Shop banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-dark-900/70" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="text-accent-green text-sm tracking-wider">ONLINE STORE</span>
            <h1 className="text-5xl font-display text-white mt-2 mb-6">Shop Our Collection</h1>
            <p className="text-white/70 text-lg mb-8">
              Discover our handcrafted ceramic pieces, each one unique and made with care by our skilled artisans.
            </p>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-dark-800/80 backdrop-blur-sm border border-dark-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:border-accent-green"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-display text-white mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-60 rounded-lg overflow-hidden">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark-900/50 group-hover:bg-dark-900/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-display text-white">{collection.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-dark-800 rounded-lg p-6 sticky top-24">
                <h3 className="text-white font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`block text-left w-full px-3 py-2 rounded-md transition-colors ${
                        activeCategory === category.id
                          ? "bg-accent-green text-dark-900"
                          : "text-white/70 hover:bg-dark-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-white font-medium mb-4">Price Range</h3>
                  <div className="px-3">
                    <input type="range" min="0" max="500" className="w-full accent-accent-green" />
                    <div className="flex justify-between text-white/70 text-sm mt-2">
                      <span>$0</span>
                      <span>$500+</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-white font-medium mb-4">Filter by Artisan</h3>
                  <div className="space-y-2">
                    {["Emma Pottery", "Liam Ceramics", "Sophia Clay Works"].map((artisan, index) => (
                      <div key={index} className="flex items-center">
                        <input type="checkbox" id={`artisan-${index}`} className="mr-2 accent-accent-green" />
                        <label htmlFor={`artisan-${index}`} className="text-white/70 cursor-pointer">
                          {artisan}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-8 bg-dark-700 text-white py-2 rounded-md hover:bg-dark-600 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display text-white">All Products</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <select className="appearance-none bg-dark-800 border border-dark-700 text-white/70 py-2 pl-4 pr-10 rounded-md focus:outline-none focus:border-accent-green">
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ProductCard />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                        page === 1 ? "bg-accent-green text-dark-900" : "bg-dark-800 text-white/70 hover:bg-dark-700"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

