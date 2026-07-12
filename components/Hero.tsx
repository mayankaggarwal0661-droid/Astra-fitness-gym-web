'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Zap, ChevronDown, Play } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imgY         = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentY     = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const scrollOpacity= useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '100vh', minHeight: '100vh', background: '#000' }}
    >

      {/* ── Hanuman Ji — full hero background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imgY }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <img
          src="/api/gym-image/hanuman"
          alt="Hanuman Ji"
          className="w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </motion.div>

      {/* ── Gradient overlays for text readability ── */}
      {/* Bottom dark fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.10) 60%, transparent 100%)',
        }}
      />
      {/* Left fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 40%, transparent 65%)',
        }}
      />
      {/* Top navbar fade */}
      <div
        className="absolute top-0 left-0 right-0 h-40 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
      />
      {/* Orange bottom tint */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,80,0,0.20) 0%, transparent 65%)',
        }}
      />

      {/* ── Floating Glowing Sprinkles (Embers) ── */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-[2]"
          style={{
            width:  `${(i % 3) + 1.5}px`,
            height: `${(i % 3) + 1.5}px`,
            left:   `${(i * 13) % 100}%`,
            top:    `${(i * 17) % 100}%`,
            background: i % 3 === 0 ? '#ff6600' : i % 3 === 1 ? '#ffcc00' : '#ff3300',
            boxShadow: '0 0 8px rgba(255,100,0,0.8)',
          }}
          animate={{
            y: [0, -80 - (i * 2)],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.5, 0.5],
            x: [0, (i % 2 === 0 ? 1 : -1) * (10 + (i % 5))],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: (i % 5) * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Content pinned to bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[3] px-6 sm:px-10 lg:px-16 pb-20"
        style={{ y: contentY }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* Left */}
          <div className="max-w-lg">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-8 h-[2px] rounded" style={{ background: 'linear-gradient(90deg,#ff6600,#ffaa00)' }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#ff7700' }}>
                ASTRA Fitness Gym
              </span>
            </motion.div>

            <motion.h1
              className="font-black uppercase leading-[0.87] mb-6 text-white"
              style={{
                fontSize: 'clamp(52px, 7.5vw, 100px)',
                letterSpacing: '-0.025em',
                fontFamily: "'Barlow Condensed', sans-serif",
                textShadow: '0 4px 40px rgba(0,0,0,0.9)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="block">FORGE</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(90deg,#ff6600 0%,#ffcc00 55%,#ff4400 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                YOUR
              </span>
              <span className="block">LEGACY</span>
            </motion.h1>

            <motion.p
              className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Inspired by the divine power of Hanuman Ji. Train with discipline. Rise as a warrior. Join ASTRA.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <a
                href="#membership"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30"
                style={{
                  background: 'linear-gradient(135deg,#ff6600,#ff3300)',
                  clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                  boxShadow: '0 0 32px rgba(255,80,0,0.35)',
                }}
              >
                <Zap size={13} fill="white" /> Start Training <ArrowRight size={13} />
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest border border-white/15 hover:border-orange-500/50 transition-all"
                style={{
                  clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <Play size={11} fill="currentColor" /> View Gallery
              </a>
            </motion.div>
          </div>

          {/* Right stats */}
          <motion.div
            className="flex gap-8 lg:gap-10 pb-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { number: '1000+', label: 'Warriors' },
              { number: '1+',    label: 'Trainers' },
              { number: '7 Yr+', label: 'Experience' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + i * 0.1 }}
              >
                <div
                  className="text-2xl font-black"
                  style={{
                    color: '#ff6600',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    textShadow: '0 0 20px rgba(255,100,0,0.5)',
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-[10px] text-white/35 uppercase tracking-[0.2em] mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div
          className="max-w-7xl mx-auto mt-8 h-[1px] opacity-[0.10]"
          style={{ background: 'linear-gradient(90deg,transparent,#ff6600 30%,#ffaa00 70%,transparent)' }}
        />
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-[88px] left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-1.5"
        style={{ opacity: scrollOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[9px] text-white/20 uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={16} style={{ color: 'rgba(255,100,0,0.45)' }} />
        </motion.div>
      </motion.div>

      {/* ── Marquee ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[4] overflow-hidden py-2.5 border-t border-white/[0.05]"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, gi) =>
            ['⚡ Premium Equipment','🏆 Elite Trainers','💪 Divine Strength','🔥 Discipline Wins','⚡ 5000+ Warriors','🏅 15 Years of Power','🔥 Train Like Hanuman Ji'].map((item, i) => (
              <span key={`${gi}-${i}`} className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/25">
                {item}
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── Blend into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-[5]"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }}
      />
    </section>
  )
}
