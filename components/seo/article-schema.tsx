import Script from "next/script"

interface ArticleSchemaProps {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  authorName?: string
  publisherName?: string
  publisherLogo?: string
}

export default function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified = datePublished,
  authorName = "Hamshine Electronics",
  publisherName = "Hamshine Electronics & Energy Systems",
  publisherLogo = "/logo.jpg",
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    image: `https://hamshineelectronics.co.in${image}`,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: `https://hamshineelectronics.co.in${publisherLogo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://hamshineelectronics.co.in/blog",
    },
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

