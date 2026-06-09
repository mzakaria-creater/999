import { useState, useEffect } from 'react'
import Card from '@components/Card'
import Chart from '@components/Chart'
import TransactionTable from '@components/TransactionTable'

interface DashboardData {
  volume24h: number
  transactions: number
  successRate: number
  pending: number
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    volume24h: 2480000,
    transactions: 8450,
    successRate: 99.85,
    pending: 42,
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(data)
    }, 500)
  }, [])

  return (
    <div className="ml-72 pt-20 pb-8 px-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-slide-down">
          <h1 className="font-syne text-4xl font-extrabold text-text-primary mb-2">
            Enterprise Dashboard
          </h1>
          <p className="text-text-secondary">Real-time payment platform metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
          <Card
            label="Volume (24h)"
            value={`$${(data.volume24h / 1000000).toFixed(2)}M`}
            badge={{ text: '↑ 24%', type: 'success' }}
            featured
          />
          <Card
            label="Transactions"
            value={data.transactions.toLocaleString()}
            badge={{ text: 'Real-time', type: 'success' }}
          />
          <Card
            label="Success Rate"
            value={`${data.successRate}%`}
            badge={{ text: 'Optimal', type: 'success' }}
          />
          <Card
            label="Pending"
            value={data.pending.toString()}
            badge={{ text: 'Review', type: 'pending' }}
          />
        </div>

        {/* Chart */}
        <div className="animate-slide-down" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">Transaction Flow</h2>
          <Chart />
        </div>

        {/* Transactions Table */}
        <div className="animate-slide-down" style={{ animationDelay: '0.3s' }}>
          <h2 className="section-title">Recent Activity</h2>
          <TransactionTable />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-slide-down" style={{ animationDelay: '0.4s' }}>
          <button className="btn">Create New Transaction</button>
          <button className="btn-secondary">View Analytics</button>
        </div>
      </div>
    </div>
  )
}
