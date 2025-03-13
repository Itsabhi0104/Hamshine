"use client"

import { Phone, MessageCircle } from "lucide-react"

export default function InstallationCta() {
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
    <section className="section-padding bg-blue-600 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for your solar installation?</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
          Join our growing list of satisfied customers and start your journey towards energy independence and
          sustainability.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={handlePhoneClick} className="btn-secondary bg-white text-blue-600 hover:bg-blue-50">
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

