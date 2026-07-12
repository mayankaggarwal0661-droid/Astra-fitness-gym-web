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
          transition={{ duration: 0.25 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-4xl font-bold text-foreground mt-2">
            The ASTRA <span className="gradient-text">Difference</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We offer more than just a gym — a complete transformation experience designed to help you exceed your limits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300 group"
              style={{ WebkitBackdropFilter: 'blur(12px) saturate(180%)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              viewport={{ once: true, margin: "150px" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
