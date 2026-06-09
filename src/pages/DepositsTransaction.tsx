import { useState } from 'react'
import { Calendar, X, Plus, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface TransactionStats {
  count: number
  amount: number
  ratio_count: number
  ratio_volume: number
}

interface DepositStats {
  approved: TransactionStats
  pending: TransactionStats
  hard_declined: TransactionStats
  soft_declined: TransactionStats
  total: TransactionStats
}

const PAYMENT_METHODS = [
  'UPI',
  'QR Code',
  'NEFT',
  'RTGS',
  'IMPS',
  'Bank Transfer',
  'Credit Card',
  'Debit Card',
  'Digital Wallet',
  'Paytm',
  'PhonePe',
  'Google Pay',
  'Visa',
  'Mastercard',
  'Rupay',
  'PayPal',
  'Skrill',
  'Wise',
]

const PROCESSORS = ['P2P-OnTarget Processor-MW', 'InstaPay Gateway', 'Bank Settlement', 'Crypto Bridge']
const MERCHANTS = ['pr_test_M', 'Ahmed Electronics', 'Cairo Retail', 'Emirates Foods', 'Dubai Trade']
const CURRENCIES = ['Indian Rupee', 'Egyptian Pound', 'UAE Dirham', 'Saudi Riyal', 'US Dollar']

export default function DepositsTransaction() {
  const { t, dir } = useLanguage()

  // Filters
  const [dateRange, setDateRange] = useState({
    start: '2026-06-09T00:00:00',
    end: '2026-06-09T23:59:59',
  })
  const [selectedMerchants, setSelectedMerchants] = useState(['pr_test_M'])
  const [selectedProcessors, setSelectedProcessors] = useState(['P2P-OnTarget Processor-MW'])
  const [selectedCurrency, setSelectedCurrency] = useState('Indian Rupee')
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(['UPI', 'QR Code'])
  const [showMerchantDropdown, setShowMerchantDropdown] = useState(false)
  const [showProcessorDropdown, setShowProcessorDropdown] = useState(false)
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false)

  // Mock data
  const stats: DepositStats = {
    approved: { count: 0, amount: 0, ratio_count: 0, ratio_volume: 0 },
    pending: { count: 0, amount: 0, ratio_count: 0, ratio_volume: 0 },
    hard_declined: { count: 0, amount: 0, ratio_count: 0, ratio_volume: 0 },
    soft_declined: { count: 0, amount: 0, ratio_count: 0, ratio_volume: 0 },
    total: { count: 0, amount: 0, ratio_count: 0, ratio_volume: 0 },
  }

  const toggleMerchant = (merchant: string) => {
    setSelectedMerchants((prev) =>
      prev.includes(merchant) ? prev.filter((m) => m !== merchant) : [...prev, merchant]
    )
  }

  const toggleProcessor = (processor: string) => {
    setSelectedProcessors((prev) =>
      prev.includes(processor) ? prev.filter((p) => p !== processor) : [...prev, processor]
    )
  }

  const togglePaymentMethod = (method: string) => {
    setSelectedPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    )
  }

  const StatCard = ({
    title,
    stats,
    color,
    icon: Icon,
  }: {
    title: string
    stats: TransactionStats
    color: string
    icon: any
  }) => (
    <div className="glossy-card rounded-2xl p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
        <Icon size={24} style={{ color }} />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm">Count</span>
          <span className="text-2xl font-bold text-text-primary">{stats.count}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm">Amount</span>
          <span className="text-2xl font-bold text-text-primary">₹{stats.amount.toLocaleString()}</span>
        </div>
        <div className="border-t border-white/[0.08] pt-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-secondary">Ratio by Count</span>
            <span className="font-semibold text-text-primary">{stats.ratio_count} %</span>
          </div>
          <div className="flex justify-between items-center text-xs mt-2">
            <span className="text-text-secondary">Ratio by Volume</span>
            <span className="font-semibold text-text-primary">{stats.ratio_volume} %</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-8" dir={dir}>
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">Deposit Transactions</h1>
        <p className="text-text-secondary">View and analyze all deposit transactions</p>
      </div>

      {/* Filters Section */}
      <div className="glossy-card rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-bold text-text-primary">Filters</h3>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-text-secondary mb-2 block">Start Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3.5 text-text-secondary" />
              <input
                type="datetime-local"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-text-secondary mb-2 block">End Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3.5 text-text-secondary" />
              <input
                type="datetime-local"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Merchants */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-text-secondary">
              Merchants <span className="text-accent-orange">*</span>
            </label>
            <button
              onClick={() => setShowMerchantDropdown(!showMerchantDropdown)}
              className="text-accent-blue text-sm font-semibold hover:text-accent-blue/80 transition-colors flex items-center gap-1"
            >
              <Plus size={16} /> {MERCHANTS.length - selectedMerchants.length > 0 ? '+1' : ''}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedMerchants.map((merchant) => (
              <div
                key={merchant}
                className="bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
              >
                {merchant}
                <button onClick={() => toggleMerchant(merchant)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          {showMerchantDropdown && (
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 space-y-2">
              {MERCHANTS.filter((m) => !selectedMerchants.includes(m)).map((merchant) => (
                <button
                  key={merchant}
                  onClick={() => {
                    toggleMerchant(merchant)
                    if (selectedMerchants.length >= MERCHANTS.length - 1) setShowMerchantDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/[0.05] rounded-lg transition-colors text-text-secondary hover:text-white"
                >
                  {merchant}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Processors */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-text-secondary">
              Processors <span className="text-accent-orange">*</span>
            </label>
            <button
              onClick={() => setShowProcessorDropdown(!showProcessorDropdown)}
              className="text-accent-blue text-sm font-semibold hover:text-accent-blue/80 transition-colors flex items-center gap-1"
            >
              <Plus size={16} /> {PROCESSORS.length - selectedProcessors.length > 0 ? '+1' : ''}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedProcessors.map((processor) => (
              <div
                key={processor}
                className="bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
              >
                {processor}
                <button onClick={() => toggleProcessor(processor)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          {showProcessorDropdown && (
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 space-y-2">
              {PROCESSORS.filter((p) => !selectedProcessors.includes(p)).map((processor) => (
                <button
                  key={processor}
                  onClick={() => {
                    toggleProcessor(processor)
                    if (selectedProcessors.length >= PROCESSORS.length - 1) setShowProcessorDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/[0.05] rounded-lg transition-colors text-text-secondary hover:text-white"
                >
                  {processor}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Currency */}
        <div>
          <label className="text-sm font-semibold text-text-secondary mb-2 block">
            Currency <span className="text-accent-orange">*</span>
          </label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Methods */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-text-secondary">
              Payment Methods <span className="text-accent-orange">*</span>
            </label>
            <button
              onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
              className="text-accent-blue text-sm font-semibold hover:text-accent-blue/80 transition-colors flex items-center gap-1"
            >
              <Plus size={16} /> +{Math.max(0, PAYMENT_METHODS.length - selectedPaymentMethods.length)}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedPaymentMethods.map((method) => (
              <div
                key={method}
                className="bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
              >
                {method}
                <button onClick={() => togglePaymentMethod(method)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          {showPaymentDropdown && (
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 space-y-2 max-h-48 overflow-y-auto">
              {PAYMENT_METHODS.filter((m) => !selectedPaymentMethods.includes(m)).map((method) => (
                <button
                  key={method}
                  onClick={() => togglePaymentMethod(method)}
                  className="w-full text-left px-3 py-2 hover:bg-white/[0.05] rounded-lg transition-colors text-text-secondary hover:text-white"
                >
                  {method}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all">
            Apply Filters
          </button>
          <button className="flex-1 bg-white/[0.05] text-text-primary font-bold py-3 rounded-xl hover:bg-white/[0.1] transition-all">
            Reset
          </button>
        </div>
      </div>

      {/* Transaction Stats */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-text-primary">
          Transaction Summary - {new Date(dateRange.start).toLocaleDateString()}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Approved" stats={stats.approved} color="#30D158" icon={CheckCircle} />
          <StatCard title="Pending" stats={stats.pending} color="#FF9F0A" icon={Clock} />
          <StatCard title="Hard Declined" stats={stats.hard_declined} color="#FF3B30" icon={AlertCircle} />
          <StatCard title="Soft Declined" stats={stats.soft_declined} color="#FF9500" icon={AlertCircle} />
          <div className="lg:col-span-3">
            <StatCard title="Total" stats={stats.total} color="#007AFF" icon={TrendingUp} />
          </div>
        </div>
      </div>
    </div>
  )
}
