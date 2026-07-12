'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Rahul Sharma',
    role: 'CrossFit Athlete',
    text: "ASTRA is hands down the best gym in Haridwar. The equipment is world-class, and the vibe is unmatched. The trainers push you past your limits. Highly recommended!",
    rating: 5,
    avatar: 'RS'
  },
  {
    name: 'Priya Patel',
    role: 'Yoga Enthusiast',
    text: "I love the premium feel of this gym. It's incredibly clean, spacious, and the community is amazing. The Hanuman Ji mural is a massive source of daily motivation.",
    rating: 5,
    avatar: 'PP'
  },
  {
    name: 'Vikram Singh',
    role: 'Powerlifter',
    text: "Finally a gym that understands serious lifters. The heavy-duty squat racks and premium barbells are exactly what I needed. Top-tier luxury experience.",
    rating: 5,
    avatar: 'VS'
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden" style={{ background: '#050505' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,100,0,0.05) 0%, transparent 60%)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#ff7700' }}>Testimonials</span>
          <h2 className="font-black uppercase text-white mt-2 leading-none text-center" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontFamily: "'Barlow Condensed', sans-serif" }}>
            Member <span style={{ background: 'linear-gradient(90deg,#ff6600,#ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Reviews</span>
          </h2>
          
          {/* Overall Rating Badge */}
          <div className="mt-6 flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
              ))}
            </div>
            <div className="h-4 w-[1px] bg-white/20" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-black text-lg">4.9</span>
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">/ 5 Rating</span>
            </div>
          </div>

          <p className="mt-6 text-white/50 text-sm max-w-2xl mx-auto text-center">
            Don't just take our word for it. Hear what the ASTRA community has to say about their transformation journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl p-8 border flex flex-col group overflow-hidden bg-white/[0.02] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              viewport={{ once: true, margin: "150px" }}
            >
              {/* Quote Icon Background */}
              <Quote size={80} className="absolute -top-4 -right-4 text-white/[0.03] group-hover:text-orange-500/5 transition-colors duration-300 pointer-events-none" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white/70 text-sm leading-relaxed mb-8 flex-grow">
                "{review.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs border border-white/10"
                  style={{ background: 'linear-gradient(135deg, rgba(255,100,0,0.2), rgba(255,50,0,0.2))' }}>
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-white/40 text-xs">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
