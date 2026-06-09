import { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'

interface Merchant {
  id: string
  name: string
  email: string
  phone: string
  country: string
  status: 'active' | 'pending' | 'suspended'
  createdAt: string
}

const mockMerchants: Merchant[] = [
  { id: '1', name: 'Amazon Egypt', email: 'merchant@amazon.eg', phone: '+20123456789', country: 'Egypt', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Noon UAE', email: 'merchant@noon.ae', phone: '+971501234567', country: 'UAE', status: 'active', createdAt: '2024-02-10' },
  { id: '3', name: 'Jumia SA', email: 'merchant@jumia.sa', phone: '+966501234567', country: 'Saudi Arabia', status: 'pending', createdAt: '2024-03-01' },
]

export default function Merchants() {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const handleDelete = (id: string) => {
    setMerchants(merchants.filter(m => m.id !== id))
  }

  return (
    <div className="pb-8 px-4 md:px-8 mx-auto w-full">
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">Merchants</h1>
            <p className="text-text-secondary">Manage merchant accounts and integrations</p>
          </div>
          <button className="btn">
            <Plus size={18} className="inline mr-2" />
            Add Merchant
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${viewMode === 'list' ? 'bg-accent-blue text-white' : 'bg-white/[0.08] text-text-secondary'}`}>
            List View
          </button>
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${viewMode === 'grid' ? 'bg-accent-blue text-white' : 'bg-white/[0.08] text-text-secondary'}`}>
            Grid View
          </button>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="apple-surface rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Country</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map(merchant => (
                  <tr key={merchant.id} className="table-row">
                    <td className="px-6 py-4 font-semibold text-text-primary">{merchant.name}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{merchant.email}</td>
                    <td className="px-6 py-4 text-sm text-text-primary">{merchant.phone}</td>
                    <td className="px-6 py-4 text-sm text-text-primary">{merchant.country}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${merchant.status === 'active' ? 'badge-success' : merchant.status === 'pending' ? 'badge-pending' : 'badge-error'}`}>
                        {merchant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-1 hover:bg-white/10 rounded"><Edit2 size={16} className="text-accent-blue" /></button>
                      <button onClick={() => handleDelete(merchant.id)} className="p-1 hover:bg-white/10 rounded"><Trash2 size={16} className="text-accent-red" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchants.map(merchant => (
              <div key={merchant.id} className="apple-card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-text-primary">{merchant.name}</h3>
                  <span className={`badge ${merchant.status === 'active' ? 'badge-success' : merchant.status === 'pending' ? 'badge-pending' : 'badge-error'}`}>
                    {merchant.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{merchant.email}</p>
                <p className="text-sm text-text-secondary mb-4">{merchant.phone}</p>
                <p className="text-xs text-text-tertiary mb-4">{merchant.country}</p>
                <div className="flex gap-2">
                  <button className="btn flex-1 text-sm">Edit</button>
                  <button onClick={() => handleDelete(merchant.id)} className="btn-secondary flex-1 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
