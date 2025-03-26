"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "Minimalist Vase Collection",
      description:
        "Handcrafted ceramic vases with clean lines and natural textures",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
      price: "$129.99",
    },
    {
      id: 2,
      name: "Artisan Bowl Set",
      description: "Organic shapes and earthy glazes for everyday elegance",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
      price: "$89.99",
    },
    {
      id: 3,
      name: "Sculptural Teapot",
      description: "Form meets function in this statement piece",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg",
      price: "$149.99",
    },
  ];

  const markers = [
    {
      id: 1,
      x: 45,
      y: 35,
      title: "Handcrafted Vase",
      description: "Minimalist design with natural textures",
      price: "$129.99",
    },
    {
      id: 2,
      x: 65,
      y: 60,
      title: "Ceramic Bowl Set",
      description: "Perfect for modern dining settings",
      price: "$89.99",
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        "These ceramic pieces have transformed my living space. The craftsmanship is exceptional.",
      author: "Emma Johnson",
      role: "Interior Designer",
    },
    {
      id: 2,
      quote:
        "I've never seen such attention to detail. Each piece tells a story and brings character to my home.",
      author: "Michael Chen",
      role: "Art Collector",
    },
    {
      id: 3,
      quote:
        "The quality and uniqueness of these ceramics are unmatched. Truly artisanal work.",
      author: "Sophia Rodriguez",
      role: "Home Stylist",
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length,
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex min-h-screen bg-dark-900">
        {/* Left Section */}
        <div className="w-1/2 p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-accent-green text-sm tracking-wider">
              ARTISANAL CERAMICS
            </span>
            <h1 className="text-8xl font-display text-white leading-tight">
              Ceramic
              <br />
              Design
            </h1>
            <p className="text-white/60 max-w-md">
              Discover our collection of handcrafted ceramic pieces, each
              telling a unique story through traditional craftsmanship and
              contemporary design.
            </p>
            <div className="flex gap-4">
              <Link
                href="/products"
                className="inline-block text-white border border-white/20 px-8 py-3 hover:bg-white hover:text-dark-900 transition-colors duration-300 group"
              >
                <span className="flex items-center">
                  View Collection
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/artisans"
                className="inline-block text-accent-green border border-accent-green px-8 py-3 hover:bg-accent-green hover:text-dark-900 transition-colors duration-300"
              >
                Meet Artisans
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 relative">
          <Image
            src={featuredProducts[currentSlide].image || "/placeholder.svg"}
            alt="Featured ceramic piece"
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
          <div className="absolute inset-0 bg-dark-900/20" />

          {/* Product Markers */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            >
              <button
                className="relative z-10 group"
                onMouseEnter={() => setActiveMarker(marker.id)}
                onMouseLeave={() => setActiveMarker(null)}
              >
                <div className="w-8 h-8 rounded-full bg-accent-green flex items-center justify-center">
                  <Plus className="w-4 h-4 text-dark-900" />
                </div>
                {activeMarker === marker.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-4 bg-dark-800/90 backdrop-blur-sm text-white p-4 rounded-lg w-48"
                  >
                    <h3 className="font-medium mb-1">{marker.title}</h3>
                    <p className="text-sm text-white/60 mb-2">
                      {marker.description}
                    </p>
                    <p className="text-accent-green font-medium">
                      {marker.price}
                    </p>
                    <Link
                      href="/products/1"
                      className="mt-2 text-xs text-white/80 hover:text-white flex items-center"
                    >
                      View Details <ChevronRight className="ml-1 w-3 h-3" />
                    </Link>
                  </motion.div>
                )}
              </button>
            </div>
          ))}

          {/* Slider Controls */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-dark-800/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-dark-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-dark-800/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-dark-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Indicator */}
          <div className="absolute bottom-8 left-8 flex space-x-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-accent-green w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Product Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-20 left-8 bg-dark-800/70 backdrop-blur-sm p-4 rounded-lg max-w-xs"
            >
              <h3 className="text-white font-medium">
                {featuredProducts[currentSlide].name}
              </h3>
              <p className="text-white/60 text-sm mt-1">
                {featuredProducts[currentSlide].price}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Featured Collection */}
      <section className="bg-dark-800 py-20">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent-green text-sm tracking-wider">
                CURATED SELECTION
              </span>
              <h2 className="text-4xl font-display text-white mt-2">
                Featured Collection
              </h2>
            </div>
            <Link
              href="/products"
              className="text-white/70 hover:text-white flex items-center transition-colors"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark-900/10 group-hover:bg-dark-900/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-900/80 to-transparent">
                    <h3 className="text-white font-medium">{product.name}</h3>
                    <p className="text-white/70 text-sm">{product.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-dark-900 py-20">
        <div className="container mx-auto px-8">
          <span className="text-accent-green text-sm tracking-wider">
            WHAT PEOPLE SAY
          </span>
          <h2 className="text-4xl font-display text-white mt-2 mb-12">
            Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="bg-dark-800 p-6 rounded-lg"
              >
                <svg
                  className="w-8 h-8 text-accent-green mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white/80 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-dark-800 py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-accent-green text-sm tracking-wider">
              STAY UPDATED
            </span>
            <h2 className="text-4xl font-display text-white mt-2 mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-white/60 mb-8">
              Subscribe to receive updates on new collections, artisan stories,
              and exclusive offers.
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

      {/* Featured In */}
      <section className="bg-dark-900 py-16 border-t border-dark-700">
        <div className="container mx-auto px-8">
          <p className="text-center text-white/40 mb-8 text-sm tracking-wider">
            AS SEEN IN
          </p>
          <div className="flex justify-center items-center flex-wrap gap-12">
            {[
              "DESIGN WEEK",
              "CERAMIC REVIEW",
              "ARTISAN JOURNAL",
              "HOME & STYLE",
            ].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 0.5 : 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="text-white/50 font-display text-xl hover:text-white/70 transition-colors cursor-pointer"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
