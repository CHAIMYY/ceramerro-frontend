"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    // Show success message
    alert("Message sent successfully!")
  }

  return (
    <div className="pt-24 bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-accent-green text-sm tracking-wider">GET IN TOUCH</span>
            <h1 className="text-5xl font-display text-white mt-2 mb-6">Contact Us</h1>
            <p className="text-white/70 text-lg">
              Have questions about our products or interested in collaborating? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-display text-white mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-dark-800 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Our Location</h3>
                    <p className="text-white/70">123 Ceramic Lane, Design District</p>
                    <p className="text-white/70">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-dark-800 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Phone Number</h3>
                    <p className="text-white/70">+1 (555) 123-4567</p>
                    <p className="text-white/70">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-dark-800 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Email Address</h3>
                    <p className="text-white/70">info@ceramicstudio.com</p>
                    <p className="text-white/70">sales@ceramicstudio.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-dark-800 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Working Hours</h3>
                    <p className="text-white/70">Monday - Friday: 9am - 5pm</p>
                    <p className="text-white/70">Saturday: 10am - 4pm</p>
                    <p className="text-white/70">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-white font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-dark-800 p-3 rounded-full text-white/70 hover:text-accent-green transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-dark-800 p-3 rounded-full text-white/70 hover:text-accent-green transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-dark-800 p-3 rounded-full text-white/70 hover:text-accent-green transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-display text-white mb-8">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 rounded-md focus:outline-none focus:border-accent-green"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 rounded-md focus:outline-none focus:border-accent-green"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 rounded-md focus:outline-none focus:border-accent-green"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 rounded-md focus:outline-none focus:border-accent-green"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-accent-green text-dark-900 px-6 py-3 rounded-md font-medium hover:bg-accent-green/90 transition-colors flex items-center"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

    
    </div>
  )
}

