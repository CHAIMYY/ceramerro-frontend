"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Globe, Mail, MapPin, ArrowRight } from "lucide-react"

export default function ArtisanDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("work")
  
  const artisan = {
    id: Number.parseInt(params.id),
    name: "Emma Pottery",
    specialty: "Minimalist Vases",
    location: "Brooklyn, NY",
    bio: "Emma has been crafting minimalist vases for over a decade, drawing inspiration from nature and modern architecture. Her work is characterized by clean lines, subtle textures, and a muted color palette that complements any interior.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736891.jpg-6T8WSg0a53na1FXQGRdPmczWCMkfGH.jpeg",
    ],
    products: [
      {
        id: 1,
        name: "Sleek Cylinder Vase",
        price: 89.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
      },
      {
        id: 2,
        name: "Curved Bud Vase",
        price: 59.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
      },
      {
        id: 3,
        name: "Textured Bowl Set",
        price: 129.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg",
      },
    ],
    process: [
      {
        title: "Clay Selection",
        description:
          "I carefully select high-quality clay that will best showcase the design and functionality of each piece.",
      },
      {
        title: "Throwing & Forming",
        description:
          "Each piece is hand-thrown on the wheel or hand-built, allowing for subtle variations that make every item unique.",
      },
      {
        title: "Drying & Bisque Firing",
        description:
          "After initial drying, pieces undergo their first firing at a lower temperature to prepare them for glazing.",
      },
      {
        title: "Glazing",
        description:
          "I apply custom-mixed glazes that complement the form and create the signature muted palette of my work.",
      },
      {
        title: "Final Firing",
        description:
          "The final high-temperature firing brings out the true colors and creates a durable, food-safe finish.",
      },
    ],
  }

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src={artisan.image || "/placeholder.svg"} alt={artisan.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-dark-900/60" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent-green text-sm tracking-wider">ARTISAN PROFILE</span>
            <h1 className="text-5xl font-display text-white mt-2 mb-4">{artisan.name}</h1>
            <p className="text-2xl text-white/80 mb-6">{artisan.specialty}</p>
            <div className="flex items-center text-white/70">
              <MapPin className="w-5 h-5 mr-2 text-accent-green" />
              {artisan.location}
            </div>

            <div className="flex space-x-4 mt-8">
              <button className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="bg-dark-800 py-12">
        <div className="container mx-auto px-8">
          <div className="flex border-b border-dark-700">
            <button
              onClick={() => setActiveTab("work")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "work"
                  ? "text-accent-green border-b-2 border-accent-green"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Work & Process
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "products"
                  ? "text-accent-green border-b-2 border-accent-green"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "gallery"
                  ? "text-accent-green border-b-2 border-accent-green"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-8">
          {activeTab === "work" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl font-display text-white mb-6">About the Artist</h2>
                  <p className="text-white/70 mb-6">{artisan.bio}</p>
                  <p className="text-white/70">
                    With a background in fine arts and a passion for functional design, Emma creates pieces that are
                    both beautiful and practical, designed to be used and enjoyed in everyday life.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={artisan.gallery[1] || "/placeholder.svg"}
                    alt={`${artisan.name} at work`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-display text-white mb-8">Creative Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {artisan.process.map((step, index) => (
                    <div key={index} className="bg-dark-800 p-6 rounded-lg">
                      <div className="text-accent-green text-xl font-medium mb-2">{index + 1}</div>
                      <h3 className="text-white font-medium mb-3">{step.title}</h3>
                      <p className="text-white/70 text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-display text-white mb-8">Products by {artisan.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {artisan.products.map((product, index) => (
                  <div key={product.id} className="bg-dark-800 rounded-lg overflow-hidden group">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
                      <p className="text-accent-green">${product.price.toFixed(2)}</p>
                      <button className="mt-4 bg-dark-700 text-white px-4 py-2 rounded-md hover:bg-accent-green hover:text-dark-900 transition-colors w-full">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center text-accent-green hover:text-white transition-colors"
                >
                  View All Products <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-display text-white mb-8">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artisan.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

