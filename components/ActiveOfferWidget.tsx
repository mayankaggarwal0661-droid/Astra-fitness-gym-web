'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { getActiveOffer } from '@/lib/gymData'

export default function ActiveOfferWidget() {
  const [offerImage, setOfferImage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if the user has manually closed it in this session (optional, but good UX)
    const closed = sessionStorage.getItem('astra_offer_closed')
    if (closed) {
      setIsVisible(false)
      return
    }

    const offer = getActiveOffer()
    if (offer) {
      setOfferImage(offer)
    }
  }, [])

  if (!offerImage || !isVisible) return null

  function closeOffer() {
    setIsVisible(false)
    sessionStorage.setItem('astra_offer_closed', 'true')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-4 right-4 z-50 w-64 md:w-80 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(255,100,0,0.3)] border border-orange-500/30 group"
      >
        <button
          onClick={closeOffer}
          className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white/70 hover:text-white backdrop-blur-md rounded-full transition-all z-10"
        >
          <X size={14} />
        </button>
        <div className="relative aspect-[4/3] bg-black">
          <img 
            src={offerImage} 
            alt="Special Offer" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest text-white bg-orange-500 shadow-lg">Special Offer</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
