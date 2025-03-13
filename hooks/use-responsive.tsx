"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export default function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg")
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const handleResize = () => {
      const currentWidth = window.innerWidth
      setWidth(currentWidth)

      if (currentWidth < 640) {
        setBreakpoint("xs")
      } else if (currentWidth < 768) {
        setBreakpoint("sm")
      } else if (currentWidth < 1024) {
        setBreakpoint("md")
      } else if (currentWidth < 1280) {
        setBreakpoint("lg")
      } else if (currentWidth < 1536) {
        setBreakpoint("xl")
      } else {
        setBreakpoint("2xl")
      }
    }

    // Set initial values
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = breakpoint === "xs" || breakpoint === "sm"
  const isTablet = breakpoint === "md"
  const isDesktop = breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl"

  return {
    breakpoint,
    width,
    isMobile,
    isTablet,
    isDesktop,
  }
}

