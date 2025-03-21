"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, ShoppingCart } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useCurrency } from "../contexts/CurrencyContext"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const { language, setLanguage } = useLanguage()
  const { currency, setCurrency } = useCurrency()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      setIsAuthenticated(!!token)
    }

    window.addEventListener("scroll", handleScroll)
    checkAuth()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-900/90 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-light text-white">
            <span className="font-display">Ceramic</span> Studio
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-8 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-300 relative group py-2">
                  About us
                  <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li>
              {/* <li>
                <Link href="/products" className="hover:text-white transition-colors duration-300 relative group py-2">
                  Products
                  <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li> */}
              <li>
                <Link href="/artisans" className="hover:text-white transition-colors duration-300 relative group py-2">
                  Artisans
                  <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors duration-300 relative group py-2">
                  Shop
                  <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-300 relative group py-2">
                  Blog
                  <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-300 relative group py-2">
                  Contact
                  <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-6">
            {/* <button aria-label="Search" className="text-white/70 hover:text-white transition-colors duration-300">
              <Search className="w-4 h-4" />
            </button> */}
            {isAuthenticated ? (
              <Link href="/cart" className="hover:text-white transition-colors duration-300 relative group py-2 flex items-center">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Cart
                <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ) : (
              <Link href="/login" className="hover:text-white transition-colors duration-300 relative group py-2">
                Login
                <span className="absolute bottom-0 left-0 w-full h-px bg-accent-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            )}
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 overflow-hidden"
          >
            <nav className="container mx-auto px-8 py-6">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-white/70 hover:text-white transition-colors duration-300 block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About us
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/products"
                    className="text-white/70 hover:text-white transition-colors duration-300 block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/artisans"
                    className="text-white/70 hover:text-white transition-colors duration-300 block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Artisans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="text-white/70 hover:text-white transition-colors duration-300 block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-white/70 hover:text-white transition-colors duration-300 block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/70 hover:text-white transition-colors duration-300 block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li>
                    <Link
                      href="/cart"
                      className="text-white/70 hover:text-white transition-colors duration-300 block py-2 flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Cart
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="text-white/70 hover:text-white transition-colors duration-300 block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}