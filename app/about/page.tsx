import AboutHeader from "@/components/about/about-header"
import OurStory from "@/components/about/our-story"
import MissionVision from "@/components/about/mission-vision"
import Certifications from "@/components/about/certifications"

export default function AboutPage() {
  return (
    <>
      {/* Header Section */}
      <AboutHeader />

      {/* Our Story */}
      <OurStory />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Certifications */}
      <Certifications />
    </>
  )
}

