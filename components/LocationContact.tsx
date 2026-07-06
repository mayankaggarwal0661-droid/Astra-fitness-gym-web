'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function LocationContact() {
  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Visit <span className="gradient-orange bg-clip-text text-transparent">ASTRA</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Come experience luxury fitness at our premium facility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            className="rounded-xl overflow-hidden border border-border h-96"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.9883397126486!2d75.79375!3d26.91264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4cf7e7e7e7e7%3A0x0!2sASTRA%20FITNESS!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Address */}
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground mb-3">Premium Fitness Center, Jaipur</p>
                  <a
                    href="https://maps.app.goo.gl/FyNWJ7YoNDntrcTFA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Phone</h3>
                  <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:info@astrafitness.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@astrafitness.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 6 AM - 10 PM</p>
                  <p className="text-muted-foreground">Saturday - Sunday: 7 AM - 9 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
