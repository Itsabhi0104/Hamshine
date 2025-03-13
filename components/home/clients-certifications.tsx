import Image from "next/image"
import { Award, Shield, CheckCircle } from "lucide-react"

// Client data (would be fetched from legacy site in production)
const clients = [
  { id: 1, name: "Client 1", logo: "/placeholder.svg?height=80&width=160" },
  { id: 2, name: "Client 2", logo: "/placeholder.svg?height=80&width=160" },
  { id: 3, name: "Client 3", logo: "/placeholder.svg?height=80&width=160" },
  { id: 4, name: "Client 4", logo: "/placeholder.svg?height=80&width=160" },
  { id: 5, name: "Client 5", logo: "/placeholder.svg?height=80&width=160" },
  { id: 6, name: "Client 6", logo: "/placeholder.svg?height=80&width=160" },
  { id: 7, name: "Client 7", logo: "/placeholder.svg?height=80&width=160" },
  { id: 8, name: "Client 8", logo: "/placeholder.svg?height=80&width=160" },
]

// Certification data (would be fetched from legacy site in production)
const certifications = [
  {
    id: 1,
    name: "ISO 9001:2015",
    logo: "/placeholder.svg?height=120&width=120",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    description: "Quality Management System",
  },
  {
    id: 2,
    name: "MNRE Approved",
    logo: "/placeholder.svg?height=120&width=120",
    icon: <Award className="h-6 w-6 text-green-600" />,
    description: "Ministry of New and Renewable Energy",
  },
  {
    id: 3,
    name: "BIS Certified",
    logo: "/placeholder.svg?height=120&width=120",
    icon: <CheckCircle className="h-6 w-6 text-orange-600" />,
    description: "Bureau of Indian Standards",
  },
  {
    id: 4,
    name: "IEC Certified",
    logo: "/placeholder.svg?height=120&width=120",
    icon: <Shield className="h-6 w-6 text-purple-600" />,
    description: "International Electrotechnical Commission",
  },
]

export default function ClientsCertifications() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title mb-16">Our Clients & Certifications</h2>

        {/* Clients Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10">Trusted by Leading Organizations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 items-center">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex items-center justify-center h-20 md:h-24 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="object-contain max-h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-10">Industry Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-center bg-gray-50">
                  <div className="relative w-16 h-16">
                    <Image
                      src={certification.logo || "/placeholder.svg"}
                      alt={certification.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-3">{certification.icon}</div>
                  <h4 className="font-bold text-lg mb-2">{certification.name}</h4>
                  <p className="text-sm text-gray-600">{certification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

