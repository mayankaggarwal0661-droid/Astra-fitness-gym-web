'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rahul Mehta',
    transformation: 'Lost 25 kg in 6 months',
    quote: 'ASTRA GYM changed my life. The trainers are incredibly supportive and the facilities are world-class.',
    rating: 5,
    emoji: '🙌',
  },
  {
    name: 'Sakshi Verma',
    transformation: 'Gained 5 kg of muscle',
    quote: 'Best decision ever! The personalized training and nutrition guidance really helped me achieve my goals.',
    rating: 5,
    emoji: '💪',
  },
  {
    name: 'Amit Patel',
    transformation: 'Improved strength by 50%',
    quote: 'The equipment is top-notch and trainers are very knowledgeable. Highly recommend ASTRA to everyone!',
    rating: 5,
    emoji: '🔥',
  },
  {
    name: 'Priya Singh',
    transformation: 'Increased flexibility & endurance',
    quote: 'Amazing community, professional trainers, and excellent facilities. Worth every penny!',
    rating: 5,
    emoji: '✨',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Member <span className="gradient-orange bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real transformations from real members who achieved their fitness goals at ASTRA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:glow-orange"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 italic text-sm">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Member Info */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{testimonial.emoji}</div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-primary font-semibold">{testimonial.transformation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
