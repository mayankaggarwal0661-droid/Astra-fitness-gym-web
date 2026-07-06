'use client'

import { motion } from 'framer-motion'
import { Zap, Users, Trophy, Heart } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Premium Equipment',
    description: 'Latest fitness equipment from world-renowned brands to maximize your workout potential.',
  },
  {
    icon: Users,
    title: 'Expert Trainers',
    description: 'Certified professionals with years of experience to guide your fitness journey.',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    description: 'Thousands of success stories from our members achieving their fitness goals.',
  },
  {
    icon: Heart,
    title: 'Holistic Wellness',
    description: 'Complete fitness packages including nutrition, training, and wellness coaching.',
  },
]

export function BenefitSection() {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="gradient-orange bg-clip-text text-transparent">ASTRA</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We provide everything you need to achieve your fitness goals and transform your life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={index}
                className="bg-card p-8 rounded-xl border border-border hover:border-primary transition-all hover:shadow-lg hover:glow-orange group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
