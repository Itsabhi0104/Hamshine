"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

// This component now communicates with the parent component to filter products
export default function ProductSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Debounce search to avoid too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, onSearch])

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <section className="py-8 bg-white border-b">
      <div className="container-custom">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for solar products..."
            className="w-full py-3 px-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
            <Search size={20} />
          </button>
        </form>
      </div>
    </section>
  )
}

