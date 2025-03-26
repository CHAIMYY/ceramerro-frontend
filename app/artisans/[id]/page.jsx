"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Globe,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
} from "lucide-react";
import axios from "axios";

export default function ArtisanDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("work");
  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/getArtisan/${params.id}`,
        );
        setArtisan(response.data);

        // Extract products from the response if they exist
        if (response.data.products && response.data.products.length > 0) {
          setProducts(response.data.products);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching artisan data:", err);
        setError("Failed to load artisan data");
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [params.id]);

  if (loading) {
    return (
      <div className="pt-24 bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  // Prepare data for display
  const artisanName = artisan
    ? `${artisan.firstname} ${artisan.lastname}`
    : "Unknown Artisan";
  const artisanSpecialty = artisan?.specialty || "Artisan";
  const artisanLocation = artisan?.location || "Location not specified";
  const artisanBio = artisan?.bio || "No bio available for this artisan.";
  const artisanImage = artisan?.image || "/placeholder.svg";
  const artisanGallery =
    artisan?.gallery?.length > 0 ? artisan.gallery : ["/placeholder.svg"];

  // Default process steps if none available
  const process = artisan?.process || [
    {
      title: "Design",
      description:
        "The artisan designs each piece with care and attention to detail.",
    },
    {
      title: "Creation",
      description: "Each piece is handcrafted using traditional techniques.",
    },
    {
      title: "Quality Check",
      description:
        "Every item undergoes careful inspection to ensure top quality.",
    },
    {
      title: "Finishing",
      description: "Final touches are added to perfect each piece.",
    },
    {
      title: "Packaging",
      description: "Products are carefully packaged for safe delivery.",
    },
  ];

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={artisanImage}
            alt={artisanName}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-dark-900/60" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent-green text-sm tracking-wider">
              ARTISAN PROFILE
            </span>
            <h1 className="text-5xl font-display text-white mt-2 mb-4">
              {artisanName}
            </h1>
            <p className="text-2xl text-white/80 mb-6">{artisanSpecialty}</p>
            <div className="flex items-center text-white/70">
              <MapPin className="w-5 h-5 mr-2 text-accent-green" />
              {artisanLocation}
            </div>

            <div className="flex space-x-4 mt-8">
              {artisan?.socialMedia?.instagram && (
                <a
                  href={artisan.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {artisan?.socialMedia?.website && (
                <a
                  href={artisan.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {artisan?.socialMedia?.facebook && (
                <a
                  href={artisan.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {artisan?.socialMedia?.twitter && (
                <a
                  href={artisan.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${artisan?.email}`}
                className="bg-dark-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-accent-green hover:text-dark-900 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="bg-dark-800 py-12">
        <div className="container mx-auto px-8">
          <div className="flex border-b border-dark-700">
            <button
              onClick={() => setActiveTab("work")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "work"
                  ? "text-accent-green border-b-2 border-accent-green"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Work & Process
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "products"
                  ? "text-accent-green border-b-2 border-accent-green"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "gallery"
                  ? "text-accent-green border-b-2 border-accent-green"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-8">
          {activeTab === "work" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl font-display text-white mb-6">
                    About the Artist
                  </h2>
                  <p className="text-white/70 mb-6">{artisanBio}</p>
                  <p className="text-white/70">
                    {artisan?.additionalBio ||
                      "This artisan creates pieces that showcase their unique talent and creativity."}
                  </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={artisanImage || "/placeholder.svg"}
                    alt={`${artisanName} at work`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-display text-white mb-8">
                  Creative Process
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {process.map((step, index) => (
                    <div key={index} className="bg-dark-800 p-6 rounded-lg">
                      <div className="text-accent-green text-xl font-medium mb-2">
                        {index + 1}
                      </div>
                      <h3 className="text-white font-medium mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-display text-white mb-8">
                Products by {artisanName}
              </h2>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {products.map((product, index) => (
                     <Link 
                     href={`/shop/${product?._id}`}
                     key={product._id || index}
                     className="block"
                   >
                     <div className="bg-dark-800 rounded-lg overflow-hidden group">
                       <div className="relative h-64 overflow-hidden">
                         <Image
                           src={product?.images[0] || "/placeholder.svg"}
                           alt={product.nom}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105"
                         />
                       </div>
                       <div className="p-6">
                         <h3 className="text-lg font-medium text-white mb-2">
                           {product.nom}
                         </h3>
                         <p className="text-accent-green">
                           ${(product.prix || 0).toFixed(2)}
                         </p>
                         {product.description && (
                           <p className="text-white/70 text-sm mt-2 mb-4">
                             {product.description}
                           </p>
                         )}
                       </div>
                     </div>
                   </Link>
                  ))}
                </div>
              ) : (
                <div className="text-white/70 text-center py-12">
                  No products available for this artisan.
                </div>
              )}

              <div className="mt-12 text-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center text-accent-green hover:text-white transition-colors"
                >
                  View All Products <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-display text-white mb-8">Gallery</h2>
              {artisanGallery.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artisanGallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white/70 text-center py-12">
                  No gallery images available for this artisan.
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
