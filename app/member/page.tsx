'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut, Bell, Dumbbell, User, Target,
  Flame, Leaf, AlertTriangle, CheckCircle, X, Apple, Coffee, Sun, Moon, Send, Sparkles
} from 'lucide-react'
import {
  getMemberByPhone, updateMember, daysLeft, isExpiringSoon, isExpired,
  calcBMI, bmiCategory, generateDietPlan, seedDemoData,
  type Member, type Goal
} from '@/lib/gymData'

const GOAL_LABELS: Record<string, string> = {
  muscle_gain: '💪 Muscle Gain', weight_loss: '🔥 Weight Loss',
  maintenance: '⚖️ Maintenance', endurance: '🏃 Endurance',
}

const MEAL_ICONS: Record<string, any> = {
  'Breakfast': <Coffee size={16} />, 'Mid-Morning': <Apple size={16} />,
  'Lunch': <Sun size={16} />, 'Pre-Workout': <Flame size={16} />,
  'Dinner': <Moon size={16} />, 'Energy Snack': <Apple size={16} />,
  'Post-Workout Dinner': <Moon size={16} />, 'Pre-Run Snack': <Flame size={16} />,
  'Evening': <Apple size={16} />,
}

export default function MemberPage() {
  const [member, setMember]   = useState<Member | null>(null)
  const [phone, setPhone]     = useState('')
  const [pin, setPin]         = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [activeTab, setActiveTab] = useState<'profile' | 'bmi' | 'diet'>('profile')
  
  // Update Metrics State
  const [showEdit, setShowEdit] = useState(false)
  const [editWeight, setEditWeight] = useState('')
  const [editFt, setEditFt] = useState('')
  const [editIn, setEditIn] = useState('')

  // Update Goal State
  const [showGoalEdit, setShowGoalEdit] = useState(false)
  const [editGoal, setEditGoal] = useState<Goal>('weight_loss')


  useEffect(() => { 
    seedDemoData() 
    
    // Auto-login from online checkout
    const autoPhone = sessionStorage.getItem('astra_auto_login')
    if (autoPhone) {
      const m = getMemberByPhone(autoPhone)
      if (m) {
        setMember(m)
        sessionStorage.removeItem('astra_auto_login')
      }
    }
  }, [])

  function login() {
    const m = getMemberByPhone(phone.trim())
    if (!m) return setLoginErr('Phone number not found. Please contact the gym.')
    if (m.pin !== pin) return setLoginErr('Incorrect PIN. Please try again.')
    setMember(m); setLoginErr('')
  }

  function handleUpdateMetrics() {
    const w = parseFloat(editWeight) || 0
    const ft = parseInt(editFt) || 0
    const inches = parseInt(editIn) || 0
    
    if (w <= 0 || ft <= 0) {
      alert("Please enter a valid weight and height.")
      return
    }

    const cm = Math.round((ft * 12 + inches) * 2.54)
    updateMember(member!.id, { weight: w, height: cm })
    const m = getMemberByPhone(member!.phone)
    if (m) setMember(m)
    setShowEdit(false)
  }

  function handleUpdateGoal() {
    updateMember(member!.id, { goal: editGoal })
    const m = getMemberByPhone(member!.phone)
    if (m) setMember(m)
    setShowGoalEdit(false)
  }


  if (!member) return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0800, #050505)' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/[0.08] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-white/[0.02]"
        style={{ backdropFilter: 'blur(30px) saturate(200%)', WebkitBackdropFilter: 'blur(30px) saturate(200%)' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 overflow-hidden" style={{ clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))', background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
            <img src="/hanuman.png" alt="" className="w-full h-full object-cover object-top scale-[2.2] translate-y-[18%]" />
          </div>
          <div>
            <p className="text-white font-black uppercase tracking-widest text-lg leading-none" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>ASTRA</p>
            <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">Member Portal</p>
          </div>
        </div>
        <p className="text-white/30 text-xs mb-8">Login with your registered phone & PIN</p>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50 transition-colors" />
          </div>
          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-wide font-bold mb-1.5 block">4-Digit PIN</label>
            <input type="password" maxLength={4} placeholder="••••" value={pin}
              onChange={e => setPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50 transition-colors" />
          </div>
        </div>
        {loginErr && (
          <p className="text-red-400 text-xs mb-3 flex items-center gap-1.5">
            <AlertTriangle size={12} /> {loginErr}
          </p>
        )}
        <button onClick={login}
          className="w-full py-3 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:opacity-90 hover:scale-[1.01]"
          style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)', boxShadow: '0 0 24px rgba(255,80,0,0.3)' }}>
          Enter Portal
        </button>
        <p className="text-white/15 text-xs text-center mt-5">Demo: phone 9876543210 · pin 1234</p>
      </motion.div>
    </div>
  )

  // ── LOGGED IN ─────────────────────────────────────────
  const dl      = daysLeft(member.endDate)
  const bmi     = calcBMI(member.weight, member.height)
  const { label: bmiLbl, color: bmiClr } = bmiCategory(bmi)
  const diet    = generateDietPlan(member)
  const expired = isExpired(member.endDate)
  const expiring = isExpiringSoon(member.endDate)
  const pct     = Math.max(0, Math.min(100, (dl / { '1month': 30, '3months': 90, '6months': 180, '1year': 365 }[member.membershipType]) * 100))

  return (
    <div className="min-h-screen pb-20" style={{ background: '#050505' }}>

      {/* Header */}
      <div className="border-b border-white/[0.06] sticky top-0 z-40"
        style={{ background: 'rgba(4,2,1,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 overflow-hidden" style={{ clipPath: 'polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))', background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
              <img src="/hanuman.png" alt="" className="w-full h-full object-cover object-top scale-[2.2] translate-y-[18%]" />
            </div>
            <div className="leading-none">
              <p className="text-white font-black uppercase tracking-widest text-base" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>ASTRA</p>
              <p className="text-orange-500 text-[8px] uppercase tracking-[0.28em] font-bold">Member Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-white/50 text-sm hidden sm:block">Hi, <span className="text-orange-400 font-semibold">{member.name.split(' ')[0]}</span></p>
            <button onClick={() => { setMember(null); setPhone(''); setPin('') }}
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Expiry alerts */}
        <AnimatePresence>
          {expiring && !expired && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-2xl border border-orange-500/30 flex items-start gap-3"
              style={{ background: 'rgba(255,100,0,0.08)' }}>
              <Bell size={18} className="text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-300 font-bold text-sm">⚠️ Membership Expiring Soon!</p>
                <p className="text-orange-300/70 text-xs mt-0.5">Your membership expires in <strong>{dl} day{dl !== 1 ? 's' : ''}</strong>. Visit ASTRA to renew and keep your progress going!</p>
              </div>
            </motion.div>
          )}
          {expired && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-2xl border border-red-500/30 flex items-start gap-3"
              style={{ background: 'rgba(248,113,113,0.08)' }}>
              <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 font-bold text-sm">Membership Expired</p>
                <p className="text-red-300/70 text-xs mt-0.5">Please visit ASTRA Gym to renew your membership and regain full access.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Member card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-6 p-6 border border-white/[0.06]"
          style={{ background: 'linear-gradient(135deg, #1a0800 0%, #0d0400 60%, #050505 100%)' }}>
          <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none opacity-10">
            <img src="/hanuman.png" alt="" className="h-full object-cover object-top" />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(255,80,0,0.12) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-white font-black text-xl leading-none" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{member.name}</h2>
                  <p className="text-white/40 text-xs mt-1">{member.phone} · {member.email || 'No email'}</p>
                  <span className="mt-1.5 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                    style={{ background: 'rgba(255,100,0,0.2)', color: '#fb923c' }}>
                    {member.membershipType} plan
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/30 uppercase tracking-wide">Status</p>
                <p className="font-bold text-sm mt-0.5" style={{ color: expired ? '#f87171' : expiring ? '#fb923c' : '#4ade80' }}>
                  {expired ? '❌ Expired' : expiring ? '⚠️ Expiring' : '✅ Active'}
                </p>
              </div>
            </div>

            {/* Membership countdown bar */}
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-white/40 text-xs">Membership Progress</span>
                <span className="text-xs font-bold" style={{ color: expired ? '#f87171' : expiring ? '#fb923c' : '#4ade80' }}>
                  {expired ? 'Expired' : `${dl} days left`}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{ background: expired ? '#f87171' : expiring ? 'linear-gradient(90deg,#fb923c,#ff6600)' : 'linear-gradient(90deg,#ff6600,#4ade80)' }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-white/25 text-[10px]">{member.startDate}</span>
                <span className="text-white/25 text-[10px]">{member.endDate}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {([
            { key: 'profile', label: 'Profile', icon: <User size={14} /> },
            { key: 'bmi',     label: 'BMI',     icon: <Target size={14} /> },
            { key: 'diet',    label: 'Diet Plan', icon: <Leaf size={14} /> },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200"
              style={{
                background: activeTab === t.key ? 'linear-gradient(135deg,#ff6600,#ff3300)' : 'transparent',
                color: activeTab === t.key ? '#fff' : 'rgba(255,255,255,0.35)',
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Age',       value: `${member.age} years` },
                { label: 'Gender',    value: member.gender },
                { label: 'Weight',    value: `${member.weight} kg` },
                { label: 'Height',    value: `${Math.floor(member.height / 30.48)} ft ${Math.round((member.height / 2.54) % 12)} in` },
                { label: 'Goal',      value: GOAL_LABELS[member.goal] },
                { label: 'Payment',   value: `${member.paymentStatus} · ${member.paymentMode}` },
                { label: 'Joined',    value: member.startDate },
                { label: 'Expires',   value: member.endDate },
              ].map(row => (
                <div key={row.label} className="p-4 rounded-2xl border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-white/30 text-[10px] uppercase tracking-wide font-bold mb-1">{row.label}</p>
                  <p className="text-white/85 text-sm font-semibold capitalize">{row.value}</p>
                </div>
              ))}
            </div>
            {member.notes && (
              <div className="mt-3 p-4 rounded-2xl border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-white/30 text-[10px] uppercase tracking-wide font-bold mb-1">Trainer Notes</p>
                <p className="text-white/70 text-sm">{member.notes}</p>
              </div>
            )}

            {/* Update Metrics */}
            <div className="mt-6">
              {!showEdit ? (
                <button onClick={() => {
                  setEditWeight(member.weight.toString())
                  setEditFt(Math.floor(member.height / 30.48).toString())
                  setEditIn(Math.round((member.height / 2.54) % 12).toString())
                  setShowEdit(true)
                }} className="w-full py-3 rounded-xl border border-white/[0.07] text-white/60 text-sm font-semibold hover:border-white/20 transition-all flex items-center justify-center gap-2">
                  <Target size={14} /> Update Weight & Height
                </button>
              ) : (
                <div className="p-4 rounded-2xl border border-orange-500/30" style={{ background: 'rgba(255,100,0,0.05)' }}>
                  <p className="text-white font-bold text-sm mb-3">Update Metrics</p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase font-bold block mb-1">Weight (kg)</label>
                      <input type="number" value={editWeight} onChange={e => setEditWeight(e.target.value)} className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-orange-500/50" />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-white/40 text-[10px] uppercase font-bold block mb-1">Height (ft)</label>
                        <input type="number" value={editFt} onChange={e => setEditFt(e.target.value)} className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-orange-500/50" />
                      </div>
                      <div className="flex-1">
                        <label className="text-white/40 text-[10px] uppercase font-bold block mb-1">(in)</label>
                        <input type="number" value={editIn} onChange={e => setEditIn(e.target.value)} className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-orange-500/50" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowEdit(false)} className="flex-1 py-2 rounded-lg border border-white/[0.07] text-white/50 text-xs font-semibold">Cancel</button>
                    <button onClick={handleUpdateMetrics} className="flex-1 py-2 rounded-lg text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>Save Metrics</button>
                  </div>
                </div>
              )}
            </div>

            {/* Update Goal */}
            <div className="mt-3">
              {!showGoalEdit ? (
                <button onClick={() => {
                  setEditGoal(member.goal)
                  setShowGoalEdit(true)
                }} className="w-full py-3 rounded-xl border border-white/[0.07] text-white/60 text-sm font-semibold hover:border-white/20 transition-all flex items-center justify-center gap-2">
                  <Flame size={14} /> Change Fitness Goal
                </button>
              ) : (
                <div className="p-4 rounded-2xl border border-orange-500/30" style={{ background: 'rgba(255,100,0,0.05)' }}>
                  <p className="text-white font-bold text-sm mb-3">Select New Goal</p>
                  <div className="mb-4">
                    <select value={editGoal} onChange={e => setEditGoal(e.target.value as Goal)} 
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-orange-500/50 appearance-none">
                      {Object.entries(GOAL_LABELS).map(([k, v]) => (
                        <option key={k} value={k} className="bg-black text-white">{v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowGoalEdit(false)} className="flex-1 py-2 rounded-lg border border-white/[0.07] text-white/50 text-xs font-semibold">Cancel</button>
                    <button onClick={handleUpdateGoal} className="flex-1 py-2 rounded-lg text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>Save Goal</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── BMI TAB ── */}
        {activeTab === 'bmi' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* BMI Dial */}
            <div className="rounded-2xl border border-white/[0.06] p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">Your BMI Score</p>
              <div className="relative inline-flex items-center justify-center mb-4">
                <svg viewBox="0 0 120 120" className="w-36 h-36">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <motion.circle cx="60" cy="60" r="48" fill="none" stroke={bmiClr} strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 48}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - Math.min(bmi, 40) / 40) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-4xl font-black text-white" style={{ fontFamily: "'Barlow Condensed',sans-serif", color: bmiClr }}>{bmi}</p>
                  <p className="text-xs text-white/40">BMI</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ background: `${bmiClr}15`, borderColor: `${bmiClr}40`, color: bmiClr }}>
                <span className="text-sm font-bold">{bmiLbl}</span>
              </div>
            </div>

            {/* BMI Scale */}
            <div className="rounded-2xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">BMI Scale</p>
              {[
                { label: 'Underweight', range: '< 18.5', color: '#60a5fa' },
                { label: 'Normal',      range: '18.5 – 24.9', color: '#4ade80' },
                { label: 'Overweight', range: '25 – 29.9', color: '#facc15' },
                { label: 'Obese',       range: '≥ 30', color: '#f87171' },
              ].map(c => (
                <div key={c.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                    <span className="text-white/70 text-sm" style={{ fontWeight: bmiLbl === c.label ? 700 : 400, color: bmiLbl === c.label ? c.color : undefined }}>{c.label}</span>
                  </div>
                  <span className="text-white/40 text-xs">{c.range}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Weight', value: `${member.weight} kg` },
                { label: 'Height', value: `${Math.floor(member.height / 30.48)} ft ${Math.round((member.height / 2.54) % 12)} in` },
                { label: 'Ideal Weight', value: `${Math.round(22 * (member.height / 100) ** 2)} kg` },
                { label: 'Target', value: GOAL_LABELS[member.goal] },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-2xl border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-white/30 text-[10px] uppercase tracking-wide font-bold mb-1">{s.label}</p>
                  <p className="text-white text-base font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── DIET TAB ── */}
        {activeTab === 'diet' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            

            {/* Macros */}
            <div className="rounded-2xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
                AI Diet Plan · {GOAL_LABELS[member.goal]}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Calories', value: `${diet.calories}`, unit: 'kcal', color: '#fb923c' },
                  { label: 'Protein',  value: `${diet.protein}`, unit: 'g', color: '#60a5fa' },
                  { label: 'Carbs',    value: `${diet.carbs}`, unit: 'g', color: '#4ade80' },
                  { label: 'Fat',      value: `${diet.fat}`, unit: 'g', color: '#facc15' },
                ].map(m => (
                  <div key={m.label} className="text-center p-3 rounded-xl border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-xl font-black" style={{ color: m.color, fontFamily: "'Barlow Condensed',sans-serif" }}>{m.value}</p>
                    <p className="text-white/30 text-[9px] uppercase tracking-wide">{m.unit}</p>
                    <p className="text-white/50 text-[10px] mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Plan */}
            <div className="space-y-3">
              {diet.meals.map((meal, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className="rounded-2xl border border-white/[0.05] p-4 flex gap-4"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-orange-400"
                    style={{ background: 'rgba(255,100,0,0.12)' }}>
                    {MEAL_ICONS[meal.name] || <Dumbbell size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-bold text-sm">{meal.name}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-white/30 text-[10px]">{meal.time}</span>
                        <span className="text-orange-400 text-[10px] font-bold">{meal.cal} kcal</span>
                      </div>
                    </div>
                    <ul className="space-y-0.5">
                      {meal.foods.map((f, fi) => (
                        <li key={fi} className="text-white/50 text-xs flex items-start gap-1.5">
                          <span className="text-orange-500/60 mt-0.5 shrink-0">•</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tips */}
            <div className="rounded-2xl border border-green-500/20 p-5" style={{ background: 'rgba(74,222,128,0.04)' }}>
              <p className="text-green-400 text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                <CheckCircle size={13} /> Nutrition Tips
              </p>
              <ul className="space-y-2">
                {diet.tips.map((t, i) => (
                  <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid */}
            <div className="rounded-2xl border border-red-500/20 p-5" style={{ background: 'rgba(248,113,113,0.04)' }}>
              <p className="text-red-400 text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                <X size={13} /> Foods to Avoid
              </p>
              <ul className="space-y-2">
                {diet.avoid.map((a, i) => (
                  <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 shrink-0">✗</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
