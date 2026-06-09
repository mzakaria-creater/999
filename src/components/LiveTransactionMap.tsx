import { useState, useCallback, useEffect } from 'react'
import { AlertCircle, CheckCircle2, Clock, MapPin, TrendingUp, Activity } from 'lucide-react'

interface Transaction {
  id: string
  merchant: string
  amount: number
  status: 'success' | 'pending' | 'failed'
  location: {
    lat: number
    lng: number
    city: string
    country: string
  }
  timestamp: string
  provider: string
  type: 'deposit' | 'withdrawal' | 'payout'
}

interface MapMarker {
  id: string
  lat: number
  lng: number
  title: string
  amount: number
  status: 'success' | 'pending' | 'failed'
}

export default function LiveTransactionMap() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      merchant: 'Ahmed Electronics',
      amount: 2500,
      status: 'success',
      location: { lat: 30.0444, lng: 31.2357, city: 'Cairo', country: 'Egypt' },
      timestamp: '2 mins ago',
      provider: 'Vodafone Cash',
      type: 'deposit',
    },
    {
      id: 'TXN-002',
      merchant: 'Dubai Trade',
      amount: 5800,
      status: 'success',
      location: { lat: 25.2048, lng: 55.2708, city: 'Dubai', country: 'UAE' },
      timestamp: '5 mins ago',
      provider: 'ADIB',
      type: 'payout',
    },
    {
      id: 'TXN-003',
      merchant: 'Riyadh Retail',
      amount: 3200,
      status: 'pending',
      location: { lat: 24.7136, lng: 46.6753, city: 'Riyadh', country: 'KSA' },
      timestamp: '8 mins ago',
      provider: 'SAMBA',
      type: 'deposit',
    },
    {
      id: 'TXN-004',
      merchant: 'Cairo Online',
      amount: 1800,
      status: 'success',
      location: { lat: 30.0269, lng: 31.2944, city: 'Alexandria', country: 'Egypt' },
      timestamp: '12 mins ago',
      provider: 'InstaPay',
      type: 'withdrawal',
    },
    {
      id: 'TXN-005',
      merchant: 'Emirates Foods',
      amount: 4500,
      status: 'failed',
      location: { lat: 25.1972, lng: 55.2744, city: 'Abu Dhabi', country: 'UAE' },
      timestamp: '15 mins ago',
      provider: 'FAB',
      type: 'payout',
    },
  ])

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(transactions[0])
  const [mapCenter, setMapCenter] = useState({ lat: 26, lng: 45 })
  const [zoom, setZoom] = useState(4)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 size={16} className="text-accent-green" />
      case 'pending':
        return <Clock size={16} className="text-accent-orange" />
      case 'failed':
        return <AlertCircle size={16} className="text-accent-red" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-accent-green/10 text-accent-green border-accent-green/30'
      case 'pending':
        return 'bg-accent-orange/10 text-accent-orange border-accent-orange/30'
      case 'failed':
        return 'bg-accent-red/10 text-accent-red border-accent-red/30'
      default:
        return ''
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-accent-green'
      case 'withdrawal':
        return 'text-accent-blue'
      case 'payout':
        return 'text-accent-orange'
      default:
        return 'text-text-secondary'
    }
  }

  const handleTransactionClick = (txn: Transaction) => {
    setSelectedTransaction(txn)
    setMapCenter({ lat: txn.location.lat, lng: txn.location.lng })
    setZoom(12)
  }

  const stats = {
    total: transactions.length,
    success: transactions.filter((t) => t.status === 'success').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    failed: transactions.filter((t) => t.status === 'failed').length,
    totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
  }

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-slide-down">
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <MapPin size={36} /> Live Transaction Map & Audit
          </h1>
          <p className="text-text-secondary">Real-time transaction tracking across MENA regions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-down" style={{ animationDelay: '0.05s' }}>
          <div className="apple-surface rounded-2xl p-4">
            <div className="text-xs text-text-secondary mb-2">Total</div>
            <div className="text-2xl font-bold text-text-primary">{stats.total}</div>
          </div>
          <div className="apple-surface rounded-2xl p-4 border-l-4 border-accent-green">
            <div className="text-xs text-text-secondary mb-2">Success</div>
            <div className="text-2xl font-bold text-accent-green">{stats.success}</div>
          </div>
          <div className="apple-surface rounded-2xl p-4 border-l-4 border-accent-orange">
            <div className="text-xs text-text-secondary mb-2">Pending</div>
            <div className="text-2xl font-bold text-accent-orange">{stats.pending}</div>
          </div>
          <div className="apple-surface rounded-2xl p-4 border-l-4 border-accent-red">
            <div className="text-xs text-text-secondary mb-2">Failed</div>
            <div className="text-2xl font-bold text-accent-red">{stats.failed}</div>
          </div>
          <div className="apple-surface rounded-2xl p-4">
            <div className="text-xs text-text-secondary mb-2">Volume</div>
            <div className="text-2xl font-bold text-accent-blue">₦{(stats.totalVolume / 1000).toFixed(0)}K</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="apple-surface rounded-2xl overflow-hidden h-[400px] md:h-[600px] relative bg-apple-gray5">
              {/* Map Background with Markers */}
              <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-apple-gray6 to-apple-gray5">
                {/* Simulated Map with Marker Points */}
                <div className="absolute inset-0">
                  {transactions.map((txn) => {
                    const x = ((txn.location.lng + 180) / 360) * 100
                    const y = ((90 - txn.location.lat) / 180) * 100
                    return (
                      <button
                        key={txn.id}
                        onClick={() => handleTransactionClick(txn)}
                        className={`absolute w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          selectedTransaction?.id === txn.id
                            ? 'ring-4 ring-accent-blue scale-125'
                            : 'hover:scale-110'
                        } ${
                          txn.status === 'success'
                            ? 'bg-accent-green/20 border-2 border-accent-green'
                            : txn.status === 'pending'
                              ? 'bg-accent-orange/20 border-2 border-accent-orange'
                              : 'bg-accent-red/20 border-2 border-accent-red'
                        }`}
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                        title={`${txn.merchant} - ${txn.location.city}`}
                      >
                        <MapPin
                          size={20}
                          className={
                            txn.status === 'success'
                              ? 'text-accent-green'
                              : txn.status === 'pending'
                                ? 'text-accent-orange'
                                : 'text-accent-red'
                          }
                        />
                      </button>
                    )
                  })}
                </div>

                {/* Map Grid */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute w-full border-b border-text-secondary" style={{ top: `${i * 10}%` }} />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-full border-r border-text-secondary"
                      style={{ left: `${i * 10}%` }}
                    />
                  ))}
                </div>

                {/* Map Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <Activity size={48} className="text-accent-blue/30 mx-auto mb-2" />
                    <p className="text-text-secondary text-sm">MENA Regions - Click markers to view details</p>
                  </div>
                </div>
              </div>

              {/* Selected Transaction Info Overlay */}
              {selectedTransaction && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-apple-gray6 to-transparent p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">{selectedTransaction.location.city}, {selectedTransaction.location.country}</p>
                      <p className="text-lg font-bold text-text-primary">{selectedTransaction.merchant}</p>
                      <p className="text-sm text-accent-blue font-semibold">₦{selectedTransaction.amount.toLocaleString()}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                        selectedTransaction.status
                      )}`}
                    >
                      {selectedTransaction.status === 'success' && '✓ Success'}
                      {selectedTransaction.status === 'pending' && '⏳ Pending'}
                      {selectedTransaction.status === 'failed' && '✕ Failed'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Transaction List Sidebar */}
          <div className="space-y-3">
            <h3 className="section-title">Recent Transactions</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {transactions.map((txn) => (
                <button
                  key={txn.id}
                  onClick={() => handleTransactionClick(txn)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedTransaction?.id === txn.id
                      ? 'border-accent-blue bg-accent-blue/10'
                      : 'border-white/[0.08] hover:border-white/[0.15] bg-apple-gray5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold uppercase tracking-wide ${getTypeColor(txn.type)}`}
                      >
                        {txn.type}
                      </span>
                      {getStatusIcon(txn.status)}
                    </div>
                    <span className="text-xs text-text-secondary">{txn.timestamp}</span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary mb-1">{txn.merchant}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">
                      {txn.location.city}, {txn.location.country}
                    </span>
                    <span className="font-bold text-accent-blue">₦{txn.amount.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Transaction Details */}
        {selectedTransaction && (
          <div className="apple-surface rounded-2xl p-6 border-l-4 border-accent-blue animate-slide-down">
            <h3 className="section-title mb-4">Transaction Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-text-secondary mb-2">Merchant</div>
                <div className="font-semibold text-text-primary">{selectedTransaction.merchant}</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-2">Amount</div>
                <div className="font-semibold text-accent-blue">₦{selectedTransaction.amount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-2">Location</div>
                <div className="font-semibold text-text-primary">
                  {selectedTransaction.location.city}
                </div>
                <div className="text-xs text-text-secondary">{selectedTransaction.location.country}</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-2">Provider</div>
                <div className="font-semibold text-text-primary">{selectedTransaction.provider}</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-2">Coordinates</div>
                <div className="font-mono text-xs text-text-primary">
                  {selectedTransaction.location.lat.toFixed(4)}, {selectedTransaction.location.lng.toFixed(4)}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-2">Type</div>
                <div className={`font-semibold uppercase text-sm ${getTypeColor(selectedTransaction.type)}`}>
                  {selectedTransaction.type}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-2">Status</div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedTransaction.status)}
                  <span className="font-semibold capitalize text-text-primary">{selectedTransaction.status}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-2">Timestamp</div>
                <div className="font-semibold text-text-primary">{selectedTransaction.timestamp}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
