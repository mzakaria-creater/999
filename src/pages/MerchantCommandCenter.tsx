import { useState, useEffect } from 'react'
import { Globe, TrendingUp, Activity, AlertCircle, CheckCircle2, Zap, MapPin, Users } from 'lucide-react'

interface RegionalMetrics {
  country: string
  volume: number
  transactions: number
  success_rate: number
  avg_latency: number
  wallets_active: number
  health: 'healthy' | 'warning' | 'critical'
}

interface TransactionFeed {
  id: string
  merchant: string
  amount: number
  country: string
  provider: string
  status: 'success' | 'pending' | 'failed'
  timestamp: string
}

export default function MerchantCommandCenter() {
  const [regionalMetrics, setRegionalMetrics] = useState<RegionalMetrics[]>([
    {
      country: 'Egypt',
      volume: 45200000,
      transactions: 12450,
      success_rate: 99.45,
      avg_latency: 1.2,
      wallets_active: 8,
      health: 'healthy',
    },
    {
      country: 'UAE',
      volume: 28500000,
      transactions: 8920,
      success_rate: 98.80,
      avg_latency: 1.5,
      wallets_active: 6,
      health: 'healthy',
    },
    {
      country: 'KSA',
      volume: 19800000,
      transactions: 5670,
      success_rate: 97.20,
      avg_latency: 2.1,
      wallets_active: 5,
      health: 'warning',
    },
  ])

  const [transactionFeed, setTransactionFeed] = useState<TransactionFeed[]>([
    {
      id: 'TXN-001',
      merchant: 'Ahmed Electronics',
      amount: 2500,
      country: 'Egypt',
      provider: 'Vodafone Cash',
      status: 'success',
      timestamp: '2 mins ago',
    },
    {
      id: 'TXN-002',
      merchant: 'Emirates Foods',
      amount: 5800,
      country: 'UAE',
      provider: 'ADIB',
      status: 'success',
      timestamp: '4 mins ago',
    },
    {
      id: 'TXN-003',
      merchant: 'Riyadh Retail',
      amount: 3200,
      country: 'KSA',
      provider: 'SAMBA',
      status: 'pending',
      timestamp: '6 mins ago',
    },
    {
      id: 'TXN-004',
      merchant: 'Cairo Online',
      amount: 1800,
      country: 'Egypt',
      provider: 'InstaPay',
      status: 'success',
      timestamp: '8 mins ago',
    },
    {
      id: 'TXN-005',
      merchant: 'Dubai Trade',
      amount: 4500,
      country: 'UAE',
      provider: 'FAB',
      status: 'success',
      timestamp: '10 mins ago',
    },
    {
      id: 'TXN-006',
      merchant: 'Kingdom Mall',
      amount: 2100,
      country: 'KSA',
      provider: 'AlRajhi',
      status: 'failed',
      timestamp: '12 mins ago',
    },
  ])

  const totalVolume = regionalMetrics.reduce((sum, m) => sum + m.volume, 0)
  const totalTransactions = regionalMetrics.reduce((sum, m) => sum + m.transactions, 0)
  const avgSuccessRate = (
    regionalMetrics.reduce((sum, m) => sum + m.success_rate, 0) / regionalMetrics.length
  ).toFixed(2)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 size={16} className="text-accent-green" />
      case 'warning':
        return <AlertCircle size={16} className="text-accent-orange" />
      case 'critical':
        return <AlertCircle size={16} className="text-accent-red" />
      default:
        return null
    }
  }

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-accent-green/10 text-accent-green border-accent-green/30'
      case 'pending':
        return 'bg-accent-orange/10 text-accent-orange border-accent-orange/30'
      case 'failed':
        return 'bg-accent-red/10 text-accent-red border-accent-red/30'
      default:
        return ''
    }
  }

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      Egypt: '🇪🇬',
      UAE: '🇦🇪',
      KSA: '🇸🇦',
    }
    return flags[country] || '🌍'
  }

  return (
    <div className="ml-64 pt-20 pb-8 px-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-slide-down">
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <Globe size={36} /> P2P Merchant Command Center
          </h1>
          <p className="text-text-secondary">Global volume tracking across MENA regions</p>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-down" style={{ animationDelay: '0.05s' }}>
          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-secondary">Global Volume (24h)</span>
              <TrendingUp size={20} className="text-accent-blue" />
            </div>
            <div className="text-3xl font-bold text-text-primary">
              ₦{(totalVolume / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-text-secondary mt-2">Across 3 regions</div>
          </div>

          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-secondary">Total Transactions</span>
              <Activity size={20} className="text-accent-orange" />
            </div>
            <div className="text-3xl font-bold text-text-primary">{totalTransactions.toLocaleString()}</div>
            <div className="text-xs text-text-secondary mt-2">Real-time volume</div>
          </div>

          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-secondary">Avg Success Rate</span>
              <CheckCircle2 size={20} className="text-accent-green" />
            </div>
            <div className="text-3xl font-bold text-text-primary">{avgSuccessRate}%</div>
            <div className="text-xs text-text-secondary mt-2">All regions combined</div>
          </div>
        </div>

        {/* Regional Breakdown */}
        <div className="animate-slide-down" style={{ animationDelay: '0.1s' }}>
          <h2 className="section-title mb-4">Regional Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regionalMetrics.map((metric) => (
              <div key={metric.country} className="apple-surface rounded-2xl p-6 hover:shadow-lg transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCountryFlag(metric.country)}</span>
                    <div>
                      <div className="font-semibold text-text-primary">{metric.country}</div>
                      <div className="text-xs text-text-secondary">{metric.wallets_active} wallets</div>
                    </div>
                  </div>
                  {getStatusIcon(metric.health)}
                </div>

                {/* Volume */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-secondary">Volume</span>
                    <span className="font-bold text-accent-blue">₦{(metric.volume / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="w-full bg-apple-gray5 rounded-full h-2">
                    <div
                      className="bg-accent-blue h-2 rounded-full"
                      style={{ width: `${(metric.volume / totalVolume) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-apple-gray5 rounded-lg p-3">
                    <div className="text-text-secondary text-xs mb-1">Transactions</div>
                    <div className="font-bold text-text-primary">{metric.transactions.toLocaleString()}</div>
                  </div>
                  <div className="bg-apple-gray5 rounded-lg p-3">
                    <div className="text-text-secondary text-xs mb-1">Success Rate</div>
                    <div className="font-bold text-accent-green">{metric.success_rate}%</div>
                  </div>
                  <div className="bg-apple-gray5 rounded-lg p-3">
                    <div className="text-text-secondary text-xs mb-1">Avg Latency</div>
                    <div className="font-bold text-text-primary">{metric.avg_latency}s</div>
                  </div>
                  <div
                    className={`rounded-lg p-3 text-xs font-semibold capitalize ${
                      metric.health === 'healthy'
                        ? 'bg-accent-green/10 text-accent-green'
                        : metric.health === 'warning'
                          ? 'bg-accent-orange/10 text-accent-orange'
                          : 'bg-accent-red/10 text-accent-red'
                    }`}
                  >
                    {metric.health}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Transaction Feed */}
        <div className="animate-slide-down" style={{ animationDelay: '0.15s' }}>
          <h2 className="section-title mb-4 flex items-center gap-2">
            <Zap size={20} className="text-accent-orange" /> Live Transaction Feed
          </h2>
          <div className="apple-surface rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/[0.08]">
              {transactionFeed.map((txn) => (
                <div
                  key={txn.id}
                  className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  {/* Left: Merchant & Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-apple-gray5 flex items-center justify-center text-sm font-bold text-accent-blue">
                        {txn.merchant.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary text-sm">{txn.merchant}</div>
                        <div className="text-xs text-text-secondary flex items-center gap-2">
                          <span>{getCountryFlag(txn.country)}</span>
                          <span>{txn.country}</span>
                          <span>•</span>
                          <span>{txn.provider}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Amount */}
                  <div className="text-right mx-6">
                    <div className="font-bold text-text-primary">₦{txn.amount.toLocaleString()}</div>
                    <div className="text-xs text-text-secondary">{txn.timestamp}</div>
                  </div>

                  {/* Right: Status */}
                  <div
                    className={`px-3 py-1 rounded-full border text-xs font-semibold ${getTransactionStatusColor(
                      txn.status
                    )}`}
                  >
                    {txn.status === 'success' && '✓ Success'}
                    {txn.status === 'pending' && '⏳ Pending'}
                    {txn.status === 'failed' && '✕ Failed'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Health Summary */}
        <div className="animate-slide-down" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title mb-4">Wallet Pool Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regionalMetrics.map((metric) => (
              <div key={metric.country} className="apple-surface rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-text-primary">{metric.country}</span>
                  {getStatusIcon(metric.health)}
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-secondary">Success Rate</span>
                      <span className="font-bold text-accent-green">{metric.success_rate}%</span>
                    </div>
                    <div className="w-full bg-apple-gray5 rounded-full h-2">
                      <div
                        className="bg-accent-green h-2 rounded-full"
                        style={{ width: `${metric.success_rate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-secondary">Capacity Utilization</span>
                      <span className="font-bold text-text-primary">
                        {Math.round((metric.transactions / 15000) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-apple-gray5 rounded-full h-2">
                      <div
                        className="bg-accent-blue h-2 rounded-full"
                        style={{ width: `${Math.round((metric.transactions / 15000) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="animate-slide-down" style={{ animationDelay: '0.25s' }}>
          <h2 className="section-title mb-4">24-Hour Activity</h2>
          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-end justify-around h-32 gap-2">
              {[45, 62, 38, 75, 52, 88, 70, 95, 65, 78, 82, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-accent-blue to-accent-blue/50 rounded-t-lg"
                       style={{ height: `${height}%` }} />
                  <span className="text-xs text-text-secondary">{i * 2}h</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-secondary text-center mt-4">Transaction volume by hour</p>
          </div>
        </div>
      </div>
    </div>
  )
}
