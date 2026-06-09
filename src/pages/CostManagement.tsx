import { useState } from 'react'
import { Trash2, Edit2, Save, X } from 'lucide-react'

interface CostRule {
  id: string
  processor: string
  merchant: string
  retailer: string
  site: string
  currency: string
  costType: 'percentage' | 'fixed'
  costValue: number
  isActive: boolean
}

const mockCosts: CostRule[] = [
  { id: '1', processor: 'Vodafone', merchant: 'Amazon', retailer: 'Noon', site: 'UAE', currency: 'AED', costType: 'percentage', costValue: 1.5, isActive: true },
  { id: '2', processor: 'InstaPay', merchant: 'Noon', retailer: 'Souq', site: 'SA', currency: 'SAR', costType: 'fixed', costValue: 2.5, isActive: true },
  { id: '3', processor: 'Bank', merchant: 'Carrefour', retailer: 'Carrefour', site: 'Egypt', currency: 'EGP', costType: 'percentage', costValue: 2.0, isActive: true },
]

const processors = ['Vodafone', 'InstaPay', 'Bank', 'Stripe', 'PayPal']
const merchants = ['Amazon', 'Noon', 'Carrefour', 'Miniso', 'Jumia']
const retailers = ['Noon', 'Souq', 'Carrefour', 'Jumia', 'Namshi']
const sites = ['UAE', 'SA', 'Egypt', 'Morocco', 'Pakistan']
const currencies = ['USD', 'EUR', 'EGP', 'MAD', 'PKR', 'BDT', 'INR']

export default function CostManagement() {
  const [costs, setCosts] = useState<CostRule[]>(mockCosts)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    processor: '',
    merchant: '',
    retailer: '',
    site: '',
    currency: '',
  })

  const filtered = costs.filter(c =>
    (!filters.processor || c.processor === filters.processor) &&
    (!filters.merchant || c.merchant === filters.merchant) &&
    (!filters.retailer || c.retailer === filters.retailer) &&
    (!filters.site || c.site === filters.site) &&
    (!filters.currency || c.currency === filters.currency)
  )

  const handleDelete = (id: string) => {
    setCosts(costs.filter(c => c.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setCosts(costs.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c))
  }

  const handleSave = (id: string, updated: Partial<CostRule>) => {
    setCosts(costs.map(c => c.id === id ? { ...c, ...updated } : c))
    setEditingId(null)
  }

  const resetFilters = () => {
    setFilters({ processor: '', merchant: '', retailer: '', site: '', currency: '' })
  }

  return (
    <div className="ml-64 pt-20 pb-8 px-8">
      <div className="space-y-8">
        <div>
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">
            Cost Management
          </h1>
          <p className="text-text-secondary">Define and manage transaction costs</p>
        </div>

        {/* Filters */}
        <div className="apple-surface rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="section-title text-lg">Filters</h2>
            <button onClick={resetFilters} className="btn-secondary text-sm px-3 py-1">Reset</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <select value={filters.processor} onChange={(e) => setFilters({ ...filters, processor: e.target.value })} className="input">
              <option value="">All Processors</option>
              {processors.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select value={filters.merchant} onChange={(e) => setFilters({ ...filters, merchant: e.target.value })} className="input">
              <option value="">All Merchants</option>
              {merchants.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <select value={filters.retailer} onChange={(e) => setFilters({ ...filters, retailer: e.target.value })} className="input">
              <option value="">All Retailers</option>
              {retailers.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <select value={filters.site} onChange={(e) => setFilters({ ...filters, site: e.target.value })} className="input">
              <option value="">All Sites</option>
              {sites.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select value={filters.currency} onChange={(e) => setFilters({ ...filters, currency: e.target.value })} className="input">
              <option value="">All Currencies</option>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <p className="text-sm text-text-secondary">
            Showing <span className="font-bold text-text-primary">{filtered.length}</span> of <span className="font-bold text-text-primary">{costs.length}</span> rules
          </p>
        </div>

        {/* Table */}
        <div className="apple-surface rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Processor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Merchant</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Retailer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Site</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Currency</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Cost</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr className="table-row">
                  <td colSpan={8} className="px-6 py-8 text-center text-text-secondary">
                    No rules match your filters
                  </td>
                </tr>
              ) : (
                filtered.map(cost => (
                  <tr key={cost.id} className="table-row">
                    <td className="px-6 py-4 text-sm text-text-primary">{cost.processor}</td>
                    <td className="px-6 py-4 text-sm text-text-primary">{cost.merchant}</td>
                    <td className="px-6 py-4 text-sm text-text-primary">{cost.retailer}</td>
                    <td className="px-6 py-4 text-sm text-text-primary">{cost.site}</td>
                    <td className="px-6 py-4">
                      <span className="badge bg-accent-blue/15 text-accent-blue border border-accent-blue/30">{cost.currency}</span>
                    </td>
                    <td className="px-6 py-4">
                      {editingId === cost.id ? (
                        <input
                          type="number"
                          defaultValue={cost.costValue}
                          className="input w-24 text-sm"
                          onBlur={(e) => handleSave(cost.id, { costValue: parseFloat(e.target.value) })}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={`badge ${cost.costType === 'percentage' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' : 'bg-accent-green/15 text-accent-green border border-accent-green/30'}`}>
                            {cost.costType === 'percentage' ? '%' : '$'}
                          </span>
                          <span className="font-semibold text-text-primary">{cost.costValue}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(cost.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${cost.isActive ? 'bg-accent-green/15 text-accent-green' : 'bg-accent-red/15 text-accent-red'}`}
                      >
                        {cost.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {editingId === cost.id ? (
                          <button onClick={() => setEditingId(null)} className="p-1 hover:bg-white/10 rounded"><Save size={16} className="text-accent-green" /></button>
                        ) : (
                          <button onClick={() => setEditingId(cost.id)} className="p-1 hover:bg-white/10 rounded"><Edit2 size={16} className="text-accent-blue" /></button>
                        )}
                        <button onClick={() => handleDelete(cost.id)} className="p-1 hover:bg-white/10 rounded"><Trash2 size={16} className="text-accent-red" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
