'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Flame, Quote } from 'lucide-react'

const quotes = [
  {
    text: "Pain is temporary. Glory is forever. Every drop of sweat is a step closer to the warrior you were born to be.",
    author: "ASTRA Creed",
    icon: "🔥",
  },
  {
    text: "Hanuman Ji lifted a mountain for devotion. You can lift this weight for yourself. Discipline is your superpower.",
    author: "ASTRA Creed",
    icon: "💪",
  },
  {
    text: "The body achieves what the mind believes. Show up. Grind. Repeat. Champions are built in silence.",
    author: "ASTRA Creed",
    icon: "⚡",
  },
]

const words = [
  "DISCIPLINE", "STRENGTH", "DEVOTION", "GRIT",
  "POWER", "FOCUS", "WARRIOR", "RISE",
]

export function MotivationSpeech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      id="motivation"
      ref={containerRef}
      className="relative py-0 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* ── Top divider glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #ff6600 40%, #ffaa00 60%, transparent)' }}
      />

      {/* ── Scrolling word marquee background ── */}
      <div className="absolute inset-0 flex flex-col justify-center gap-10 overflow-hidden opacity-[0.035] pointer-events-none select-none">
        {[0, 1, 2].map((row) => (
          <motion.div
            key={row}
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: row % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: 18 + row * 4, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(4)].map((_, gi) =>
              words.map((w, i) => (
                <span
                  key={`${row}-${gi}-${i}`}
                  className="text-6xl font-black uppercase text-white"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em' }}
                >
                  {w}
                </span>
              ))
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px]" style={{ background: 'linear-gradient(90deg,#ff6600,#ffaa00)' }} />
            <Flame size={14} className="text-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#ff7700' }}>
              Words of Fire
            </span>
            <Flame size={14} className="text-orange-500" />
            <div className="w-8 h-[2px]" style={{ background: 'linear-gradient(90deg,#ffaa00,#ff6600)' }} />
          </div>

          <h2
            className="font-black uppercase text-white leading-[0.88]"
            style={{
              fontSize: 'clamp(44px, 7vw, 90px)',
              letterSpacing: '-0.025em',
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            RISE LIKE A{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#ff6600,#ffcc00,#ff4400)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WARRIOR
            </span>
          </h2>
        </motion.div>

        {/* ── Big centred quote ── */}
        <motion.div
          className="relative text-center mb-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Giant quote mark */}
          <span
            className="absolute -top-10 left-1/2 -translate-x-1/2 font-black select-none pointer-events-none"
            style={{
              fontSize: '180px',
              lineHeight: 1,
              color: 'rgba(255,100,0,0.10)',
              fontFamily: 'Georgia, serif',
            }}
          >
            "
          </span>

          <p
            className="relative text-white font-black uppercase leading-[1.05] z-10"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 58px)',
              letterSpacing: '-0.01em',
              fontFamily: "'Barlow Condensed', sans-serif",
              textShadow: '0 4px 40px rgba(0,0,0,0.5)',
            }}
          >
            The iron does not care about your{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#ff6600,#ffcc00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              excuses.
            </span>{' '}
            It only rewards those who{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#ff6600,#ffcc00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              show up.
            </span>
          </p>

          <div
            className="mt-8 mx-auto w-20 h-[2px] rounded"
            style={{ background: 'linear-gradient(90deg,#ff6600,#ffaa00)' }}
          />
          <p className="mt-3 text-white/30 text-xs uppercase tracking-[0.3em]">— ASTRA Fitness Gym</p>
        </motion.div>

        {/* ── 3 quote cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl p-7 border border-white/[0.06] overflow-hidden group"
              style={{ background: 'rgba(255,255,255,0.02)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,102,0,0.3)' }}
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: 'radial-gradient(ellipse at top left, rgba(255,100,0,0.08) 0%, transparent 60%)',
                }}
              />

              {/* Top orange line */}
              <div
                className="absolute top-0 left-6 right-6 h-[1px]"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,100,0,0.5),transparent)' }}
              />

              <div className="text-3xl mb-4">{q.icon}</div>

              <Quote size={16} className="text-orange-500/40 mb-3" />

              <p
                className="text-white/80 text-sm leading-relaxed font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {q.text}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <div
                  className="w-6 h-[1px]"
                  style={{ background: 'linear-gradient(90deg,#ff6600,transparent)' }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500/60">
                  {q.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Full-width banner quote ── */}
        <motion.div
          className="mt-16 relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #1a0800 0%, #2a1000 50%, #1a0800 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 100% at 0% 50%, rgba(255,90,0,0.18) 0%, transparent 60%)',
            }}
          />
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ background: 'linear-gradient(180deg,#ff6600,#ffaa00,#ff6600)' }}
          />

          <div className="relative z-10 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p
              className="font-black uppercase text-white text-center md:text-left"
              style={{
                fontSize: 'clamp(22px, 3.5vw, 42px)',
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              Your only competition is{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg,#ff6600,#ffcc00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                yesterday&apos;s you.
              </span>
            </p>

            <a
              href="#membership"
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 text-white text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg,#ff6600,#ff3300)',
                clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                boxShadow: '0 0 30px rgba(255,80,0,0.35)',
              }}
            >
              <Flame size={14} /> Begin Your Journey
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom divider glow ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
        style={{ background: 'linear-gradient(90deg,transparent,#ff6600 40%,#ffaa00 60%,transparent)' }}
      />
    </section>
  )
}
