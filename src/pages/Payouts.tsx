import { useState } from 'react'
import { Plus, Search, TrendingDown } from 'lucide-react'
import Card from '@components/Card'

const mockPayouts = [
  { id: 'PAY-2024-0001', recipient: 'Merchant A', amount: 125000, currency: 'EGP', method: 'Bank Transfer', status: 'completed', date: '2024-03-09', fee: 1875 },
  { id: 'PAY-2024-0002', recipient: 'Merchant B', amount: 85000, currency: 'SAR', method: 'Wallet', status: 'processing', date: '2024-03-09', fee: 1275 },
  { id: 'PAY-2024-0003', recipient: 'Merchant C', amount: 320000, currency: 'EGP', method: 'Bank Transfer', status: 'pending', date: '2024-03-09', fee: 4800 },
  { id: 'PAY-2024-0004', recipient: 'Merchant D', amount: 45000, currency: 'AED', method: 'Wallet', status: 'completed', date: '2024-03-08', fee: 675 },
]

export default function Payouts() {
  const [payouts] = useState(mockPayouts)
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = payouts.filter(p =>
    p.id.includes(searchTerm) || p.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPayoutAmount = filtered.reduce((sum, p) => sum + p.amount, 0)
  const totalFees = filtered.reduce((sum, p) => sum + p.fee, 0)

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">Payouts</h1>
            <p className="text-text-secondary">Manage outgoing payments to merchants</p>
          </div>
          <button className="btn flex items-center gap-2">
            <Plus size={18} />
            Create Payout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <Card label="Total Payouts" value={`${(totalPayoutAmount / 1000000).toFixed(1)}M`} badge={{ text: 'This Month', type: 'success' }} />
          <Card label="Total Fees" value={`${(totalFees / 1000).toFixed(0)}K`} badge={{ text: 'Collected', type: 'success' }} />
          <Card label="Pending" value={filtered.filter(p => p.status === 'pending').length.toString()} badge={{ text: 'Action', type: 'pending' }} />
        </div>

        {/* Search */}
        <div className="apple-surface rounded-2xl p-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by ID or recipient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="apple-surface rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Recipient</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Fee</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Method</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(payout => (
                <tr key={payout.id} className="table-row">
                  <td className="px-6 py-4 font-mono text-sm text-text-primary">{payout.id}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{payout.recipient}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">{(payout.amount / 1000).toFixed(0)}K {payout.currency}</td>
                  <td className="px-6 py-4 text-sm text-accent-orange">{(payout.fee / 1000).toFixed(1)}K</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{payout.method}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${payout.status === 'completed' ? 'badge-success' : payout.status === 'processing' ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30' : 'badge-pending'}`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{payout.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
