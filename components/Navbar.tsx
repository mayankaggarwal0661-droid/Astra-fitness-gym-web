'use client'

import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'About',      href: '/#about' },
    { label: 'Motivation', href: '/#motivation' },
    { label: 'BMI',        href: '/#bmi' },
    { label: 'Membership', href: '/#membership' },
    { label: 'Gallery',    href: '/#gallery' },
    { label: 'Contact',    href: '/#contact' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle smooth scroll if we are already on the home page
    if (window.location.pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      const targetId = href.substring(2) // remove '/#'
      const elem = document.getElementById(targetId)
      if (elem) {
        const y = elem.getBoundingClientRect().top + window.scrollY - 72 // 72px offset for navbar
        window.scrollTo({ top: y, behavior: 'smooth' })
        setIsOpen(false)
        window.history.pushState(null, '', href)
      }
    } else {
      // If navigating to another page, just close the menu and let default behavior happen
      setIsOpen(false)
    }
  }

  const portalLinks = [
    { label: 'Member', href: '/member', color: '#a78bfa' },
  ]

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
      }}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-[72px]">

          {/* ══════════════ LOGO ══════════════ */}
          <a href="#" className="flex items-center gap-3 group">

            {/* Original Astra Logo */}
            <div
              className="relative w-11 h-11 overflow-hidden shrink-0 bg-white"
              style={{
                clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))',
              }}
            >
              <img
                src="/astra-logo.jpg"
                alt="ASTRA Logo"
                className="w-full h-full object-cover object-center scale-[2.2] group-hover:scale-[2.5] transition-transform duration-500"
              />
            </div>

            {/* Brand text */}
            <div className="flex flex-col leading-none">
              <span
                className="font-black uppercase tracking-[0.18em] text-white text-xl group-hover:text-orange-400 transition-colors duration-300"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.15em' }}
              >
                ASTRA
              </span>
              <span
                className="text-[8px] font-bold uppercase tracking-[0.35em]"
                style={{ color: '#ff7700', letterSpacing: '0.3em' }}
              >
                FITNESS GYM
              </span>
            </div>
          </a>

          {/* ══════════════ DESKTOP NAV ══════════════ */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="relative text-white/45 hover:text-white text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 group py-1"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300 rounded"
                  style={{ background: 'linear-gradient(90deg,#ff6600,#ffaa00)' }}
                />
              </a>
            ))}

            <a
              href="/#membership"
              onClick={(e) => handleScroll(e, '/#membership')}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 text-white text-[11px] font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 ml-2"
              style={{
                background: 'linear-gradient(135deg,#ff6600,#ff3300)',
                clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
              }}
            >
              Join Now
            </a>

            {/* Portal quick-access */}
            <div className="flex gap-1.5 ml-3 pl-3 border-l border-white/[0.08]">
              {portalLinks.map(p => (
                <Link key={p.label} href={p.href}
                  className="px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105"
                  style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ══════════════ MOBILE HAMBURGER ══════════════ */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ══════════════ MOBILE MENU ══════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', 
              backdropFilter: 'blur(20px) saturate(180%)', 
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            {/* Mobile logo strip */}
            <div
              className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]"
            >
              <div
                className="relative w-9 h-9 overflow-hidden shrink-0 bg-white"
                style={{
                  clipPath: 'polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))',
                }}
              >
                <img
                  src="/astra-logo.jpg"
                  alt="ASTRA Logo"
                  className="w-full h-full object-cover object-center scale-[2.2]"
                />
              </div>
              <div className="leading-none">
                <p className="text-white font-black uppercase text-base tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>ASTRA</p>
                <p className="text-orange-500 text-[8px] uppercase tracking-[0.3em] font-bold">Fitness Gym</p>
              </div>
            </div>

            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-center gap-3 text-white/50 hover:text-white text-[11px] font-bold uppercase tracking-[0.22em] py-3 border-b border-white/[0.04] hover:border-orange-500/20 transition-all group"
                  onClick={(e) => handleScroll(e, link.href)}
                >
                  <span
                    className="w-4 h-[1.5px] rounded group-hover:w-6 transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg,#ff6600,#ffaa00)' }}
                  />
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-4"
              >
                <a
                  href="/#membership"
                  onClick={(e) => handleScroll(e, '/#membership')}
                  className="flex items-center justify-center gap-2 py-3.5 text-white text-[11px] font-bold uppercase tracking-widest w-full"
                  style={{
                    background: 'linear-gradient(135deg,#ff6600,#ff3300)',
                    clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                    boxShadow: '0 0 24px rgba(255,80,0,0.3)',
                  }}
                >
                  🔥 Join ASTRA Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
