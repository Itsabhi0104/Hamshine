"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react"

// Installation data (would be fetched from legacy site in production)
const installations = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=800",
    name: "Commercial Rooftop Solar Installation",
    location: "Kolkata, West Bengal",
    date: "March 2023",
    capacity: "50 kW",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=800",
    name: "Residential Solar Power System",
    location: "Howrah, West Bengal",
    date: "January 2023",
    capacity: "10 kW",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=800",
    name: "Industrial Solar Plant",
    location: "Durgapur, West Bengal",
    date: "November 2022",
    capacity: "100 kW",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=800",
    name: "Educational Institution Solar System",
    location: "Siliguri, West Bengal",
    date: "September 2022",
    capacity: "25 kW",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=600&width=800",
    name: "Government Building Solar Installation",
    location: "Asansol, West Bengal",
    date: "July 2022",
    capacity: "75 kW",
  },
]

export default function InstallationPreview() {
  const scrollContainerRef = useRef(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-scroll functionality
  useEffect(() => {
    let interval

    if (isAutoScrolling && scrollContainerRef.current) {
      interval = setInterval(() => {
        if (currentIndex < installations.length - 1) {
          scrollToIndex(currentIndex + 1)
        } else {
          scrollToIndex(0)
        }
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoScrolling, currentIndex])

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector(".installation-card").offsetWidth
      const scrollPosition = index * (cardWidth + 24) // 24px is the gap

      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })

      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    } else {
      scrollToIndex(installations.length - 1)
    }
  }

  const scrollRight = () => {
    if (currentIndex < installations.length - 1) {
      scrollToIndex(currentIndex + 1)
    } else {
      scrollToIndex(0)
    }
  }

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false)
  const handleMouseLeave = () => setIsAutoScrolling(true)

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="section-title">Installations</h2>
        <p className="section-subtitle">Explore our recent solar installations across various sectors and locations</p>

        <div className="relative mt-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {installations.map((installation, index) => (
              <div
                key={installation.id}
                className="installation-card min-w-[280px] sm:min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-start"
              >
                <div
                  className={`card h-full transition-all duration-300 ${
                    currentIndex === index ? "transform scale-105 shadow-lg" : "hover:translate-y-[-5px]"
                  }`}
                >
                  <div className="grid md:grid-cols-2 h-full">
                    {/* Image */}
                    <div className="relative h-40 sm:h-48 md:h-full">
                      <Image
                        src={installation.image || "/placeholder.svg"}
                        alt={installation.name}
                        fill
                        className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{installation.name}</h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                        <MapPin size={14} className="mr-1 sm:mr-2 text-blue-600" />
                        {installation.location}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        <Calendar size={14} className="mr-1 sm:mr-2 text-blue-600" />
                        {installation.date}
                      </div>
                      <div className="text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 py-1 px-2 sm:px-3 rounded-full inline-block">
                        {installation.capacity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {installations.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/installations" className="btn-primary">
            View All Installations
          </a>
        </div>
      </div>
    </section>
  )
}

