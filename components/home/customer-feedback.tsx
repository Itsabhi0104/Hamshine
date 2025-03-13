import Image from "next/image"
import { Star } from "lucide-react"

// Feedback data (would be fetched from legacy site in production)
const feedbacks = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Business Owner",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    comment:
      "Hamshine Electronics provided an excellent solar solution for my factory. The installation was professional and completed on time. The system has been running flawlessly for over a year now, significantly reducing our electricity bills.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Homeowner",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    comment:
      "We installed a 5kW solar system for our home through Hamshine Electronics. Their team was knowledgeable and helped us choose the right system for our needs. The installation was neat and the after-sales service has been great.",
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "School Principal",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
    comment:
      "Our school decided to go solar to reduce our carbon footprint and electricity costs. Hamshine Electronics designed and installed a 25kW system that has been performing exceptionally well. The students also get to learn about renewable energy firsthand.",
  },
]

export default function CustomerFeedback() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Hear from our satisfied customers about their experience with Hamshine Electronics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="card p-6 md:p-8">
              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 mb-8">"{feedback.comment}"</p>

              {/* Customer */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src={feedback.image || "/placeholder.svg"} alt={feedback.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">{feedback.name}</h4>
                  <p className="text-sm text-gray-600">{feedback.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

