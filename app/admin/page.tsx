'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Plus, Trash2, Search, Bell, LogOut, Eye, CreditCard,
  AlertTriangle, CheckCircle, X, IndianRupee, RefreshCw, Settings,
  Tag, Image as ImageIcon, MessageSquare
} from 'lucide-react'
import {
  getMembers, addMember, deleteMember, updateMember, checkOwnerPassword,
  addPayment, getPayments, calcEndDate, daysLeft, isExpiringSoon, isExpired,
  calcBMI, bmiCategory, seedDemoData, setOwnerPassword, getOwnerPhone, setOwnerPhone,
  getActiveOffer, setActiveOffer,
  type Member, type MembershipType, type PaymentMode, type Goal, type Gender
} from '@/lib/gymData'

const MEMBERSHIP_PRICE: Record<MembershipType, number> = {
  '1day': 200, '1month': 1200, '3months': 3000, '6months': 5500, '1year': 9000, 'pt': 2500
}

const emptyForm = (): Omit<Member, 'id'> => ({
  name: '', email: '', phone: '', age: 20, gender: 'male',
  weight: 70, height: 170, membershipType: '1month',
  startDate: '',
  endDate: '',
  paymentMode: 'cash', paymentStatus: 'paid', goal: 'muscle_gain',
  pin: '', active: true, notes: '', photo: '',
})

export default function AdminPage() {
  const [authed, setAuthed]         = useState(false)
  const [pass, setPass]             = useState('')
  const [passErr, setPassErr]       = useState(false)
  const [members, setMembers]       = useState<Member[]>([])
  const [search, setSearch]         = useState('')
  const [tab, setTab]               = useState<'all' | 'active' | 'expiring' | 'expired'>('all')
  const [showAdd, setShowAdd]       = useState(false)
  const [viewMember, setViewMember] = useState<Member | null>(null)
  const [showPay, setShowPay]       = useState<Member | null>(null)
  const [form, setForm]             = useState(emptyForm())
  const [payAmount, setPayAmount]   = useState('')
  const [payNote, setPayNote]       = useState('')
  const [toast, setToast]           = useState('')
  const [showRenew, setShowRenew]   = useState<Member | null>(null)
  const [renewPlan, setRenewPlan]   = useState<MembershipType>('1month')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  
  // Settings Modal State
  const [showSettings, setShowSettings] = useState(false)
  const [oldPass, setOldPass]           = useState('')
  const [newPass, setNewPass]           = useState('')
  const [confirmPass, setConfirmPass]   = useState('')
  const [recoveryPhone, setRecoveryPhone] = useState('')

  // Offer State
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [activeOffer, setActiveOfferState]  = useState<string | null>(null)

  // Forgot Password State
  const [showForgot, setShowForgot]     = useState(false)
  const [forgotStep, setForgotStep]     = useState<'phone' | 'otp' | 'newpass'>('phone')
  const [forgotPhone, setForgotPhone]   = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [enteredOtp, setEnteredOtp]     = useState('')
  const [forgotNewPass, setForgotNewPass] = useState('')
  const [forgotConfirmPass, setForgotConfirmPass] = useState('')

  const reload = () => setMembers(getMembers())

  useEffect(() => {
    if (authed) { 
      seedDemoData()
      reload() 
      setRecoveryPhone(getOwnerPhone())
      setActiveOfferState(getActiveOffer())
    }
  }, [authed])

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showToast = (msg: string, duration = 3000) => {
    setToast(msg)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => setToast(''), duration)
  }

  function login() {
    if (checkOwnerPassword(pass)) { setAuthed(true); setPassErr(false) }
    else setPassErr(true)
  }

  function handleAdd() {
    if (!form.name || !form.phone || !form.pin) return showToast('Name, phone and PIN are required')
    if (form.pin.length !== 4) return showToast('PIN must be exactly 4 digits')
    addMember(form)
    reload(); setShowAdd(false); setForm(emptyForm()); showToast('✅ Member added!')
  }

  function handleDelete(id: string) {
    setConfirmDelete(id)
  }

  function handlePayment() {
    if (!showPay || !payAmount) return
    addPayment({ memberId: showPay.id, amount: Number(payAmount), mode: 'cash', date: new Date().toISOString().split('T')[0], note: payNote })
    updateMember(showPay.id, { paymentStatus: 'paid' })
    reload(); setShowPay(null); setPayAmount(''); setPayNote(''); showToast('💰 Payment recorded!')
  }

  function handleRenew() {
    if (!showRenew) return
    const startFrom = isExpired(showRenew.endDate) ? new Date().toISOString().split('T')[0] : showRenew.endDate
    const newEnd = calcEndDate(startFrom, renewPlan)
    updateMember(showRenew.id, { endDate: newEnd, membershipType: renewPlan, paymentStatus: 'paid' })
    addPayment({ memberId: showRenew.id, amount: MEMBERSHIP_PRICE[renewPlan], mode: 'cash', date: new Date().toISOString().split('T')[0], note: `Renewed ${renewPlan}` })
    reload(); setShowRenew(null); showToast('🔄 Membership Renewed!')
  }

  function handleSaveSettings() {
    // If they typed a new password, they must provide the old password
    if (newPass) {
      if (!checkOwnerPassword(oldPass)) return showToast('❌ Current password is incorrect')
      if (newPass.length < 6) return showToast('❌ New password must be at least 6 characters')
      if (newPass !== confirmPass) return showToast('❌ Passwords do not match')
      setOwnerPassword(newPass)
    }

    setOwnerPhone(recoveryPhone)
    
    setShowSettings(false)
    setOldPass(''); setNewPass(''); setConfirmPass('')
    showToast('✅ Settings saved successfully!')
  }

  function handleForgotSendOtp() {
    const saved = getOwnerPhone()
    if (!saved) return showToast('❌ No recovery phone set! Cannot reset password.')
    if (forgotPhone !== saved) return showToast('❌ Phone number does not match records')
    
    // Simulate sending OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString()
    setGeneratedOtp(otp)
    showToast(`📱 SIMULATED SMS: Your OTP is ${otp}`, 60000)
    setForgotStep('otp')
  }

  function handleForgotVerifyOtp() {
    if (enteredOtp !== generatedOtp) return showToast('❌ Incorrect OTP')
    setForgotStep('newpass')
    showToast('✅ OTP Verified')
  }

  function handleForgotResetPass() {
    if (forgotNewPass.length < 6) return showToast('❌ Password must be at least 6 characters')
    if (forgotNewPass !== forgotConfirmPass) return showToast('❌ Passwords do not match')
    setOwnerPassword(forgotNewPass)
    showToast('✅ Password reset successful!')
    setShowForgot(false)
    setForgotStep('phone')
    setForgotPhone('')
    setEnteredOtp('')
    setForgotNewPass('')
    setForgotConfirmPass('')
  }

  const filtered = members.filter(m => {
    const q = search.toLowerCase()
    const matches = (m.name || '').toLowerCase().includes(q) || 
                    (m.phone || '').includes(q) || 
                    (m.email || '').toLowerCase().includes(q)
    if (tab === 'active') return matches && m.active && !isExpired(m.endDate)
    if (tab === 'expiring') return matches && m.active && isExpiringSoon(m.endDate)
    if (tab === 'expired') return matches && isExpired(m.endDate)
    return matches
  })

  const stats = {
    total:    members.length,
    active:   members.filter(m => m.active && !isExpired(m.endDate)).length,
    expiring: members.filter(m => isExpiringSoon(m.endDate)).length,
    expired:  members.filter(m => isExpired(m.endDate)).length,
    revenue:  getPayments().reduce((s, p) => s + p.amount, 0),
  }

  // ── LOGIN / FORGOT PASSWORD SCREEN ─────────────────────────────────────
  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0800, #050505)' }}>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-xl"
            style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)' }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-4 rounded-2xl border border-white/[0.08] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-white/[0.02]"
        style={{ backdropFilter: 'blur(30px) saturate(200%)', WebkitBackdropFilter: 'blur(30px) saturate(200%)' }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 overflow-hidden rounded" style={{ clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))', background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
            <img src="/hanuman.png" alt="" className="w-full h-full object-cover object-top scale-[2.2] translate-y-[18%]" />
          </div>
          <div>
            <p className="text-white font-black uppercase tracking-widest text-lg" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>ASTRA</p>
            <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">{showForgot ? 'Reset Password' : 'Owner Dashboard'}</p>
          </div>
        </div>

        {!showForgot ? (
          <>
            <p className="text-white/40 text-xs mb-6">Enter owner password to continue</p>
            <input
              type="password" placeholder="Password" value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              className="w-full px-4 py-3 rounded-xl border text-white text-sm mb-3 outline-none focus:border-orange-500/60 transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: passErr ? '#f87171' : 'rgba(255,255,255,0.08)' }}
            />
            {passErr && <p className="text-red-400 text-xs mb-3">Incorrect password</p>}
            <button onClick={login} className="w-full py-3 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:opacity-90 mb-4"
              style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
              Login as Owner
            </button>
            <div className="text-center">
              <button onClick={() => setShowForgot(true)} className="text-orange-400 text-xs font-semibold hover:text-orange-300 transition-colors">Forgot Password?</button>
            </div>
            <p className="text-white/20 text-xs text-center mt-4">Default: astra@owner123</p>
          </>
        ) : (
          <AnimatePresence mode="wait">
            {forgotStep === 'phone' && (
              <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-white/40 text-xs mb-6">Enter your registered recovery phone number to receive an OTP.</p>
                <input type="tel" placeholder="Phone Number" value={forgotPhone} onChange={e => setForgotPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm mb-4 outline-none focus:border-orange-500/60" />
                <button onClick={handleForgotSendOtp} className="w-full py-3 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:opacity-90 mb-4"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>Send OTP</button>
                <div className="text-center">
                  <button onClick={() => setShowForgot(false)} className="text-white/40 text-xs hover:text-white transition-colors">Cancel</button>
                </div>
              </motion.div>
            )}
            {forgotStep === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-white/40 text-xs mb-6">Enter the 4-digit OTP sent to your phone.</p>
                <input type="text" placeholder="Enter OTP" value={enteredOtp} onChange={e => setEnteredOtp(e.target.value)} maxLength={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm mb-4 outline-none focus:border-orange-500/60 text-center tracking-widest font-bold" />
                <button onClick={handleForgotVerifyOtp} className="w-full py-3 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:opacity-90 mb-4"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>Verify OTP</button>
                <div className="text-center">
                  <button onClick={() => setShowForgot(false)} className="text-white/40 text-xs hover:text-white transition-colors">Cancel</button>
                </div>
              </motion.div>
            )}
            {forgotStep === 'newpass' && (
              <motion.div key="newpass" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-white/40 text-xs mb-6">Create a new owner password.</p>
                <input type="password" placeholder="New Password" value={forgotNewPass} onChange={e => setForgotNewPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm mb-3 outline-none focus:border-orange-500/60" />
                <input type="password" placeholder="Confirm New Password" value={forgotConfirmPass} onChange={e => setForgotConfirmPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm mb-4 outline-none focus:border-orange-500/60" />
                <button onClick={handleForgotResetPass} className="w-full py-3 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)' }}>Reset Password</button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  )

  // ── DASHBOARD ────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-xl"
            style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="border-b border-white/[0.06]" style={{ background: 'rgba(4,2,1,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 overflow-hidden" style={{ clipPath: 'polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))', background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
              <img src="/hanuman.png" alt="" className="w-full h-full object-cover object-top scale-[2.2] translate-y-[18%]" />
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-widest text-base leading-none" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>ASTRA</p>
              <p className="text-orange-500 text-[8px] uppercase tracking-[0.28em] font-bold">Owner Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {stats.expiring > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10">
                <Bell size={12} className="text-orange-400" />
                <span className="text-orange-400 text-xs font-bold">{stats.expiring} expiring soon</span>
              </div>
            )}
            <button onClick={() => setShowOfferModal(true)} className="p-2 rounded-full border border-white/[0.06] text-white/40 hover:text-white transition-colors bg-white/[0.02]">
              <Tag size={18} />
            </button>
            <button onClick={() => setShowSettings(true)} className="p-2 rounded-full border border-white/[0.06] text-white/40 hover:text-white transition-colors bg-white/[0.02]">
              <Settings size={18} />
            </button>
            <button onClick={() => setAuthed(false)} className="p-2 rounded-full border border-white/[0.06] text-white/40 hover:text-white transition-colors bg-white/[0.02]">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Members',  value: stats.total,    icon: <Users size={18} />,         color: '#a78bfa' },
            { label: 'Active',         value: stats.active,   icon: <CheckCircle size={18} />,    color: '#4ade80' },
            { label: 'Expiring Soon',  value: stats.expiring, icon: <AlertTriangle size={18} />,  color: '#fb923c' },
            { label: 'Expired',        value: stats.expired,  icon: <X size={18} />,              color: '#f87171' },
            { label: 'Total Revenue',  value: `₹${stats.revenue.toLocaleString()}`, icon: <IndianRupee size={18} />, color: '#34d399' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40 font-medium uppercase tracking-wide">{s.label}</span>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <p className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone or email…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm placeholder-white/25 outline-none focus:border-orange-500/40 transition-colors" />
          </div>
          <div className="flex gap-2">
            {(['all','active','expiring','expired'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all"
                style={{ background: tab === t ? 'linear-gradient(135deg,#ff6600,#ff3300)' : 'rgba(255,255,255,0.04)', color: tab === t ? '#fff' : 'rgba(255,255,255,0.4)', border: tab === t ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => {
            const today = new Date().toISOString().split('T')[0]
            setForm({ ...emptyForm(), startDate: today, endDate: calcEndDate(today, '1month') })
            setShowAdd(true)
          }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wide transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)', boxShadow: '0 0 20px rgba(255,80,0,0.3)' }}>
            <Plus size={14} /> Add Member
          </button>
        </div>

        {/* Member Table */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {['Member','Phone','Membership','Start','Expiry','Status','Payment','Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-16 text-white/25 text-sm">No members found</td></tr>
                )}
                {filtered.map((m, i) => {
                  const dl    = daysLeft(m.endDate)
                  const expir = isExpiringSoon(m.endDate)
                  const expd  = isExpired(m.endDate)
                  const bmi   = calcBMI(m.weight, m.height)
                  const { label: bmiLbl, color: bmiClr } = bmiCategory(bmi)
                  return (
                    <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      style={{ background: expir ? 'rgba(255,100,0,0.03)' : expd ? 'rgba(248,113,113,0.03)' : undefined }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{m.name}</p>
                            <p className="text-white/35 text-xs">{m.email || '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm">{m.phone}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                          style={{ background: 'rgba(255,100,0,0.15)', color: '#fb923c' }}>
                          {m.membershipType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs">{m.startDate}</td>
                      <td className="px-4 py-3 text-xs font-semibold"
                        style={{ color: expd ? '#f87171' : expir ? '#fb923c' : '#4ade80' }}>
                        {expd ? 'Expired' : expir ? `⚠️ ${dl}d left` : `${dl}d left`}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                          style={{ background: expd ? 'rgba(248,113,113,0.15)' : expir ? 'rgba(251,146,60,0.15)' : 'rgba(74,222,128,0.15)', color: expd ? '#f87171' : expir ? '#fb923c' : '#4ade80' }}>
                          {expd ? 'Expired' : expir ? 'Expiring' : 'Active'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                          style={{ background: m.paymentStatus === 'paid' ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)', color: m.paymentStatus === 'paid' ? '#4ade80' : '#f87171' }}>
                          {m.paymentStatus} · {m.paymentMode}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {(expd || expir) && (
                            <a href={`https://wa.me/91${m.phone}?text=${encodeURIComponent(`Hi ${m.name}, your membership at ASTRA FITNESS GYM ${expd ? 'expired on' : 'is expiring on'} ${m.endDate}. Please renew to continue your fitness journey!`)}`}
                               target="_blank" rel="noopener noreferrer"
                               title="Send WhatsApp Reminder"
                               className="p-1.5 rounded-lg text-green-400/60 hover:text-green-400 hover:bg-green-400/10 transition-all">
                              <MessageSquare size={14} />
                            </a>
                          )}
                          <button onClick={() => setViewMember(m)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><Eye size={14} /></button>
                          <button onClick={() => setShowPay(m)} className="p-1.5 rounded-lg text-orange-400/60 hover:text-orange-400 hover:bg-orange-400/10 transition-all"><CreditCard size={14} /></button>
                          <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── ADD MEMBER MODAL ── */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowAdd(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] p-6"
              style={{ background: '#0a0502' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-black uppercase text-xl" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Add New Member</h2>
                <button onClick={() => setShowAdd(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name *', key: 'name', type: 'text', span: 2 },
                  { label: 'Phone *', key: 'phone', type: 'tel' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Age', key: 'age', type: 'number' },
                  { label: 'Weight (kg)', key: 'weight', type: 'number' },
                  { label: 'Login PIN (4 digits) *', key: 'pin', type: 'text' },
                ].map(f => (
                  <div key={f.key} className={f.span === 2 ? 'col-span-2' : ''}>
                    <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">{f.label}</label>
                    <input type={f.type} value={form[f.key as keyof typeof form] as string | number}
                      onChange={e => setForm(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                      maxLength={f.key === 'pin' ? 4 : undefined}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50 transition-colors" />
                  </div>
                ))}
                
                {/* Height (ft & in) */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Height (ft & in)</label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="ft" 
                           value={form.height ? Math.floor(form.height / 30.48) : ''}
                           onChange={e => {
                             const ft = Number(e.target.value);
                             const inches = Math.round((form.height / 2.54) % 12);
                             setForm(p => ({ ...p, height: Math.round(((ft * 12) + inches) * 2.54) }))
                           }}
                           className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50 transition-colors" />
                    <input type="number" placeholder="in" 
                           value={form.height ? Math.round((form.height / 2.54) % 12) : ''}
                           onChange={e => {
                             const inches = Number(e.target.value);
                             const ft = Math.floor(form.height / 30.48);
                             setForm(p => ({ ...p, height: Math.round(((ft * 12) + inches) * 2.54) }))
                           }}
                           className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50 transition-colors" />
                  </div>
                </div>
                {/* Gender */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Gender</label>
                  <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value as Gender }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-[#0a0502] text-white text-sm outline-none focus:border-orange-500/50">
                    <option value="male">Male</option><option value="female">Female</option>
                  </select>
                </div>
                {/* Goal */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Goal</label>
                  <select value={form.goal} onChange={e => setForm(p => ({ ...p, goal: e.target.value as Goal }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-[#0a0502] text-white text-sm outline-none focus:border-orange-500/50">
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="endurance">Endurance</option>
                  </select>
                </div>
                {/* Membership */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Membership</label>
                  <select value={form.membershipType} onChange={e => {
                    const t = e.target.value as MembershipType
                    setForm(p => ({ ...p, membershipType: t, endDate: calcEndDate(p.startDate, t) }))
                  }} className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-[#0a0502] text-white text-sm outline-none focus:border-orange-500/50">
                    <option value="1day">1 Day Trial — ₹200</option>
                    <option value="1month">1 Month — ₹1,200</option>
                    <option value="3months">3 Months — ₹3,000</option>
                    <option value="6months">6 Months — ₹5,500</option>
                    <option value="1year">1 Year — ₹9,000</option>
                    <option value="pt">Personal Training — ₹2,500</option>
                  </select>
                </div>
                {/* Payment */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Payment Mode</label>
                  <select value={form.paymentMode} onChange={e => setForm(p => ({ ...p, paymentMode: e.target.value as PaymentMode }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-[#0a0502] text-white text-sm outline-none focus:border-orange-500/50">
                    <option value="cash">Cash</option><option value="online">Online / UPI</option>
                  </select>
                </div>
                {/* Start date */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Start Date</label>
                  <input type="date" value={form.startDate}
                    onChange={e => setForm(p => ({ ...p, startDate: e.target.value, endDate: calcEndDate(e.target.value, p.membershipType) }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-[#0a0502] text-white text-sm outline-none focus:border-orange-500/50" />
                </div>
                {/* End date (readonly) */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">End Date (auto)</label>
                  <input type="date" value={form.endDate} readOnly
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] text-white/50 text-sm" />
                </div>
                {/* Notes */}
                <div className="col-span-2">
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Notes</label>
                  <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50 resize-none" />
                </div>
              </div>
              {/* Price preview */}
              <div className="mt-4 p-3 rounded-xl border border-orange-500/20 bg-orange-500/5 flex items-center justify-between">
                <span className="text-white/50 text-xs">Membership Fee</span>
                <span className="text-orange-400 font-black text-lg" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                  ₹{form.membershipType ? MEMBERSHIP_PRICE[form.membershipType].toLocaleString() : 0}
                </span>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl border border-white/[0.07] text-white/50 text-sm font-semibold hover:border-white/20 transition-colors">Cancel</button>
                <button onClick={handleAdd} className="flex-1 py-3 rounded-xl text-white text-sm font-bold uppercase tracking-wide transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
                  <Plus size={15} /> Add Member
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIEW MEMBER MODAL ── */}
      <AnimatePresence>
        {viewMember && (() => {
          const m   = viewMember
          const dl  = daysLeft(m.endDate)
          const bmi = calcBMI(m.weight, m.height)
          const { label: bmiLbl, color: bmiClr } = bmiCategory(bmi)
          const payments = getPayments().filter(p => p.memberId === m.id)
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
              onClick={() => setViewMember(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] p-6"
                style={{ background: '#0a0502' }}
                onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-black shrink-0"
                      style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{m.name}</h3>
                      <p className="text-white/40 text-xs">{m.phone} · {m.email || 'No email'}</p>
                    </div>
                  </div>
                  <button onClick={() => setViewMember(null)} className="text-white/40 hover:text-white"><X size={18} /></button>
                </div>

                {/* Expiry alert */}
                {isExpiringSoon(m.endDate) && !isExpired(m.endDate) && (
                  <div className="mb-4 p-3 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center gap-2">
                    <Bell size={14} className="text-orange-400 shrink-0" />
                    <p className="text-orange-300 text-xs font-semibold">⚠️ Membership expires in {dl} day{dl !== 1 ? 's' : ''}! Please renew soon.</p>
                  </div>
                )}
                {isExpired(m.endDate) && (
                  <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-400 shrink-0" />
                    <p className="text-red-300 text-xs font-semibold">Membership has expired. Please renew to continue access.</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Gender',     value: m.gender },
                    { label: 'Age',        value: `${m.age} years` },
                    { label: 'Weight',     value: `${m.weight} kg` },
                    { label: 'Height',     value: `${Math.floor(m.height / 30.48)} ft ${Math.round((m.height / 2.54) % 12)} in` },
                    { label: 'BMI',        value: `${bmi} (${bmiLbl})`, color: bmiClr },
                    { label: 'Goal',       value: m.goal.replace('_', ' ') },
                    { label: 'Plan',       value: m.membershipType },
                    { label: 'Days Left',  value: isExpired(m.endDate) ? 'Expired' : `${dl} days`, color: isExpired(m.endDate) ? '#f87171' : dl <= 3 ? '#fb923c' : '#4ade80' },
                    { label: 'Payment',    value: `${m.paymentStatus} · ${m.paymentMode}` },
                    { label: 'Start',      value: m.startDate },
                    { label: 'End',        value: m.endDate },
                    { label: 'Member PIN', value: m.pin },
                  ].map(row => (
                    <div key={row.label} className="p-3 rounded-xl border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-white/35 text-[10px] uppercase tracking-wide font-bold mb-0.5">{row.label}</p>
                      <p className="text-sm font-semibold capitalize" style={{ color: row.color || 'rgba(255,255,255,0.85)' }}>{row.value}</p>
                    </div>
                  ))}
                </div>

                {m.notes && (
                  <div className="mb-4 p-3 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                    <p className="text-white/35 text-[10px] uppercase tracking-wide font-bold mb-1">Notes</p>
                    <p className="text-white/70 text-sm">{m.notes}</p>
                  </div>
                )}

                {/* Payment history */}
                {payments.length > 0 && (
                  <div className="mb-4">
                    <p className="text-white/35 text-[10px] uppercase tracking-wide font-bold mb-2">Payment History</p>
                    <div className="space-y-1.5">
                      {payments.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <span className="text-white/50 text-xs">{p.date} · {p.mode}</span>
                          <span className="text-green-400 text-sm font-bold">₹{p.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button onClick={() => { setShowRenew(m); setRenewPlan(m.membershipType); setViewMember(null) }}
                    className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)', boxShadow: '0 0 20px rgba(255,80,0,0.3)' }}>
                    <RefreshCw size={14} /> Renew Membership
                  </button>
                  <div className="flex gap-3">
                    <button onClick={() => { setShowPay(m); setViewMember(null) }}
                      className="flex-1 py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-orange-500/20"
                      style={{ background: 'rgba(255,100,0,0.1)', border: '1px solid rgba(255,100,0,0.3)', color: '#fb923c' }}>
                      <CreditCard size={14} /> Record Payment
                    </button>
                    <button onClick={() => handleDelete(m.id)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-red-500/20"
                      style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}>
                      <Trash2 size={14} /> Remove Member
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* ── PAYMENT MODAL ── */}
      <AnimatePresence>
        {showPay && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowPay(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-sm rounded-2xl border border-white/[0.08] p-6"
              style={{ background: '#0a0502' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-black text-lg" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Record Payment</h3>
                <button onClick={() => setShowPay(null)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <p className="text-white/50 text-sm mb-4">For: <span className="text-orange-400 font-semibold">{showPay.name}</span></p>
              <div className="space-y-3">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Amount (₹)</label>
                  <input type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder="e.g. 999"
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50 transition-colors" />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Note (optional)</label>
                  <input type="text" value={payNote} onChange={e => setPayNote(e.target.value)} placeholder="e.g. Monthly renewal"
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50 transition-colors" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowPay(null)} className="flex-1 py-3 rounded-xl border border-white/[0.07] text-white/50 text-sm font-semibold">Cancel</button>
                <button onClick={handlePayment} className="flex-1 py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
                  <IndianRupee size={14} /> Save Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RENEW MODAL ── */}
      <AnimatePresence>
        {showRenew && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowRenew(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-sm rounded-2xl border border-white/[0.08] p-6"
              style={{ background: '#0a0502' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-black text-lg" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Renew Membership</h3>
                <button onClick={() => setShowRenew(null)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <p className="text-white/50 text-sm mb-4">For: <span className="text-orange-400 font-semibold">{showRenew.name}</span></p>
              
              <div className="space-y-3">
                <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Select Plan</label>
                <select value={renewPlan} onChange={e => setRenewPlan(e.target.value as MembershipType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-[#0a0502] text-white text-sm outline-none focus:border-orange-500/50">
                  <option value="1day">1 Day Trial (1 day) — ₹200</option>
                  <option value="1month">1 Month (30 days) — ₹1,200</option>
                  <option value="3months">3 Months (90 days) — ₹3,000</option>
                  <option value="6months">6 Months (180 days) — ₹5,500</option>
                  <option value="1year">1 Year (365 days) — ₹9,000</option>
                  <option value="pt">Personal Training (30 days) — ₹2,500</option>
                </select>
                
                <div className="mt-4 p-3 rounded-xl border border-green-500/20 bg-green-500/5">
                  <p className="text-white/50 text-xs">New Expiry Date:</p>
                  <p className="text-green-400 font-bold text-sm mt-0.5">
                    {calcEndDate(isExpired(showRenew.endDate) ? new Date().toISOString().split('T')[0] : showRenew.endDate, renewPlan)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowRenew(null)} className="flex-1 py-3 rounded-xl border border-white/[0.07] text-white/50 text-sm font-semibold">Cancel</button>
                <button onClick={handleRenew} className="flex-1 py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
                  <RefreshCw size={14} /> Renew Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => setConfirmDelete(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-sm rounded-2xl border border-red-500/30 p-6 text-center"
              style={{ background: '#0a0502' }}
              onClick={e => e.stopPropagation()}>
              <AlertTriangle size={32} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-white font-black text-xl mb-2" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Remove Member?</h3>
              <p className="text-white/50 text-sm mb-6">This action cannot be undone. All data and payment history will be permanently lost.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 rounded-xl border border-white/[0.07] text-white/50 text-sm font-semibold hover:border-white/20">Cancel</button>
                <button onClick={() => {
                  deleteMember(confirmDelete); reload(); setViewMember(null); setConfirmDelete(null); showToast('🗑️ Member removed')
                }} className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 shadow-lg shadow-red-500/20"
                  style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}>
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ── SETTINGS MODAL ── */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowSettings(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-sm rounded-2xl border border-white/[0.08] p-6"
              style={{ background: '#0a0502' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-black text-xl" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Dashboard Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>

              <div className="mb-4">
                <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Recovery Phone Number</label>
                <input type="tel" value={recoveryPhone} onChange={e => setRecoveryPhone(e.target.value)} placeholder="e.g. 9876543210"
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50" />
              </div>
              <div className="mb-4">
                <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Current Password (if changing)</label>
                <input type="password" value={oldPass} onChange={e => setOldPass(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50" />
              </div>
              <div className="mb-4">
                <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">New Password</label>
                <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50" />
              </div>
              <div className="mb-6">
                <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Confirm New Password</label>
                <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50" />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowSettings(false)} className="flex-1 py-3 rounded-xl border border-white/[0.07] text-white/50 text-sm font-semibold hover:border-white/20">Cancel</button>
                <button onClick={handleSaveSettings} className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 shadow-lg shadow-orange-500/20"
                  style={{ background: 'linear-gradient(135deg,#ff6600,#ff3300)' }}>
                  Save Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OFFER MODAL ── */}
      <AnimatePresence>
        {showOfferModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowOfferModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-sm rounded-2xl border border-white/[0.08] p-6"
              style={{ background: '#0a0502' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-black text-xl flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                  <Tag size={18} className="text-orange-500" /> Manage Offer
                </h3>
                <button onClick={() => setShowOfferModal(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>

              <div className="mb-6">
                <p className="text-white/50 text-sm mb-4">Upload an offer image to display globally on the main website.</p>
                {activeOffer ? (
                  <div className="relative rounded-xl border border-white/[0.1] overflow-hidden bg-black/50 aspect-video mb-4">
                    <img src={activeOffer} alt="Active Offer" className="w-full h-full object-contain" />
                    <button onClick={() => { setActiveOffer(null); setActiveOfferState(null); showToast('🗑️ Offer removed') }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-white/[0.2] bg-white/[0.02] aspect-video flex flex-col items-center justify-center text-white/30 mb-4 p-4 text-center">
                    <ImageIcon size={32} className="mb-2 opacity-50" />
                    <p className="text-xs font-semibold">No active offer</p>
                    <p className="text-[10px] mt-1">Upload an image below to display it to visitors.</p>
                  </div>
                )}
                
                <label className="text-white/40 text-xs uppercase tracking-wide font-bold mb-1.5 block">Upload New Offer Image</label>
                <input type="file" accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = (ev) => {
                      const res = ev.target?.result as string
                      setActiveOffer(res)
                      setActiveOfferState(res)
                      showToast('✅ New offer is now live!')
                    }
                    reader.readAsDataURL(file)
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white text-xs outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-500/20 file:text-orange-400 hover:file:bg-orange-500/30"
                />
              </div>

              <button onClick={() => setShowOfferModal(false)} className="w-full py-3 rounded-xl border border-white/[0.07] text-white/50 text-sm font-semibold hover:border-white/20">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
