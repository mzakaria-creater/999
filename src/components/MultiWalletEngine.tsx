import { useState, useEffect } from 'react'
import {
  TrendingUp,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  ArrowRightLeft,
  Zap,
  Activity,
  Shield,
} from 'lucide-react'
import { walletEngine, TransactionRequest, AllocationResult } from '@/lib/wallet-engine'
import { AllocationStrategy } from '@/types/wallet'

export default function MultiWalletEngine() {
  const [amount, setAmount] = useState(5000)
  const [selectedStrategy, setSelectedStrategy] = useState<AllocationStrategy>('weighted')
  const [routingResult, setRoutingResult] = useState<any>(null)
  const [allocations, setAllocations] = useState<AllocationResult[]>([])
  const [walletHealth, setWalletHealth] = useState<any[]>([])
  const [rebalanceActions, setRebalanceActions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const strategies = [
    { value: 'weighted' as AllocationStrategy, label: 'Weighted', desc: 'Based on wallet weight/priority' },
    { value: 'round_robin' as AllocationStrategy, label: 'Round Robin', desc: 'Equal distribution' },
    { value: 'load_balanced' as AllocationStrategy, label: 'Load Balanced', desc: 'Based on available capacity' },
    { value: 'priority' as AllocationStrategy, label: 'Priority', desc: 'Highest priority first' },
  ]

  const handleRoute = async () => {
    setLoading(true)
    try {
      const request: TransactionRequest = {
        merchant_id: 'merchant-001',
        amount,
        currency: 'EGP',
        transaction_type: 'deposit',
        payment_method: 'card',
      }
      const result = await walletEngine.routeTransaction(request)
      setRoutingResult(result)
    } catch (error) {
      console.error('Routing error:', error)
      alert('Error routing transaction')
    } finally {
      setLoading(false)
    }
  }

  const handleAllocate = async () => {
    setLoading(true)
    try {
      const results = await walletEngine.allocateAcrossWallets(
        'merchant-001',
        amount,
        'EGP',
        selectedStrategy
      )
      setAllocations(results)
    } catch (error) {
      console.error('Allocation error:', error)
      alert('Error allocating transaction')
    } finally {
      setLoading(false)
    }
  }

  const handleRebalance = async () => {
    setLoading(true)
    try {
      const targetLevels = {
        'wallet-1': 500000,
        'wallet-2': 300000,
        'wallet-3': 500000,
        'wallet-4': 200000,
      }
      const actions = await walletEngine.rebalanceWallets('merchant-001', targetLevels)
      setRebalanceActions(actions)
    } catch (error) {
      console.error('Rebalance error:', error)
      alert('Error rebalancing wallets')
    } finally {
      setLoading(false)
    }
  }

  const loadHealth = async () => {
    setLoading(true)
    try {
      const health = await walletEngine.getWalletHealth('merchant-001')
      setWalletHealth(health)
    } catch (error) {
      console.error('Health check error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHealth()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 size={18} className="text-accent-green" />
      case 'warning':
        return <AlertCircle size={18} className="text-accent-orange" />
      case 'critical':
        return <AlertCircle size={18} className="text-accent-red" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-apple text-3xl font-bold text-text-primary mb-2">
          🏦 Multi-Wallet Engine
        </h2>
        <p className="text-text-secondary">Intelligent routing, allocation, and rebalancing</p>
      </div>

      {/* Control Panel */}
      <div className="apple-surface rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text-secondary mb-3">
            Transaction Amount (EGP)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1"
            />
            <div className="text-2xl font-bold text-accent-blue w-32 text-right">
              ₦{(amount / 1000).toFixed(1)}K
            </div>
          </div>
        </div>

        {/* Strategy Selection */}
        <div>
          <label className="block text-sm font-semibold text-text-secondary mb-3">
            Allocation Strategy
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {strategies.map((strategy) => (
              <button
                key={strategy.value}
                onClick={() => setSelectedStrategy(strategy.value)}
                className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${
                  selectedStrategy === strategy.value
                    ? 'border-accent-blue bg-accent-blue/10'
                    : 'border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                <div className="font-semibold text-text-primary">{strategy.label}</div>
                <div className="text-xs text-text-secondary mt-1">{strategy.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={handleRoute}
            disabled={loading}
            className="btn flex items-center justify-center gap-2"
          >
            <Zap size={16} />
            Route
          </button>
          <button
            onClick={handleAllocate}
            disabled={loading}
            className="btn flex items-center justify-center gap-2"
          >
            <BarChart3 size={16} />
            Allocate
          </button>
          <button
            onClick={handleRebalance}
            disabled={loading}
            className="btn flex items-center justify-center gap-2"
          >
            <ArrowRightLeft size={16} />
            Rebalance
          </button>
          <button
            onClick={loadHealth}
            disabled={loading}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Shield size={16} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Routing Results */}
      {routingResult && (
        <div className="apple-surface rounded-2xl p-6 border-l-4 border-accent-blue animate-slide-down">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Smart Routing Result
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-text-secondary mb-1">Selected Wallet</div>
              <div className="text-lg font-bold text-text-primary">{routingResult.provider}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary mb-1">Allocated Amount</div>
              <div className="text-lg font-bold text-accent-blue">
                ₦{(routingResult.allocated_amount / 1000).toFixed(0)}K
              </div>
            </div>
            <div>
              <div className="text-xs text-text-secondary mb-1">Confidence Score</div>
              <div className="text-lg font-bold text-accent-green">{routingResult.confidence_score}%</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary mb-1">Reason</div>
              <div className="text-lg font-bold text-text-primary">{routingResult.reason}</div>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Results */}
      {allocations.length > 0 && (
        <div className="apple-surface rounded-2xl p-6 border-l-4 border-accent-orange animate-slide-down">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <BarChart3 size={20} /> {selectedStrategy === 'weighted' ? 'Weighted' : selectedStrategy === 'round_robin' ? 'Round Robin' : selectedStrategy === 'load_balanced' ? 'Load Balanced' : 'Priority'} Allocation
          </h3>
          <div className="space-y-3">
            {allocations.map((alloc, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-text-primary">{alloc.provider}</span>
                    <span className="text-sm font-bold text-accent-blue">
                      ₦{(alloc.amount / 1000).toFixed(0)}K ({alloc.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-apple-gray5 rounded-full h-2">
                    <div
                      className="bg-accent-blue h-2 rounded-full"
                      style={{ width: `${alloc.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wallet Health */}
      <div className="apple-surface rounded-2xl p-6 border-l-4 border-accent-green">
        <h3 className="section-title mb-4 flex items-center gap-2">
          <Activity size={20} /> Wallet Health Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {walletHealth.map((wallet) => {
            const getWalletIcon = () => {
              if (wallet.provider === 'Vodafone Cash') return '📱'
              if (wallet.provider === 'InstaPay') return '💳'
              if (wallet.provider === 'Commercial Bank') return '🏦'
              return '💎'
            }
            return (
            <div key={wallet.wallet_id} className="bg-apple-gray5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getWalletIcon()}</span>
                  <div>
                    <div className="font-semibold text-text-primary">{wallet.provider}</div>
                    <div className="text-xs text-text-secondary">{wallet.provider}</div>
                  </div>
                </div>
                {getStatusIcon(wallet.status)}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Balance Health</span>
                  <span className="font-semibold text-accent-blue">{wallet.balance_health}%</span>
                </div>
                <div className="w-full bg-apple-gray4 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      wallet.balance_health > 60
                        ? 'bg-accent-green'
                        : wallet.balance_health > 40
                          ? 'bg-accent-orange'
                          : 'bg-accent-red'
                    }`}
                    style={{ width: `${wallet.balance_health}%` }}
                  />
                </div>

                <div className="flex justify-between">
                  <span className="text-text-secondary">Capacity Used</span>
                  <span className="font-semibold text-text-primary">{wallet.capacity_used}%</span>
                </div>
                <div className="w-full bg-apple-gray4 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      wallet.capacity_used < 75
                        ? 'bg-accent-green'
                        : wallet.capacity_used < 90
                          ? 'bg-accent-orange'
                          : 'bg-accent-red'
                    }`}
                    style={{ width: `${wallet.capacity_used}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs pt-2">
                  <span className="text-text-secondary">
                    {wallet.balance.toLocaleString()} / {wallet.daily_limit.toLocaleString()} EGP
                  </span>
                  <span
                    className={`font-semibold ${
                      wallet.status === 'healthy'
                        ? 'text-accent-green'
                        : wallet.status === 'warning'
                          ? 'text-accent-orange'
                          : 'text-accent-red'
                    }`}
                  >
                    {wallet.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>

      {/* Rebalance Actions */}
      {rebalanceActions.length > 0 && (
        <div className="apple-surface rounded-2xl p-6 border-l-4 border-accent-blue animate-slide-down">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <ArrowRightLeft size={20} /> Rebalance Actions
          </h3>
          <div className="space-y-3">
            {rebalanceActions.map((action, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  action.action === 'deposit' ? 'bg-accent-green/10' : 'bg-accent-orange/10'
                }`}
              >
                <div className="flex-1">
                  <div className="font-semibold text-text-primary">{action.provider}</div>
                  <div className="text-xs text-text-secondary">
                    {action.current_level.toLocaleString()} → {action.target_level.toLocaleString()} EGP
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-bold ${
                      action.action === 'deposit' ? 'text-accent-green' : 'text-accent-orange'
                    }`}
                  >
                    {action.action === 'deposit' ? '+' : '-'}₦{(action.amount / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-text-secondary capitalize">{action.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="apple-surface rounded-2xl p-6">
        <h3 className="section-title mb-4">Health Status Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-accent-green flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-text-primary">🟢 Healthy</div>
              <div className="text-text-secondary">Balance {">"} 40%, Capacity {"<"} 75%</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-accent-orange flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-text-primary">🟡 Warning</div>
              <div className="text-text-secondary">Balance 20-40% OR Capacity 75-90%</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-accent-red flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-text-primary">🔴 Critical</div>
              <div className="text-text-secondary">Balance {"<"} 20% OR Capacity {">"} 90%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
