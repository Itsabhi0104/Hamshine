import Script from "next/script"

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hamshine Electronics & Energy Systems",
    image: "https://hamshineelectronics.co.in/logo.jpg",
    url: "https://hamshineelectronics.co.in",
    telephone: "+91 9830052742",
    address: {
      "@type": "PostalAddress",
      streetAddress: "P-5, CIT Road, Scheme-VII(M), Kankurgachi",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700054",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.5726",
      longitude: "88.3639",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/hamshineelectronics",
      "https://www.instagram.com/hamshineelectronics",
      "https://www.linkedin.com/company/hamshineelectronics",
    ],
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

