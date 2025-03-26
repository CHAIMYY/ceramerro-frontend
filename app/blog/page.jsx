"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: "all", name: "All Posts" },
    // { id: "techniques", name: "Techniques" },
    { id: "inspiration", name: "Inspiration" },
    { id: "interviews", name: "Artisan Interviews" },
    { id: "care", name: "Product Care" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate read time based on content length (rough estimate)
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Fetch blog posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/blog/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        // Process the data
        const processedPosts = data.map((post) => ({
          id: post._id,
          title: post.titre,
          excerpt:
            post.contenu.substring(0, 120) +
            (post.contenu.length > 120 ? "..." : ""),
          date: formatDate(post.datePublication),
          readTime: calculateReadTime(post.contenu),
          author: "Author", // API doesn't provide author name directly
          category: post.slug.includes("first")
            ? "techniques"
            : post.slug.includes("second")
              ? "inspiration"
              : "care", // Assign categories based on slug
          image:
            post.postPicture ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
          likes: post.likes,
          comments: post.comments || [],
          slug: post.slug,
        }));

        setBlogPosts(processedPosts);

        // Set the post with most likes as featured
        if (processedPosts.length > 0) {
          const mostLiked = [...processedPosts].sort(
            (a, b) => b.likes - a.likes,
          )[0];
          setFeaturedPost(mostLiked);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts
    .filter(
      (post) => activeCategory === "all" || post.category === activeCategory,
    )
    .filter(
      (post) =>
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((post) => post.id !== (featuredPost?.id || "")); // Exclude featured post

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredPost?.image || "/placeholder.svg"}
            alt="Blog hero"
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
              CERAMIC ARTS BLOG
            </span>
            <h1 className="text-5xl font-display text-white mt-2 mb-6">
              Insights & Inspiration
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Explore articles on ceramic techniques, artist interviews, and the
              latest trends in ceramic arts.
            </p>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-800/80 backdrop-blur-sm border border-dark-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:border-accent-green"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-16 bg-dark-800 flex justify-center">
          <div className="text-white">Loading blog posts...</div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-16 bg-dark-800 flex justify-center">
          <div className="text-accent-green">Error: {error}</div>
        </section>
      )}

      {/* Featured Post */}
      {!loading && !error && featuredPost && (
        <section className="py-16 bg-dark-800">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-display text-white mb-8">
              Featured Article
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-accent-green/20 text-accent-green px-3 py-1 rounded-full text-sm">
                    {categories.find((cat) => cat.id === featuredPost.category)
                      ?.name || featuredPost.category}
                  </span>
                  <div className="flex items-center text-white/50 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center text-white/50 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>

                <h3 className="text-2xl font-display text-white mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-white/70 mb-6">{featuredPost.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-white/70" />
                    </div>
                    <span className="text-white/70">{featuredPost.author}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="text-accent-green hover:text-white transition-colors flex items-center"
                  >
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      {!loading && !error && (
        <section className="py-16 bg-dark-900">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <h2 className="text-3xl font-display text-white mb-4 md:mb-0">
                Latest Articles
              </h2>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeCategory === category.id
                        ? "bg-accent-green text-dark-900"
                        : "bg-dark-800 text-white/70 hover:bg-dark-700"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-800 rounded-lg overflow-hidden group"
                >
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-accent-green/20 text-accent-green px-2 py-1 rounded-full text-xs">
                          {categories.find((cat) => cat.id === post.category)
                            ?.name || post.category}
                        </span>
                        <div className="flex items-center text-white/50 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-medium text-white mb-3 group-hover:text-accent-green transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center mr-2">
                            <User className="w-3 h-3 text-white/70" />
                          </div>
                          <span className="text-white/70 text-sm">
                            {post.author}
                          </span>
                        </div>

                        <span className="text-white/50 text-xs">
                          {post.date}
                        </span>
                      </div>

                      {/* Display likes and comments count */}
                      <div className="flex items-center space-x-4 mt-3 text-white/50 text-xs">
                        <div>❤️ {post.likes} likes</div>
                        <div>💬 {post.comments.length} comments</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/70">
                  No articles found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/70 mb-8">
              Get the latest articles, tutorials, and news about ceramic arts
              delivered straight to your inbox.
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
    </div>
  );
}
