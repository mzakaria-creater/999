import { useLanguage } from '@/context/LanguageContext'
import { Plus, Zap, TrendingUp, AlertCircle } from 'lucide-react'

export default function WalletPool() {
  const { t } = useLanguage()

  const pools = [
    { name: 'Main MENA Pool', balance: 2850000, capacity: 5000000, health: 'healthy', providers: 4 },
    { name: 'Egypt Operations', balance: 1200000, capacity: 2000000, health: 'healthy', providers: 3 },
    { name: 'UAE Express', balance: 845000, capacity: 1500000, health: 'warning', providers: 2 },
    { name: 'KSA Premium', balance: 680000, capacity: 1000000, health: 'healthy', providers: 2 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-text-primary">Wallet Pool Management</h1>
          <p className="text-text-secondary mt-2">Manage multi-wallet liquidity pools</p>
        </div>
        <button className="flex items-center gap-2 bg-accent-blue text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all">
          <Plus size={20} /> Create Pool
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Liquidity', value: '₦5.68M', icon: Zap, color: 'accent-blue' },
          { label: 'Active Pools', value: '4', icon: TrendingUp, color: 'accent-green' },
          { label: 'Utilization', value: '62.3%', icon: AlertCircle, color: 'accent-orange' },
          { label: 'Providers', value: '8', icon: Zap, color: 'accent-blue' },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="glossy-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-semibold mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                </div>
                <Icon size={32} className={`text-${stat.color} opacity-50`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Pools List */}
      <div className="space-y-4">
        {pools.map((pool) => (
          <div key={pool.name} className="glossy-card rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-text-primary">{pool.name}</h3>
                <p className="text-text-secondary text-sm">{pool.providers} providers</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-xs font-bold ${
                  pool.health === 'healthy'
                    ? 'bg-accent-green/20 text-accent-green'
                    : 'bg-accent-orange/20 text-accent-orange'
                }`}
              >
                {pool.health.charAt(0).toUpperCase() + pool.health.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Balance</span>
                <span className="text-text-primary font-semibold">₦{(pool.balance / 1000000).toFixed(2)}M</span>
              </div>
              <div className="w-full bg-white/[0.05] rounded-full h-2">
                <div
                  className="bg-accent-blue h-2 rounded-full"
                  style={{ width: `${(pool.balance / pool.capacity) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Capacity: ₦{(pool.capacity / 1000000).toFixed(2)}M</span>
                <span>{((pool.balance / pool.capacity) * 100).toFixed(1)}% used</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
