"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "techniques", name: "Techniques" },
    { id: "inspiration", name: "Inspiration" },
    { id: "interviews", name: "Artisan Interviews" },
    { id: "care", name: "Product Care" },
  ]

  const featuredPost = {
    id: 1,
    title: "The Art of Glazing: Techniques for Beautiful Ceramic Finishes",
    excerpt:
      "Discover the secrets behind creating stunning glazes for your ceramic pieces. From traditional methods to innovative approaches, we explore the world of ceramic glazing.",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Elena Kim",
    category: "techniques",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
  }

  const blogPosts = [
    {
      id: 2,
      title: "From Clay to Art: The Ceramic Making Process",
      excerpt:
        "Follow the journey of a ceramic piece from raw clay to finished product. We break down each step of the process and highlight the craftsmanship involved.",
      date: "May 1, 2023",
      readTime: "6 min read",
      author: "Marcus Chen",
      category: "techniques",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
    },
    {
      id: 3,
      title: "Finding Inspiration in Nature: Organic Ceramic Forms",
      excerpt:
        "How natural elements inspire ceramic artists to create organic, flowing forms that bring a touch of the outdoors into our homes.",
      date: "April 22, 2023",
      readTime: "5 min read",
      author: "Sophia Rodriguez",
      category: "inspiration",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg",
    },
    {
      id: 4,
      title: "Meet the Master: An Interview with Emma Pottery",
      excerpt:
        "We sit down with renowned ceramic artist Emma Pottery to discuss her journey, creative process, and the philosophy behind her minimalist designs.",
      date: "April 15, 2023",
      readTime: "10 min read",
      author: "James Wilson",
      category: "interviews",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736891.jpg-6T8WSg0a53na1FXQGRdPmczWCMkfGH.jpeg",
    },
    {
      id: 5,
      title: "Caring for Your Ceramic Collection: Essential Tips",
      excerpt:
        "Learn how to properly clean, store, and display your ceramic pieces to ensure they remain beautiful and intact for years to come.",
      date: "April 8, 2023",
      readTime: "7 min read",
      author: "Elena Kim",
      category: "care",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
    },
    {
      id: 6,
      title: "The Revival of Traditional Ceramic Techniques",
      excerpt:
        "How modern artisans are bringing back ancient ceramic methods and adapting them for contemporary designs.",
      date: "March 30, 2023",
      readTime: "9 min read",
      author: "Marcus Chen",
      category: "techniques",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
    },
  ]

  const filteredPosts =
    activeCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src={featuredPost.image || "/placeholder.svg"} alt="Blog hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark-900/70" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-accent-green text-sm tracking-wider">CERAMIC ARTS BLOG</span>
            <h1 className="text-5xl font-display text-white mt-2 mb-6">Insights & Inspiration</h1>
            <p className="text-white/70 text-lg mb-8">
              Explore articles on ceramic techniques, artist interviews, and the latest trends in ceramic arts.
            </p>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-800/80 backdrop-blur-sm border border-dark-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:border-accent-green"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-display text-white mb-8">Featured Article</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-accent-green/20 text-accent-green px-3 py-1 rounded-full text-sm">
                  {categories.find((cat) => cat.id === featuredPost.category)?.name || featuredPost.category}
                </span>
                <div className="flex items-center text-white/50 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center text-white/50 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {featuredPost.readTime}
                </div>
              </div>

              <h3 className="text-2xl font-display text-white mb-4">{featuredPost.title}</h3>
              <p className="text-white/70 mb-6">{featuredPost.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center mr-2">
                    <User className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-white/70">{featuredPost.author}</span>
                </div>

                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="text-accent-green hover:text-white transition-colors flex items-center"
                >
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h2 className="text-3xl font-display text-white mb-4 md:mb-0">Latest Articles</h2>

            <div className="flex flex-wrap gap-2">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-800 rounded-lg overflow-hidden group"
              >
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-accent-green/20 text-accent-green px-2 py-1 rounded-full text-xs">
                        {categories.find((cat) => cat.id === post.category)?.name || post.category}
                      </span>
                      <div className="flex items-center text-white/50 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-medium text-white mb-3 group-hover:text-accent-green transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center mr-2">
                          <User className="w-3 h-3 text-white/70" />
                        </div>
                        <span className="text-white/70 text-sm">{post.author}</span>
                      </div>

                      <span className="text-white/50 text-xs">{post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-white/70 mb-8">
              Get the latest articles, tutorials, and news about ceramic arts delivered straight to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-dark-700 border border-dark-600 text-white px-4 py-3 focus:outline-none focus:border-accent-green"
              />
              <button className="bg-accent-green text-dark-900 px-6 py-3 font-medium hover:bg-accent-green/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

