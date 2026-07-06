'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [heightUnit, setHeightUnit] = useState('cm')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')

  const calculateBMI = () => {
    if (!height || !weight) return

    let heightInMeters = parseFloat(height)
    let weightInKg = parseFloat(weight)

    // Convert if necessary
    if (heightUnit === 'inches') {
      heightInMeters = heightInMeters * 0.0254
    } else if (heightUnit === 'cm') {
      heightInMeters = heightInMeters / 100
    }

    if (weightUnit === 'lbs') {
      weightInKg = weightInKg * 0.453592
    }

    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
    setBmi(parseFloat(calculatedBMI.toFixed(1)))

    // Determine category
    if (calculatedBMI < 18.5) setCategory('Underweight')
    else if (calculatedBMI < 25) setCategory('Normal Weight')
    else if (calculatedBMI < 30) setCategory('Overweight')
    else setCategory('Obese')
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Underweight':
        return 'text-blue-400'
      case 'Normal Weight':
        return 'text-green-400'
      case 'Overweight':
        return 'text-yellow-400'
      case 'Obese':
        return 'text-red-400'
      default:
        return 'text-foreground'
    }
  }

  return (
    <section id="bmi" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Calculate Your <span className="gradient-orange bg-clip-text text-transparent">BMI</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Know your body metrics and start your fitness journey with us.
          </p>
        </motion.div>

        <motion.div
          className="bg-card border border-border rounded-2xl p-8 sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Height Input */}
            <div>
              <label className="block text-foreground font-semibold mb-3">Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                  className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                  <option value="inches">inches</option>
                </select>
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <label className="block text-foreground font-semibold mb-3">Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateBMI}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:glow-orange-lg transition-all"
          >
            Calculate BMI
          </button>

          {/* Results */}
          {bmi !== null && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-muted-foreground mb-2">Your BMI</p>
              <p className="text-6xl font-bold text-primary mb-4">{bmi}</p>
              <p className={`text-2xl font-bold mb-6 ${getCategoryColor(category)}`}>
                {category}
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:glow-orange-lg transition-all font-semibold">
                Get Personalized Diet Plan
              </button>
            </motion.div>
          )}

          {/* BMI Chart */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-foreground font-semibold mb-4">BMI Categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                <p className="text-blue-400 font-semibold">Underweight</p>
                <p className="text-sm text-muted-foreground">Below 18.5</p>
              </div>
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                <p className="text-green-400 font-semibold">Normal</p>
                <p className="text-sm text-muted-foreground">18.5 - 24.9</p>
              </div>
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <p className="text-yellow-400 font-semibold">Overweight</p>
                <p className="text-sm text-muted-foreground">25 - 29.9</p>
              </div>
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                <p className="text-red-400 font-semibold">Obese</p>
                <p className="text-sm text-muted-foreground">30+</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
