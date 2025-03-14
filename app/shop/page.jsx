"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { ChevronDown, ChevronUp, Search, Filter, Star, ChevronLeft, ChevronRight } from "lucide-react"

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <Link href={`/shop/${product._id}`} className="block">
        <div className="relative h-64 w-full">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.nom}
              fill
              className="object-cover"
            />
          )}
          {product.featured && (
            <div className="absolute top-2 right-2 bg-accent-green text-dark-900 px-2 py-1 rounded-full text-sm font-medium flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {product.nom}
          </h3>
          <p className="text-accent-green font-medium">${product.prix}</p>
          <p className="text-white/70 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-red-500 text-sm mt-2">
              Only {product.stock} left in stock!
            </p>
          )}
          {product.stock === 0 && (
            <p className="text-red-500 text-sm mt-2">Out of stock</p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

const ProductSkeleton = () => (
  <div className="bg-dark-800 rounded-lg overflow-hidden shadow-lg">
    <Skeleton className="h-64 w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
)

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    featured: false,
    inStock: false,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const productsPerPage = 9
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const queryParams = new URLSearchParams()

        if (searchQuery) queryParams.append("search", searchQuery)
        if (activeFilters.category)
          queryParams.append("category", activeFilters.category)
        if (activeFilters.minPrice)
          queryParams.append("minPrice", activeFilters.minPrice)
        if (activeFilters.maxPrice)
          queryParams.append("maxPrice", activeFilters.maxPrice)
        if (activeFilters.featured) queryParams.append("featured", "true")
        if (activeFilters.inStock) queryParams.append("inStock", "true")

        queryParams.append("page", currentPage)
        queryParams.append("limit", productsPerPage)

        const response = await axios.get(
          `http://localhost:3001/api/product/products?${queryParams.toString()}`
        )

        if (!response.data || !response.data.products) {
          throw new Error("Invalid response format")
        }

        setProducts(response.data.products)
        setTotalProducts(response.data.total)
        setTotalPages(Math.ceil(response.data.total / productsPerPage))

        const uniqueCategories = [
          ...new Set(response.data.products.map((p) => p.category)),
        ]
          .filter((category) => category)
          .sort()
          .map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1)
          }))

        setCategories(uniqueCategories)
        setError(null)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError(
          err.response?.status === 500
            ? "Server error. Please try again later."
            : "Failed to load products. Please check your connection and try again."
        )
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchQuery, activeFilters, currentPage, toast])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    setSearchQuery(formData.get("search"))
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setActiveFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category,
    }))
    setCurrentPage(1)
  }

  const handlePriceChange = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
    setCurrentPage(1)
  }

  const handleCheckboxChange = (type) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setActiveFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      featured: false,
      inStock: false,
    })
    setSearchQuery("")
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="md:w-1/4">
          <div className="bg-dark-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                {showFilters ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div
              className={`space-y-6 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="space-y-2">
                <label htmlFor="search" className="text-white/70 text-sm">
                  Search
                </label>
                <div className="flex gap-2">
                  <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Categories */}
              <div className="space-y-2">
                <h3 className="text-white/70 text-sm">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block text-left w-full px-3 py-2 rounded-md transition-colors ${
                        activeFilters.category === category.id
                          ? "bg-accent-green text-dark-900"
                          : "text-white/70 hover:bg-dark-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <h3 className="text-white/70 text-sm">Price Range</h3>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={activeFilters.minPrice}
                    onChange={(e) => handlePriceChange("minPrice", e.target.value)}
                    className="w-1/2"
                    min="0"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={activeFilters.maxPrice}
                    onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
                    className="w-1/2"
                    min="0"
                  />
                </div>
              </div>

              {/* Additional Filters */}
              <div className="space-y-2">
                <h3 className="text-white/70 text-sm">Additional Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.featured}
                      onChange={() => handleCheckboxChange("featured")}
                      className="rounded border-gray-300 text-accent-green focus:ring-accent-green"
                    />
                    <span className="text-white/70">Featured Only</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.inStock}
                      onChange={() => handleCheckboxChange("inStock")}
                      className="rounded border-gray-300 text-accent-green focus:ring-accent-green"
                    />
                    <span className="text-white/70">In Stock Only</span>
                  </label>
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                onClick={resetFilters}
                variant="outline"
                className="w-full"
                disabled={
                  !activeFilters.category &&
                  !activeFilters.minPrice &&
                  !activeFilters.maxPrice &&
                  !activeFilters.featured &&
                  !activeFilters.inStock &&
                  !searchQuery
                }
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : "All Products"}
            </h1>
            <p className="text-white/70">
              Showing {Math.min((currentPage - 1) * productsPerPage + 1, totalProducts)} - {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(productsPerPage)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70 mb-4">No products found</p>
              <Button onClick={resetFilters} variant="outline">
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNumber = i + 1
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={pageNumber}
                              variant={currentPage === pageNumber ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(pageNumber)}
                              className={`w-8 h-8 ${
                                currentPage === pageNumber
                                  ? "bg-accent-green text-dark-900"
                                  : ""
                              }`}
                            >
                              {pageNumber}
                            </Button>
                          )
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <span key={pageNumber} className="text-white/70">
                              ...
                            </span>
                          )
                        }
                        return null
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-white/70 text-sm">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
