import { Navbar } from '@/components/Navbar'
import { PageHero } from '@/components/PageHero'
import { BMICalculator } from '@/components/BMICalculator'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'BMI Calculator — ASTRA Fitness Gym',
  description: 'Calculate your Body Mass Index and start your transformation journey with ASTRA.',
}

export default function BMIPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="BMI"
        highlight="CALCULATOR"
        subtitle="Know your numbers. Own your journey. Calculate your Body Mass Index and take the first step."
        breadcrumb="BMI Calculator"
      />
      <BMICalculator />
      <Footer />
    </main>
  )
}
