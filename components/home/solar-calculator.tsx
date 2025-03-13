"use client"

import type React from "react"

import { useState } from "react"
import { Calculator, Sun } from "lucide-react"

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(0)
  const [roofArea, setRoofArea] = useState<number>(0)
  const [sunlightHours, setSunlightHours] = useState<number>(5)
  const [calculationResult, setCalculationResult] = useState<any>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple calculation logic (would be more sophisticated in production)
    const estimatedSystemSize = Math.round((monthlyBill * 0.8) / (30 * sunlightHours * 0.15))
    const estimatedCost = estimatedSystemSize * 70000 // Approximate cost in INR
    const annualSavings = monthlyBill * 12 * 0.8 // 80% savings on current bill
    const paybackPeriod = estimatedCost / annualSavings

    setCalculationResult({
      systemSize: estimatedSystemSize,
      estimatedCost: estimatedCost,
      annualSavings: annualSavings,
      paybackPeriod: paybackPeriod.toFixed(1),
    })
  }

  return (
    <section className="section-padding bg-blue-600 text-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column - Calculator Form */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center mb-6">
              <Calculator size={32} className="mr-4" />
              <h2 className="text-3xl font-bold">Solar Savings Calculator</h2>
            </div>
            <p className="mb-8">
              Estimate your potential savings and system requirements based on your current electricity usage and
              available space.
            </p>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="monthly-bill" className="block mb-2 font-medium">
                  Monthly Electricity Bill (₹)
                </label>
                <input
                  type="number"
                  id="monthly-bill"
                  value={monthlyBill || ""}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="e.g., 5000"
                  required
                />
              </div>

              <div>
                <label htmlFor="roof-area" className="block mb-2 font-medium">
                  Available Roof Area (sq. ft.)
                </label>
                <input
                  type="number"
                  id="roof-area"
                  value={roofArea || ""}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="e.g., 500"
                  required
                />
              </div>

              <div>
                <label htmlFor="sunlight-hours" className="block mb-2 font-medium">
                  Average Daily Sunlight Hours
                </label>
                <select
                  id="sunlight-hours"
                  value={sunlightHours}
                  onChange={(e) => setSunlightHours(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                >
                  <option value="4">4 hours</option>
                  <option value="5">5 hours</option>
                  <option value="6">6 hours</option>
                  <option value="7">7 hours</option>
                  <option value="8">8 hours</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Calculate Savings
              </button>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className="w-full lg:w-1/2 bg-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center mb-6">
              <Sun size={32} className="mr-4" />
              <h3 className="text-2xl font-bold">Your Solar Potential</h3>
            </div>

            {calculationResult ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-sm text-white/70 mb-1">Recommended System Size</p>
                    <p className="text-3xl font-bold">{calculationResult.systemSize} kW</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-sm text-white/70 mb-1">Estimated Cost</p>
                    <p className="text-3xl font-bold">₹{(calculationResult.estimatedCost / 100000).toFixed(1)} Lakhs</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-sm text-white/70 mb-1">Annual Savings</p>
                    <p className="text-3xl font-bold">₹{(calculationResult.annualSavings / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-sm text-white/70 mb-1">Payback Period</p>
                    <p className="text-3xl font-bold">{calculationResult.paybackPeriod} Years</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                  <p className="text-sm text-white/70 mb-2">Environmental Impact</p>
                  <p className="mb-4">
                    Your solar system would offset approximately {Math.round(calculationResult.systemSize * 1.5)} tons
                    of CO2 annually, equivalent to planting {Math.round(calculationResult.systemSize * 30)} trees each
                    year.
                  </p>
                </div>

                <div className="text-center">
                  <a
                    href="/contact"
                    className="inline-block py-3 px-6 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Get a Detailed Quote
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl mb-4">Enter your details to see your potential savings with solar energy</p>
                <div className="animate-pulse flex justify-center">
                  <Sun size={48} className="opacity-50" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

