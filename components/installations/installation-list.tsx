import Image from "next/image"
import { MapPin, Calendar, Star, User } from "lucide-react"

// Installation data (would be fetched from legacy site in production)
const installations = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=800",
    name: "Commercial Rooftop Solar Installation",
    location: "Kolkata, West Bengal",
    date: "March 2023",
    capacity: "50 kW",
    description:
      "A 50 kW grid-tied solar system installed on the rooftop of a commercial building. The system includes 125 high-efficiency monocrystalline solar panels and 2 string inverters.",
    feedback:
      "The installation was completed professionally and ahead of schedule. The system has been performing exceptionally well, reducing our electricity bills by over 70%.",
    client: "Rajesh Kumar",
    clientPosition: "Business Owner",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=800",
    name: "Residential Solar Power System",
    location: "Howrah, West Bengal",
    date: "January 2023",
    capacity: "10 kW",
    description:
      "A 10 kW grid-tied solar system with battery backup installed for a residential property. The system includes 25 solar panels, a hybrid inverter, and lithium-ion batteries.",
    feedback:
      "Hamshine Electronics provided excellent service from consultation to installation. The system has been reliable even during power outages, providing uninterrupted power to our home.",
    client: "Priya Sharma",
    clientPosition: "Homeowner",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=800",
    name: "Industrial Solar Plant",
    location: "Durgapur, West Bengal",
    date: "November 2022",
    capacity: "100 kW",
    description:
      "A 100 kW ground-mounted solar plant for an industrial facility. The system includes 250 solar panels, multiple string inverters, and a monitoring system for real-time performance tracking.",
    feedback:
      "The team at Hamshine Electronics demonstrated exceptional technical expertise. The solar plant has significantly reduced our operational costs and carbon footprint.",
    client: "Amit Patel",
    clientPosition: "Factory Manager",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=800",
    name: "Educational Institution Solar System",
    location: "Siliguri, West Bengal",
    date: "September 2022",
    capacity: "25 kW",
    description:
      "A 25 kW solar system installed for a school to reduce electricity costs and provide a learning opportunity for students about renewable energy.",
    feedback:
      "Not only has the solar system reduced our electricity bills, but it has also become an educational tool for our students to learn about sustainable energy solutions.",
    client: "Dr. Sanjay Gupta",
    clientPosition: "School Principal",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=600&width=800",
    name: "Government Building Solar Installation",
    location: "Asansol, West Bengal",
    date: "July 2022",
    capacity: "75 kW",
    description:
      "A 75 kW rooftop solar system installed on a government building. The system includes 188 solar panels and multiple inverters with remote monitoring capabilities.",
    feedback:
      "The installation was completed efficiently with minimal disruption to daily operations. The system has been performing as expected, contributing to our renewable energy goals.",
    client: "Sunil Mehta",
    clientPosition: "Government Official",
  },
]

export default function InstallationList() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="space-y-16">
          {installations.map((installation) => (
            <div key={installation.id} className="card overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Installation Image */}
                <div className="relative h-56 sm:h-64 md:h-auto">
                  <Image
                    src={installation.image || "/placeholder.svg"}
                    alt={installation.name}
                    fill
                    className="object-cover md:rounded-l-2xl"
                  />
                </div>

                {/* Installation Details */}
                <div className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">{installation.name}</h2>

                  <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-blue-600" />
                      {installation.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2 text-blue-600" />
                      {installation.date}
                    </div>
                    <div className="text-sm font-medium bg-blue-50 text-blue-700 py-1 px-3 rounded-full">
                      {installation.capacity}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{installation.description}</p>

                  {/* Client Feedback */}
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-3">"{installation.feedback}"</p>
                    <div className="flex items-center text-sm">
                      <User size={14} className="mr-2 text-blue-600" />
                      <span className="font-medium">{installation.client}</span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-600">{installation.clientPosition}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

