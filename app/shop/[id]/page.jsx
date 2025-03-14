"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { ArrowLeft, X, ShoppingCart } from "lucide-react"

const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (imageSrc) => {
    setFailedImages(prev => new Set([...prev, imageSrc]));
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, closeModal]);

  const validImages = images?.filter(img => !failedImages.has(img)) || [];

  if (!validImages.length) return (
    <div className="relative h-[500px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">No images available</p>
    </div>
  );

  return (
    <>
      <div 
        className="relative h-[500px] rounded-lg overflow-hidden cursor-pointer" 
        onClick={() => setSelectedImage(validImages[0])}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedImage(validImages[0]);
          }
        }}
      >
        <Image
          src={validImages[0]}
          alt={productName}
          fill
          className="object-cover"
          onError={() => handleImageError(validImages[0])}
        />
      </div>
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {validImages.slice(1).map((image, index) => (
            <div 
              key={index} 
              className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedImage(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(image);
                }
              }}
            >
              <Image
                src={image}
                alt={`${productName} - Image ${index + 2}`}
                fill
                className="object-cover"
                onError={() => handleImageError(image)}
              />
            </div>
          ))}
        </div>
      )}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image Gallery Modal"
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
          <div 
            className="relative w-full max-w-4xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={productName}
              fill
              className="object-contain"
              onError={() => handleImageError(selectedImage)}
            />
          </div>
        </div>
      )}
    </>
  );
};

const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8 min-h-screen">
    <div className="mb-6">
      <Link 
        href="/shop" 
        className="inline-flex items-center text-accent-green hover:text-accent-green/90 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Shop
      </Link>
    </div>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 space-y-4">
        <Skeleton className="h-[500px] w-full rounded-lg" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
      <div className="md:w-1/2 space-y-6">
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-8 w-1/4" />
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="border-t border-b border-gray-200 py-4">
          <Skeleton className="h-8 w-1/3 mb-3" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-5 w-1/2 mb-1" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function ProductDetails({ params }) {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [addingToCart, setAddingToCart] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const response = await axios.get(`http://localhost:3001/api/product/product/${params.id}`);
        setProduct(response.data);

        // Get all products to extract unique categories
        const productsResponse = await axios.get('http://localhost:3001/api/product/products');
        if (!productsResponse.data || !productsResponse.data.products) {
          throw new Error('Invalid products response format');
        }

        const uniqueCategories = [...new Set(productsResponse.data.products.map(p => p.category))]
          .filter(category => category)
          .map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1)
          }));
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.status === 404 ? 'Product not found' : 
                err.response?.status === 500 ? 'Server error' : 
                'Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const handleAddToCart = async () => {
    if (addingToCart) return;

    try {
      setAddingToCart(true);
      // TODO: Replace with actual cart API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: "Added to Cart",
        description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart`,
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-6">
          <Link 
            href="/shop" 
            className="inline-flex items-center text-accent-green hover:text-accent-green/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-xl text-red-500 mb-2">{error || 'Product not found'}</p>
            <p className="text-sm text-gray-500 mb-4">Please try again later or check if the product ID is correct.</p>
            <Button asChild variant="outline">
              <Link href="/shop">Return to Shop</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-6">
        <Link 
          href="/shop" 
          className="inline-flex items-center text-accent-green hover:text-accent-green/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2 space-y-4">
          <ImageGallery images={product.images} productName={product.nom} />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.nom}</h1>
            <div className="flex items-center space-x-2 mb-2">
              <p className="text-gray-600">By</p>
              <p className="text-accent-green font-medium">{product.userId?.name || 'Unknown Artisan'}</p>
            </div>
            <p className="text-2xl font-semibold text-accent-green">
              ${product.prix.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>

            <div className="border-t border-b border-gray-200 py-4">
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Category</p>
                  <p className="font-medium capitalize">{getCategoryName(product.category)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Dimensions</p>
                  <p className="font-medium">
                    {product.dimensions.height} × {product.dimensions.width} × {product.dimensions.depth} {product.dimensions.unit}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Weight</p>
                  <p className="font-medium">{product.weight.value} {product.weight.unit}</p>
                </div>
                <div>
                  <p className="text-gray-600">Stock</p>
                  <p className="font-medium">{product.stock} units</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className={`font-medium capitalize ${product.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {product.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-medium">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), product.stock))}
                  className="w-20"
                  disabled={product.stock === 0 || product.status !== 'active' || addingToCart}
                />
                <Button 
                  className="flex-grow bg-accent-green hover:bg-accent-green/90"
                  disabled={product.stock === 0 || product.status !== 'active' || addingToCart}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addingToCart ? 'Adding to Cart...' :
                   product.status !== 'active' ? 'Product Unavailable' : 
                   product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
              {product.stock <= 5 && product.stock > 0 && product.status === 'active' && (
                <p className="text-red-500 text-sm">
                  Only {product.stock} units left in stock!
                </p>
              )}
              {product.featured && (
                <div className="bg-accent-green/10 text-accent-green px-4 py-2 rounded-md flex items-center justify-center space-x-2">
                  <span className="text-lg">★</span>
                  <span>Featured Product</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
