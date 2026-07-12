'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function BMICalculator() {
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [heightUnit, setHeightUnit] = useState('ft')
  const [weight, setWeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')

  const calculateBMI = () => {
    if (!weight) return
    let heightInMeters = 0
    let weightInKg = parseFloat(weight)

    if (heightUnit === 'ft') {
      if (!heightFt && !heightIn) return
      const ft = parseFloat(heightFt || '0')
      const inch = parseFloat(heightIn || '0')
      const totalInches = (ft * 12) + inch
      heightInMeters = totalInches * 0.0254
    } else if (heightUnit === 'cm') {
      if (!heightCm) return
      heightInMeters = parseFloat(heightCm) / 100
    }

    if (weightUnit === 'lbs') {
      weightInKg = weightInKg * 0.453592
    }

    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
    setBmi(parseFloat(calculatedBMI.toFixed(1)))

    if (calculatedBMI < 18.5) setCategory('Underweight')
    else if (calculatedBMI < 25) setCategory('Normal Weight')
    else if (calculatedBMI < 30) setCategory('Overweight')
    else setCategory('Obese')
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Underweight': return 'text-blue-400'
      case 'Normal Weight': return 'text-green-400'
      case 'Overweight': return 'text-yellow-400'
      case 'Obese': return 'text-red-400'
      default: return 'text-foreground'
    }
  }

  return (
    <section id="bmi" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Health Tool</span>
          <h2 className="text-4xl font-bold text-foreground mt-2">
            BMI <span className="gradient-text">Calculator</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Calculate your Body Mass Index and discover where you stand on your fitness journey.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          style={{ WebkitBackdropFilter: 'blur(12px) saturate(180%)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          viewport={{ once: true, margin: "150px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Height</label>
              <div className="flex gap-2">
                {heightUnit === 'ft' ? (
                  <>
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      placeholder="ft"
                      className="flex-1 min-w-[60px] bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      placeholder="in"
                      className="flex-1 min-w-[60px] bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </>
                ) : (
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="Enter cm"
                    className="flex-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                )}
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  className="bg-[#0a0502] border border-white/[0.08] rounded-xl px-3 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                >
                  <option value="ft">ft</option>
                  <option value="cm">cm</option>
                </select>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  className="flex-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="bg-[#0a0502] border border-white/[0.08] rounded-xl px-3 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateBMI}
            className="w-full mt-6 py-4 rounded-xl font-semibold text-white gradient-orange hover:opacity-90 transition-all hover:scale-[1.02]"
          >
            Calculate BMI
          </button>

          {bmi !== null && (
            <motion.div
              className="mt-6 text-center p-6 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-5xl font-bold text-primary">{bmi}</p>
              <p className={`text-xl font-semibold mt-2 ${getCategoryColor(category)}`}>{category}</p>
              <p className="text-muted-foreground text-sm mt-2">
                {category === 'Normal Weight'
                  ? '🎉 Great job! Keep maintaining your healthy lifestyle.'
                  : '💪 Talk to our trainers to help you reach your ideal weight!'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
