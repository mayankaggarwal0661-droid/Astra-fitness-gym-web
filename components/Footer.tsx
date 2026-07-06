'use client'

import { Share2, Heart, MessageCircle, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-orange bg-clip-text text-transparent mb-4">
              ASTRA
            </h3>
            <p className="text-muted-foreground">
              Premium fitness excellence combining luxury facilities with expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#trainers" className="text-muted-foreground hover:text-primary transition-colors">
                  Trainers
                </a>
              </li>
              <li>
                <a href="#membership" className="text-muted-foreground hover:text-primary transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#bmi" className="text-muted-foreground hover:text-primary transition-colors">
                  BMI Calculator
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Nutrition Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Personal Training
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <Share2 size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <Heart size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <Send size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
            <p>&copy; 2026 ASTRA FITNESS GYM. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
