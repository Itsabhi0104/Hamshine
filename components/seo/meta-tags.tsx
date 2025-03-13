"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: "website" | "article" | "product"
  canonical?: string
}

export default function MetaTags({
  title = "Hamshine Electronics & Energy Systems - Solar Energy Solutions",
  description = "Leading provider of solar energy solutions and installations in India. We offer high-quality solar panels, inverters, and complete solar system installations.",
  keywords = "solar energy, solar panels, solar installations, renewable energy, solar power, solar solutions, India",
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonical,
}: MetaTagsProps) {
  const router = useRouter()
  const fullTitle = `${title} | Hamshine Electronics`
  const fullUrl = `https://hamshineelectronics.co.in${router.asPath}`
  const canonicalUrl = canonical || fullUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`https://hamshineelectronics.co.in${ogImage}`} />
      <meta property="og:site_name" content="Hamshine Electronics & Energy Systems" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://hamshineelectronics.co.in${ogImage}`} />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1976D2" />

      {/* Language and Direction */}
      <meta httpEquiv="Content-Language" content="en" />
      <html lang="en" />
    </Head>
  )
}

