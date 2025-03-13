import Image from "next/image"

export default function OurStory() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6">OUR STORY</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Hamshine Electronics & Energy Systems is a leading provider of solar energy solutions in West Bengal. We
                specialize in the design, supply, installation, and maintenance of solar power systems for residential,
                commercial, and industrial applications.
              </p>
              <p>
                Founded with a vision to promote clean and renewable energy, we have been serving customers across West
                Bengal with high-quality solar products and exceptional service. Our team of experienced professionals
                is dedicated to helping you harness the power of the sun to meet your energy needs.
              </p>
              <p>
                We take pride in our commitment to quality, innovation, and customer satisfaction. Our solar solutions
                are designed to maximize energy efficiency, reduce electricity bills, and contribute to a greener
                environment.
              </p>
              <p>
                At Hamshine Electronics, we believe in building long-term relationships with our customers by providing
                reliable products, professional installation, and prompt after-sales service. We are your trusted
                partner in the journey towards energy independence and sustainability.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Hamshine Electronics Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

