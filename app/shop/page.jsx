"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, ChevronDown } from "lucide-react"
import axios from "axios"
import ProductCard from "../components/ProductCard"

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([{ id: "all", name: "All Products" }])
  const [artisans, setArtisans] = useState([])
  const [activeFilters, setActiveFilters] = useState({ category: "all", artisans: [], search: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(6) // Show 6 products per page
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    fetchProducts();
    fetchArtisans();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, activeFilters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      // Add pagination parameters
      params.append('page', currentPage.toString());
      params.append('limit', productsPerPage.toString());

      // Add filter parameters
      if (activeFilters.category !== "all") {
        params.append('categorie', activeFilters.category);
      }
      if (activeFilters.artisans.length > 0) {
        params.append('userId', activeFilters.artisans.join(','));
      }
      if (activeFilters.search && activeFilters.search.trim()) {
        params.append('nom', activeFilters.search.trim());
      }

      const response = await axios.get(`http://localhost:3001/api/product/products?${params.toString()}`);
      const { data } = response;

      if (!data || !data.products || !Array.isArray(data.products)) {
        throw new Error('Invalid API response format');
      }

      // Get artisan names from populated userId field
      const productsWithArtisans = data.products.map(product => ({
        ...product,
        artisanName: product.userId?.name || 'Unknown Artisan'
      }));

      setProducts(productsWithArtisans);
      setTotalPages(Math.ceil(data.total / productsPerPage));
      setTotalProducts(data.total);
      
      // Only update categories on first page load or when filters change
      if (currentPage === 1) {
        const allProducts = data.allProducts || data.products;
        const uniqueCategories = [...new Set(allProducts.map(product => product.categorie))]
          .filter(category => category)
          .map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1)
          }));
        setCategories([{ id: "all", name: "All Products" }, ...uniqueCategories]);
      }

      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
      setLoading(false);
    }
  };

  const fetchArtisans = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user/getusers');
      const { data } = response;

      if (!Array.isArray(data)) {
        throw new Error('Invalid users data format');
      }

      // Get only artisans and their names
      const artisansList = data
        .filter(user => user.role === 'artisan')
        .map(artisan => ({
          id: artisan._id,
          name: artisan.fisrtname || artisan.email
        }));

      setArtisans(artisansList);
    } catch (err) {
      console.error('Error fetching artisans:', err);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveFilters(prev => ({ ...prev, category: categoryId }));
    setCurrentPage(1);
  };

  const handleArtisanChange = (artisanId) => {
    setActiveFilters(prev => {
      const newArtisans = prev.artisans.includes(artisanId)
        ? prev.artisans.filter(id => id !== artisanId)
        : [...prev.artisans, artisanId];
      
      return {
        ...prev,
        artisans: newArtisans
      };
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setActiveFilters(prev => ({ ...prev, search: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    // Add sorting functionality here
    console.log("Sort changed:", e.target.value);
  };

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg"
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
            <form onSubmit={handleSearchSubmit} className="relative max-w-md">
              <input
                type="text"
                placeholder="Search for products..."
                value={activeFilters.search}
                onChange={handleSearchChange}
                className="w-full bg-dark-800/80 backdrop-blur-sm border border-dark-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:border-accent-green"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-white/50" />
              </button>
            </form>
          </motion.div>
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

                <div className="mt-8">
                  <h3 className="text-white font-medium mb-4">Artisans</h3>
                  <div className="space-y-2">
                    {artisans.map((artisan) => (
                      <div key={artisan.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`artisan-${artisan.id}`}
                          checked={activeFilters.artisans.includes(artisan.id)}
                          onChange={() => handleArtisanChange(artisan.id)}
                          className="mr-2 accent-accent-green"
                        />
                        <label htmlFor={`artisan-${artisan.id}`} className="text-white/70 cursor-pointer">
                          {artisan.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {(activeFilters.category !== "all" || activeFilters.artisans.length > 0 || activeFilters.search) && (
                  <div className="mt-8">
                    <button
                      onClick={() => {
                        setActiveFilters({ category: "all", artisans: [], search: "" });
                        setCurrentPage(1);
                      }}
                      className="w-full py-2 px-4 bg-dark-700 text-white rounded-md hover:bg-dark-600 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display text-white">
                  {activeFilters.category !== "all" 
                    ? categories.find(c => c.id === activeFilters.category)?.name || "Products" 
                    : "All Products"}
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <select 
                      className="appearance-none bg-dark-800 border border-dark-700 text-white/70 py-2 pl-4 pr-10 rounded-md focus:outline-none focus:border-accent-green"
                      onChange={handleSortChange}
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Active filters summary */}
              {(activeFilters.category !== "all" || activeFilters.artisans.length > 0 || activeFilters.search) && (
                <div className="mb-6 flex flex-wrap gap-2 items-center">
                  <span className="text-white/70">Active filters:</span>
                  
                  {activeFilters.category !== "all" && (
                    <span className="bg-dark-800 text-white px-3 py-1 rounded-full text-sm flex items-center">
                      Category: {categories.find(c => c.id === activeFilters.category)?.name}
                      <button 
                        onClick={() => handleCategoryChange("all")}
                        className="ml-2 text-white/70 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {activeFilters.artisans.map(artisanId => {
                    const artisan = artisans.find(a => a.id === artisanId);
                    return artisan ? (
                      <span key={artisanId} className="bg-dark-800 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        Artisan: {artisan.name}
                        <button 
                          onClick={() => handleArtisanChange(artisanId)}
                          className="ml-2 text-white/70 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ) : null;
                  })}
                  
                  {activeFilters.search && (
                    <span className="bg-dark-800 text-white px-3 py-1 rounded-full text-sm flex items-center">
                      Search: {activeFilters.search}
                      <button 
                        onClick={() => {
                          setActiveFilters(prev => ({ ...prev, search: "" }));
                          setCurrentPage(1);
                        }}
                        className="ml-2 text-white/70 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  Array(6).fill(0).map((_, index) => (
                    <div key={index} className="bg-dark-800 rounded-lg p-4 animate-pulse h-64"></div>
                  ))
                ) : error ? (
                  <p className="text-red-500 col-span-3 text-center">{error}</p>
                ) : products.length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-white text-lg mb-4">No products found matching your criteria</p>
                    <button
                      onClick={() => {
                        setActiveFilters({ category: "all", artisans: [], search: "" });
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 bg-accent-green text-dark-900 rounded-md"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  products.map((product) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  
  // Pagination component
  function renderPagination() {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-dark-800 text-white/70 hover:bg-dark-700"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-2 text-white/50">
            ...
          </span>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
            currentPage === i ? "bg-accent-green text-dark-900" : "bg-dark-800 text-white/70 hover:bg-dark-700"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-2 text-white/50">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-dark-800 text-white/70 hover:bg-dark-700"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-white/70">
          Showing {((currentPage - 1) * productsPerPage) + 1} to {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-dark-700 text-white/50 cursor-not-allowed'
                : 'bg-dark-800 text-white hover:bg-dark-700'
            }`}
          >
            Previous
          </button>
          <div className="flex gap-2">{pages}</div>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-dark-700 text-white/50 cursor-not-allowed'
                : 'bg-dark-800 text-white hover:bg-dark-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}