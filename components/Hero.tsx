'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Dumbbell } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-card via-background to-background">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary opacity-20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                ASTRA FITNESS
                <span className="gradient-orange bg-clip-text text-transparent block"> GYM</span>
              </motion.h1>
              <p className="text-xl text-muted-foreground mt-4">
                Transform Your Body, Elevate Your Spirit. Experience Premium Fitness at Its Finest.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-foreground">State-of-the-art Equipment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-foreground">Expert Certified Trainers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-foreground">Personalized Wellness Plans</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:glow-orange-lg transition-all font-bold flex items-center justify-center gap-2 group">
                Join Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-bold">
                Book a Tour
              </button>
            </div>
          </motion.div>

          {/* Right - Hanuman Image */}
          <motion.div
            className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Image
                src="/hanuman.png"
                alt="Lord Hanuman - Divine Strength"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-center justify-center">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
