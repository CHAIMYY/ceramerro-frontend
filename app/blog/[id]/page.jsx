"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Calendar, Clock, User, ArrowLeft, MessageSquare, Share2, Bookmark, Heart, Send, Trash } from "lucide-react"

export default function BlogPostPage({ params }) {
  const [blogPost, setBlogPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:3001/api/blog/post/${params.id}`)
        setBlogPost(response.data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching blog post:", err)
        setError("Failed to load blog post")
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchBlogPost()
    }
  }, [params.id])

  // Fetch comments for the blog post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/comment/comments/${params.id}`)
        setComments(response.data.comments || [])
      } catch (err) {
        console.error("Error fetching comments:", err)
        setError("Failed to load comments")
      }
    }

    if (params.id) {
      fetchComments()
    }
  }, [params.id])

  // Handle submitting a new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    try {
      const response = await axios.post(
        `http://localhost:3001/api/comment/create/${blogPost._id}`,
        { text: newComment },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      // Update state with the new comment (including populated `postedBy`)
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      if (err.response) {
        console.error("Server responded with an error:", err.response.data);
        alert(`Failed to post comment: ${err.response.data.message}`);
      } else {
        console.error("Network or other error:", err.message);
        alert("Failed to post comment. Please check your connection.");
      }
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/comment/delete/${commentId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      // Remove the deleted comment from the state
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      if (err.response && err.response.status === 403) {
        alert("You are not authorized to delete this comment.");
      } else if (err.response && err.response.status === 404) {
        alert("Comment not found.");
      } else {
        alert("Failed to delete comment.");
      }
    }
  };

  // Handle liking the post
  const handleLike = () => {
    setLiked(!liked)
    if (blogPost) {
      setBlogPost({
        ...blogPost,
        likes: liked ? blogPost.likes - 1 : blogPost.likes + 1
      })
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (isLoading) return <div className="min-h-screen bg-dark-900 pt-24 flex items-center justify-center"><p className="text-white">Loading...</p></div>
  if (error) return <div className="min-h-screen bg-dark-900 pt-24 flex items-center justify-center"><p className="text-white">Error: {error}</p></div>
  if (!blogPost) return <div className="min-h-screen bg-dark-900 pt-24 flex items-center justify-center"><p className="text-white">Blog post not found</p></div>

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src={blogPost.postPicture || "/placeholder.svg"} 
            alt={blogPost.titre} 
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
              <div className="flex items-center text-white/50 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(blogPost.datePublication)}
              </div>
              <div className="flex items-center text-white/50 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {Math.ceil(blogPost.contenu.length / 500)} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display text-white mb-6">{blogPost.titre}</h1>

            <div className="flex items-center">
                   <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center mr-3 overflow-hidden">
                      <img 
                        src={blogPost.creator.image || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1742215231~exp=1742218831~hmac=f3227a035260b10998b47bbb7f2fb916bada8fa097f5d2a0f586854f94be0bda&w=826"}  
                        alt="User Avatar" 
                        className="w-full h-full object-cover"
                      />
                </div>
                <div>

                <p className="text-white font-medium">{blogPost.creator.firstname}</p>
                <p className="text-white/50 text-sm">{formatDate(blogPost.createdAt)}</p>
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
                  <span className="block text-xs mt-1">{blogPost.likes}</span>
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
                <div className="text-white/80 mb-6">
                  {blogPost.contenu}
                </div>
              </motion.article>

              {/* Comments Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-display text-white mb-6">Comments ({comments.length})</h3>

                {comments.length > 0 ? (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment._id} className="bg-dark-800 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center mr-3 overflow-hidden">
                                 <img 
                                        src={comment.postedBy?.image || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1742215231~exp=1742218831~hmac=f3227a035260b10998b47bbb7f2fb916bada8fa097f5d2a0f586854f94be0bda&w=826"}  
                                        alt="User Avatar" 
                                        className="w-full h-full object-cover"
                                      />
                         </div>
                            <div>
                              <p className="text-white font-medium">
                                {comment.postedBy?.firstname || "Unknown User"} 
                              </p>
                              <p className="text-white/50 text-sm">
                                {formatDate(comment.createdAt)} 
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-white/50 hover:text-red-500 transition-colors"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-white/80 mb-4">{comment.text}</p>
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
                {/* Blog Info */}
                <div className="bg-dark-800 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-6">Blog Info</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/50 text-sm">Published on</p>
                      <p className="text-white">{formatDate(blogPost.datePublication)}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">Last updated</p>
                      <p className="text-white">{formatDate(blogPost.updatedAt)}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">Likes</p>
                      <p className="text-white">{blogPost.likes}</p>
                    </div>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-dark-800 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-4">Newsletter</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Subscribe to get notified about new articles and updates.
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