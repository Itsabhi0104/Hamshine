import { Target, Sun } from "lucide-react"

export default function MissionVision() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To accelerate India's transition to sustainable energy by providing high-quality, innovative solar
              solutions that are accessible, reliable, and tailored to meet the diverse needs of our customers.
            </p>
            <p className="text-gray-600">
              We are committed to delivering exceptional service, fostering long-term relationships with our clients,
              and contributing to a cleaner, greener future for generations to come.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Sun className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-4">
              To be a leading solar energy solutions provider in Eastern India, recognized for our technical expertise,
              innovation, and unwavering commitment to customer satisfaction.
            </p>
            <p className="text-gray-600">
              We envision a future where solar energy is the primary source of power for homes, businesses, and
              industries, contributing to a sustainable environment and energy independence for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

