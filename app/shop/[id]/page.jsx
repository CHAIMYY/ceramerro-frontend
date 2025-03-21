"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, Minus, Plus, Check, ArrowLeft, Star, Package, Truck, RefreshCw, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Add auth token to every request
  api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Update the fetchProduct function to use a regular axios call without authentication
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // Use regular axios for public product data
        const response = await axios.get(`http://localhost:3001/api/product/product/${params.id}`)
        setProduct(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Keep the handleAddToCart function with authentication check
  const handleAddToCart = async () => {
    if (!getToken()) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your cart",
        type: "error",
      })
      router.push("/login")
      return
    }

    setIsAddingToCart(true)

    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: quantity,
      })

      setAddedToCart(true)

      toast({
        title: "Added to cart",
        description: `${product.nom} has been added to your cart`,
        type: "success",
      })

      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    } catch (error) {
      console.error("Failed to add to cart:", error)

      let errorMessage = "Failed to add to cart. Please try again."
      if (error.response && error.response.data.message) {
        errorMessage = error.response.data.message
      }

      toast({
        title: "Error",
        description: errorMessage,
        type: "error",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-24 bg-dark-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 text-accent-green animate-spin mb-4" />
            <p className="text-white">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-24 bg-dark-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="bg-red-900/20 p-6 rounded-lg border border-red-900 max-w-md mx-auto text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={() => router.back()} className="bg-dark-800 text-white hover:bg-dark-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-24 bg-dark-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-white">Product not found</p>
            <Button onClick={() => router.back()} className="bg-dark-800 text-white hover:bg-dark-700 mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-white/60 hover:text-white hover:bg-dark-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] bg-dark-800 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.nom}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-24 w-24 text-white/20" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                      selectedImage === index ? "border-accent-green" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.nom} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.nom}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-white/30" />
                  <span className="ml-2 text-white/60">(4.0)</span>
                </div>

                <Badge className="bg-dark-800 text-white/80 hover:bg-dark-700">
                  {product.category || "Uncategorized"}
                </Badge>
              </div>

              <div className="text-3xl font-bold text-accent-green mb-6">${product.prix?.toFixed(2)}</div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-white/80">{product.description}</p>
              </div>
            </div>

            {/* Product Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-dark-700 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center">
                  <Package className="h-5 w-5 text-accent-green" />
                </div>
                <div>
                  <p className="text-white font-medium">Availability</p>
                  {product.stock > 0 ? (
                    <p className="text-green-400">In Stock ({product.stock} available)</p>
                  ) : (
                    <p className="text-red-400">Out of Stock</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-accent-green" />
                </div>
                <div>
                  <p className="text-white font-medium">Shipping</p>
                  <p className="text-white/60">Free shipping on orders over $100</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-dark-800 text-white rounded-l-md hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-14 h-10 flex items-center justify-center bg-dark-800 text-white">{quantity}</div>
                  <button
                    onClick={incrementQuantity}
                    disabled={product.stock <= quantity}
                    className="w-10 h-10 flex items-center justify-center bg-dark-800 text-white rounded-r-md hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || addedToCart || product.stock <= 0}
                  className={`flex-1 py-6 ${
                    addedToCart
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-accent-green text-dark-900 hover:bg-accent-green/90"
                  } ${isAddingToCart || product.stock <= 0 ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isAddingToCart ? (
                    "Adding to Cart..."
                  ) : addedToCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart
                    </>
                  ) : product.stock <= 0 ? (
                    "Out of Stock"
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Product Details */}
            {(product.dimensions || product.weight) && (
              <div className="border-t border-dark-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.dimensions && (
                    <div>
                      <p className="text-white/60 mb-1">Dimensions</p>
                      <p className="text-white">
                        {product.dimensions.height} × {product.dimensions.width} × {product.dimensions.depth}{" "}
                        {product.dimensions.unit}
                      </p>
                    </div>
                  )}

                  {product.weight && (
                    <div>
                      <p className="text-white/60 mb-1">Weight</p>
                      <p className="text-white">
                        {product.weight.value} {product.weight.unit}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Artisan Info */}
            {product.userId && (
              <div className="border-t border-dark-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Artisan</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white font-bold">
                    {product.artisanName ? product.artisanName[0] : "A"}
                  </div>
                  <div>
                    <p className="text-white font-medium">{product.artisanName || "Artisan"}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-accent-green hover:text-accent-green/80"
                      onClick={() => router.push(`/artisan/${product.userId}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

