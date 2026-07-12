import { Navbar } from '@/components/Navbar'
import { PageHero } from '@/components/PageHero'
import { MembershipPlans } from '@/components/MembershipPlans'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Membership — ASTRA Fitness Gym',
  description: 'Choose your ASTRA membership plan — Basic, Pro, Premium or Elite.',
}

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="MEMBERSHIP"
        highlight="PLANS"
        subtitle="Choose the plan that matches your ambition. Every plan is a step toward your best self."
        breadcrumb="Membership"
      />
      <MembershipPlans />
      <Footer />
    </main>
  )
}
