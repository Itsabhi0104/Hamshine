import InstallationList from "@/components/installations/installation-list"
import InstallationCta from "@/components/installations/installation-cta"

export default function InstallationsPage() {
  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="mb-4">Our Installations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful solar installations across residential, commercial, and industrial
            sectors
          </p>
        </div>
      </section>

      {/* Installation List */}
      <InstallationList />

      {/* Call to Action */}
      <InstallationCta />
    </>
  )
}

