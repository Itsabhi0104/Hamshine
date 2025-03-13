import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  // Updated company info from the website
  const companyInfo = {
    name: "Hamshine Electronics & Energy Systems",
    address: "P-5, CIT Road, Scheme-VII(M), Kankurgachi, Kolkata - 700054",
    phone: "+91 9830052742",
    email: "info@hamshineelectronics.co.in",
    socialLinks: {
      facebook: "https://www.facebook.com/hamshineelectronics",
      instagram: "https://www.instagram.com/hamshineelectronics",
      linkedin: "https://www.linkedin.com/company/hamshineelectronics",
    },
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6 relative h-16 w-64">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-03-12_232050-removebg-preview-5vSmP90mAdiWt3q3VrlvThyyjbW6qj.png"
                alt="Hamshine Electronics Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6">
              Leading provider of solar energy solutions with years of experience in delivering high-quality solar
              products and installations across West Bengal.
            </p>
            <div className="flex space-x-4">
              <a href={companyInfo.socialLinks.facebook} className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <Link href="/email" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </Link>
              <a href={companyInfo.socialLinks.instagram} className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href={companyInfo.socialLinks.linkedin} className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/installations" className="text-gray-400 hover:text-white transition-colors">
                  Installations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{companyInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-green-400 flex-shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="text-gray-400 hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-green-400 flex-shrink-0" />
                <Link href="/email" className="text-gray-400 hover:text-white transition-colors">
                  {companyInfo.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

