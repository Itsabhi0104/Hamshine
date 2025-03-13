"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import QuoteForm from "@/components/quote-form"
import ProductSearch from "@/components/products/product-search"

// Product data (would be fetched from reference sites in production)
const allProducts = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=400",
    name: "Monocrystalline Solar Panels",
    description: "High-efficiency monocrystalline solar panels with advanced cell technology for maximum power output.",
    features: [
      "Efficiency: 20-22%",
      "Power Output: 330W-450W",
      "Warranty: 25 years performance, 10 years product",
      "Temperature Coefficient: -0.35%/°C",
      "Cell Type: Monocrystalline PERC",
    ],
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=400",
    name: "Grid-Tied Solar Inverters",
    description:
      "Advanced grid-tied inverters that convert DC electricity from solar panels into AC electricity for home use and grid export.",
    features: [
      "Efficiency: 97-98%",
      "Power Range: 1kW-10kW",
      "Warranty: 5-10 years",
      "MPPT Channels: 2-4",
      "Monitoring: Built-in WiFi/Ethernet",
    ],
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=400",
    name: "Lithium-Ion Solar Batteries",
    description:
      "High-capacity lithium-ion batteries for energy storage, allowing you to use solar power even when the sun isn't shining.",
    features: [
      "Capacity: 5kWh-15kWh",
      "Cycle Life: 6000+ cycles",
      "Warranty: 10 years",
      "DoD (Depth of Discharge): 95%",
      "Scalable: Yes, up to 45kWh",
    ],
  },
  {
    id: 4,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Water Heaters",
    description:
      "Efficient solar water heating systems that use the sun's energy to heat water for residential and commercial use.",
    features: [
      "Capacity: 100L-300L",
      "Type: Evacuated Tube Collector",
      "Warranty: 7 years",
      "Auxiliary Heating: Electric Backup",
      "Insulation: PUF Insulation",
    ],
  },
  {
    id: 5,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Charge Controllers",
    description:
      "MPPT and PWM charge controllers that regulate the voltage and current coming from solar panels to safely charge batteries.",
    features: [
      "Type: MPPT/PWM",
      "Current Rating: 10A-60A",
      "Voltage: 12V/24V/48V Auto Detect",
      "Efficiency: Up to 99%",
      "Display: LCD with system parameters",
    ],
  },
  {
    id: 6,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Water Pumps",
    description:
      "Energy-efficient solar water pumps for irrigation, drinking water, and other applications in areas with limited or no grid access.",
    features: [
      "Power: 1HP-10HP",
      "Max Head: Up to 100m",
      "Flow Rate: Up to 300 LPM",
      "Type: Submersible/Surface",
      "Controller: Built-in MPPT",
    ],
  },
  {
    id: 7,
    image: "/placeholder.svg?height=400&width=400",
    name: "Polycrystalline Solar Panels",
    description:
      "Cost-effective polycrystalline solar panels with good efficiency and performance for larger installations where space is not a constraint.",
    features: [
      "Efficiency: 16-18%",
      "Power Output: 280W-330W",
      "Warranty: 25 years performance, 10 years product",
      "Temperature Coefficient: -0.40%/°C",
      "Cell Type: Polycrystalline Silicon",
    ],
  },
  {
    id: 8,
    image: "/placeholder.svg?height=400&width=400",
    name: "Hybrid Solar Inverters",
    description:
      "Versatile hybrid inverters that can work with both the grid and batteries, providing backup power during outages and optimizing solar energy usage.",
    features: [
      "Power Range: 3kW-10kW",
      "Battery Compatibility: 48V Lithium/Lead-Acid",
      "Efficiency: 96-98%",
      "MPPT Channels: 2-3",
      "Backup Power: Yes, with seamless transfer",
    ],
  },
  {
    id: 9,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Panel Mounting Structures",
    description:
      "Durable and easy-to-install mounting structures for rooftop and ground-mounted solar panel installations, designed to withstand harsh weather conditions.",
    features: [
      "Material: Anodized Aluminum/Hot-Dipped Galvanized Steel",
      "Wind Load Capacity: Up to 180 km/h",
      "Snow Load Capacity: Up to 2.5 kN/m²",
      "Tilt Angle: Adjustable 10-30° (roof) / 15-45° (ground)",
      "Warranty: 15 years structural",
    ],
  },
  {
    id: 10,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Street Lights",
    description:
      "Standalone solar-powered street lights with integrated panels, batteries, and efficient LED luminaires for roads, pathways, and public spaces.",
    features: [
      "LED Power: 15W-120W",
      "Solar Panel: 50W-300W",
      "Battery: LiFePO4, 12V/24V, 30Ah-200Ah",
      "Lighting Time: Up to 14 hours/night",
      "Pole Height: 3m-9m",
    ],
  },
  {
    id: 11,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar DC Refrigerators",
    description:
      "Energy-efficient DC refrigerators and freezers powered directly by solar panels, ideal for off-grid homes, medical facilities, and remote locations.",
    features: [
      "Capacity: 50L-300L",
      "Power Consumption: 0.3-1.2 kWh/day",
      "Voltage: 12V/24V DC",
      "Temperature Range: 2°C to 8°C (refrigerator) / -18°C to -25°C (freezer)",
      "Insulation: High-density PU foam, 60-100mm",
    ],
  },
  {
    id: 12,
    image: "/placeholder.svg?height=400&width=400",
    name: "Solar Home Lighting Systems",
    description:
      "Complete solar home lighting kits with panels, battery, controller, and LED lights for homes and small businesses without reliable grid access.",
    features: [
      "Solar Panel: 20W-200W",
      "Battery: 12V, 7Ah-100Ah (Lead-Acid or Lithium)",
      "LED Lights: 3-10 points, 3W-9W each",
      "Runtime: 4-12 hours per day",
      "Additional Features: Mobile charging, DC fan support",
    ],
  },
]

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [products, setProducts] = useState(allProducts)

  const handleRequestQuote = (productId) => {
    setSelectedProduct(productId)
    setShowQuoteForm(true)
  }

  // Filter products based on search query
  const filterProducts = useCallback((query) => {
    if (!query) {
      setProducts(allProducts)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery),
    )

    setProducts(filtered)
  }, [])

  return (
    <>
      {/* Search Component */}
      <ProductSearch onSearch={filterProducts} />

      {/* Product List */}
      <section className="section-padding">
        <div className="container-custom">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No products found matching your search criteria.</h3>
              <p className="mt-2 text-gray-500">Try a different search term or browse all our products.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {products.map((product) => (
                <div key={product.id} className="card overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                    {/* Product Image */}
                    <div className="relative h-56 sm:h-64 md:h-auto">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover md:rounded-l-2xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-6 md:col-span-2">
                      <h2 className="text-xl md:text-2xl font-bold mb-4">{product.name}</h2>
                      <p className="text-gray-600 mb-6">{product.description}</p>

                      <h3 className="font-semibold text-lg mb-3">Key Features:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button onClick={() => handleRequestQuote(product.id)} className="btn-primary">
                        <MessageCircle size={18} className="mr-2" />
                        Request a Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quote Form Modal */}
          {showQuoteForm && <QuoteForm productId={selectedProduct} onClose={() => setShowQuoteForm(false)} />}
        </div>
      </section>
    </>
  )
}

