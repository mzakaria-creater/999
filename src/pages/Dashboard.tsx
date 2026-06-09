import { useState } from 'react'
import { TrendingUp, AlertCircle, CheckCircle2, Clock, Wallet, Activity } from 'lucide-react'
import Card from '@components/Card'
import Chart from '@components/Chart'
import TransactionTable from '@components/TransactionTable'
import WalletManagementTable from '@components/WalletManagementTable'
import MultiWalletCheckout from '@components/MultiWalletCheckout'
import MultiWalletEngine from '@components/MultiWalletEngine'
import iPhone3DMockup from '@components/3D/iPhone3DMockup'
import TransactionFlow3D from '@components/3D/TransactionFlow3D'
import KPIDetailsModal, { KPIDetail } from '@components/KPIDetailsModal'

const kpiDetails: Record<string, KPIDetail> = {
  volume: {
    title: 'Payment Volume (24h)',
    value: '$2.48M',
    description: 'Total payment volume processed in the last 24 hours',
    trend: { direction: 'up', percentage: 24 },
    stats: [
      { label: 'Peak Hour', value: '$320K', icon: '📊' },
      { label: 'Avg Transaction', value: '$293', icon: '💳' },
      { label: 'Total Txns', value: '8,450', icon: '✓' },
      { label: 'Geographic', value: '12 Countries', icon: '🌍' },
    ],
    chart: 'volume24h',
  },
  transactions: {
    title: 'Total Transactions',
    value: '8,450',
    description: 'Total number of transactions processed',
    trend: { direction: 'up', percentage: 18 },
    stats: [
      { label: 'Successful', value: '8,421', icon: '✓' },
      { label: 'Failed', value: '12', icon: '✗' },
      { label: 'Pending', value: '17', icon: '⏳' },
      { label: 'Avg Speed', value: '2.3s', icon: '⚡' },
    ],
    chart: 'transactions24h',
  },
  successRate: {
    title: 'Success Rate',
    value: '99.85%',
    description: 'Percentage of successful transactions',
    trend: { direction: 'up', percentage: 0.5 },
    stats: [
      { label: 'Uptime', value: '99.98%', icon: '✓' },
      { label: 'Failed Txns', value: '12', icon: '✗' },
      { label: 'Blocked', value: '8', icon: '🚫' },
      { label: 'SLA Status', value: 'Met', icon: '📋' },
    ],
    chart: 'successRate24h',
  },
  walletHealth: {
    title: 'Wallet Health',
    value: '96%',
    description: 'Overall health status of all wallets',
    trend: { direction: 'up', percentage: 2 },
    stats: [
      { label: 'Healthy', value: '24/25', icon: '💚' },
      { label: 'Warning', value: '1', icon: '⚠️' },
      { label: 'Critical', value: '0', icon: '🔴' },
      { label: 'Avg Capacity', value: '68%', icon: '📊' },
    ],
    chart: 'walletHealth24h',
  },
  pending: {
    title: 'Pending Approvals',
    value: '42',
    description: 'Transactions awaiting approval',
    trend: { direction: 'down', percentage: 5 },
    stats: [
      { label: 'High Priority', value: '8', icon: '🔴' },
      { label: 'Medium', value: '18', icon: '🟡' },
      { label: 'Low', value: '16', icon: '🟢' },
      { label: 'Oldest', value: '45min', icon: '⏱️' },
    ],
    chart: 'pending24h',
  },
  failover: {
    title: 'Active Failovers',
    value: '2',
    description: 'Currently active failover instances',
    trend: { direction: 'down', percentage: 2 },
    stats: [
      { label: 'Gateway 1', value: 'Active', icon: '🟢' },
      { label: 'Gateway 2', value: 'Standby', icon: '🟡' },
      { label: 'Response Time', value: '142ms', icon: '⚡' },
      { label: 'Availability', value: '99.5%', icon: '✓' },
    ],
    chart: 'failover24h',
  },
}

export default function Dashboard() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState('')
  const [selectedKPI, setSelectedKPI] = useState<KPIDetail | null>(null)

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-slide-down">
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">
            Enterprise Dashboard
          </h1>
          <p className="text-text-secondary">Real-time payment platform metrics & operations</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-slide-down" style={{ animationDelay: '0.05s' }}>
          <Card
            label="Volume (24h)"
            value="$2.48M"
            badge={{ text: '↑ 24%', type: 'success' }}
            featured
            onClick={() => setSelectedKPI(kpiDetails.volume)}
          />
          <Card
            label="Transactions"
            value="8,450"
            badge={{ text: 'Real-time', type: 'success' }}
            onClick={() => setSelectedKPI(kpiDetails.transactions)}
          />
          <Card
            label="Success Rate"
            value="99.85%"
            badge={{ text: 'Optimal', type: 'success' }}
            onClick={() => setSelectedKPI(kpiDetails.successRate)}
          />
          <Card
            label="Wallet Health"
            value="96%"
            badge={{ text: 'Excellent', type: 'success' }}
            onClick={() => setSelectedKPI(kpiDetails.walletHealth)}
          />
          <Card
            label="Pending"
            value="42"
            badge={{ text: 'Review', type: 'pending' }}
            onClick={() => setSelectedKPI(kpiDetails.pending)}
          />
          <Card
            label="Failover"
            value="2"
            badge={{ text: 'Active', type: 'pending' }}
            onClick={() => setSelectedKPI(kpiDetails.failover)}
          />
        </div>

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
