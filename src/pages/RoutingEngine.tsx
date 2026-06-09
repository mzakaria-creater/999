import { useState, useEffect } from 'react'
import { Zap, Activity, TrendingUp, AlertCircle, CheckCircle2, Brain, Route, BarChart3 } from 'lucide-react'

interface ProviderMetrics {
  name: string
  icon: string
  color: string
  success_rate: number
  avg_latency: number
  availability: number
  transactions_routed: number
  volume: number
}

interface RoutingPath {
  id: string
  merchant: string
  amount: number
  primary_provider: string
  fallback_provider: string
  decision_factors: {
    success_rate: number
    latency: number
    availability: number
    cost: number
  }
  execution_time: string
  status: 'routed' | 'failover' | 'optimized'
}

export default function RoutingEngine() {
  const [providers, setProviders] = useState<ProviderMetrics[]>([
    {
      name: 'Vodafone Cash',
      icon: '📱',
      color: '#e60000',
      success_rate: 99.45,
      avg_latency: 1.2,
      availability: 99.98,
      transactions_routed: 4250,
      volume: 18500000,
    },
    {
      name: 'Meeza',
      icon: '💳',
      color: '#0066cc',
      success_rate: 98.80,
      avg_latency: 1.8,
      availability: 99.85,
      transactions_routed: 3120,
      volume: 14200000,
    },
    {
      name: 'Etisalat Cash',
      icon: '🟡',
      color: '#ff9f0a',
      success_rate: 97.20,
      avg_latency: 2.1,
      availability: 99.70,
      transactions_routed: 2890,
      volume: 12300000,
    },
    {
      name: 'ADIB',
      icon: '🏦',
      color: '#1a5490',
      success_rate: 96.80,
      avg_latency: 2.5,
      availability: 99.50,
      transactions_routed: 1850,
      volume: 8700000,
    },
  ])

  const [routingPaths, setRoutingPaths] = useState<RoutingPath[]>([
    {
      id: 'ROUTE-001',
      merchant: 'Ahmed Electronics',
      amount: 2500,
      primary_provider: 'Vodafone Cash',
      fallback_provider: 'Meeza',
      decision_factors: {
        success_rate: 99.45,
        latency: 1.2,
        availability: 99.98,
        cost: 0.015,
      },
      execution_time: '1.2ms',
      status: 'optimized',
    },
    {
      id: 'ROUTE-002',
      merchant: 'Cairo Online',
      amount: 1800,
      primary_provider: 'Meeza',
      fallback_provider: 'Vodafone Cash',
      decision_factors: {
        success_rate: 98.80,
        latency: 1.8,
        availability: 99.85,
        cost: 0.012,
      },
      execution_time: '1.5ms',
      status: 'routed',
    },
    {
      id: 'ROUTE-003',
      merchant: 'Riyadh Retail',
      amount: 3200,
      primary_provider: 'Etisalat Cash',
      fallback_provider: 'ADIB',
      decision_factors: {
        success_rate: 97.20,
        latency: 2.1,
        availability: 99.70,
        cost: 0.018,
      },
      execution_time: '2.1ms',
      status: 'routed',
    },
    {
      id: 'ROUTE-004',
      merchant: 'Emirates Foods',
      amount: 5800,
      primary_provider: 'Vodafone Cash',
      fallback_provider: 'Meeza',
      decision_factors: {
        success_rate: 99.45,
        latency: 1.2,
        availability: 99.98,
        cost: 0.015,
      },
      execution_time: '1.2ms',
      status: 'optimized',
    },
  ])

  const [selectedRoute, setSelectedRoute] = useState<RoutingPath | null>(routingPaths[0])

  const totalTransactions = providers.reduce((sum, p) => sum + p.transactions_routed, 0)
  const totalVolume = providers.reduce((sum, p) => sum + p.volume, 0)
  const avgSuccessRate = (
    providers.reduce((sum, p) => sum + p.success_rate, 0) / providers.length
  ).toFixed(2)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimized':
        return 'bg-accent-green/10 text-accent-green border-accent-green/30'
      case 'routed':
        return 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
      case 'failover':
        return 'bg-accent-orange/10 text-accent-orange border-accent-orange/30'
      default:
        return ''
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized':
        return <CheckCircle2 size={16} className="text-accent-green" />
      case 'routed':
        return <Route size={16} className="text-accent-blue" />
      case 'failover':
        return <AlertCircle size={16} className="text-accent-orange" />
      default:
        return null
    }
  }

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-slide-down">
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <Brain size={36} /> P2P AI Routing Engine
          </h1>
          <p className="text-text-secondary">
            Real-time intelligent routing visualization with success rates and latency analysis
          </p>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-down" style={{ animationDelay: '0.05s' }}>
          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-secondary">Total Routed</span>
              <Zap size={20} className="text-accent-blue" />
            </div>
            <div className="text-3xl font-bold text-text-primary">{totalTransactions.toLocaleString()}</div>
            <div className="text-xs text-text-secondary mt-2">Transactions today</div>
          </div>

          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-secondary">Total Volume</span>
              <TrendingUp size={20} className="text-accent-orange" />
            </div>
            <div className="text-3xl font-bold text-text-primary">₦{(totalVolume / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-text-secondary mt-2">Routed value</div>
          </div>

          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-secondary">Avg Success Rate</span>
              <CheckCircle2 size={20} className="text-accent-green" />
            </div>
            <div className="text-3xl font-bold text-text-primary">{avgSuccessRate}%</div>
            <div className="text-xs text-text-secondary mt-2">Across all providers</div>
          </div>

          <div className="apple-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-secondary">Active Providers</span>
              <Activity size={20} className="text-accent-purple" />
            </div>
            <div className="text-3xl font-bold text-text-primary">{providers.length}</div>
            <div className="text-xs text-text-secondary mt-2">Real-time monitoring</div>
          </div>
        </div>

        {/* Provider Performance Matrix */}
        <div className="animate-slide-down" style={{ animationDelay: '0.1s' }}>
          <h2 className="section-title mb-4">Provider Performance Matrix</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <div key={provider.name} className="apple-surface rounded-2xl p-6">
                {/* Provider Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{provider.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-text-primary">{provider.name}</div>
                    <div className="text-xs text-text-secondary">
                      {provider.transactions_routed.toLocaleString()} transactions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold" style={{ color: provider.color }}>
                      ₦{(provider.volume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-text-secondary">volume</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  {/* Success Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">Success Rate</span>
                      <span className="font-bold text-accent-green">{provider.success_rate}%</span>
                    </div>
                    <div className="w-full bg-apple-gray5 rounded-full h-2.5">
                      <div
                        className="bg-accent-green h-2.5 rounded-full"
                        style={{ width: `${provider.success_rate}%` }}
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">Availability</span>
                      <span className="font-bold text-accent-blue">{provider.availability}%</span>
                    </div>
                    <div className="w-full bg-apple-gray5 rounded-full h-2.5">
                      <div
                        className="bg-accent-blue h-2.5 rounded-full"
                        style={{ width: `${provider.availability}%` }}
                      />
                    </div>
                  </div>

                  {/* Latency Score */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">Latency</span>
                      <span className="font-bold text-text-primary">{provider.avg_latency}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < Math.round((5 - provider.avg_latency) / 1.2)
                              ? 'bg-accent-orange'
                              : 'bg-apple-gray5'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Routing Paths */}
        <div className="animate-slide-down" style={{ animationDelay: '0.15s' }}>
          <h2 className="section-title mb-4 flex items-center gap-2">
            <Route size={20} /> Real-time Routing Paths
          </h2>
          <div className="space-y-3">
            {routingPaths.map((path) => (
              <div
                key={path.id}
                onClick={() => setSelectedRoute(path)}
                className={`apple-surface rounded-2xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                  selectedRoute?.id === path.id ? 'ring-2 ring-accent-blue' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Left: Merchant & Amount */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-apple-gray5 flex items-center justify-center text-sm font-bold text-accent-blue">
                        {path.merchant.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary">{path.merchant}</div>
                        <div className="text-xs text-text-secondary">₦{path.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Routing Path */}
                  <div className="flex items-center gap-3 mx-6">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-text-secondary mb-1">Primary</div>
                      <div className="font-bold text-text-primary">{path.primary_provider}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <Zap size={16} className="text-accent-orange mb-1" />
                      <div className="text-xs text-text-secondary">Route</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-text-secondary mb-1">Fallback</div>
                      <div className="font-bold text-text-primary">{path.fallback_provider}</div>
                    </div>
                  </div>

                  {/* Right: Status & Time */}
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full border text-xs font-semibold inline-block mb-2 ${getStatusBadge(path.status)}`}>
                      {path.status === 'optimized' && '⚡ Optimized'}
                      {path.status === 'routed' && '→ Routed'}
                      {path.status === 'failover' && '⚠ Failover'}
                    </div>
                    <div className="text-xs text-text-secondary block">{path.execution_time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Route Decision Details */}
        {selectedRoute && (
          <div className="apple-surface rounded-2xl p-6 border-l-4 border-accent-blue animate-slide-down">
            <h2 className="section-title mb-4 flex items-center gap-2">
              <Brain size={20} /> Route Decision Factors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-apple-gray5 rounded-xl p-4">
                <div className="text-sm text-text-secondary mb-2">Success Rate</div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-accent-green">
                    {selectedRoute.decision_factors.success_rate}%
                  </span>
                  <span className="text-xs text-text-secondary mb-1">• Primary factor</span>
                </div>
                <div className="w-full bg-apple-gray4 rounded-full h-2 mt-2">
                  <div
                    className="bg-accent-green h-2 rounded-full"
                    style={{ width: `${selectedRoute.decision_factors.success_rate}%` }}
                  />
                </div>
              </div>

              <div className="bg-apple-gray5 rounded-xl p-4">
                <div className="text-sm text-text-secondary mb-2">Latency</div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-accent-orange">
                    {selectedRoute.decision_factors.latency}ms
                  </span>
                  <span className="text-xs text-text-secondary mb-1">• Speed</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full ${
                        i < Math.round((5 - selectedRoute.decision_factors.latency) / 1.2)
                          ? 'bg-accent-orange'
                          : 'bg-apple-gray4'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-apple-gray5 rounded-xl p-4">
                <div className="text-sm text-text-secondary mb-2">Availability</div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-accent-blue">
                    {selectedRoute.decision_factors.availability}%
                  </span>
                  <span className="text-xs text-text-secondary mb-1">• Uptime</span>
                </div>
                <div className="w-full bg-apple-gray4 rounded-full h-2 mt-2">
                  <div
                    className="bg-accent-blue h-2 rounded-full"
                    style={{ width: `${selectedRoute.decision_factors.availability}%` }}
                  />
                </div>
              </div>

              <div className="bg-apple-gray5 rounded-xl p-4">
                <div className="text-sm text-text-secondary mb-2">Cost</div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-text-primary">
                    {(selectedRoute.decision_factors.cost * 100).toFixed(2)}%
                  </span>
                  <span className="text-xs text-text-secondary mb-1">• Fee</span>
                </div>
                <div className="w-full bg-apple-gray4 rounded-full h-2 mt-2">
                  <div
                    className="bg-text-primary h-2 rounded-full"
                    style={{ width: `${selectedRoute.decision_factors.cost * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* AI Decision Summary */}
            <div className="mt-4 p-4 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
              <p className="text-sm text-text-primary">
                <span className="font-semibold">AI Decision:</span> Route selected{' '}
                <span className="font-bold text-accent-blue">{selectedRoute.primary_provider}</span> as
                primary due to highest success rate ({selectedRoute.decision_factors.success_rate}%) and
                optimal latency ({selectedRoute.decision_factors.latency}ms).{' '}
                <span className="font-bold text-accent-blue">{selectedRoute.fallback_provider}</span> configured
                as failover with {selectedRoute.decision_factors.availability}% availability.
              </p>
            </div>
          </div>
        )}

        {/* Provider Comparison */}
        <div className="animate-slide-down" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title mb-4 flex items-center gap-2">
            <BarChart3 size={20} /> Provider Comparison
          </h2>
          <div className="apple-surface rounded-2xl p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-text-secondary font-semibold">Provider</th>
                  <th className="text-right py-3 px-4 text-text-secondary font-semibold">Success Rate</th>
                  <th className="text-right py-3 px-4 text-text-secondary font-semibold">Latency</th>
                  <th className="text-right py-3 px-4 text-text-secondary font-semibold">Availability</th>
                  <th className="text-right py-3 px-4 text-text-secondary font-semibold">Volume</th>
                  <th className="text-right py-3 px-4 text-text-secondary font-semibold">Transactions</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.name} className="border-b border-white/[0.08] hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-text-primary flex items-center gap-2">
                      <span>{provider.icon}</span>
                      {provider.name}
                    </td>
                    <td className="text-right py-3 px-4 text-accent-green font-semibold">
                      {provider.success_rate}%
                    </td>
                    <td className="text-right py-3 px-4 text-text-primary font-semibold">
                      {provider.avg_latency}ms
                    </td>
                    <td className="text-right py-3 px-4 text-accent-blue font-semibold">
                      {provider.availability}%
                    </td>
                    <td className="text-right py-3 px-4 text-text-primary font-semibold">
                      ₦{(provider.volume / 1000000).toFixed(1)}M
                    </td>
                    <td className="text-right py-3 px-4 text-text-secondary">
                      {provider.transactions_routed.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
