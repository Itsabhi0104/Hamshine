"use client"

import type React from "react"

import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface ContactItemProps {
  icon: React.ReactNode
  title: string
  content: string
  color: string
  link?: string
  isExternal?: boolean
}

const ContactItem = ({ icon, title, content, color, link, isExternal }: ContactItemProps) => {
  const itemContent = (
    <div className="flex items-start p-4 rounded-lg transition-all duration-300 hover:bg-gray-50">
      <div className={`${color} p-3 rounded-lg mr-4 flex-shrink-0`}>{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  )

  if (!link) {
    return itemContent
  }

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {itemContent}
      </a>
    )
  }

  return (
    <Link href={link} className="block">
      {itemContent}
    </Link>
  )
}

export default function ContactInfo() {
  // Updated company contact information from the website
  const contactInfo = {
    address: "P-5, CIT Road, Scheme-VII(M), Kankurgachi, Kolkata - 700054",
    phone: "+91 9830052742",
    email: "info@hamshineelectronics.co.in",
    hours: "Monday - Saturday: 10:00 AM - 7:00 PM",
  }

  const contactItems = [
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Address",
      content: contactInfo.address,
      color: "bg-green-600",
      link: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
      isExternal: true,
    },
    {
      icon: <Phone className="h-6 w-6 text-white" />,
      title: "Phone",
      content: contactInfo.phone,
      color: "bg-orange-500",
      link: `tel:${contactInfo.phone.replace(/\s+/g, "")}`,
      isExternal: true,
    },
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email",
      content: contactInfo.email,
      color: "bg-green-600",
      link: `mailto:${contactInfo.email}`,
      isExternal: true,
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Business Hours",
      content: contactInfo.hours,
      color: "bg-orange-500",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="max-w-md mx-auto overflow-hidden">
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Contact Information</h2>

          <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
            {contactItems.map((item, index) => (
              <motion.div key={index} variants={item}>
                <ContactItem {...item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

