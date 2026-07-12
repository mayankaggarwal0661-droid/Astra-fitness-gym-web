import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { BenefitSection } from '@/components/BenefitSection'
import { MotivationSpeech } from '@/components/MotivationSpeech'
import { BMICalculator } from '@/components/BMICalculator'
import { MembershipPlans } from '@/components/MembershipPlans'
import { Gallery } from '@/components/Gallery'
import { ReviewsSection } from '@/components/ReviewsSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <BenefitSection />
      <MotivationSpeech />
      <BMICalculator />
      <MembershipPlans />
      <Gallery />
      <ReviewsSection />
      <Footer />
    </main>
  )
}
