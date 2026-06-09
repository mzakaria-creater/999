import { CheckCircle2, AlertCircle, Clock, Copy } from 'lucide-react'
import { useState } from 'react'

interface TransactionInfo {
  transactionId: string
  merchant: string
  type: 'deposit' | 'payout'
  amount: number
  currency: string
  status: 'success' | 'pending' | 'failed'
  provider: {
    name: string
    icon: string
    color: string
  }
  wallet: {
    name: string
    icon: string
  }
  location: {
    city: string
    country: string
    flag: string
  }
  phone: string
  timestamp: string
  fee?: number
  balanceAfter?: number
  ussdCode: string
}

export default function TransactionDetails({ transaction }: { transaction: TransactionInfo }) {
  const [copied, setCopied] = useState(false)

  const copyId = () => {
    navigator.clipboard.writeText(transaction.transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 size={20} className="text-accent-green" />
      case 'pending':
        return <Clock size={20} className="text-accent-orange" />
      case 'failed':
        return <AlertCircle size={20} className="text-accent-red" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-accent-green/10 text-accent-green'
      case 'pending':
        return 'bg-accent-orange/10 text-accent-orange'
      case 'failed':
        return 'bg-accent-red/10 text-accent-red'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <div className="glossy-card rounded-2xl p-6 text-center">
        <div className="flex justify-center mb-4">{getStatusIcon(transaction.status)}</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {transaction.type === 'deposit' ? '📥 Deposit ' : '📤 Payout '}Confirmed
        </h2>
        <p className="text-text-secondary mb-4">
          Transaction ID: <span className="font-mono font-semibold">{transaction.transactionId}</span>
        </p>
        <button
          onClick={copyId}
          className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors"
        >
          <Copy size={16} /> {copied ? 'Copied!' : 'Copy ID'}
        </button>
      </div>

      {/* Main Transaction Details */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Transaction Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Merchant</p>
            <p className="font-semibold text-text-primary">{transaction.merchant}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Type</p>
            <p className="font-semibold uppercase" style={{
              color: transaction.type === 'deposit' ? '#10b981' : '#ff9f0a'
            }}>
              {transaction.type}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Amount</p>
            <p className="text-2xl font-bold text-accent-blue">
              {transaction.amount.toLocaleString()} {transaction.currency}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Status</p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize border ${getStatusColor(transaction.status)}`}>
              {transaction.status}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Details */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Payment Method</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-white/[0.08]">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${transaction.provider.color}20` }}
            >
              {transaction.provider.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{transaction.provider.name}</p>
              <p className="text-xs text-text-secondary">USSD Provider</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-2xl">{transaction.wallet.icon}</div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{transaction.wallet.name}</p>
              <p className="text-xs text-text-secondary">
                {transaction.type === 'deposit' ? 'Merchant Wallet (receives)' : 'Client Wallet (sends)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Location & Contact</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase mb-2">Location</p>
            <p className="font-semibold text-text-primary">
              {transaction.location.flag} {transaction.location.city}, {transaction.location.country}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase mb-2">Phone Number</p>
            <p className="font-mono font-semibold text-text-primary">{transaction.phone}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase mb-2">USSD Code</p>
            <div className="bg-apple-gray5 rounded-lg p-3 font-mono text-sm text-text-primary break-all">
              {transaction.ussdCode}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Financial Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
            <span className="text-text-secondary">Transaction Amount</span>
            <span className="font-bold text-text-primary">{transaction.amount.toLocaleString()} {transaction.currency}</span>
          </div>
          {transaction.fee !== undefined && (
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <span className="text-text-secondary">Transaction Fee</span>
              <span className="font-semibold text-accent-orange">{transaction.fee} {transaction.currency}</span>
            </div>
          )}
          {transaction.balanceAfter !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Balance After</span>
              <span className="font-bold text-accent-green">{transaction.balanceAfter.toLocaleString()} {transaction.currency}</span>
            </div>
          )}
        </div>
      </div>

      {/* Timestamp */}
      <div className="glossy-card rounded-2xl p-6 text-center">
        <p className="text-xs text-text-secondary uppercase font-semibold mb-2">Transaction Date & Time</p>
        <p className="text-lg font-semibold text-text-primary">{transaction.timestamp}</p>
      </div>
    </div>
  )
}
