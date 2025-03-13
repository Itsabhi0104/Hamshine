import HeroCarousel from "@/components/home/hero-carousel"
import WhyChooseUs from "@/components/home/why-choose-us"
import InstallationPreview from "@/components/home/installation-preview"
import ProductsPreview from "@/components/home/products-preview"
import SolarCalculator from "@/components/home/solar-calculator"
import CustomerFeedback from "@/components/home/customer-feedback"
import ClientsCertifications from "@/components/home/clients-certifications"
import CtaSection from "@/components/home/cta-section"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Installation Preview */}
      <InstallationPreview />

      {/* Products Preview */}
      <ProductsPreview />

      {/* Solar Calculator */}
      <SolarCalculator />

      {/* Customer Feedback */}
      <CustomerFeedback />

      {/* Clients & Certifications */}
      <ClientsCertifications />

      {/* Call to Action */}
      <CtaSection />
    </>
  )
}

