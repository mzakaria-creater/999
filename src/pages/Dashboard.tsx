import { useState } from 'react'
import { TrendingUp, AlertCircle, CheckCircle2, Clock, Wallet, Activity } from 'lucide-react'
import Card from '@components/Card'
import Chart from '@components/Chart'
import TransactionTable from '@components/TransactionTable'
import WalletManagementTable from '@components/WalletManagementTable'
import MultiWalletCheckout from '@components/MultiWalletCheckout'
import iPhone3DMockup from '@components/3D/iPhone3DMockup'
import TransactionFlow3D from '@components/3D/TransactionFlow3D'

export default function Dashboard() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState('')

  return (
    <div className="ml-64 pt-20 pb-8 px-8 max-w-7xl">
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
          />
          <Card
            label="Transactions"
            value="8,450"
            badge={{ text: 'Real-time', type: 'success' }}
          />
          <Card
            label="Success Rate"
            value="99.85%"
            badge={{ text: 'Optimal', type: 'success' }}
          />
          <Card
            label="Wallet Health"
            value="96%"
            badge={{ text: 'Excellent', type: 'success' }}
          />
          <Card
            label="Pending"
            value="42"
            badge={{ text: 'Review', type: 'pending' }}
          />
          <Card
            label="Failover"
            value="2"
            badge={{ text: 'Active', type: 'pending' }}
          />
        </div>

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
