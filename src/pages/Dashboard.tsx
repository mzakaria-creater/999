import { useState, useEffect } from 'react'
import { TrendingUp, AlertCircle, CheckCircle2, Clock, Wallet, Activity, RefreshCw } from 'lucide-react'
import Card from '@components/Card'
import Chart from '@components/Chart'
import TransactionTable from '@components/TransactionTable'
import WalletManagementTable from '@components/WalletManagementTable'
import MultiWalletCheckout from '@components/MultiWalletCheckout'
import MultiWalletEngine from '@components/MultiWalletEngine'
import KPIDetailsModal, { KPIDetail } from '@components/KPIDetailsModal'
import api from '@/services/api'
import { useFetch } from '@/hooks/useFetch'

interface DashboardStats {
  volume24h: number
  volumeTrend: number
  transactionCount: number
  transactionTrend: number
  successRate: number
  successRateTrend: number
  walletHealth: number
  walletHealthTrend: number
  pendingApprovals: number
  pendingTrend: number
  activeFailovers: number
  failoverTrend: number
  peakHour?: number
  avgTransaction?: number
  successfulCount?: number
  failedCount?: number
  uptime?: number
  healthyWallets?: number
  totalWallets?: number
  countries?: number
}

export default function Dashboard() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState('')
  const [selectedKPI, setSelectedKPI] = useState<KPIDetail | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch real data from API
  const { data: stats, loading, error, refetch } = useFetch(
    () => api.getDashboardStats(),
    []
  ) as any

  // Default fallback while loading
  const dashboardStats: DashboardStats = stats || {
    volume24h: 0,
    volumeTrend: 0,
    transactionCount: 0,
    transactionTrend: 0,
    successRate: 0,
    successRateTrend: 0,
    walletHealth: 0,
    walletHealthTrend: 0,
    pendingApprovals: 0,
    pendingTrend: 0,
    activeFailovers: 0,
    failoverTrend: 0,
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refetch?.()
    } finally {
      setIsRefreshing(false)
    }
  }

  // Generate KPI details from real data
  const generateKPIDetails = (): Record<string, KPIDetail> => ({
    volume: {
      title: 'Payment Volume (24h)',
      value: `$${(dashboardStats.volume24h / 1000000).toFixed(2)}M`,
      description: 'Total payment volume processed in the last 24 hours',
      trend: {
        direction: dashboardStats.volumeTrend >= 0 ? 'up' : 'down',
        percentage: Math.abs(dashboardStats.volumeTrend),
      },
      stats: [
        { label: 'Peak Hour', value: `$${dashboardStats.peakHour?.toLocaleString() || '0'}`, icon: '📊' },
        { label: 'Avg Transaction', value: `$${dashboardStats.avgTransaction?.toFixed(0) || '0'}`, icon: '💳' },
        { label: 'Total Txns', value: dashboardStats.transactionCount.toLocaleString(), icon: '✓' },
        { label: 'Countries', value: dashboardStats.countries?.toString() || '0', icon: '🌍' },
      ],
      chart: 'volume24h',
    },
    transactions: {
      title: 'Total Transactions',
      value: dashboardStats.transactionCount.toLocaleString(),
      description: 'Total number of transactions processed',
      trend: {
        direction: dashboardStats.transactionTrend >= 0 ? 'up' : 'down',
        percentage: Math.abs(dashboardStats.transactionTrend),
      },
      stats: [
        { label: 'Successful', value: dashboardStats.successfulCount?.toLocaleString() || '0', icon: '✓' },
        { label: 'Failed', value: dashboardStats.failedCount?.toLocaleString() || '0', icon: '✗' },
        { label: 'Pending', value: '0', icon: '⏳' },
        { label: 'Avg Speed', value: '2.3s', icon: '⚡' },
      ],
      chart: 'transactions24h',
    },
    successRate: {
      title: 'Success Rate',
      value: `${dashboardStats.successRate.toFixed(2)}%`,
      description: 'Percentage of successful transactions',
      trend: {
        direction: dashboardStats.successRateTrend >= 0 ? 'up' : 'down',
        percentage: Math.abs(dashboardStats.successRateTrend),
      },
      stats: [
        { label: 'Uptime', value: `${dashboardStats.uptime?.toFixed(2) || '0'}%`, icon: '✓' },
        { label: 'Failed Txns', value: dashboardStats.failedCount?.toLocaleString() || '0', icon: '✗' },
        { label: 'Blocked', value: '0', icon: '🚫' },
        { label: 'SLA Status', value: 'Met', icon: '📋' },
      ],
      chart: 'successRate24h',
    },
    walletHealth: {
      title: 'Wallet Health',
      value: `${dashboardStats.walletHealth.toFixed(0)}%`,
      description: 'Overall health status of all wallets',
      trend: {
        direction: dashboardStats.walletHealthTrend >= 0 ? 'up' : 'down',
        percentage: Math.abs(dashboardStats.walletHealthTrend),
      },
      stats: [
        { label: 'Healthy', value: `${dashboardStats.healthyWallets}/${dashboardStats.totalWallets}`, icon: '💚' },
        { label: 'Warning', value: '0', icon: '⚠️' },
        { label: 'Critical', value: '0', icon: '🔴' },
        { label: 'Avg Capacity', value: '68%', icon: '📊' },
      ],
      chart: 'walletHealth24h',
    },
    pending: {
      title: 'Pending Approvals',
      value: dashboardStats.pendingApprovals.toString(),
      description: 'Transactions awaiting approval',
      trend: {
        direction: dashboardStats.pendingTrend >= 0 ? 'up' : 'down',
        percentage: Math.abs(dashboardStats.pendingTrend),
      },
      stats: [
        { label: 'High Priority', value: '0', icon: '🔴' },
        { label: 'Medium', value: '0', icon: '🟡' },
        { label: 'Low', value: '0', icon: '🟢' },
        { label: 'Oldest', value: '0min', icon: '⏱️' },
      ],
      chart: 'pending24h',
    },
    failover: {
      title: 'Active Failovers',
      value: dashboardStats.activeFailovers.toString(),
      description: 'Currently active failover instances',
      trend: {
        direction: dashboardStats.failoverTrend >= 0 ? 'up' : 'down',
        percentage: Math.abs(dashboardStats.failoverTrend),
      },
      stats: [
        { label: 'Gateway 1', value: 'Active', icon: '🟢' },
        { label: 'Gateway 2', value: 'Standby', icon: '🟡' },
        { label: 'Response Time', value: '142ms', icon: '⚡' },
        { label: 'Availability', value: '99.5%', icon: '✓' },
      ],
      chart: 'failover24h',
    },
  })

  const kpiDetails = generateKPIDetails()

  if (error) {
    return (
      <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="glossy-card rounded-2xl p-8 bg-accent-red/5 border border-accent-red/20 text-center">
          <h2 className="text-2xl font-bold text-accent-red mb-2">Error Loading Dashboard</h2>
          <p className="text-text-secondary mb-6">{error.message}</p>
          <button
            onClick={handleRefresh}
            className="bg-accent-blue text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Header with Refresh */}
        <div className="animate-slide-down flex justify-between items-start">
          <div>
            <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">
              Enterprise Dashboard
            </h1>
            <p className="text-text-secondary">Real-time payment platform metrics & operations</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="flex items-center gap-2 bg-accent-blue text-white font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Loading State */}
        {loading && !stats ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="apple-card h-32 bg-white/[0.02] animate-pulse" />
              ))}
          </div>
        ) : (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-slide-down" style={{ animationDelay: '0.05s' }}>
              <Card
                label="Volume (24h)"
                value={kpiDetails.volume.value}
                badge={{
                  text: `${dashboardStats.volumeTrend >= 0 ? '↑' : '↓'} ${Math.abs(dashboardStats.volumeTrend)}%`,
                  type: dashboardStats.volumeTrend >= 0 ? 'success' : 'error',
                }}
                featured
                onClick={() => setSelectedKPI(kpiDetails.volume)}
              />
              <Card
                label="Transactions"
                value={kpiDetails.transactions.value}
                badge={{
                  text: `${dashboardStats.transactionTrend >= 0 ? '↑' : '↓'} ${Math.abs(dashboardStats.transactionTrend)}%`,
                  type: 'success',
                }}
                onClick={() => setSelectedKPI(kpiDetails.transactions)}
              />
              <Card
                label="Success Rate"
                value={kpiDetails.successRate.value}
                badge={{
                  text: `${dashboardStats.successRate > 99 ? 'Optimal' : 'Good'}`,
                  type: dashboardStats.successRate > 99 ? 'success' : 'pending',
                }}
                onClick={() => setSelectedKPI(kpiDetails.successRate)}
              />
              <Card
                label="Wallet Health"
                value={kpiDetails.walletHealth.value}
                badge={{
                  text: `${dashboardStats.walletHealth > 90 ? 'Excellent' : 'Good'}`,
                  type: dashboardStats.walletHealth > 90 ? 'success' : 'pending',
                }}
                onClick={() => setSelectedKPI(kpiDetails.walletHealth)}
              />
              <Card
                label="Pending"
                value={kpiDetails.pending.value}
                badge={{ text: 'Review', type: 'pending' }}
                onClick={() => setSelectedKPI(kpiDetails.pending)}
              />
              <Card
                label="Failover"
                value={kpiDetails.failover.value}
                badge={{
                  text: dashboardStats.activeFailovers > 0 ? 'Active' : 'Standby',
                  type: dashboardStats.activeFailovers > 0 ? 'pending' : 'success',
                }}
                onClick={() => setSelectedKPI(kpiDetails.failover)}
              />
            </div>
          </>
        )}

        {/* KPI Details Modal */}
        <KPIDetailsModal
          kpi={selectedKPI}
          onClose={() => setSelectedKPI(null)}
        />

        {/* System Status & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
          {/* System Health */}
          <div className="apple-surface rounded-2xl p-6">
            <h3 className="section-title">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent-green" />
                  <span className="text-text-primary text-sm">API Servers</span>
                </div>
                <span className="text-accent-green font-semibold text-sm">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent-green" />
                  <span className="text-text-primary text-sm">Database</span>
                </div>
                <span className="text-accent-green font-semibold text-sm">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-accent-orange" />
                  <span className="text-text-primary text-sm">Wallet Monitoring</span>
                </div>
                <span className="text-accent-orange font-semibold text-sm">1 Degraded</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent-green" />
                  <span className="text-text-primary text-sm">Compliance</span>
                </div>
                <span className="text-accent-green font-semibold text-sm">Compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="apple-surface rounded-2xl p-6">
            <h3 className="section-title">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn text-sm flex items-center justify-between py-2 px-3">
                <span>Create Transaction</span>
                <TrendingUp size={16} />
              </button>
              <button className="w-full btn-secondary text-sm flex items-center justify-between py-2 px-3">
                <span>View Approvals</span>
                <Clock size={16} />
              </button>
              <button className="w-full btn-secondary text-sm flex items-center justify-between py-2 px-3">
                <span>Wallet Management</span>
                <Wallet size={16} />
              </button>
              <button onClick={() => setShowCheckout(!showCheckout)} className="w-full btn-secondary text-sm flex items-center justify-between py-2 px-3">
                <span>{showCheckout ? 'Hide' : 'Test'} Checkout</span>
                <Activity size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Transaction Flow */}
        <div className="animate-slide-down" style={{ animationDelay: '0.15s' }}>
          <h2 className="section-title">Transaction Flow</h2>
          <TransactionFlow3D />
        </div>

        {/* Transaction Volume Chart */}
        <div className="animate-slide-down" style={{ animationDelay: '0.16s' }}>
          <h2 className="section-title">Transaction Volume (24h)</h2>
          <Chart />
        </div>

        {/* 3D iPhone Mockup */}
        <div className="animate-slide-down" style={{ animationDelay: '0.18s' }}>
          <h2 className="section-title">Mobile Experience</h2>
          <iPhone3DMockup />
        </div>

        {/* Multi-Wallet Portfolio */}
        <div className="animate-slide-down" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">Wallet Portfolio</h2>
          <WalletManagementTable />
        </div>

        {/* Multi-Wallet Engine */}
        <div className="animate-slide-down" style={{ animationDelay: '0.22s' }}>
          <MultiWalletEngine />
        </div>

        {/* Multi-Wallet Checkout Demo */}
        {showCheckout && (
          <div className="animate-slide-down" style={{ animationDelay: '0.25s' }}>
            <h2 className="section-title">Multi-Wallet Payment Demo</h2>
            <div className="apple-surface rounded-2xl p-8">
              <MultiWalletCheckout
                amount={50000}
                currency="EGP"
                onSelectWallet={setSelectedWallet}
                onConfirm={() => alert(`Payment confirmed via: ${selectedWallet}`)}
              />
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="animate-slide-down" style={{ animationDelay: '0.3s' }}>
          <h2 className="section-title">Recent Activity</h2>
          <TransactionTable />
        </div>

        {/* Compliance & Risk, Audit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-down" style={{ animationDelay: '0.35s' }}>
          <div className="apple-surface rounded-2xl p-6">
            <h3 className="section-title">Risk & Compliance</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">AML Screening:</span>
                <span className="text-accent-green font-semibold">✓ Passed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">KYC Verification:</span>
                <span className="text-accent-green font-semibold">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Fraud Detection:</span>
                <span className="text-accent-orange font-semibold">2 Alerts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Compliance Score:</span>
                <span className="text-accent-green font-semibold">98/100</span>
              </div>
            </div>
          </div>

          <div className="apple-surface rounded-2xl p-6">
            <h3 className="section-title">Audit Log Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Events:</span>
                <span className="text-text-primary font-semibold">12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Last 24h:</span>
                <span className="text-text-primary font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">High Priority:</span>
                <span className="text-accent-orange font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Data Integrity:</span>
                <span className="text-accent-green font-semibold">✓ Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
