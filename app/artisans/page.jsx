"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Globe } from "lucide-react"

export default function ArtisansPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [artisans, setArtisans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const categories = [
    { id: "all", name: "All Artisans" },
    { id: "pottery", name: "Pottery" },
    { id: "sculpture", name: "Sculpture" },
    { id: "tableware", name: "Tableware" },
  ]

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3001/api/user/getusers')
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }
        
        const data = await response.json()
        
        // Transform the API data to match our artisan data structure
        const formattedData = data.map(user => ({
          id: user._id,
          name: `${user.firstname} ${user.lastname}`,
          specialty: user.specialty || "Ceramic Artist",
          category: user.category || "pottery", // Default category if not specified
          location: user.location || "Location not specified",
          image: user.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
          featured: user.featured || false,
          socialMedia: user.socialMedia || {},
          bio: user.bio || "",
          gallery: user.gallery || []
        }))
        
        setArtisans(formattedData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching artisans:", err)
        setError(err.message)
        setLoading(false)
        
        // Fallback to empty array if API fails
        setArtisans([])
      }
    }

    fetchArtisans()
  }, [])

  const filteredArtisans =
    activeCategory === "all" ? artisans : artisans.filter((artisan) => artisan.category === activeCategory)

  const featuredArtisans = artisans.filter((artisan) => artisan.featured)

  if (loading) {
    return (
      <div className="pt-24 bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading artisans...</div>
      </div>
    )
  }

  if (error && artisans.length === 0) {
    return (
      <div className="pt-24 bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Error loading artisans. Please try again later.</div>
      </div>
    )
  }

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://img.freepik.com/free-photo/sculptor-artist-working-with-clay-studio_23-2149986287.jpg?t=st=1742311579~exp=1742315179~hmac=386d159dc2ab509fd31820dc602428c0580ccf7c6a2b59e9c96bb4aea803b9a9&w=1380"
            alt="Ceramic artisan at work"
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
            className="max-w-2xl"
          >
            <span className="text-accent-green text-sm tracking-wider">THE CREATORS</span>
            <h1 className="text-5xl font-display text-white mt-2 mb-6">Our Artisans</h1>
            <p className="text-white/70 text-lg">
              Meet the talented individuals behind our handcrafted ceramic pieces, each bringing their unique
              perspective and expertise to the craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Artisans - Only shown if there are featured artisans */}
      {featuredArtisans.length > 0 && (
        <section className="py-20 bg-dark-800">
          <div className="container mx-auto px-8">
            <div className="mb-12">
              <span className="text-accent-green text-sm tracking-wider">MASTER CRAFTSPEOPLE</span>
              <h2 className="text-3xl font-display text-white mt-2">Featured Artisans</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArtisans.map((artisan, index) => (
                <motion.div
                  key={artisan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative h-96 overflow-hidden rounded-lg">
                    <Image
                      src={artisan.image || "/placeholder.svg"}
                      alt={artisan.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-70" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-medium text-white">{artisan.name}</h3>
                      <p className="text-accent-green mb-2">{artisan.specialty}</p>
                      <p className="text-white/70 text-sm mb-4">{artisan.location}</p>

                      <Link
                        href={`/artisans/${artisan.id}`}
                        className="inline-block bg-dark-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-md hover:bg-accent-green hover:text-dark-900 transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Artisans */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-accent-green text-sm tracking-wider">EXPLORE</span>
              <h2 className="text-3xl font-display text-white mt-2">All Artisans</h2>
            </div>

            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeCategory === category.id
                      ? "bg-accent-green text-dark-900"
                      : "bg-dark-800 text-white/70 hover:bg-dark-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {filteredArtisans.length === 0 ? (
            <div className="text-white text-center py-12">
              No artisans found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtisans.map((artisan, index) => (
                <motion.div
                  key={artisan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link href={`/artisans/${artisan.id}`} className="block group">
                    <div className="bg-dark-800 rounded-lg overflow-hidden">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={artisan.image || "/placeholder.svg"}
                          alt={artisan.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-white">{artisan.name}</h3>
                            <p className="text-accent-green">{artisan.specialty}</p>
                          </div>
                          <div className="flex space-x-2">
                            {artisan.socialMedia?.instagram && (
                              <a 
                                href={artisan.socialMedia.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-white transition-colors"
                              >
                                <Instagram className="w-5 h-5" />
                              </a>
                            )}
                            {artisan.socialMedia?.website && (
                              <a 
                                href={artisan.socialMedia.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-white transition-colors"
                              >
                                <Globe className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mt-4">{artisan.location}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}