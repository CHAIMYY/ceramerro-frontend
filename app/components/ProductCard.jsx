"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Check } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add auth token to every request
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!getToken()) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your cart",
        type: "error",
      });
      router.push("/login");
      return;
    }

    if (product.stock <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock",
        type: "error",
      });
      return;
    }

    setIsAddingToCart(true);

    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      setAddedToCart(true);

      toast({
        title: "Added to cart",
        description: `${product.nom} has been added to your cart`,
        type: "success",
      });

      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);

      let errorMessage = "Failed to add to cart. Please try again.";
      if (error.response && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-dark-800 rounded-lg overflow-hidden"
    >
      <div className="relative overflow-hidden group">
        <Image
          src={
            product?.images[0] ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg"
          }
          alt={product?.nom || "Ceramic product"}
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-dark-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || addedToCart || product?.stock <= 0}
            className={`${
              addedToCart
                ? "bg-green-600 text-white"
                : product?.stock <= 0
                  ? "bg-red-900/80 text-white cursor-not-allowed"
                  : "bg-dark-900/80 backdrop-blur-sm text-white hover:bg-accent-green hover:text-dark-900"
            } p-2 rounded-full transition-colors ${isAddingToCart ? "opacity-70 cursor-wait" : ""}`}
          >
            {isAddingToCart ? (
              <ShoppingCart className="w-5 h-5 animate-pulse" />
            ) : addedToCart ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
          <Link
            href={`/shop/${product?._id}`}
            className="bg-dark-900/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/shop/${product?._id}`} className="block">
          <h3 className="text-lg font-medium text-white mb-1 hover:text-accent-green transition-colors">
            {product?.nom}
          </h3>
        </Link>
        <p className="text-accent-green mb-2">${product?.prix?.toFixed(2)}</p>
        <p className="text-sm text-white/60">{product?.category}</p>
        {product?.stock <= 0 && (
          <p className="text-red-500 text-sm mt-1">Out of Stock</p>
        )}
      </div>
    </motion.div>
  );
}
