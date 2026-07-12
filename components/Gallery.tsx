'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryPhotos = [
  {
    src: '/api/gym-image/1',
    title: 'Main Training Floor',
    description: 'Spacious main floor packed with premium machines and free weights for full-body workouts.',
    category: 'Equipment',
  },
  {
    src: '/api/gym-image/2',
    title: 'Cardio & Strength Zone',
    description: 'Dedicated zone featuring the iconic Hanuman mural — our symbol of strength and power.',
    category: 'Equipment',
  },
  {
    src: '/api/gym-image/3',
    title: 'Cable & Machine Station',
    description: 'Multi-cable stations with motivational wall art to keep you pushing through every rep.',
    category: 'Training',
  },
  {
    src: '/api/gym-image/4',
    title: 'Treadmill & Cardio Section',
    description: 'Cardio row with treadmills and cross-trainers, surrounded by stunning motivational murals.',
    category: 'Cardio',
  },
  {
    src: '/api/gym-image/5',
    title: 'Power Lifting Area',
    description: 'Heavy-duty squat racks, bench press stations, and barbells for serious strength athletes.',
    category: 'Strength',
  },
]

const categories = ['All', 'Equipment', 'Training', 'Cardio', 'Strength']

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory)

  const closeLightbox = () => setLightboxIndex(null)

  const prevPhoto = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }

  const nextPhoto = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Our Facilities
          </span>
          <h2 className="text-4xl font-bold text-foreground mt-2">
            Inside <span className="gradient-text">ASTRA Gym</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real photos from our premium gym floor — see the world-class equipment and atmosphere you'll train in every day.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          viewport={{ once: true, margin: "150px" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                activeCategory === cat
                  ? 'gradient-orange text-white shadow-[0_4px_15px_rgba(255,100,0,0.4)] scale-105 border border-orange-400'
                  : 'bg-white/[0.03] border border-white/[0.08] text-white/50 hover:bg-white/[0.06] hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Photo Grid — Bento style, all 5 photos properly sized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Photo 1 — Hero wide (spans 2 cols) */}
          {filtered.map((photo, index) => (
            <motion.div
              key={photo.src + index}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group border border-border/40
                ${index === 0 ? 'lg:col-span-2 h-[360px]' : ''}
                ${index === 1 ? 'lg:col-span-1 h-[360px]' : ''}
                ${index === 2 ? 'lg:col-span-1 h-[300px]' : ''}
                ${index === 3 ? 'lg:col-span-1 h-[300px]' : ''}
                ${index === 4 ? 'lg:col-span-1 h-[300px]' : ''}
                ${index > 4 ? 'h-[300px]' : ''}
              `}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              viewport={{ once: true, margin: "150px" }}
              whileHover={{ scale: 1.015 }}
              onClick={() => setLightboxIndex(index)}
            >
              {/* Actual image */}
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Category badge + title — always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block text-xs text-primary font-semibold px-2.5 py-0.5 rounded-full bg-black/60 border border-primary/40 mb-2">
                  {photo.category}
                </span>
                <h3 className="text-white font-bold text-base leading-snug">{photo.title}</h3>
                <p className="text-white/60 text-xs mt-1 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300">
                  {photo.description}
                </p>
              </div>

              {/* Zoom icon on hover */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <p className="text-muted-foreground mb-5 text-base">
            Want to experience this in person?
          </p>
          <a
            href="#membership"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white gradient-orange hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/30 text-base"
          >
            Join ASTRA Today →
          </a>
        </motion.div>
      </div>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 bg-[rgba(10,5,2,0.6)] backdrop-blur-2xl z-[100] flex items-center justify-center p-4"
            style={{ WebkitBackdropFilter: 'blur(30px) saturate(200%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
              >
                <X size={30} />
              </button>

              {/* Counter */}
              <p className="absolute -top-12 left-0 text-white/40 text-sm font-medium">
                {lightboxIndex + 1} / {filtered.length}
              </p>

              {/* Image */}
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="w-full max-h-[78vh] object-contain rounded-2xl"
              />

              {/* Caption */}
              <div className="mt-5 text-center">
                <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                  {filtered[lightboxIndex].category}
                </span>
                <h3 className="text-white font-bold text-xl mt-1">
                  {filtered[lightboxIndex].title}
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  {filtered[lightboxIndex].description}
                </p>
              </div>

              {/* Prev / Next */}
              {filtered.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevPhoto() }}
                    className="absolute left-[-60px] top-[40%] -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-primary/80 border border-white/10 flex items-center justify-center text-white transition-all"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextPhoto() }}
                    className="absolute right-[-60px] top-[40%] -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-primary/80 border border-white/10 flex items-center justify-center text-white transition-all"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
