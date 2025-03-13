"use client"

import { Phone, MessageCircle } from "lucide-react"

export default function CustomSolution() {
  // Contact info (would be fetched from legacy site in production)
  const phoneNumber = "+919876543210"
  const whatsappNumber = "+919876543210"

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank")
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4">Need a Custom Solar Solution?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          We understand that every client has unique energy requirements. Our team of experts can design a customized
          solar solution tailored to your specific needs.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={handlePhoneClick} className="btn-primary">
            <Phone size={20} className="mr-2" />
            Call for Consultation
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="btn-secondary bg-green-500 hover:bg-green-600 text-white border-green-500"
          >
            <MessageCircle size={20} className="mr-2" />
            WhatsApp Us
          </button>
        </div>
      </div>
    </section>
  )
}

