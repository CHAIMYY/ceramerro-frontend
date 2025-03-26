"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/user/getusers");

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Transform the API data to match our artisan data structure
        const formattedData = data.map((user) => ({
          id: user._id,
          name: `${user.firstname} ${user.lastname}`,
          specialty: user.specialty || "Ceramic Artist",
          category: user.category || "pottery", // Default category if not specified
          location: user.location || "Location not specified",
          image:
            user.image ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
          featured: user.featured || false,
          socialMedia: user.socialMedia || {},
          bio: user.bio || "",
          gallery: user.gallery || [],
        }));

        setArtisans(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching artisans:", err);
        setError(err.message);
        setLoading(false);

        // Fallback to empty array if API fails
        setArtisans([]);
      }
    };

    fetchArtisans();
  }, []);

  return (
    <div className="pt-24 bg-dark-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg"
            alt="Ceramic workshop"
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
            className="max-w-2xl"
          >
            <span className="text-accent-green text-sm tracking-wider">
              OUR STORY
            </span>
            <h1 className="text-5xl font-display text-white mt-2 mb-6">
              About Ceramic Studio
            </h1>
            <p className="text-white/70 text-lg">
              We are a collective of passionate artisans dedicated to preserving
              the ancient craft of ceramics while embracing contemporary design
              principles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-dark-800">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent-green text-sm tracking-wider">
                ESTABLISHED 2010
              </span>
              <h2 className="text-3xl font-display text-white mt-2 mb-6">
                Our Journey
              </h2>
              <p className="text-white/70 mb-4">
                Ceramic Studio began as a small workshop in Brooklyn, founded by
                a group of artists who shared a passion for clay and
                craftsmanship. What started as a creative outlet quickly evolved
                into a mission to revive traditional ceramic techniques and
                bring them into the modern era.
              </p>
              <p className="text-white/70 mb-4">
                Over the years, we've grown into a community of skilled
                artisans, each bringing their unique perspective and expertise
                to our collective. We've expanded our reach while staying true
                to our founding principles: quality craftsmanship, sustainable
                practices, and timeless design.
              </p>
              <p className="text-white/70">
                Today, our pieces can be found in homes and galleries around the
                world, each one telling a story of tradition, innovation, and
                the human touch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736891.jpg-6T8WSg0a53na1FXQGRdPmczWCMkfGH.jpeg"
                alt="Ceramic artisan at work"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-green text-sm tracking-wider">
              WHAT WE BELIEVE
            </span>
            <h2 className="text-3xl font-display text-white mt-2 mb-6">
              Our Values
            </h2>
            <p className="text-white/70">
              At the heart of everything we create are the principles that guide
              our work and define our approach to ceramics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Craftsmanship",
                description:
                  "We believe in the value of handmade objects and the skill that goes into creating them. Each piece is crafted with care and attention to detail.",
                icon: "🔨",
              },
              {
                title: "Sustainability",
                description:
                  "We are committed to environmentally responsible practices, from sourcing local materials to minimizing waste in our production process.",
                icon: "🌱",
              },
              {
                title: "Innovation",
                description:
                  "While respecting tradition, we continuously explore new techniques, forms, and glazes to push the boundaries of ceramic art.",
                icon: "💡",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-800 p-8 rounded-lg"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-medium text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-dark-800">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-green text-sm tracking-wider">
              THE PEOPLE
            </span>
            <h2 className="text-3xl font-display text-white mt-2 mb-6">
              Meet Our Team
            </h2>
            <p className="text-white/70">
              Our diverse team of artisans brings together decades of experience
              and a shared passion for ceramic arts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {artisans.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={artisan.image || "/placeholder.svg"}
                    alt={artisan.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark-900/10 group-hover:bg-dark-900/30 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-white">
                  {artisan.name}
                </h3>
                <p className="text-accent-green">{artisan.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
