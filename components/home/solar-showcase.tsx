import Image from "next/image"
import { Play } from "lucide-react"
import Link from "next/link"

export default function SolarShowcase() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="section-title">Solar Energy in Action</h2>
        <p className="section-subtitle">
          Explore how our solar solutions are transforming homes and businesses across India
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Main Video */}
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Solar Panel Installation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-bold text-lg">Solar Installation Process</h3>
              <p className="text-white/80 text-sm">Watch how we install solar panels for maximum efficiency</p>
            </div>
          </div>

          {/* Grid of Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Residential Solar Installation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-medium text-sm">Residential Solutions</h4>
              </div>
            </div>

            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559302995-f1d7e5c0ec51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Commercial Solar Installation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-medium text-sm">Commercial Projects</h4>
              </div>
            </div>

            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1592833167665-45638da9b920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Solar Panel Closeup"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-medium text-sm">Panel Technology</h4>
              </div>
            </div>

            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Solar Energy Storage"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-medium text-sm">Energy Storage</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/gallery" className="btn-secondary">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}

