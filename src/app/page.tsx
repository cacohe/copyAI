"use client"

import { Navigation } from "@/components/welcome/navigation"
import { HeroSection } from "@/components/welcome/hero-section"
import { StatsSection } from "@/components/welcome/stats-section"
import { FeaturesSection } from "@/components/welcome/features-section"
import { CTASection } from "@/components/welcome/cta-section"
import { Footer } from "@/components/welcome/footer"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}