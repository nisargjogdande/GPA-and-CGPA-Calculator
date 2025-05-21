import { MainLayout } from "@/components/main-layout"
import { HeroSection } from "@/components/hero-section"
import { GpaCalculator } from "@/components/gpa-calculator"
import { CgpaCalculator } from "@/components/cgpa-calculator"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        <div id="gpa-calculator" className="scroll-mt-20">
          <GpaCalculator />
        </div>
        <div id="cgpa-calculator" className="scroll-mt-20 mt-16">
          <CgpaCalculator />
        </div>
        <div id="about" className="scroll-mt-20 mt-16">
          <AboutSection />
        </div>
        <div id="contact" className="scroll-mt-20 mt-16 mb-16">
          <ContactSection />
        </div>
      </div>
    </MainLayout>
  )
}
