'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook, Map } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contact" className="relative" style={{ background: '#0a0502' }}>
      {/* ── 4D MAP SECTION ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] rounded-3xl p-1 overflow-hidden group perspective-[1000px]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,102,0,0.4), rgba(255,51,0,0.1), transparent)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,102,0,0.15)'
          }}
        >
          <div className="absolute inset-0 bg-black/60 rounded-3xl" />
          
          {/* Animated Glows */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/20 blur-[80px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="relative w-full h-full rounded-[22px] overflow-hidden border border-white/5 transition-transform duration-700 ease-out group-hover:rotate-x-2 group-hover:scale-[1.01]"
               style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Custom 4D Logo Map Marker Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] z-20 pointer-events-none flex flex-col items-center">
              {/* Logo Hexagon */}
              <div className="w-16 h-16 overflow-hidden border border-orange-400 shadow-[0_0_30px_rgba(255,100,0,0.6)] bg-white" 
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <img src="/astra-logo.jpg" alt="Astra Logo" className="w-full h-full object-cover object-center scale-[2.0]" />
              </div>
              {/* Label */}
              <div className="mt-1 px-3 py-1 bg-black/90 backdrop-blur-md border border-orange-500/50 rounded shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                <span className="text-orange-400 text-[11px] font-black uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>ASTRA FITNESS GYM</span>
              </div>
              {/* Pin Line */}
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-transparent shadow-[0_0_10px_rgba(255,100,0,1)]" />
            </div>

            <a href="https://maps.app.goo.gl/FyNWJ7YoNDntrcTFA" target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,100,0,0.3)]">
              <Map size={14} /> Open in Maps
            </a>

            {/* Dark Orange Tinted Map using CSS Filters */}
            <iframe 
              src="https://maps.google.com/maps?q=Astra%20Fitness%20Gym%20Haridwar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ 
                border: 0,
                filter: 'invert(100%) hue-rotate(180deg) sepia(40%) saturate(300%) hue-rotate(340deg) brightness(80%) contrast(120%)',
                mixBlendMode: 'screen'
              }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/[0.05] pt-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-black uppercase text-white mb-4 leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              ASTRA <span className="text-orange-500">GYM</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6 font-medium">
              Train Like a Warrior | Cardio | CrossFit | Modern Equipment. Personal training available.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/astra_gym_haridwar" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-orange-400 hover:border-orange-400/50 hover:bg-orange-400/10 transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/183CzpYYer/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-orange-400 hover:border-orange-400/50 hover:bg-orange-400/10 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-orange-400 hover:border-orange-400/50 hover:bg-orange-400/10 transition-all">
                <Youtube size={18} />
              </a>
            </div>
            <p className="text-white/30 text-xs mt-4">Owner: <a href="https://instagram.com/abhinavshukla_.1" target="_blank" className="hover:text-orange-400">@abhinavshukla_.1</a></p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-widest text-sm mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Motivation', 'BMI Calculator', 'Membership Plans', 'Gallery'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().split(' ')[0]}`} className="text-white/40 hover:text-orange-400 text-sm transition-colors font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-widest text-sm mb-5">Specialties</h3>
            <ul className="space-y-3">
              {['CrossFit Training', 'Cardio Fitness', 'Modern Equipment', 'Personal Training'].map((s) => (
                <li key={s}>
                  <span className="text-white/40 text-sm font-medium">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-widest text-sm mb-5">Find Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/40 font-medium">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <span>Haridwar, Uttarakhand<br/><span className="text-xs text-white/20">(See map above for exact location)</span></span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40 font-medium">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+91 94109 64122</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40 font-medium">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>astrafitnessg@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">© 2025 ASTRA FITNESS GYM. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-orange-400 text-xs font-semibold uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-orange-400 text-xs font-semibold uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
