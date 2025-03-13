"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Menu, X } from "lucide-react"
import useResponsive from "@/hooks/use-responsive"
import { motion } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isMobile } = useResponsive()

  // Company contact info
  const phoneNumber = "+91 9830052742"
  const location = "Kolkata, West Bengal"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-16 w-64">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-03-12_232050-removebg-preview-5vSmP90mAdiWt3q3VrlvThyyjbW6qj.png"
            alt="Hamshine Electronics & Energy Systems"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="font-medium hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link href="/products" className="font-medium hover:text-green-600 transition-colors">
            Products
          </Link>
          <Link href="/installations" className="font-medium hover:text-green-600 transition-colors">
            Installations
          </Link>
          <Link href="/about" className="font-medium hover:text-green-600 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="font-medium hover:text-green-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Contact Info */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center text-sm">
            <Phone size={16} className="mr-2 text-green-600" />
            <a href={`tel:${phoneNumber}`} className="hover:text-green-600 transition-colors">
              {phoneNumber}
            </a>
          </div>
          <div className="flex items-center text-sm">
            <MapPin size={16} className="mr-2 text-green-600" />
            <span>{location}</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="lg:hidden bg-white absolute top-full left-0 w-full shadow-md py-4 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom flex flex-col space-y-3">
            <Link
              href="/"
              className="font-medium py-3 px-2 hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="font-medium py-3 px-2 hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/installations"
              className="font-medium py-3 px-2 hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Installations
            </Link>
            <Link
              href="/about"
              className="font-medium py-3 px-2 hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="font-medium py-3 px-2 hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center py-2">
                <Phone size={16} className="mr-2 text-green-600" />
                <a href={`tel:${phoneNumber}`} className="text-sm hover:text-green-600 transition-colors">
                  {phoneNumber}
                </a>
              </div>
              <div className="flex items-center py-2">
                <MapPin size={16} className="mr-2 text-green-600" />
                <span className="text-sm">{location}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

