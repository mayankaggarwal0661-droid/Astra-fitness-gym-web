'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Rahul Sharma',
    role: 'Local Guide',
    text: "ASTRA is hands down the best gym in Haridwar. The equipment is world-class, and the vibe is unmatched. The trainers push you past your limits. Highly recommended!",
    rating: 5,
    avatar: 'RS'
  },
  {
    name: 'Priya Patel',
    role: 'Google Review',
    text: "I love the premium feel of this gym. It's incredibly clean, spacious, and the community is amazing. The Hanuman Ji mural is a massive source of daily motivation.",
    rating: 5,
    avatar: 'PP'
  },
  {
    name: 'Vikram Singh',
    role: 'Local Guide',
    text: "Finally a gym that understands serious lifters. The heavy-duty squat racks and premium barbells are exactly what I needed. Top-tier luxury experience.",
    rating: 5,
    avatar: 'VS'
  },
  {
    name: 'Aman Verma',
    role: 'Google Review',
    text: "The best environment for fitness in the city. The trainers are very professional, and they provide great personalized diet plans along with workouts. 10/10.",
    rating: 5,
    avatar: 'AV'
  },
  {
    name: 'Sneha Gupta',
    role: 'Google Review',
    text: "Very safe and encouraging space for women. The cardio section is fantastic, and the overall cleanliness of the gym is always maintained at a high standard.",
    rating: 5,
    avatar: 'SG'
  },
  {
    name: 'Deepak Kumar',
    role: 'Local Guide',
    text: "ASTRA has completely transformed my fitness journey. The premium machines are always well-maintained and you never have to wait long. Best gym in Haridwar!",
    rating: 5,
    avatar: 'DK'
  }
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

        {/* Infinite Looping Marquee */}
        <div className="flex overflow-hidden relative max-w-[100vw] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 group">
          {/* First block of reviews */}
          <div className="flex animate-marquee whitespace-normal gap-6 pr-6 shrink-0 group-hover:[animation-play-state:paused]">
            {reviews.map((review, index) => (
              <div
                key={`a-${index}`}
                className="relative rounded-2xl p-8 border flex flex-col overflow-hidden bg-white/[0.02] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300 w-[350px] shrink-0"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  WebkitBackdropFilter: 'blur(12px) saturate(180%)'
                }}
              >
                {/* Quote Icon Background */}
                <Quote size={80} className="absolute -top-4 -right-4 text-white/[0.03] group-hover:text-orange-500/5 transition-colors duration-300 pointer-events-none" />
                
                {/* Stars & Google tag */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </span>
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
              </div>
            ))}
          </div>

          {/* Second block of reviews (Identical copy for seamless looping) */}
          <div className="flex animate-marquee whitespace-normal gap-6 pr-6 shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
            {reviews.map((review, index) => (
              <div
                key={`b-${index}`}
                className="relative rounded-2xl p-8 border flex flex-col overflow-hidden bg-white/[0.02] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300 w-[350px] shrink-0"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  WebkitBackdropFilter: 'blur(12px) saturate(180%)'
                }}
              >
                {/* Quote Icon Background */}
                <Quote size={80} className="absolute -top-4 -right-4 text-white/[0.03] group-hover:text-orange-500/5 transition-colors duration-300 pointer-events-none" />
                
                {/* Stars & Google tag */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
