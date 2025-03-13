"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Carousel data (would be fetched from legacy site in production)
const carouselItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=800&width=1600",
    title: "Solar Energy Solutions",
    description: "Providing high-quality solar products and installations across West Bengal",
    ctaText: "Explore Solutions",
    ctaLink: "/products",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=800&width=1600",
    title: "Reliable Solar Installations",
    description: "Professional installations with guaranteed performance and longevity",
    ctaText: "View Installations",
    ctaLink: "/installations",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=800&width=1600",
    title: "Energy Independence",
    description: "Take control of your energy needs with customized solar systems",
    ctaText: "Get a Quote",
    ctaLink: "/contact",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[500px] h-[80vh] md:h-screen w-full overflow-hidden">
      {/* Carousel Items */}
      <AnimatePresence mode="wait">
        {carouselItems.map(
          (item, index) =>
            index === currentSlide && (
              <motion.div
                key={item.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container-custom">
                    <motion.div
                      className="max-w-3xl text-white px-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.7 }}
                    >
                      <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold">{item.title}</h1>
                      <p className="mb-8 text-lg md:text-xl lg:text-2xl">{item.description}</p>
                      <motion.a
                        href={item.ctaLink}
                        className="btn-primary text-base md:text-lg px-6 md:px-8 py-2 md:py-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.ctaText}
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={24} />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            animate={index === currentSlide ? { scale: 1.2 } : { scale: 1 }}
          />
        ))}
      </div>
    </section>
  )
}

