import ProductList from "@/components/products/product-list"
import CustomSolution from "@/components/products/custom-solution"

export default function ProductsPage() {
  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="mb-4">Our Solar Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality solar products designed to meet your energy needs
          </p>
        </div>
      </section>

      {/* Product List with Search */}
      <ProductList />

      {/* Custom Solution Section */}
      <CustomSolution />
    </>
  )
}

