"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Calendar, User, ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

// Sample blog data (in a real implementation, this would be fetched from an API)
const initialBlogs = [
  {
    id: 1,
    title: "The Future of Solar Energy in India",
    excerpt: "India's solar energy capacity has grown significantly in recent years, but what does the future hold?",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 15, 2023",
    author: "Rajiv Sharma",
    category: "Industry Trends",
    tags: ["solar energy", "renewable energy", "india", "future trends"],
  },
  {
    id: 2,
    title: "How to Maintain Your Solar Panels for Maximum Efficiency",
    excerpt: "Regular maintenance of your solar panels is essential to ensure they operate at peak efficiency.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 22, 2023",
    author: "Priya Patel",
    category: "Maintenance",
    tags: ["solar panels", "maintenance", "efficiency", "cleaning"],
  },
  {
    id: 3,
    title: "Benefits of Solar Energy for Businesses",
    excerpt:
      "Businesses can significantly reduce their operating costs and carbon footprint by switching to solar energy.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 10, 2023",
    author: "Amit Kumar",
    category: "Business",
    tags: ["business", "commercial solar", "cost savings", "sustainability"],
  },
  {
    id: 4,
    title: "Government Incentives for Solar Energy in 2023",
    excerpt: "Learn about the latest government schemes and incentives for solar energy adoption in India.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 5, 2023",
    author: "Sunita Reddy",
    category: "Policy",
    tags: ["government", "incentives", "subsidies", "policy"],
  },
  {
    id: 5,
    title: "Solar vs. Traditional Energy: A Cost Comparison",
    excerpt: "A detailed analysis of the costs associated with solar energy compared to traditional energy sources.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 18, 2023",
    author: "Vikram Singh",
    category: "Analysis",
    tags: ["cost comparison", "traditional energy", "solar energy", "roi"],
  },
  {
    id: 6,
    title: "Innovations in Solar Panel Technology",
    excerpt:
      "Explore the latest innovations in solar panel technology that are making solar energy more efficient and affordable.",
    image: "/placeholder.svg?height=400&width=600",
    date: "January 30, 2023",
    author: "Neha Gupta",
    category: "Technology",
    tags: ["innovation", "technology", "efficiency", "research"],
  },
]

export default function BlogPage() {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  // Extract unique categories from blogs
  useEffect(() => {
    const uniqueCategories = [...new Set(initialBlogs.map((blog) => blog.category))]
    setCategories(uniqueCategories)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()

    setIsSearching(true)

    // Simulate searching the internet for relevant content
    setTimeout(() => {
      if (searchQuery) {
        const filtered = initialBlogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        setBlogs(filtered)
      } else {
        setBlogs(initialBlogs)
      }
      setIsSearching(false)
    }, 1000)
  }

  // Filter by category
  const filterByCategory = (category) => {
    setSelectedCategory(category)

    if (category) {
      const filtered = initialBlogs.filter((blog) => blog.category === category)
      setBlogs(filtered)
    } else {
      setBlogs(initialBlogs)
    }
  }

  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="mb-4">Solar Energy Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, trends, and insights about solar energy and sustainable power solutions
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <form onSubmit={handleSearch} className="relative max-w-md w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for solar topics..."
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                disabled={isSearching}
              >
                {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => filterByCategory("")}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => filterByCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={48} className="animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Searching for relevant solar content...</p>
            </div>
          ) : blogs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="card overflow-hidden h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48">
                    <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={14} className="mr-1" />
                      <span className="mr-3">{blog.date}</span>
                      <User size={14} className="mr-1" />
                      <span>{blog.author}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3">{blog.title}</h2>
                    <p className="text-gray-600 mb-4 flex-grow">{blog.excerpt}</p>
                    <Link
                      href={`/blog/${blog.id}`}
                      className="text-blue-600 font-medium inline-flex items-center hover:underline mt-auto group"
                    >
                      Read More
                      <ArrowRight
                        size={16}
                        className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No blog posts found</h3>
              <p className="text-gray-500">Try a different search term or browse all our blog posts</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("")
                  setBlogs(initialBlogs)
                }}
                className="mt-4 btn-primary"
              >
                View All Posts
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

