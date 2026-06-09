import { useState } from 'react'
import { TrendingUp, AlertTriangle, CheckCircle2, XCircle, Activity } from 'lucide-react'

interface Wallet {
  id: string
  provider: string
  currency: string
  balance: number
  capacity: number
  healthScore: number
  dailyVolume: number
  maxDailyVolume: number
  transactionCount: number
  maxTransactions: number
  avgProcessingTime: number
  failureRate: number
  lastUsed: string
  isActive: boolean
}

const mockWallets: Wallet[] = [
  {
    id: 'vodafone-egypt',
    provider: 'Vodafone Cash',
    currency: 'EGP',
    balance: 500000,
    capacity: 1000000,
    healthScore: 98,
    dailyVolume: 3500000,
    maxDailyVolume: 10000000,
    transactionCount: 2450,
    maxTransactions: 5000,
    avgProcessingTime: 450,
    failureRate: 0.2,
    lastUsed: '2 mins ago',
    isActive: true,
  },
  {
    id: 'instapay-egypt',
    provider: 'InstaPay',
    currency: 'EGP',
    balance: 250000,
    capacity: 500000,
    healthScore: 95,
    dailyVolume: 2000000,
    maxDailyVolume: 5000000,
    transactionCount: 1850,
    maxTransactions: 3000,
    avgProcessingTime: 1200,
    failureRate: 0.5,
    lastUsed: '5 mins ago',
    isActive: true,
  },
  {
    id: 'bank-egypt',
    provider: 'Commercial Bank',
    currency: 'EGP',
    balance: 750000,
    capacity: 2000000,
    healthScore: 92,
    dailyVolume: 5000000,
    maxDailyVolume: 20000000,
    transactionCount: 1200,
    maxTransactions: 2000,
    avgProcessingTime: 2100,
    failureRate: 0.8,
    lastUsed: '15 mins ago',
    isActive: true,
  },
  {
    id: 'stripe-intl',
    provider: 'Stripe',
    currency: 'USD',
    balance: 150000,
    capacity: 500000,
    healthScore: 88,
    dailyVolume: 45000,
    maxDailyVolume: 100000,
    transactionCount: 450,
    maxTransactions: 1000,
    avgProcessingTime: 1500,
    failureRate: 1.2,
    lastUsed: '1 hour ago',
    isActive: true,
  },
]

export default function WalletManagementTable() {
  const [wallets, setWallets] = useState<Wallet[]>(mockWallets)
  const [sortBy, setSortBy] = useState<'health' | 'balance' | 'volume'>('health')

  // Sort wallets
  const sortedWallets = [...wallets].sort((a, b) => {
    switch (sortBy) {
      case 'health':
        return b.healthScore - a.healthScore
      case 'balance':
        return b.balance - a.balance
      case 'volume':
        return b.dailyVolume - a.dailyVolume
      default:
        return 0
    }
  })

  const getHealthColor = (score: number) => {
    if (score >= 95) return 'bg-green-500/20 text-green-400'
    if (score >= 85) return 'bg-yellow-500/20 text-yellow-400'
    return 'bg-red-500/20 text-red-400'
  }

  const getLoadColor = (used: number, max: number) => {
    const ratio = used / max
    if (ratio < 0.6) return 'text-green-400'
    if (ratio < 0.8) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusIcon = (health: number) => {
    if (health >= 90) return <CheckCircle2 className="text-green-400" size={18} />
    if (health >= 70) return <AlertTriangle className="text-yellow-400" size={18} />
    return <XCircle className="text-red-400" size={18} />
  }

  return (
    <div className="space-y-6">
      {/* Header with Sort Controls */}
      <div className="flex items-center justify-between">
        <h2 className="section-title text-lg">Wallet Management</h2>
        <div className="flex gap-2">
          {(['health', 'balance', 'volume'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                sortBy === option
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-white/[0.08] text-text-secondary hover:text-primary'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-text-secondary mb-1">Total Balance</p>
          <p className="text-2xl font-bold text-primary">
            {(wallets.reduce((sum, w) => sum + w.balance, 0) / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-text-secondary mb-1">Avg Health</p>
          <p className="text-2xl font-bold text-success">
            {(wallets.reduce((sum, w) => sum + w.healthScore, 0) / wallets.length).toFixed(0)}%
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-text-secondary mb-1">Daily Volume</p>
          <p className="text-2xl font-bold text-accent">
            {(wallets.reduce((sum, w) => sum + w.dailyVolume, 0) / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-text-secondary mb-1">Active Wallets</p>
          <p className="text-2xl font-bold text-primary">{wallets.filter(w => w.isActive).length}/{wallets.length}</p>
        </div>
      </div>

      {/* Wallets Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
                Provider
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
                Balance
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
                Capacity
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
                Health
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
                Daily Load
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
                Transactions
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedWallets.map((wallet) => (
              <tr key={wallet.id} className="table-row">
                {/* Provider */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-semibold text-text-primary">{wallet.provider}</p>
                      <p className="text-xs text-text-secondary">{wallet.currency}</p>
                    </div>
                  </div>
                </td>

                {/* Balance */}
                <td className="px-6 py-4">
                  <p className="font-bold text-text-primary">
                    {(wallet.balance / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-text-secondary">
                    {((wallet.balance / wallet.capacity) * 100).toFixed(0)}% of capacity
                  </p>
                </td>

                {/* Capacity */}
                <td className="px-6 py-4">
                  <p className="font-semibold text-text-primary">
                    {(wallet.capacity / 1000000).toFixed(1)}M
                  </p>
                </td>

                {/* Health Score */}
                <td className="px-6 py-4">
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold w-fit ${getHealthColor(wallet.healthScore)}`}>
                    {wallet.healthScore}%
                  </div>
                </td>

                {/* Daily Load */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${getLoadColor(wallet.dailyVolume, wallet.maxDailyVolume)}`}>
                        {((wallet.dailyVolume / wallet.maxDailyVolume) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="bg-dark-elevation rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{
                          width: `${(wallet.dailyVolume / wallet.maxDailyVolume) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-text-secondary">
                      {(wallet.dailyVolume / 1000000).toFixed(1)}M / {(wallet.maxDailyVolume / 1000000).toFixed(0)}M
                    </p>
                  </div>
                </td>

                {/* Transactions */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-text-primary">
                      {wallet.transactionCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {((wallet.transactionCount / wallet.maxTransactions) * 100).toFixed(0)}% of limit
                    </p>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(wallet.healthScore)}
                    <div className="flex items-center gap-1 text-xs">
                      <Activity size={14} />
                      <span>{wallet.lastUsed}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="btn flex-1">Rebalance Wallets</button>
        <button className="btn-secondary flex-1">View Details</button>
        <button className="btn-secondary flex-1">Configure Limits</button>
      </div>

      {/* Alert if any wallet unhealthy */}
      {wallets.some((w) => w.healthScore < 80) && (
        <div className="glass rounded-xl p-4 border-l-4 border-warning bg-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-warning mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-semibold text-warning mb-1">Attention Required</p>
              <p className="text-sm text-text-secondary">
                {wallets.filter((w) => w.healthScore < 80).length} wallet(s) showing degraded health.
                Consider rebalancing or investigating provider issues.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
