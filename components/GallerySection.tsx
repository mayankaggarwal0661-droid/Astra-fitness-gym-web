'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const galleryImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-29%20at%2009.21.43-dSz6nn2XckvgTUHczEFsgWIHKgwXx4.jpeg',
    alt: 'Gym Equipment Area',
    category: 'Equipment',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-29%20at%2009.21.46-BTkmAQmZjYNCcYtMT3wduTudKqzKZI.jpeg',
    alt: 'Cardio Section',
    category: 'Equipment',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-29%20at%2009.21.46%20%281%29-QUhWjiL9333pRyij1q7irVSV1kCnb8.jpeg',
    alt: 'Hanuman Statue Area',
    category: 'Areas',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-29%20at%2009.21.44-kF5WeOGytYVa1Ao91XajmYB64aUwWB.jpeg',
    alt: 'Free Weights Section',
    category: 'Equipment',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-29%20at%2009.21.45-OlHDxP3ZoLluCX5gjqKBe8k98axlyj.jpeg',
    alt: 'Main Gym Floor',
    category: 'Areas',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-29%20at%2009.21.46%20%282%29-Rrw43Lz5LrQLF9wp4feKa7f2TXXVUR.jpeg',
    alt: 'Premium Gym Space',
    category: 'Areas',
  },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [category, setCategory] = useState('All')

  const categories = ['All', 'Equipment', 'Areas']
  const filteredImages =
    category === 'All' ? galleryImages : galleryImages.filter((img) => img.category === category)

  const handlePrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1)
  }

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Explore ASTRA <span className="gradient-orange bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Take a look at our state-of-the-art facilities and premium equipment.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                category === cat
                  ? 'bg-primary text-primary-foreground glow-orange'
                  : 'bg-card border border-border text-foreground hover:border-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                className="object-contain"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-primary text-primary-foreground p-2 rounded-full hover:glow-orange transition-all"
              >
                <X size={24} />
              </button>

              {/* Navigation */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full hover:glow-orange transition-all"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full hover:glow-orange transition-all"
              >
                <ChevronRight size={24} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
                {selectedImage + 1} / {filteredImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
