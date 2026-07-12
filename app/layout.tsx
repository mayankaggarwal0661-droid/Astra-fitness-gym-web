import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ASTRA FITNESS GYM | Best Gym in Haridwar',
    template: '%s | ASTRA FITNESS GYM'
  },
  description:
    'Join ASTRA FITNESS GYM in Haridwar. Train like a warrior with premium CrossFit, cardio, and modern strength equipment. Top-rated trainers and luxury facilities.',
  keywords: ['Gym in Haridwar', 'Best gym near me', 'ASTRA Fitness Gym', 'CrossFit Haridwar', 'Personal Training', 'Fitness Center Haridwar', 'Luxury Gym'],
  authors: [{ name: 'ASTRA Gym' }],
  creator: 'ASTRA Fitness Gym',
  publisher: 'ASTRA Fitness Gym',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ASTRA FITNESS GYM | Train Like a Warrior',
    description: 'Experience luxury fitness at ASTRA FITNESS GYM in Haridwar. Professional trainers, state-of-the-art equipment, and personalized wellness programs.',
    url: 'https://astragym.in',
    siteName: 'ASTRA Fitness Gym',
    images: [
      {
        url: '/gallery-1.jpg',
        width: 1200,
        height: 630,
        alt: 'ASTRA Fitness Gym Interior',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASTRA FITNESS GYM | Haridwar',
    description: 'The ultimate luxury fitness destination in Haridwar. Join ASTRA today.',
    images: ['/gallery-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
