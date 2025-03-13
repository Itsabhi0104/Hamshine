import Script from "next/script"

interface ProductSchemaProps {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  sku?: string
  brand?: string
  availability?: "InStock" | "OutOfStock" | "PreOrder"
  reviewCount?: number
  ratingValue?: number
}

export default function ProductSchema({
  name,
  description,
  image,
  price,
  currency = "INR",
  sku = "",
  brand = "Hamshine Electronics",
  availability = "InStock",
  reviewCount = 0,
  ratingValue = 0,
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: name,
    description: description,
    image: `https://hamshineelectronics.co.in${image}`,
    sku: sku,
    mpn: sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://hamshineelectronics.co.in/products/${sku}`,
      priceCurrency: currency,
      price: price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      availability: `https://schema.org/${availability}`,
    },
  }

  // Add reviews if available
  if (reviewCount > 0 && ratingValue > 0) {
    schema["aggregateRating"] = {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
    }
  }

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

