import { Navbar } from '@/components/Navbar'
import { PageHero } from '@/components/PageHero'
import { MotivationSpeech } from '@/components/MotivationSpeech'
import { Gallery } from '@/components/Gallery'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'About — ASTRA Fitness Gym',
  description: 'Our story, motivation, gallery and contact information.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="ABOUT"
        highlight="ASTRA"
        subtitle="Where divine strength meets elite training. Inspired by Hanuman Ji — built for warriors."
        breadcrumb="About Us"
      />
      <MotivationSpeech />
      <Gallery />
      <Footer />
    </main>
  )
}
