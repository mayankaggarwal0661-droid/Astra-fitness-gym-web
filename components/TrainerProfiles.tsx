'use client'

import { motion } from 'framer-motion'
import { Award, Dumbbell } from 'lucide-react'

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
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="gradient-orange bg-clip-text text-transparent">Expert Trainers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our certified professionals are committed to helping you achieve your fitness goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              className="bg-secondary rounded-xl overflow-hidden hover:border-primary border border-border transition-all hover:shadow-lg hover:glow-orange group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Trainer Image */}
              <div className="bg-gradient-orange h-32 flex items-center justify-center text-6xl">
                {trainer.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{trainer.name}</h3>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell size={16} className="text-primary" />
                    <p className="text-sm font-semibold text-primary">{trainer.specialization}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-primary" />
                    <p className="text-xs text-muted-foreground">{trainer.certifications}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{trainer.bio}</p>

                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:glow-orange transition-all font-semibold text-sm">
                  Book Trainer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
