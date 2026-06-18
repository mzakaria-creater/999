import { useState } from 'react'
import { Wallet, Landmark, RefreshCcw, Percent, AlertTriangle, ArrowUpRight, TrendingUp, HelpCircle, CheckCircle } from 'lucide-react'
import Card from '@components/Card'
import Chart from '@components/Chart'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useLanguage } from '@/context/LanguageContext'

interface WalletAccount {
  id: string
  region: string
  currency: string
  balance: number
  threshold: number
  bankName: string
  status: 'healthy' | 'warning' | 'critical'
}

interface SettlementCycle {
  id: string
  gateway: string
  cyclePeriod: string
  expectedAmount: number
  actualReceived: number
  matchedCount: number
  mismatchedCount: number
  status: 'synced' | 'pending_sync' | 'mismatch'
}

const REVENUE_DATA = [
  { name: '01 Jun', GrossVolume: 4200000, NetworkCost: 3800000, NetRevenue: 400000 },
  { name: '03 Jun', GrossVolume: 4800000, NetworkCost: 4300000, NetRevenue: 500000 },
  { name: '05 Jun', GrossVolume: 5100000, NetworkCost: 4500000, NetRevenue: 600000 },
  { name: '07 Jun', GrossVolume: 4900000, NetworkCost: 4350000, NetRevenue: 550000 },
  { name: '09 Jun', GrossVolume: 5800000, NetworkCost: 5100000, NetRevenue: 700000 },
  { name: '11 Jun', GrossVolume: 6200000, NetworkCost: 5450000, NetRevenue: 750000 },
  { name: '13 Jun', GrossVolume: 7100000, NetworkCost: 6200000, NetRevenue: 900000 },
]

export default function FinancialPortal() {
  const { t } = useLanguage()
  const [wallets, setWallets] = useState<WalletAccount[]>([
    { id: 'wa-1', region: 'United Arab Emirates', currency: 'AED', balance: 3540000, threshold: 500000, bankName: 'Mashreq Bank', status: 'healthy' },
    { id: 'wa-2', region: 'Saudi Arabia', currency: 'SAR', balance: 12100000, threshold: 1000000, bankName: 'Saudi National Bank', status: 'healthy' },
    { id: 'wa-3', region: 'Egypt (Mobile Wallets)', currency: 'EGP', balance: 320000, threshold: 500000, bankName: 'Banque Misr', status: 'critical' },
    { id: 'wa-4', region: 'Nigeria (Settlement)', currency: 'NGN', balance: 8400000, threshold: 10000000, bankName: 'Access Bank', status: 'warning' }
  ])

  const [settlements, setSettlements] = useState<SettlementCycle[]>([
    { id: 'SET-901', gateway: 'Meeza Wallet Hub', cyclePeriod: '06/08 - 06/10', expectedAmount: 1845000, actualReceived: 1845000, matchedCount: 412, mismatchedCount: 0, status: 'synced' },
    { id: 'SET-902', gateway: 'Gulf Credit Express', cyclePeriod: '06/08 - 06/10', expectedAmount: 5690000, actualReceived: 5684000, matchedCount: 1081, mismatchedCount: 2, status: 'mismatch' },
    { id: 'SET-903', gateway: 'Fawry Direct Rail', cyclePeriod: '06/11 - 06/12', expectedAmount: 940000, actualReceived: 0, matchedCount: 0, mismatchedCount: 0, status: 'pending_sync' }
  ])

  const [fxRates, setFxRates] = useState([
    { pair: 'USD/EGP', official: 47.35, markup: 1.5, finalRate: 48.06 },
    { pair: 'USD/NGN', official: 1480.00, markup: 2.2, finalRate: 1512.56 },
    { pair: 'USD/AED', official: 3.67, markup: 0.25, finalRate: 3.68 }
  ])

  const [reconcilingId, setReconcilingId] = useState<string | null>(null)
  const [reconProgress, setReconProgress] = useState(0)

  const handleTopup = (id: string) => {
    setWallets(prev => prev.map(w => {
      if (w.id === id) {
        const topupAmt = w.currency === 'NGN' ? 5000000 : w.currency === 'EGP' ? 300000 : 500000
        const nextBal = w.balance + topupAmt
        const nextStatus: WalletAccount['status'] = nextBal > w.threshold ? 'healthy' : 'warning'
        return { ...w, balance: nextBal, status: nextStatus }
      }
      return w
    }))
  }

  const triggerRecon = (id: string) => {
    setReconcilingId(id)
    setReconProgress(0)
    const interval = setInterval(() => {
      setReconProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Mark as synced once finished
          setSettlements(prevSets => prevSets.map(s => {
            if (s.id === id) {
              return { ...s, actualReceived: s.expectedAmount, matchedCount: s.matchedCount + s.mismatchedCount, mismatchedCount: 0, status: 'synced' }
            }
            return s
          }))
          setTimeout(() => setReconcilingId(null), 1000)
          return 100
        }
        return prev + 10
      })
    }, 150)
  }

  const handleMarkupChange = (pair: string, value: string) => {
    const val = parseFloat(value) || 0
    setFxRates(prev => prev.map(rate => {
      if (rate.pair === pair) {
        const final = rate.official * (1 + val / 100)
        return { ...rate, markup: val, finalRate: parseFloat(final.toFixed(2)) }
      }
      return rate
    }))
  }

  return (
    <div className="pt-20 pb-12 px-4 md:px-8 space-y-8 font-apple">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Financial Treasury</h1>
          <p className="text-text-secondary mt-1">Multi-wallet pool balances, settlements reconciliation matrix, FX rules, and processor fee configurations.</p>
        </div>
        <div className="flex items-center gap-2 bg-accent-indigo/10 px-4 py-2 rounded-xl border border-accent-indigo/20">
          <Landmark size={16} className="text-accent-indigo" />
          <span className="text-xs font-semibold text-accent-indigo">Treasury Console Sync</span>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Total Liquidity Pool (USD)</p>
            <h3 className="text-2xl font-bold text-white mt-1">$4,850,210</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">↓ 1.4% change in currency fluctuations</p>
          </div>
          <div className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl">
            <Wallet size={24} />
          </div>
        </Card>

        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Average Settlement Cycle</p>
            <h3 className="text-2xl font-bold text-white mt-1">T + 1 Day</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">SLA Standard Met</p>
          </div>
          <div className="p-3.5 bg-accent-green/10 text-accent-green rounded-2xl">
            <RefreshCcw size={24} />
          </div>
        </Card>

        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Estimated Monthly Net Fees</p>
            <h3 className="text-2xl font-bold text-white mt-1">$108,400</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">↑ 18.5% YoY Growth</p>
          </div>
          <div className="p-3.5 bg-accent-indigo/10 text-accent-indigo rounded-2xl">
            <TrendingUp size={24} />
          </div>
        </Card>

        <Card className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Avg Gateway Fee Rate</p>
            <h3 className="text-2xl font-bold text-white mt-1">1.82%</h3>
            <p className="text-[10px] text-text-secondary mt-1">Network Base cost included</p>
          </div>
          <div className="p-3.5 bg-accent-orange/10 text-accent-orange rounded-2xl">
            <Percent size={24} />
          </div>
        </Card>
      </div>

      {/* Recharts Financial Graph */}
      <div className="apple-surface p-6 rounded-2xl space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">Gross Volume vs Net PSP Margins</h3>
          <p className="text-xs text-text-secondary">Comparing total payment processing traffic (Gross Volume) against direct network costs and net fees earned by the PSP.</p>
        </div>
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#30D158" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#30D158" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#8E8E93" fontSize={11} />
              <YAxis stroke="#8E8E93" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1C1C1E', borderColor: 'rgba(255,255,255,0.08)', borderRadius: 12 }}
                labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                itemStyle={{ color: '#8E8E93' }}
              />
              <Area type="monotone" dataKey="GrossVolume" stroke="#007AFF" fillOpacity={1} fill="url(#colorGross)" name="Gross Volume" />
              <Area type="monotone" dataKey="NetRevenue" stroke="#30D158" fillOpacity={1} fill="url(#colorNet)" name="PSP Net Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Splits grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Settlement reconciliation */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Multi-wallet pools matrix */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Regional Settlement Wallet Matrix</h3>
              <p className="text-xs text-text-secondary">Monitor regional liquidity limits and simulate capital replenishment transfers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wallets.map(w => (
                <div key={w.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white">{w.region}</h4>
                      <p className="text-xs text-text-secondary">{w.bankName}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      w.status === 'healthy' ? 'bg-accent-green/15 text-accent-green' : w.status === 'warning' ? 'bg-accent-orange/15 text-accent-orange' : 'bg-accent-red/15 text-accent-red animate-pulse'
                    }`}>
                      {w.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-text-secondary block">Available Liquidity</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-lg font-bold text-white font-mono">{w.currency}</span>
                      <span className="text-xl font-bold text-white font-mono">{w.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-text-secondary mt-1">
                      <span>Low Alert limit: {w.currency} {w.threshold.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleTopup(w.id)}
                    className="w-full text-center py-2 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] rounded-lg text-xs font-semibold text-text-primary transition-all flex items-center justify-center gap-1.5"
                  >
                    <ArrowUpRight size={14} /> Replenish Liquidity
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reconciliation Table */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Gateway Settlements Reconciliation</h3>
              <p className="text-xs text-text-secondary">Match incoming batch cycles against expected processor invoices to detect discrepancies.</p>
            </div>

            <div className="space-y-4">
              {settlements.map(set => (
                <div key={set.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-text-secondary bg-white/[0.06] px-2 py-0.5 rounded uppercase">{set.id} | Cycle: {set.cyclePeriod}</span>
                      <h4 className="text-sm font-bold text-white mt-1.5">{set.gateway}</h4>
                    </div>
                    <span className={`badge ${
                      set.status === 'synced' ? 'badge-success' : set.status === 'pending_sync' ? 'badge-pending' : 'badge-error'
                    }`}>
                      {set.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-text-secondary block">Expected Ledger</span>
                      <p className="font-bold text-white font-mono mt-0.5">${set.expectedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Actual Cleared</span>
                      <p className="font-bold text-white font-mono mt-0.5">${set.actualReceived.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Matched Orders</span>
                      <p className="font-bold text-accent-green font-mono mt-0.5">{set.matchedCount} Txns</p>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Discrepancies</span>
                      <p className={`font-bold font-mono mt-0.5 ${set.mismatchedCount > 0 ? 'text-accent-red animate-pulse' : 'text-text-secondary'}`}>
                        {set.mismatchedCount} Orders
                      </p>
                    </div>
                  </div>

                  {reconcilingId === set.id ? (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] text-text-secondary">
                        <span>Auto-matching gateway records against core ledger database...</span>
                        <span className="font-mono font-bold text-accent-blue">{reconProgress}%</span>
                      </div>
                      <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-accent-blue h-full transition-all duration-150" style={{ width: `${reconProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    set.status !== 'synced' && (
                      <div className="flex justify-end pt-1">
                        <button 
                          onClick={() => triggerRecon(set.id)}
                          className="px-3 py-1.5 bg-accent-blue/10 text-accent-blue border border-accent-blue/20 rounded-lg hover:bg-accent-blue/20 transition-all text-xs font-semibold flex items-center gap-1.5"
                        >
                          <RefreshCcw size={12} className={reconcilingId === set.id ? 'animate-spin' : ''} />
                          Force Auto-Reconciliation
                        </button>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FX Rules and margins config */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Landmark size={18} className="text-accent-indigo" />
                FX Margin & Settlement Engine
              </h3>
              <p className="text-xs text-text-secondary">Configure treasury markup margins on foreign currency exchange transactions.</p>
            </div>

            <div className="space-y-4 pt-2">
              {fxRates.map(rate => (
                <div key={rate.pair} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                    <span className="font-bold text-white">{rate.pair}</span>
                    <span className="text-xs text-text-secondary">Official Rate: 1 USD = {rate.official}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">Markup % Margin</label>
                      <input 
                        type="number" 
                        step="0.05"
                        min="0"
                        max="10"
                        value={rate.markup}
                        onChange={(e) => handleMarkupChange(rate.pair, e.target.value)}
                        className="input text-xs py-1.5 px-2 font-mono text-white bg-white/[0.02]"
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-text-secondary block">Settlement FX Rate</span>
                      <p className="font-bold text-accent-indigo font-mono text-sm mt-1">1 USD = {rate.finalRate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Treasury Risk Policy</h3>
              <p className="text-xs text-text-secondary">Review general rules governing settlements & chargebacks payouts security limits.</p>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="flex items-start gap-2.5 text-text-secondary">
                <AlertTriangle size={16} className="text-accent-orange flex-shrink-0 mt-0.5" />
                <p><strong>Low Balance Notification:</strong> Automatically send alerts to Telegram operator bot when any vault pool falls below 10% of defined threshold.</p>
              </div>
              <div className="flex items-start gap-2.5 text-text-secondary">
                <CheckCircle size={16} className="text-accent-green flex-shrink-0 mt-0.5" />
                <p><strong>T+0 Settlements Limit:</strong> Capped at maximum of $25,000 equivalent daily per merchant to mitigate liquidity stress risks.</p>
              </div>
              <div className="flex items-start gap-2.5 text-text-secondary">
                <HelpCircle size={16} className="text-text-tertiary flex-shrink-0 mt-0.5" />
                <p><strong>Chargeback reserve:</strong> 5% of gross merchant settlement volume is withheld as cash reserve buffer for dispute settlements (rolling 90 days).</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
