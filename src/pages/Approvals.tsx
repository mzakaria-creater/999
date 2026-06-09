import { useState } from 'react'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import Card from '@components/Card'

const mockApprovals = [
  { id: 'APR-2024-0001', type: 'Limit Increase', merchant: 'Amazon Egypt', amount: 500000, requiredLevel: 'Senior Operator', status: 'pending', createdAt: '2024-03-09 14:32' },
  { id: 'APR-2024-0002', type: 'Merchant Onboarding', merchant: 'New Merchant LLC', amount: 0, requiredLevel: 'Admin', status: 'pending', createdAt: '2024-03-09 12:15' },
  { id: 'APR-2024-0003', type: 'Wallet Adjustment', merchant: 'Jumia SA', amount: 250000, requiredLevel: 'Operator', status: 'approved', createdAt: '2024-03-08 16:45', approvedBy: 'Admin User', approvedAt: '2024-03-09 08:30' },
  { id: 'APR-2024-0004', type: 'Risk Override', merchant: 'Suspicious Merchant', amount: 0, requiredLevel: 'Admin', status: 'rejected', createdAt: '2024-03-08 10:20', rejectedBy: 'Compliance Officer', rejectedAt: '2024-03-08 11:00' },
]

export default function Approvals() {
  const [approvals] = useState(mockApprovals)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const filtered = approvals.filter(a => filter === 'all' || a.status === filter)
  const pendingCount = approvals.filter(a => a.status === 'pending').length

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        <div>
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">Approvals Center</h1>
          <p className="text-text-secondary">Review and manage approval requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          <Card label="Total Requests" value={approvals.length.toString()} badge={{ text: 'All Time', type: 'success' }} />
          <Card label="Pending" value={pendingCount.toString()} badge={{ text: 'Urgent', type: 'pending' }} />
          <Card label="Approved" value={approvals.filter(a => a.status === 'approved').length.toString()} badge={{ text: 'Done', type: 'success' }} />
          <Card label="Rejected" value={approvals.filter(a => a.status === 'rejected').length.toString()} badge={{ text: 'Declined', type: 'error' }} />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-white/[0.08] pb-4">
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 font-semibold text-sm transition-all capitalize ${
                filter === f
                  ? 'text-accent-blue border-b-2 border-accent-blue'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filtered.map(approval => (
            <div key={approval.id} className="apple-surface rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-text-primary text-lg">{approval.type}</h3>
                  <p className="text-sm text-text-secondary mt-1">{approval.merchant}</p>
                </div>
                <span className={`badge ${
                  approval.status === 'pending'
                    ? 'bg-accent-orange/15 text-accent-orange border border-accent-orange/30'
                    : approval.status === 'approved'
                    ? 'badge-success'
                    : 'badge-error'
                }`}>
                  {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-white/[0.06]">
                <div>
                  <p className="text-xs text-text-secondary mb-1">ID</p>
                  <p className="font-mono text-sm text-text-primary">{approval.id}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Amount</p>
                  <p className="font-semibold text-sm text-accent-blue">{approval.amount > 0 ? `${(approval.amount / 1000).toFixed(0)}K` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Required Level</p>
                  <p className="text-sm text-text-primary">{approval.requiredLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Created</p>
                  <p className="text-sm text-text-secondary">{approval.createdAt}</p>
                </div>
              </div>

              {approval.status === 'pending' && (
                <div className="flex gap-3">
                  <button className="btn flex-1 flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} />
                    Approve
                  </button>
                  <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              )}

              {approval.status === 'approved' && (
                <div className="text-sm text-text-secondary">
                  <span className="text-accent-green">✓ Approved</span> by {approval.approvedBy} on {approval.approvedAt}
                </div>
              )}

              {approval.status === 'rejected' && (
                <div className="text-sm text-text-secondary">
                  <span className="text-accent-red">✗ Rejected</span> by {approval.rejectedBy} on {approval.rejectedAt}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
