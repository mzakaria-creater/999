import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import Card from '@components/Card'

const mockDeposits = [
  { id: 'DEP-2024-0001', amount: 250000, currency: 'EGP', merchant: 'Amazon Egypt', status: 'completed', date: '2024-03-09', time: '14:32' },
  { id: 'DEP-2024-0002', amount: 150000, currency: 'EGP', merchant: 'Noon UAE', status: 'processing', date: '2024-03-09', time: '12:15' },
  { id: 'DEP-2024-0003', amount: 500000, currency: 'SAR', merchant: 'Jumia SA', status: 'pending', date: '2024-03-09', time: '10:48' },
  { id: 'DEP-2024-0004', amount: 75000, currency: 'AED', merchant: 'Carrefour UAE', status: 'completed', date: '2024-03-08', time: '16:20' },
]

export default function Deposits() {
  const [deposits] = useState(mockDeposits)
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = deposits.filter(d =>
    d.id.includes(searchTerm) || d.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalVolume = filtered.reduce((sum, d) => sum + d.amount, 0)
  const completedCount = filtered.filter(d => d.status === 'completed').length

  return (
    <div className="ml-64 pt-20 pb-8 px-8 max-w-7xl">
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">Deposits</h1>
            <p className="text-text-secondary">Manage incoming fund deposits</p>
          </div>
          <button className="btn flex items-center gap-2">
            <Plus size={18} />
            New Deposit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <Card label="Total Volume" value={`${(totalVolume / 1000000).toFixed(1)}M`} badge={{ text: 'EGP', type: 'success' }} />
          <Card label="Completed" value={completedCount.toString()} badge={{ text: `${Math.round((completedCount / filtered.length) * 100)}%`, type: 'success' }} />
          <Card label="Pending Review" value={filtered.filter(d => d.status === 'pending').length.toString()} badge={{ text: 'Action', type: 'pending' }} />
        </div>

        {/* Search & Filter */}
        <div className="apple-surface rounded-2xl p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-text-secondary" />
              <input
                type="text"
                placeholder="Search by ID or merchant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="apple-surface rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Merchant</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Currency</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(deposit => (
                <tr key={deposit.id} className="table-row">
                  <td className="px-6 py-4 font-mono text-sm text-text-primary">{deposit.id}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{deposit.merchant}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">{(deposit.amount / 1000).toFixed(0)}K</td>
                  <td className="px-6 py-4"><span className="badge bg-accent-blue/15 text-accent-blue border border-accent-blue/30">{deposit.currency}</span></td>
                  <td className="px-6 py-4">
                    <span className={`badge ${deposit.status === 'completed' ? 'badge-success' : deposit.status === 'processing' ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30' : 'badge-pending'}`}>
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{deposit.date} {deposit.time}</td>
                  <td className="px-6 py-4"><button className="btn-secondary text-sm">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
