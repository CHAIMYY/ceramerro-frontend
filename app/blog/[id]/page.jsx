"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, MessageSquare, Share2, Bookmark, Heart, Send } from "lucide-react"

export default function BlogPostPage({ params }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(24)

  // This would normally come from an API or database
  const blogPost = {
    id: Number.parseInt(params.id),
    title: "The Art of Glazing: Techniques for Beautiful Ceramic Finishes",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Elena Kim",
    authorRole: "Master Ceramicist",
    authorImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
    category: "techniques",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
    content: [
      {
        type: "paragraph",
        text: "Glazing is perhaps the most transformative step in the ceramic process. A well-executed glaze can elevate a simple form into a work of art, adding color, texture, and depth to the surface. In this article, we'll explore various glazing techniques that can help you achieve beautiful finishes on your ceramic pieces.",
      },
      {
        type: "heading",
        text: "Understanding Glazes",
      },
      {
        type: "paragraph",
        text: "Before diving into techniques, it's important to understand what glazes are and how they work. Ceramic glazes are essentially glass that has been melted onto the surface of clay. They're composed of three main components: silica (which forms the glass), alumina (which stabilizes the glass), and fluxes (which lower the melting temperature).",
      },
      {
        type: "paragraph",
        text: "Glazes can be transparent, opaque, matte, glossy, textured, or smooth. The possibilities are virtually endless, which is what makes glazing such an exciting part of the ceramic process.",
      },
      {
        type: "image",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
        caption: "Various glaze samples showing different colors and textures",
      },
      {
        type: "heading",
        text: "Basic Glazing Techniques",
      },
      {
        type: "paragraph",
        text: "There are several methods for applying glaze to ceramic pieces, each producing different effects:",
      },
      {
        type: "list",
        items: [
          "Dipping: Immersing the entire piece in a bucket of glaze for even coverage",
          "Pouring: Pouring glaze over the piece for controlled application",
          "Brushing: Using a brush to apply glaze, good for detailed work",
          "Spraying: Using a spray gun for smooth, even application",
        ],
      },
      {
        type: "paragraph",
        text: "Each technique requires practice to master, but dipping is often recommended for beginners due to its simplicity and consistent results.",
      },
      {
        type: "heading",
        text: "Advanced Glazing Techniques",
      },
      {
        type: "paragraph",
        text: "Once you've mastered the basics, you can explore more advanced techniques to create unique effects:",
      },
      {
        type: "paragraph",
        text: "Layering: Applying multiple glazes on top of each other can create depth and interesting interactions. Remember that glazes will interact chemically during firing, sometimes producing unexpected but beautiful results.",
      },
      {
        type: "paragraph",
        text: "Wax Resist: Applying wax to certain areas of your piece will prevent glaze from adhering to those spots. This technique is perfect for creating patterns or keeping certain areas glaze-free.",
      },
      {
        type: "image",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-357428.jpg-E6GCvheFALz0JgBoVkQMy4WZj5QF3y.jpeg",
        caption: "A ceramic piece with wax resist technique showing the contrast between glazed and unglazed areas",
      },
      {
        type: "paragraph",
        text: "Sgraffito: This involves scratching through a layer of colored slip or glaze to reveal the clay body or another color underneath. It's excellent for creating detailed designs.",
      },
      {
        type: "heading",
        text: "Tips for Successful Glazing",
      },
      {
        type: "list",
        items: [
          "Always test new glazes or combinations on test tiles before applying to your finished pieces",
          "Keep detailed records of your glaze recipes and firing schedules",
          "Clean the bottom of your pieces to prevent them from sticking to kiln shelves",
          "Apply glazes to the appropriate thickness – too thin and they may be patchy, too thick and they may run",
          "Consider the final use of your piece when selecting glazes (food-safe glazes for functional ware)",
        ],
      },
      {
        type: "paragraph",
        text: "Glazing is both a science and an art. While understanding the technical aspects is important, don't be afraid to experiment and let your creativity guide you. Some of the most beautiful glazed pieces come from happy accidents and bold experimentation.",
      },
      {
        type: "paragraph",
        text: "Remember that mastering glazing takes time and practice. Be patient with yourself, keep detailed notes, and enjoy the process of discovery. The moment when you open the kiln to reveal your glazed pieces is one of the most exciting parts of ceramic making – embrace the anticipation and the occasional surprise!",
      },
    ],
    relatedPosts: [
      {
        id: 2,
        title: "From Clay to Art: The Ceramic Making Process",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736720.jpg-WAQ8EHL8wibRIMix59YGewjjmeh5vP.jpeg",
        category: "techniques",
      },
      {
        id: 6,
        title: "The Revival of Traditional Ceramic Techniques",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-koolshooters-9736891.jpg-6T8WSg0a53na1FXQGRdPmczWCMkfGH.jpeg",
        category: "techniques",
      },
      {
        id: 5,
        title: "Caring for Your Ceramic Collection: Essential Tips",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rethaferguson-3817497.jpg-g08fRDNGUnO4iHESPpPuTyvl3LtbdJ.jpeg",
        category: "care",
      },
    ],
  }

  // Initial comments
  useEffect(() => {
    setComments([
      {
        id: 1,
        name: "Sarah Johnson",
        date: "May 16, 2023",
        content:
          "This article was incredibly helpful! I've been struggling with my glazes running too much, and now I understand why. Can't wait to try the wax resist technique.",
        replies: [],
      },
      {
        id: 2,
        name: "Michael Chen",
        date: "May 17, 2023",
        content:
          "Great breakdown of the different techniques. I'd love to see a follow-up article about troubleshooting common glazing problems!",
        replies: [
          {
            id: 3,
            name: "Elena Kim",
            date: "May 17, 2023",
            content:
              "Thanks for the suggestion, Michael! I'm actually working on a troubleshooting guide that should be published next month.",
            isAuthor: true,
          },
        ],
      },
    ])
  }, [])

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim() || !name.trim() || !email.trim()) return

    const newCommentObj = {
      id: comments.length + 1,
      name: name,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: newComment,
      replies: [],
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
    setName("")
    setEmail("")
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-dark-900/70" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-accent-green/20 text-accent-green px-3 py-1 rounded-full text-sm">
                {blogPost.category}
              </span>
              <div className="flex items-center text-white/50 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {blogPost.date}
              </div>
              <div className="flex items-center text-white/50 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {blogPost.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display text-white mb-6">{blogPost.title}</h1>

            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={blogPost.authorImage || "/placeholder.svg"}
                  alt={blogPost.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium">{blogPost.author}</p>
                <p className="text-white/50 text-sm">{blogPost.authorRole}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Social Sharing Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex flex-col items-center space-y-6">
                <button
                  onClick={handleLike}
                  className={`p-3 rounded-full transition-colors ${
                    liked ? "bg-accent-green text-dark-900" : "bg-dark-800 text-white/70 hover:text-white"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={liked ? "#000" : "none"} />
                  <span className="block text-xs mt-1">{likeCount}</span>
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-3 rounded-full transition-colors ${
                    bookmarked ? "bg-accent-green text-dark-900" : "bg-dark-800 text-white/70 hover:text-white"
                  }`}
                >
                  <Bookmark className="w-5 h-5" fill={bookmarked ? "#000" : "none"} />
                </button>

                <button className="p-3 rounded-full bg-dark-800 text-white/70 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>

                <button className="p-3 rounded-full bg-dark-800 text-white/70 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="block text-xs mt-1">{comments.length}</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg prose-invert max-w-none"
              >
                {blogPost.content.map((block, index) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={index} className="text-white/80 mb-6">
                        {block.text}
                      </p>
                    )
                  } else if (block.type === "heading") {
                    return (
                      <h2 key={index} className="text-2xl font-display text-white mt-10 mb-6">
                        {block.text}
                      </h2>
                    )
                  } else if (block.type === "image") {
                    return (
                      <figure key={index} className="my-8">
                        <div className="relative h-80 rounded-lg overflow-hidden">
                          <Image
                            src={block.url || "/placeholder.svg"}
                            alt={block.caption}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {block.caption && (
                          <figcaption className="text-center text-white/50 text-sm mt-2">{block.caption}</figcaption>
                        )}
                      </figure>
                    )
                  } else if (block.type === "list") {
                    return (
                      <ul key={index} className="list-disc pl-6 mb-6 text-white/80 space-y-2">
                        {block.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )
                  }
                  return null
                })}
              </motion.article>

              {/* Author Bio */}
              <div className="mt-12 bg-dark-800 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={blogPost.authorImage || "/placeholder.svg"}
                      alt={blogPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{blogPost.author}</h3>
                    <p className="text-white/50 text-sm mb-3">{blogPost.authorRole}</p>
                    <p className="text-white/70">
                      Elena is a master ceramicist with over 15 years of experience. She specializes in glaze chemistry
                      and teaches workshops around the country on advanced glazing techniques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-display text-white mb-6">Comments ({comments.length})</h3>

                {comments.length > 0 ? (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-dark-800 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center mr-3">
                              <User className="w-5 h-5 text-white/70" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{comment.name}</p>
                              <p className="text-white/50 text-sm">{comment.date}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-white/80 mb-4">{comment.content}</p>

                        {comment.replies.length > 0 && (
                          <div className="ml-12 mt-6 space-y-6">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="bg-dark-700 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-2">
                                      <User className="w-4 h-4 text-white/70" />
                                    </div>
                                    <div>
                                      <p className="text-white font-medium flex items-center">
                                        {reply.name}
                                        {reply.isAuthor && (
                                          <span className="ml-2 text-xs bg-accent-green/20 text-accent-green px-2 py-0.5 rounded-full">
                                            Author
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-white/50 text-xs">{reply.date}</p>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-white/80">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50">No comments yet. Be the first to share your thoughts!</p>
                )}

                {/* Comment Form */}
                <div className="mt-8 bg-dark-800 rounded-lg p-6">
                  <h4 className="text-xl text-white mb-6">Leave a Comment</h4>

                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-white mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-dark-700 border border-dark-600 text-white px-4 py-2 rounded-md focus:outline-none focus:border-accent-green"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-dark-700 border border-dark-600 text-white px-4 py-2 rounded-md focus:outline-none focus:border-accent-green"
                        />
                      </div>
                    </div> */}

                    <div>
                      <label htmlFor="comment" className="block text-white mb-2">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        rows="4"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        className="w-full bg-dark-700 border border-dark-600 text-white px-4 py-2 rounded-md focus:outline-none focus:border-accent-green"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="bg-accent-green text-dark-900 px-6 py-2 rounded-md font-medium hover:bg-accent-green/90 transition-colors flex items-center"
                    >
                      Post Comment
                      <Send className="ml-2 w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                {/* Related Posts */}
                <div className="bg-dark-800 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-6">Related Articles</h3>

                  <div className="space-y-4">
                    {blogPost.relatedPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`} className="flex items-start group">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-white group-hover:text-accent-green transition-colors text-sm">
                            {post.title}
                          </h4>
                          <span className="text-white/50 text-xs">{post.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-dark-800 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-6">Categories</h3>

                  <div className="space-y-2">
                    {["Techniques", "Inspiration", "Artisan Interviews", "Product Care", "History"].map(
                      (category, index) => (
                        <Link
                          key={index}
                          href={`/blog?category=${category.toLowerCase()}`}
                          className="block text-white/70 hover:text-accent-green transition-colors py-2"
                        >
                          {category}
                        </Link>
                      ),
                    )}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-dark-800 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-4">Newsletter</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Subscribe to get notified about new articles and ceramic tips.
                  </p>

                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-dark-700 border border-dark-600 text-white px-4 py-2 rounded-md focus:outline-none focus:border-accent-green"
                    />
                    <button className="w-full bg-accent-green text-dark-900 py-2 rounded-md font-medium hover:bg-accent-green/90 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

