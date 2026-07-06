'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    duration: '/month',
    description: 'Perfect for beginners',
    features: [
      'Access to gym equipment',
      'Locker facilities',
      'Basic fitness assessment',
      'Community access',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹2,499',
    duration: '/month',
    description: 'Most popular choice',
    features: [
      'All Basic features',
      '2 Personal training sessions/month',
      'Nutrition consultation',
      'Progress tracking',
      'Group classes access',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹4,999',
    duration: '/month',
    description: 'For serious athletes',
    features: [
      'All Pro features',
      '4 Personal training sessions/month',
      'Custom meal plans',
      'Body composition analysis',
      'Supplement guidance',
      'Unlimited classes',
      'Priority booking',
    ],
    popular: false,
  },
  {
    name: 'Elite',
    price: '₹9,999',
    duration: '/month',
    description: 'Ultimate membership',
    features: [
      'All Premium features',
      'Unlimited personal training',
      'Dedicated trainer',
      'Monthly fitness assessment',
      'Recovery services (massage)',
      'VIP facilities access',
      '24/7 gym access',
      'One-on-one consultation',
    ],
    popular: false,
  },
]

export function MembershipPlans() {
  return (
    <section id="membership" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Membership <span className="gradient-orange bg-clip-text text-transparent">Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your fitness journey. Cancel anytime, no long-term contracts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-xl overflow-hidden transition-all ${
                plan.popular
                  ? 'border-2 border-primary shadow-lg shadow-primary/20 lg:scale-105'
                  : 'border border-border'
              } bg-card hover:shadow-lg hover:glow-orange`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={!plan.popular ? { y: -5 } : {}}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="bg-primary text-primary-foreground py-2 text-center font-bold text-sm">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.duration}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Billed monthly</p>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg font-bold mb-8 transition-all ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:glow-orange-lg'
                      : 'bg-secondary border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  Choose Plan
                </button>

                {/* Features */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Features
                  </p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 bg-card border border-border rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Not sure which plan is right?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a free consultation with our fitness experts to get personalized recommendations
            based on your fitness goals and lifestyle.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:glow-orange-lg transition-all font-semibold">
            Book Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  )
}
