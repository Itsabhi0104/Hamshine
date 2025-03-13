import Image from "next/image"
import { Award } from "lucide-react"

// Certification data (would be fetched from legacy site in production)
const certifications = [
  {
    id: 1,
    name: "ISO 9001:2015",
    image: "/placeholder.svg?height=120&width=120",
    description:
      "Quality Management System certification, ensuring our processes meet international standards for quality and customer satisfaction.",
  },
  {
    id: 2,
    name: "MNRE Approved",
    image: "/placeholder.svg?height=120&width=120",
    description:
      "Approved by the Ministry of New and Renewable Energy, Government of India, for solar system installation and integration.",
  },
  {
    id: 3,
    name: "BIS Certified",
    image: "/placeholder.svg?height=120&width=120",
    description: "Our products comply with Bureau of Indian Standards specifications, ensuring safety and reliability.",
  },
  {
    id: 4,
    name: "IEC Certified",
    image: "/placeholder.svg?height=120&width=120",
    description:
      "Our solar panels and components meet International Electrotechnical Commission standards for performance and durability.",
  },
]

export default function Certifications() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Certifications</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We adhere to the highest industry standards and have received various certifications that reflect our
            commitment to quality and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={certification.image || "/placeholder.svg"}
                    alt={certification.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3">{certification.name}</h3>
              <p className="text-gray-600 text-sm">{certification.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

