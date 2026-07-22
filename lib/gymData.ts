// ── Types ────────────────────────────────────────────────
export type MembershipType = '1day' | '1month' | '3months' | '6months' | '1year' | 'pt' | 'weight_lifting'
export type PaymentMode    = 'cash' | 'online'
export type Goal           = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance'
export type Gender         = 'male' | 'female'

export interface Member {
  id:             string
  name:           string
  email:          string
  phone:          string
  age:            number
  gender:         Gender
  weight:         number   // kg
  height:         number   // cm
  membershipType: MembershipType
  startDate:      string   // ISO date
  endDate:        string   // ISO date
  paymentMode:    PaymentMode
  paymentStatus:  'paid' | 'pending'
  goal:           Goal
  pin:            string   // 4-digit member login PIN
  active:         boolean
  notes:          string
  photo:          string   // base64 or empty
}

export interface Payment {
  id:       string
  memberId: string
  amount:   number
  mode:     PaymentMode
  date:     string
  note:     string
}

// ── Helpers ─────────────────────────────────────────────
const MEMBERS_KEY  = 'astra_members'
const PAYMENTS_KEY = 'astra_payments'
const OWNER_PASS_KEY = 'astra_owner_password'
const DEFAULT_PASS   = 'astra@owner123'

export function getOwnerPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_PASS
  return localStorage.getItem(OWNER_PASS_KEY) || DEFAULT_PASS
}

export function setOwnerPassword(newPass: string): void {
  localStorage.setItem(OWNER_PASS_KEY, newPass)
}

export function checkOwnerPassword(pass: string): boolean {
  return pass === getOwnerPassword()
}

const OWNER_PHONE_KEY = 'astra_owner_phone'
export function getOwnerPhone(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(OWNER_PHONE_KEY) || ''
}

export function setOwnerPhone(phone: string): void {
  localStorage.setItem(OWNER_PHONE_KEY, phone)
}

const OFFER_KEY = 'astra_active_offer'
export function getActiveOffer(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(OFFER_KEY)
}

export function setActiveOffer(offer: string | null): void {
  if (!offer) {
    localStorage.removeItem(OFFER_KEY)
  } else {
    localStorage.setItem(OFFER_KEY, offer)
  }
}

export function getMembers(): Member[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(MEMBERS_KEY)
  if (!raw) return []
  
  let members: Member[] = JSON.parse(raw)
  let changed = false
  const seen = new Set<string>()
  
  members = members.map(m => {
    if (!m.id || seen.has(m.id)) { m.id = crypto.randomUUID(); changed = true; }
    seen.add(m.id)
    return m
  })
  if (changed) saveMembers(members)
  return members
}

export function saveMembers(members: Member[]): void {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members))
}

export function addMember(m: Omit<Member, 'id'>): Member {
  const members = getMembers()
  const newMember = { ...m, id: crypto.randomUUID() }
  members.push(newMember)
  saveMembers(members)
  return newMember
}

export function updateMember(id: string, updates: Partial<Member>): void {
  const members = getMembers()
  const idx = members.findIndex(m => m.id === id)
  if (idx !== -1) {
    members[idx] = { ...members[idx], ...updates }
    saveMembers(members)
  }
}

export function deleteMember(id: string): void {
  const members = getMembers().filter(m => m.id !== id)
  saveMembers(members)
}

export function getMemberByPhone(phone: string): Member | undefined {
  return getMembers().find(m => m.phone === phone)
}

export function getPayments(): Payment[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(PAYMENTS_KEY)
  if (!raw) return []
  
  let payments: Payment[] = JSON.parse(raw)
  let changed = false
  const seen = new Set<string>()
  
  payments = payments.map(p => {
    if (seen.has(p.id)) { p.id = crypto.randomUUID(); changed = true; }
    seen.add(p.id)
    return p
  })
  if (changed) localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))
  return payments
}

export function addPayment(p: Omit<Payment, 'id'>): void {
  const payments = getPayments()
  payments.push({ ...p, id: crypto.randomUUID() })
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))
}



// ── Dates ────────────────────────────────────────────────
export function membershipDays(type: MembershipType): number {
  return { '1day': 1, '1month': 30, '3months': 90, '6months': 180, '1year': 365, 'pt': 30, 'weight_lifting': 30 }[type]
}

export function calcEndDate(startDate: string, type: MembershipType): string {
  const [y, m, d] = startDate.split('-').map(Number)
  const dateObj = new Date(y, m - 1, d)
  dateObj.setDate(dateObj.getDate() + membershipDays(type))
  const y2 = dateObj.getFullYear()
  const m2 = String(dateObj.getMonth() + 1).padStart(2, '0')
  const d2 = String(dateObj.getDate()).padStart(2, '0')
  return `${y2}-${m2}-${d2}`
}

export function daysLeft(endDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [y, m, d] = endDate.split('-').map(Number)
  const end = new Date(y, m - 1, d)
  end.setHours(0, 0, 0, 0)
  return Math.round((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function isExpiringSoon(endDate: string): boolean {
  const d = daysLeft(endDate)
  return d >= 0 && d <= 3
}

export function isExpired(endDate: string): boolean {
  return daysLeft(endDate) < 0
}

// ── BMI ──────────────────────────────────────────────────
export function calcBMI(weight: number, height: number): number {
  const hm = height / 100
  return parseFloat((weight / (hm * hm)).toFixed(1))
}

export function bmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: '#60a5fa' }
  if (bmi < 25)   return { label: 'Normal',      color: '#4ade80' }
  if (bmi < 30)   return { label: 'Overweight',  color: '#facc15' }
  return              { label: 'Obese',         color: '#f87171' }
}

// ── AI Diet Plan ─────────────────────────────────────────
export function generateDietPlan(member: Member): {
  calories: number
  protein:  number
  carbs:    number
  fat:      number
  meals:    { time: string; name: string; foods: string[]; cal: number }[]
  tips:     string[]
  avoid:    string[]
} {
  const bmi  = calcBMI(member.weight, member.height)
  const { goal, gender, age, weight } = member

  // Base calories using Mifflin-St Jeor
  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * member.height - 5 * age + 5
    : 10 * weight + 6.25 * member.height - 5 * age - 161

  let calories = Math.round(bmr * 1.55) // moderate activity

  if (goal === 'weight_loss')  calories -= 400
  if (goal === 'muscle_gain')  calories += 350
  if (goal === 'endurance')    calories += 200

  const protein = Math.round(goal === 'muscle_gain' ? weight * 2.2 : weight * 1.6)
  const fat     = Math.round(calories * 0.25 / 9)
  const carbs   = Math.round((calories - protein * 4 - fat * 9) / 4)

  type Meal = { time: string; name: string; foods: string[]; cal: number }
  const plans: Record<Goal, Meal[]> = {
    weight_loss: [
      { time: '7:00 AM', name: 'Breakfast', foods: ['2 boiled eggs', 'Oats with skimmed milk', '1 banana', 'Green tea'], cal: Math.round(calories * 0.22) },
      { time: '10:30 AM', name: 'Mid-Morning', foods: ['Handful of almonds (10–12)', '1 apple or pear'], cal: Math.round(calories * 0.08) },
      { time: '1:00 PM', name: 'Lunch', foods: ['2 whole wheat rotis', 'Dal (lentils)', 'Mixed vegetable sabzi', 'Salad with lemon'], cal: Math.round(calories * 0.30) },
      { time: '4:00 PM', name: 'Pre-Workout', foods: ['1 banana', '1 scoop whey protein (optional)', 'Black coffee'], cal: Math.round(calories * 0.12) },
      { time: '7:30 PM', name: 'Dinner', foods: ['Grilled chicken / paneer (100g)', '1 bowl brown rice', 'Steamed broccoli & carrots'], cal: Math.round(calories * 0.28) },
    ],
    muscle_gain: [
      { time: '7:00 AM', name: 'Breakfast', foods: ['5 egg whites + 2 whole eggs', 'Whole wheat toast (3 slices)', '1 glass full-fat milk', '1 banana'], cal: Math.round(calories * 0.25) },
      { time: '10:30 AM', name: 'Mid-Morning', foods: ['Greek yogurt (200g)', 'Mixed nuts (20g)', '1 fruit'], cal: Math.round(calories * 0.10) },
      { time: '1:00 PM', name: 'Lunch', foods: ['200g chicken breast / tofu', '1.5 cup rice', 'Rajma / chickpea curry', 'Salad'], cal: Math.round(calories * 0.28) },
      { time: '4:30 PM', name: 'Pre-Workout', foods: ['Peanut butter sandwich', '1 scoop whey protein', '1 banana'], cal: Math.round(calories * 0.15) },
      { time: '8:00 PM', name: 'Post-Workout Dinner', foods: ['200g grilled paneer / fish', '2 rotis', 'Lentil soup', 'Vegetables'], cal: Math.round(calories * 0.22) },
    ],
    maintenance: [
      { time: '7:30 AM', name: 'Breakfast', foods: ['Poha / upma', '2 boiled eggs or 100g paneer', 'Tea or coffee', '1 fruit'], cal: Math.round(calories * 0.22) },
      { time: '11:00 AM', name: 'Snack', foods: ['Roasted chana (handful)', '1 fruit', 'Coconut water'], cal: Math.round(calories * 0.10) },
      { time: '1:30 PM', name: 'Lunch', foods: ['2–3 rotis', 'Dal or rajma', 'Sabzi', 'Curd 1 bowl'], cal: Math.round(calories * 0.30) },
      { time: '5:00 PM', name: 'Evening', foods: ['Sprouts chaat', 'Herbal tea', 'Makhana (fox nuts)'], cal: Math.round(calories * 0.10) },
      { time: '8:00 PM', name: 'Dinner', foods: ['2 rotis', 'Light dal / soup', 'Grilled veg / chicken 100g'], cal: Math.round(calories * 0.28) },
    ],
    endurance: [
      { time: '6:30 AM', name: 'Pre-Run Snack', foods: ['1 banana', '4–5 dates', 'Black coffee'], cal: Math.round(calories * 0.10) },
      { time: '8:30 AM', name: 'Breakfast', foods: ['Oats with banana & honey', '3 eggs (any style)', '1 glass juice'], cal: Math.round(calories * 0.25) },
      { time: '12:00 PM', name: 'Lunch', foods: ['1.5 cup brown rice', 'Chicken / dal (protein-rich)', 'Vegetables', 'Salad'], cal: Math.round(calories * 0.28) },
      { time: '4:00 PM', name: 'Energy Snack', foods: ['Energy bar / peanut butter toast', '1 fruit', '500ml coconut water'], cal: Math.round(calories * 0.12) },
      { time: '7:30 PM', name: 'Dinner', foods: ['2–3 rotis', 'Dal / fish curry', 'Curd', 'Seasonal veggies'], cal: Math.round(calories * 0.25) },
    ],
  }

  const meals = plans[goal]

  const tipsMap: Record<Goal, string[]> = {
    weight_loss:  ['Drink 3–4 litres of water daily', 'Avoid eating 2 hours before sleep', 'Do 30 min cardio daily', 'Use smaller plates to control portions', 'Track meals in a diary'],
    muscle_gain:  ['Eat within 30 min post-workout', 'Sleep 8 hours for muscle recovery', 'Progressive overload every week', 'Drink 4 litres of water daily', 'Do not skip meals'],
    maintenance:  ['Stay consistent with workout schedule', 'Eat home-cooked meals mostly', 'Take rest days seriously', 'Hydrate well throughout the day'],
    endurance:    ['Carb-load before long sessions', 'Hydrate before, during, and after training', 'Include electrolytes in diet', 'Prioritize sleep for recovery', 'Stretch daily for 15 min'],
  }

  const avoidMap: Record<Goal, string[]> = {
    weight_loss:  ['Sugary drinks & soda', 'Fried & junk food', 'White bread & refined flour', 'Alcohol', 'Packaged snacks & biscuits'],
    muscle_gain:  ['Alcohol (reduces testosterone)', 'Excessive cardio', 'Skipping meals', 'Low-protein processed food'],
    maintenance:  ['Excessive sugar', 'Late-night heavy meals', 'Crash dieting', 'Skipping breakfast'],
    endurance:    ['Heavy fatty meals before training', 'Dehydration', 'Alcohol', 'Processed sugars', 'Very low-carb diets'],
  }

  return { calories, protein, carbs, fat, meals, tips: tipsMap[goal], avoid: avoidMap[goal] }
}

// ── Seed demo data ───────────────────────────────────────
export function seedDemoData() {
  if (getMembers().length > 0) return
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000 * 28).toISOString().split('T')[0]
  const demo: Omit<Member, 'id'>[] = [
    { name: 'Rahul Sharma', email: 'rahul@email.com', phone: '9876543210', age: 24, gender: 'male', weight: 75, height: 175, membershipType: '1month', startDate: yesterday, endDate: calcEndDate(yesterday, '1month'), paymentMode: 'cash', paymentStatus: 'paid', goal: 'muscle_gain', pin: '1234', active: true, notes: 'Morning batch', photo: '' },
    { name: 'Priya Singh', email: 'priya@email.com', phone: '9876543211', age: 22, gender: 'female', weight: 58, height: 162, membershipType: '3months', startDate: today, endDate: calcEndDate(today, '3months'), paymentMode: 'online', paymentStatus: 'paid', goal: 'weight_loss', pin: '2345', active: true, notes: '', photo: '' },
    { name: 'Amit Kumar', email: 'amit@email.com', phone: '9876543212', age: 30, gender: 'male', weight: 85, height: 178, membershipType: '1month', startDate: new Date(Date.now() - 86400000 * 27).toISOString().split('T')[0], endDate: calcEndDate(new Date(Date.now() - 86400000 * 27).toISOString().split('T')[0], '1month'), paymentMode: 'cash', paymentStatus: 'paid', goal: 'weight_loss', pin: '3456', active: true, notes: 'Needs diet guidance', photo: '' },
  ]
  demo.forEach(m => addMember(m))
}
