"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllProducts();
  }, []);

 
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFiltersAndSort();
    }
  }, [searchTerm, sortOption, allProducts]);

 
  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  }, [filteredProducts, productsPerPage]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/product/products");
      const { data } = response;

      if (!data || !data.products || !Array.isArray(data.products)) {
        throw new Error("Invalid API response format");
      }

     
      const productsWithArtisans = data.products.map((product) => ({
        ...product,
        artisanName: product.userId?.firstname || "Unknown Artisan",
      }));
      console.log("artisssan",productsWithArtisans);
      

      setAllProducts(productsWithArtisans);
      setFilteredProducts(productsWithArtisans);
      setTotalPages(Math.ceil(productsWithArtisans.length / productsPerPage));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...allProducts];

   
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(product => 
        product?.nom?.toLowerCase().includes(term) || 
        product?.category?.toLowerCase().includes(term)
      );
    }

  
    if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "price-low") {
      result.sort((a, b) => a.prix - b.prix);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.prix - a.prix);
    }

    setFilteredProducts(result);
    setCurrentPage(1); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFiltersAndSort();
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
   
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };


  const getCurrentPageProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
   
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
            <span className="text-accent-green text-sm tracking-wider">
              ONLINE STORE
            </span>
            <h1 className="text-5xl font-display text-white mt-2 mb-6">
              Shop Our Collection
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Discover our handcrafted ceramic pieces, each one unique and made
              with care by our skilled artisans.
            </p>
            <form onSubmit={handleSearchSubmit} className="relative max-w-md">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-dark-800/80 backdrop-blur-sm border border-dark-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:border-accent-green"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-white/50" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

     
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-8">
          <div className="flex flex-col">
          
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display text-white">
                  All Products
                </h2>
                <div className="flex items-center">
                  <div className="relative">
                    <select
                      className="appearance-none bg-dark-800 border border-dark-700 text-white/70 py-2 pl-4 pr-10 rounded-md focus:outline-none focus:border-accent-green"
                      onChange={handleSortChange}
                      value={sortOption}
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                  </div>
                </div>
              </div>

             
              {searchTerm && (
                <div className="mb-6 flex flex-wrap gap-2 items-center">
                  <span className="text-white/70">Search results for:</span>
                  <span className="bg-dark-800 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    {searchTerm}
                    <button
                      onClick={clearSearch}
                      className="ml-2 text-white/70 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-dark-800 rounded-lg p-4 animate-pulse h-64"
                      ></div>
                    ))
                ) : error ? (
                  <p className="text-red-500 col-span-3 text-center">{error}</p>
                ) : getCurrentPageProducts().length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-white text-lg mb-4">
                      No products found matching your search
                    </p>
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="px-4 py-2 bg-accent-green text-dark-900 rounded-md"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                ) : (
                  getCurrentPageProducts().map((product) => (
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
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-2 text-white/50">
            ...
          </span>,
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
            currentPage === i
              ? "bg-accent-green text-dark-900"
              : "bg-dark-800 text-white/70 hover:bg-dark-700"
          }`}
        >
          {i}
        </button>,
      );
    }

    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-2 text-white/50">
            ...
          </span>,
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-dark-800 text-white/70 hover:bg-dark-700"
        >
          {totalPages}
        </button>,
      );
    }

    return (
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-white/70">
          Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
          {Math.min(currentPage * productsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-dark-700 text-white/50 cursor-not-allowed"
                : "bg-dark-800 text-white hover:bg-dark-700"
            }`}
          >
            Previous
          </button>
          <div className="flex gap-2">{pages}</div>
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-dark-700 text-white/50 cursor-not-allowed"
                : "bg-dark-800 text-white hover:bg-dark-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}