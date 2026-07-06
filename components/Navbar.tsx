'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'BMI Calculator', href: '#bmi' },
    { label: 'Membership', href: '#membership' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold gradient-orange bg-clip-text text-transparent">
              ASTRA
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex gap-2">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:shadow-lg hover:glow-orange transition-all font-semibold">
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-3 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg w-full mt-2 hover:shadow-lg hover:glow-orange transition-all font-semibold">
                Join Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
