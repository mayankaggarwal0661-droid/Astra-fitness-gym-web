'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const trainers = [
  {
    name: 'Arjun Kumar',
    specialization: 'Strength Training & Bodybuilding',
    certifications: 'ISSA CPT, Strength Coach',
    bio: 'Expert in muscle building and strength development with 10+ years of experience.',
    image: '🏋️',
  },
  {
    name: 'Priya Sharma',
    specialization: 'HIIT & Cardio Training',
    certifications: 'ACE CPT, NASM-CES',
    bio: 'Specializes in high-intensity workouts and cardiovascular conditioning.',
    image: '💪',
  },
  {
    name: 'Rajesh Singh',
    specialization: 'Functional Fitness',
    certifications: 'CrossFit L2, Functional Movement',
    bio: 'Focuses on functional movements and real-world fitness applications.',
    image: '🤸',
  },
  {
    name: 'Neha Gupta',
    specialization: 'Weight Management & Nutrition',
    certifications: 'Nutrition Specialist, Wellness Coach',
    bio: 'Provides holistic approach combining fitness with personalized nutrition plans.',
    image: '🥗',
  },
]

export function TrainerProfiles() {
  return (
    <section id="trainers" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Team</span>
          <h2 className="text-4xl font-bold text-foreground mt-2">
            Meet Your <span className="gradient-text">Elite Trainers</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            World-class certified trainers dedicated to sculpting your best self, every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.name}
              className="bg-secondary rounded-2xl p-6 border border-border card-hover text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-4">{trainer.image}</div>
              <h3 className="text-lg font-bold text-foreground">{trainer.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{trainer.specialization}</p>
              <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{trainer.bio}</p>
              <div className="mt-4 flex items-center justify-center gap-1">
                <Award size={12} className="text-primary" />
                <span className="text-xs text-muted-foreground">{trainer.certifications}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
