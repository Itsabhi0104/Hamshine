import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"

// Product data (would be fetched from reference sites in production)
const products = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Panels",
    description: "High-efficiency monocrystalline and polycrystalline solar panels for residential and commercial use.",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Inverters",
    description: "Grid-tied, off-grid, and hybrid inverters to convert DC power from solar panels to usable AC power.",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Batteries",
    description: "Energy storage solutions to store excess solar power for use during nighttime or power outages.",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Water Heaters",
    description: "Efficient solar water heating systems for residential and commercial applications.",
  },
]

export default function ProductsPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title">Products</h2>
        <p className="section-subtitle">
          Discover our range of high-quality solar products designed for efficiency and durability
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="block h-full">
              <div className="card h-full hover:translate-y-[-5px]">
                <div className="relative h-48 w-full">
                  <OptimizedImage
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="rounded-t-2xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 line-clamp-2">{product.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/products" className="btn-primary">
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}

