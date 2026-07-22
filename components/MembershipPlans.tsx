'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, X, CreditCard } from 'lucide-react'
import { calcEndDate, addMember, getOwnerPhone, type MembershipType, type Goal, type Gender } from '@/lib/gymData'

const plans: { key: MembershipType, name: string, price: string, numericPrice: number, duration: string, desc: string, popular: boolean, features: string[] }[] = [
  {
    key: '1day',
    name: '1 Day Trial',
    price: '₹200',
    numericPrice: 200,
    duration: '1 day',
    desc: 'Try before you commit',
    popular: false,
    features: ['Full gym access for 1 day', 'Basic fitness assessment', 'Equipment guidance'],
  },
  {
    key: 'weight_lifting',
    name: 'Weight Lifting Only',
    price: '₹1,000',
    numericPrice: 1000,
    duration: '30 days',
    desc: 'No treadmill, just iron',
    popular: false,
    features: [
      'Access to weight lifting section',
      'No treadmill access',
      'Website member section access',
    ],
  },
  {
    key: '1month',
    name: '1 Month',
    price: '₹1,200',
    numericPrice: 1200,
    duration: '30 days',
    desc: 'Perfect for beginners',
    popular: false,
    features: [
      'Access to gym equipment',
      'Basic fitness assessment',
      'AI Diet Generation',
    ],
  },
  {
    key: '3months',
    name: '3 Months',
    price: '₹3,000',
    numericPrice: 3000,
    duration: '90 days',
    desc: 'Most popular choice',
    popular: true,
    features: [
      'All 1-Month features',
      'Nutrition consultation',
      'Progress tracking',
    ],
  },
  {
    key: '6months',
    name: '6 Months',
    price: '₹5,500',
    numericPrice: 5500,
    duration: '180 days',
    desc: 'For serious athletes',
    popular: false,
    features: [
      'All 3-Months features',
      'Custom meal plans',
      'Body composition analysis',
      'Supplement guidance',
    ],
  },
  {
    key: '1year',
    name: '1 Year',
    price: '₹9,000',
    numericPrice: 9000,
    duration: '365 days',
    desc: 'Ultimate membership',
    popular: false,
    features: [
      'All 6-Months features',
      'Extended access duration',
    ],
  },
  {
    key: 'pt',
    name: 'Personal Training',
    price: '₹2,500',
    numericPrice: 2500,
    duration: '30 days',
    desc: 'Dedicated 1-on-1 coaching',
    popular: false,
    features: [
      'Dedicated expert trainer',
      'Customized workout plan',
      'Daily diet monitoring',
      'Form correction & safety',
    ],
  },
]

export function MembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)
  const [err, setErr] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', age: 20, gender: 'male' as Gender,
    weight: 70, height: 170, goal: 'muscle_gain' as Goal, pin: ''
  })

  function handleCheckout() {
    if (!form.name || !form.phone || !form.pin) return setErr('Name, Phone, and PIN are required.')
    if (form.pin.length !== 4) return setErr('PIN must be exactly 4 digits.')
    
    setErr('')
    setIsProcessing(true)

    setTimeout(() => {
      // Local dates to prevent timezone mismatches
      const todayDate = new Date()
      const y = todayDate.getFullYear()
      const m = String(todayDate.getMonth() + 1).padStart(2, '0')
      const d = String(todayDate.getDate()).padStart(2, '0')
      const todayStr = `${y}-${m}-${d}`

      const newMember = addMember({
        ...form,
        email: '',
        membershipType: selectedPlan!.key,
        startDate: todayStr,
        endDate: calcEndDate(todayStr, selectedPlan!.key),
        paymentMode: 'online',
        paymentStatus: 'pending',
        active: false,
        notes: 'Online Registration (Pending Payment)',
        photo: ''
      })

      // Set temporary token so they can log in
      sessionStorage.setItem('astra_auto_login', form.phone)

      // Generate WhatsApp link
      const ownerPhone = getOwnerPhone() || '9410964122'
      const message = `Hi ASTRA FITNESS GYM, I want to purchase the ${selectedPlan!.name} membership for ₹${selectedPlan!.numericPrice.toLocaleString()}.\n\nMy Details:\nName: ${form.name}\nPhone: ${form.phone}\nGoal: ${form.goal}\n\nPlease share the payment details so I can activate my dashboard!`
      const waLink = `https://wa.me/91${ownerPhone}?text=${encodeURIComponent(message)}`

      // Open WhatsApp in a new tab (if possible) or just redirect
      window.open(waLink, '_blank')
      window.location.href = '/member'
    }, 1500)
  }

  return (
    <section id="membership" className="relative py-20 overflow-hidden" style={{ background: '#050505' }}>
      
      {/* ── Background Elements ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]" style={{ background: 'linear-gradient(90deg,transparent,#ff6600 40%,#ffaa00 60%,transparent)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(255,100,0,0.08) 0%, transparent 60%)' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#ff7700' }}>Pricing</span>
          <h2 className="font-black uppercase text-white mt-2 leading-none" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontFamily: "'Barlow Condensed', sans-serif" }}>
            Membership <span style={{ background: 'linear-gradient(90deg,#ff6600,#ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Plans</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl mx-auto">
            Choose the plan that fits your goals. Every plan comes with access to our world-class facilities and AI tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative rounded-2xl p-7 border flex flex-col group overflow-hidden backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              style={{
                background: plan.popular ? 'rgba(255,100,0,0.05)' : 'rgba(255,255,255,0.02)',
                borderColor: plan.popular ? 'rgba(255,102,0,0.3)' : 'rgba(255,255,255,0.1)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              viewport={{ once: true, margin: "150px" }}
              whileHover={{ scale: 1.02, borderColor: plan.popular ? 'rgba(255,102,0,0.6)' : 'rgba(255,102,0,0.3)' }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse at top left, rgba(255,100,0,0.08) 0%, transparent 60%)' }} />

              {plan.popular && (
                <div className="absolute top-0 right-6 flex items-center justify-center pt-2">
                  <div className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-b-md shadow-lg shadow-orange-500/40">
                    <Star size={10} className="inline mr-1 mb-0.5" fill="white" /> POPULAR
                  </div>
                </div>
              )}

              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em' }}>{plan.name}</h3>
                <p className="text-white/40 text-xs mt-1">{plan.desc}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-orange-400" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{plan.price}</span>
                  <span className="text-white/30 text-xs uppercase tracking-widest">/ {plan.duration}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4 flex-1 relative z-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                    <Check size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan)}
                className="mt-8 relative z-10 w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
                style={{
                  background: plan.popular ? 'linear-gradient(135deg,#ff6600,#ff3300)' : 'transparent',
                  border: plan.popular ? 'none' : '1px solid rgba(255,100,0,0.5)',
                  color: plan.popular ? '#fff' : '#fb923c',
                  boxShadow: plan.popular ? '0 0 20px rgba(255,80,0,0.3)' : 'none'
                }}
              >
                Join Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CHECKOUT MODAL ── */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)' }}>
            
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-3xl border border-white/[0.08] p-1 flex flex-col max-h-[90vh]"
              style={{ background: 'linear-gradient(180deg, #1a0a05 0%, #050505 100%)' }}>
              
              <div className="overflow-y-auto custom-scrollbar p-6 rounded-[22px]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-white font-black uppercase text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Complete Registration</h3>
                    <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mt-1">
                      {selectedPlan.name} Plan • {selectedPlan.price}
                    </p>
                  </div>
                  <button onClick={() => { setSelectedPlan(null); setErr('') }} disabled={isProcessing} className="text-white/40 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                    <X size={18} />
                  </button>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Full Name *</label>
                    <input type="text" value={form.name} disabled={isProcessing}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/40 text-white text-sm outline-none focus:border-orange-500/50" />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Phone Number *</label>
                    <input type="tel" value={form.phone} disabled={isProcessing}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/40 text-white text-sm outline-none focus:border-orange-500/50" />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Set PIN (4 Digits) *</label>
                    <input type="text" maxLength={4} value={form.pin} disabled={isProcessing} placeholder="For Portal Login"
                      onChange={e => setForm(p => ({ ...p, pin: e.target.value.replace(/\D/g, '') }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/40 text-white text-sm outline-none focus:border-orange-500/50" />
                  </div>
                  
                  <div className="col-span-2 my-2 h-[1px] bg-white/[0.05]" />
                  
                  <div className="col-span-2">
                    <p className="text-orange-500/80 text-[10px] uppercase tracking-widest font-bold mb-4">Body Profile (For AI Diet)</p>
                  </div>

                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Gender</label>
                    <select value={form.gender} disabled={isProcessing} onChange={e => setForm(p => ({ ...p, gender: e.target.value as Gender }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black text-white text-sm outline-none focus:border-orange-500/50">
                      <option value="male">Male</option><option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Age</label>
                    <input type="number" value={form.age} disabled={isProcessing} onChange={e => setForm(p => ({ ...p, age: Number(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/40 text-white text-sm outline-none focus:border-orange-500/50" />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Weight (kg)</label>
                    <input type="number" value={form.weight} disabled={isProcessing} onChange={e => setForm(p => ({ ...p, weight: Number(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/40 text-white text-sm outline-none focus:border-orange-500/50" />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Height (cm)</label>
                    <input type="number" value={form.height} disabled={isProcessing} onChange={e => setForm(p => ({ ...p, height: Number(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/40 text-white text-sm outline-none focus:border-orange-500/50" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Primary Goal</label>
                    <select value={form.goal} disabled={isProcessing} onChange={e => setForm(p => ({ ...p, goal: e.target.value as Goal }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black text-white text-sm outline-none focus:border-orange-500/50">
                      <option value="weight_loss">Weight Loss</option>
                      <option value="muscle_gain">Muscle Gain</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="endurance">Endurance</option>
                    </select>
                  </div>
                </div>

                {err && <p className="text-red-400 text-xs font-semibold mb-4 text-center">{err}</p>}

                <button onClick={handleCheckout} disabled={isProcessing}
                  className="w-full py-4 rounded-xl text-white text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)', boxShadow: '0 0 30px rgba(255,80,0,0.25)' }}>
                  {isProcessing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <>
                      <CreditCard size={18} /> Pay {selectedPlan.price} & Join Now
                    </>
                  )}
                  
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-[20%]"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', transform: 'skewX(-20deg)' }}
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </button>
                <p className="text-center text-white/20 text-[10px] mt-4 font-semibold uppercase tracking-widest">
                  Secure online checkout simulation
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
