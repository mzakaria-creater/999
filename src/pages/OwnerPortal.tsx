import { useState } from 'react'
import { Landmark, TrendingUp, Users, Target, AlertTriangle, ShieldCheck, BarChart3 } from 'lucide-react'
import Card from '@components/Card'

interface MerchantLeaderboard {
  name: string
  volume: number
  feesPaid: number
  growth: number
  share: number
}

interface CountryRisk {
  country: string
  code: string
  volumeShare: number
  chargebackRate: number
  riskLevel: 'low' | 'medium' | 'high'
}

export default function OwnerPortal() {
  // Growth simulation states
  const [targetVolume, setTargetVolume] = useState(15) // In Millions USD
  const [feeRate, setFeeRate] = useState(2.2) // Percentage charged to merchant
  const [networkCost, setNetworkCost] = useState(1.4) // Network cost in percentage

  const merchants: MerchantLeaderboard[] = [
    { name: 'Cairo Commerce LLC', volume: 1450000, feesPaid: 31900, growth: 22.4, share: 38 },
    { name: 'Riyadh Retail Group', volume: 1120000, feesPaid: 24640, growth: 18.5, share: 29 },
    { name: 'Dubai Fashion Hub', volume: 780000, feesPaid: 17160, growth: -4.2, share: 20 },
    { name: 'Lagos Deliveries', volume: 450000, feesPaid: 9900, growth: 48.0, share: 13 }
  ]

  const countryRisks: CountryRisk[] = [
    { country: 'Saudi Arabia', code: 'SA', volumeShare: 45, chargebackRate: 0.12, riskLevel: 'low' },
    { country: 'United Arab Emirates', code: 'AE', volumeShare: 32, chargebackRate: 0.18, riskLevel: 'low' },
    { country: 'Egypt', code: 'EG', volumeShare: 15, chargebackRate: 0.45, riskLevel: 'medium' },
    { country: 'Nigeria', code: 'NG', volumeShare: 8, chargebackRate: 1.25, riskLevel: 'high' }
  ]

  // Calculated Growth Simulator Metrics
  const simulatedGrossRevenue = (targetVolume * 1000000) * (feeRate / 100)
  const simulatedNetworkCost = (targetVolume * 1000000) * (networkCost / 100)
  const simulatedNetProfit = simulatedGrossRevenue - simulatedNetworkCost
  const simulatedMargin = simulatedGrossRevenue > 0 ? (simulatedNetProfit / simulatedGrossRevenue) * 100 : 0

  return (
    <div className="pt-20 pb-12 px-4 md:px-8 space-y-8 font-apple">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-text-secondary mt-1">Strategic EBITDA margins, top revenue contributors, risk assessments, and growth forecast simulations.</p>
        </div>
        <div className="flex items-center gap-2 bg-accent-orange/10 px-4 py-2 rounded-xl border border-accent-orange/20">
          <Target size={16} className="text-accent-orange animate-pulse" />
          <span className="text-xs font-semibold text-accent-orange">Owner Insight Console</span>
        </div>
      </div>

      {/* Owner KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">EBITDA (Run-rate)</p>
            <h3 className="text-2xl font-bold text-white mt-1">$1,240,500</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">↑ 14.8% than Q1 projections</p>
          </div>
          <div className="p-3.5 bg-accent-green/10 text-accent-green rounded-2xl">
            <TrendingUp size={24} />
          </div>
        </Card>

        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Net Profit Margin</p>
            <h3 className="text-2xl font-bold text-white mt-1">36.3%</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">Optimal gateway routing path</p>
          </div>
          <div className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl">
            <Landmark size={24} />
          </div>
        </Card>

        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Active Merchant accounts</p>
            <h3 className="text-2xl font-bold text-white mt-1">82 Clients</h3>
            <p className="text-[10px] text-text-secondary mt-1">4 Pending onboarding</p>
          </div>
          <div className="p-3.5 bg-accent-indigo/10 text-accent-indigo rounded-2xl">
            <Users size={24} />
          </div>
        </Card>

        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Strategic CAC Average</p>
            <h3 className="text-2xl font-bold text-white mt-1">$142.50</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">LTV:CAC ratio 8.2x</p>
          </div>
          <div className="p-3.5 bg-accent-orange/10 text-accent-orange rounded-2xl">
            <Target size={24} />
          </div>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Growth simulation calculator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="apple-surface p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-accent-blue" />
                Strategic Growth Forecast Simulator
              </h3>
              <p className="text-xs text-text-secondary">Slide values to model potential fee markups, processing scaling, and net income margins.</p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-text-secondary">Projected Monthly Volume</span>
                  <span className="font-bold text-white font-mono">${targetVolume} Million</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={targetVolume} 
                  onChange={(e) => setTargetVolume(parseInt(e.target.value))}
                  className="w-full accent-accent-blue bg-white/[0.1] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-text-secondary">Merchant Charge Rate</span>
                  <span className="font-bold text-white font-mono">{feeRate.toFixed(2)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="5.0" 
                  step="0.1"
                  value={feeRate} 
                  onChange={(e) => setFeeRate(parseFloat(e.target.value))}
                  className="w-full accent-accent-green bg-white/[0.1] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-text-secondary">Internal Network Processor Cost</span>
                  <span className="font-bold text-white font-mono">{networkCost.toFixed(2)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.2" 
                  max="3.0" 
                  step="0.1"
                  value={networkCost} 
                  onChange={(e) => setNetworkCost(parseFloat(e.target.value))}
                  className="w-full accent-accent-orange bg-white/[0.1] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.08] p-4 rounded-xl space-y-4">
              <span className="text-xs font-bold text-accent-blue uppercase tracking-wider block border-b border-white/[0.08] pb-2">Simulated Forecast Outcomes</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-text-secondary block">Gross Revenue</span>
                  <p className="font-bold text-white font-mono mt-0.5">${simulatedGrossRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-text-secondary block">Network Base Cost</span>
                  <p className="font-bold text-accent-red font-mono mt-0.5">${simulatedNetworkCost.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-text-secondary block">Net Profit Yield</span>
                  <p className="font-bold text-accent-green font-mono mt-0.5">${simulatedNetProfit.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-text-secondary block">Computed Margin</span>
                  <p className="font-bold text-accent-indigo font-mono mt-0.5">{simulatedMargin.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top performing merchant list */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Merchant Portfolio Contribution</h3>
              <p className="text-xs text-text-secondary">Key clients driving the largest processing volumes across active accounts.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs font-bold text-text-secondary uppercase">
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Gross Volume</th>
                    <th className="pb-3">Gross Fees Contribution</th>
                    <th className="pb-3">YoY growth</th>
                    <th className="pb-3 text-right">Volume Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-xs">
                  {merchants.map((m, idx) => (
                    <tr key={idx} className="table-row">
                      <td className="py-3.5 text-white font-semibold">{m.name}</td>
                      <td className="py-3.5 font-mono text-text-primary">${m.volume.toLocaleString()}</td>
                      <td className="py-3.5 font-mono text-text-primary">${m.feesPaid.toLocaleString()}</td>
                      <td className={`py-3.5 font-semibold ${m.growth >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                        {m.growth >= 0 ? '+' : ''}{m.growth}%
                      </td>
                      <td className="py-3.5 text-right font-mono font-bold text-accent-blue">
                        <div className="flex items-center justify-end gap-2">
                          <span>{m.share}%</span>
                          <div className="w-12 bg-white/[0.08] h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div className="bg-accent-blue h-full" style={{ width: `${m.share}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Risk metrics and heatmaps */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-accent-red" />
                Strategic Country Risk Heatmap
              </h3>
              <p className="text-xs text-text-secondary">Assessing credit cards chargeback statistics per operational region.</p>
            </div>

            <div className="space-y-4 pt-2">
              {countryRisks.map((c, idx) => (
                <div key={idx} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{c.country} ({c.code})</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      c.riskLevel === 'low' ? 'bg-accent-green/15 text-accent-green' : c.riskLevel === 'medium' ? 'bg-accent-orange/15 text-accent-orange' : 'bg-accent-red/15 text-accent-red animate-pulse'
                    }`}>
                      {c.riskLevel} Risk
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>Processing Share: <strong>{c.volumeShare}%</strong></span>
                    <span>Chargeback ratio: <strong className={c.chargebackRate > 1.0 ? 'text-accent-red font-bold' : 'text-text-primary'}>{c.chargebackRate}%</strong></span>
                  </div>

                  <div className="w-full bg-white/[0.06] h-1 rounded-full overflow-hidden">
                    <div className={`h-full ${
                      c.riskLevel === 'low' ? 'bg-accent-green' : c.riskLevel === 'medium' ? 'bg-accent-orange' : 'bg-accent-red'
                    }`} style={{ width: `${c.chargebackRate * 80}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent-green" />
                Enterprise Compliance Status
              </h3>
              <p className="text-xs text-text-secondary">Verify that OnTarget PSP satisfies security standard audit rules.</p>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                <span className="text-text-secondary">PCI-DSS compliance status</span>
                <span className="text-accent-green font-bold flex items-center gap-1"><ShieldCheck size={14} /> Passed Lvl 1</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                <span className="text-text-secondary">SLA service uptime</span>
                <span className="text-accent-green font-bold">99.98% (Current)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                <span className="text-text-secondary">Data Encryption level</span>
                <span className="text-text-primary">AES-256 GCM Hardware</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
