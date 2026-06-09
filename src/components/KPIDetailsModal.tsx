import { X, TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react'

export interface KPIDetail {
  title: string
  value: string
  description: string
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  stats: Array<{
    label: string
    value: string
    icon?: string
  }>
  chart?: string
}

interface KPIDetailsModalProps {
  kpi: KPIDetail | null
  onClose: () => void
}

export default function KPIDetailsModal({ kpi, onClose }: KPIDetailsModalProps) {
  if (!kpi) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-apple-gray6 border border-white/[0.08] rounded-2xl shadow-2xl max-w-2xl w-full pointer-events-auto animate-apple-enter"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">{kpi.title}</h2>
              <p className="text-text-secondary text-sm mt-1">{kpi.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/[0.08] rounded-lg transition-colors"
            >
              <X size={24} className="text-text-secondary" />
            </button>
          </div>

          {/* Main Value */}
          <div className="p-6 border-b border-white/[0.08] flex items-end gap-4">
            <div>
              <p className="text-text-secondary text-sm font-semibold mb-2">Current Value</p>
              <p className="text-5xl font-bold text-text-primary" style={{ letterSpacing: '-0.03em' }}>
                {kpi.value}
              </p>
            </div>
            {kpi.trend && (
              <div className={`flex items-center gap-2 pb-2 ${kpi.trend.direction === 'up' ? 'text-accent-green' : 'text-accent-orange'}`}>
                {kpi.trend.direction === 'up' ? (
                  <TrendingUp size={20} />
                ) : (
                  <TrendingDown size={20} />
                )}
                <span className="font-bold">{kpi.trend.percentage}%</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="p-6 grid grid-cols-2 gap-4 border-b border-white/[0.08]">
            {kpi.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/[0.03] rounded-xl p-4">
                <p className="text-text-secondary text-xs font-semibold uppercase mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  {stat.icon && <span className="text-2xl">{stat.icon}</span>}
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          {kpi.chart && (
            <div className="p-6 border-b border-white/[0.08]">
              <h3 className="font-bold text-text-primary mb-4">24-Hour Trend</h3>
              <div className="bg-white/[0.02] rounded-xl p-8 h-48 flex items-end justify-center gap-1">
                {/* Simple bar chart visualization */}
                {[65, 45, 70, 55, 80, 70, 90, 75].map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-accent-blue to-accent-blue/50 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${height}%` }}
                    title={`${height}%`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-6 flex gap-3">
            <button className="flex-1 bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all">
              View Full Report
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-white/[0.05] text-text-primary font-bold py-3 rounded-xl hover:bg-white/[0.1] transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
