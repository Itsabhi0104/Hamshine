import { Award, Clock, Users, Package } from "lucide-react"

export default function WhyChooseUs() {
  // Stats (would be fetched from legacy site in production)
  const stats = [
    {
      id: 1,
      icon: <Clock className="h-8 w-8 text-green-600" />,
      value: "10+",
      label: "Years Experience",
    },
    {
      id: 2,
      icon: <Users className="h-8 w-8 text-green-600" />,
      value: "500+",
      label: "Happy Customers",
    },
    {
      id: 3,
      icon: <Award className="h-8 w-8 text-green-600" />,
      value: "300+",
      label: "Installations",
    },
    {
      id: 4,
      icon: <Package className="h-8 w-8 text-green-600" />,
      value: "30+",
      label: "Solar Products",
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title">Why Choose Hamshine Electronics?</h2>
        <p className="section-subtitle">
          With over 15 years of experience, we deliver high-quality solar solutions tailored to your specific needs.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Experience</h3>
            <p className="text-gray-600">
              With over 10 years in the solar industry, our team brings unmatched expertise to every project, ensuring
              optimal results.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Quality</h3>
            <p className="text-gray-600">
              We partner with leading manufacturers to provide only the highest quality solar products with
              industry-leading warranties.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Customization</h3>
            <p className="text-gray-600">
              We understand that every client has unique energy needs, which is why we offer customized solar solutions
              tailored to your specific requirements.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

