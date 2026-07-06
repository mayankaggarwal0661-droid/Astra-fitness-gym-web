import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { BenefitSection } from '@/components/BenefitSection'
import { TrainerProfiles } from '@/components/TrainerProfiles'
import { BMICalculator } from '@/components/BMICalculator'
import { MembershipPlans } from '@/components/MembershipPlans'
import { GallerySection } from '@/components/GallerySection'
import { Testimonials } from '@/components/Testimonials'
import { LocationContact } from '@/components/LocationContact'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <main className="w-full bg-background">
      <Navbar />
      <Hero />
      <BenefitSection />
      <TrainerProfiles />
      <BMICalculator />
      <MembershipPlans />
      <GallerySection />
      <Testimonials />
      <LocationContact />
      <Footer />
    </main>
  )
}
