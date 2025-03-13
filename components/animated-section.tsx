"use client"

import { type ReactNode, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { fadeInUp, fadeIn, staggerContainer, slideIn, scaleUp } from "@/utils/animation"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?:
    | "fadeInUp"
    | "fadeIn"
    | "staggerContainer"
    | "slideInLeft"
    | "slideInRight"
    | "slideInUp"
    | "slideInDown"
    | "scaleUp"
  delay?: number
  threshold?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce: once })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  const getAnimationVariant = () => {
    switch (animation) {
      case "fadeInUp":
        return fadeInUp
      case "fadeIn":
        return fadeIn
      case "staggerContainer":
        return staggerContainer
      case "slideInLeft":
        return slideIn("left", delay)
      case "slideInRight":
        return slideIn("right", delay)
      case "slideInUp":
        return slideIn("up", delay)
      case "slideInDown":
        return slideIn("down", delay)
      case "scaleUp":
        return scaleUp
      default:
        return fadeInUp
    }
  }

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={controls} variants={getAnimationVariant()}>
      {children}
    </motion.div>
  )
}

