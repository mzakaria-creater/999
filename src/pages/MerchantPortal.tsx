import { useState, useMemo } from 'react'
import { Copy, Download, Mail, Filter, ChevronLeft, ChevronRight, Eye, EyeOff, TrendingUp, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Transaction {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  timestamp: Date
  paymentMethod: string
  description: string
  fee: number
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-001',
    clientId: 'CLI-2024-001',
    clientName: 'Ahmed Hassan',
    clientEmail: 'ahmed@example.com',
    amount: 5000,
    status: 'completed',
    timestamp: new Date('2026-06-09T14:30:00'),
    paymentMethod: 'UPI',
    description: 'Payment for services',
    fee: 50,
  },
  {
    id: 'TXN-002',
    clientId: 'CLI-2024-002',
    clientName: 'Fatima Khan',
    clientEmail: 'fatima@example.com',
    amount: 12500,
    status: 'completed',
    timestamp: new Date('2026-06-09T13:15:00'),
    paymentMethod: 'Bank Transfer',
    description: 'Monthly subscription',
    fee: 125,
  },
  {
    id: 'TXN-003',
    clientId: 'CLI-2024-003',
    clientName: 'Mohammed Ali',
    clientEmail: 'mohammed@example.com',
    amount: 3200,
    status: 'pending',
    timestamp: new Date('2026-06-09T12:00:00'),
    paymentMethod: 'Wallet',
    description: 'Product purchase',
    fee: 32,
  },
  {
    id: 'TXN-004',
    clientId: 'CLI-2024-004',
    clientName: 'Layla Ahmed',
    clientEmail: 'layla@example.com',
    amount: 7800,
    status: 'failed',
    timestamp: new Date('2026-06-08T16:45:00'),
    paymentMethod: 'Card',
    description: 'Service payment',
    fee: 78,
  },
  {
    id: 'TXN-005',
    clientId: 'CLI-2024-005',
    clientName: 'Omar Hassan',
    clientEmail: 'omar@example.com',
    amount: 15000,
    status: 'completed',
    timestamp: new Date('2026-06-08T10:20:00'),
    paymentMethod: 'NEFT',
    description: 'Annual plan',
    fee: 150,
  },
]

export default function MerchantPortal() {
  const { t, dir } = useLanguage()
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'reports'>('overview')
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const [dateRangeFilter, setDateRangeFilter] = useState('7days')
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'json'>('csv')
  const [reportType, setReportType] = useState<'summary' | 'detailed' | 'financial'>('summary')

  const MERCHANT_ID = 'MID-2024-001'
  const API_KEY = 'sk_live_xxxxxxxxxxxxxxxxxxxx'
  const ITEMS_PER_PAGE = 10

  // Copy to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((txn) => {
      if (statusFilter !== 'all' && txn.status !== statusFilter) return false
      return true
    })
  }, [statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Statistics
  const stats = useMemo(() => {
    const today = MOCK_TRANSACTIONS.filter(
      (t) => t.timestamp.toDateString() === new Date().toDateString()
    )
    const completed = MOCK_TRANSACTIONS.filter((t) => t.status === 'completed')
    const totalVolume = MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0)
    const totalFees = MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.fee, 0)

    return {
      todayTransactions: today.length,
      successRate: ((completed.length / MOCK_TRANSACTIONS.length) * 100).toFixed(2),
      pendingCount: MOCK_TRANSACTIONS.filter((t) => t.status === 'pending').length,
      totalVolume,
      totalFees,
      monthlyVolume: totalVolume,
      completedCount: completed.length,
    }
  }, [])

  // Export report
  const generateReport = (format: string) => {
    const reportData = {
      merchantId: MERCHANT_ID,
      generatedAt: new Date().toISOString(),
      transactionCount: filteredTransactions.length,
      successRate: stats.successRate,
      totalVolume: stats.totalVolume,
      totalFees: stats.totalFees,
      transactions: filteredTransactions,
    }

    let content = ''
    if (format === 'csv') {
      content = 'Transaction ID,Client,Amount,Status,Date,Fee\n'
      filteredTransactions.forEach((t) => {
        content += `${t.id},${t.clientName},${t.amount},${t.status},${t.timestamp.toISOString()},${t.fee}\n`
      })
    } else if (format === 'json') {
      content = JSON.stringify(reportData, null, 2)
    }

    const element = document.createElement('a')
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`)
    element.setAttribute('download', `merchant-report-${Date.now()}.${format}`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-6 space-y-8" dir={dir}>
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">Merchant Portal</h1>
        <p className="text-text-secondary">Manage your API transactions and access reports</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/[0.08]">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'transactions', label: '💳 Transaction History' },
          { id: 'reports', label: '📈 Reports & Export' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any)
              setCurrentPage(1)
            }}
            className={`px-6 py-4 font-bold transition-all ${
              activeTab === tab.id
                ? 'text-accent-blue border-b-2 border-accent-blue'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* API Credentials */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">🔑 API Credentials</h3>
            <div className="space-y-4">
              <div>
                <p className="text-text-secondary text-sm mb-2">Merchant ID</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={MERCHANT_ID}
                    readOnly
                    className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(MERCHANT_ID, 'merchant_id')}
                    className="bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 p-3 rounded-xl transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                {copied === 'merchant_id' && <p className="text-xs text-accent-green mt-1">✓ Copied!</p>}
              </div>

              <div>
                <p className="text-text-secondary text-sm mb-2">API Key</p>
                <div className="flex items-center gap-2">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={API_KEY}
                    readOnly
                    className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary font-mono"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="bg-white/[0.05] text-text-secondary hover:text-white p-3 rounded-xl transition-colors"
                  >
                    {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(API_KEY, 'api_key')}
                    className="bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 p-3 rounded-xl transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                {copied === 'api_key' && <p className="text-xs text-accent-green mt-1">✓ Copied!</p>}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-text-primary">📊 Today's Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Today's Transactions",
                  value: stats.todayTransactions,
                  icon: '💳',
                  color: 'accent-blue',
                },
                {
                  label: 'Success Rate',
                  value: `${stats.successRate}%`,
                  icon: '✅',
                  color: 'accent-green',
                },
                {
                  label: 'Pending',
                  value: stats.pendingCount,
                  icon: '⏳',
                  color: 'accent-orange',
                },
                {
                  label: 'Monthly Volume',
                  value: `₹${(stats.monthlyVolume / 100000).toFixed(1)}L`,
                  icon: '📈',
                  color: 'accent-blue',
                },
              ].map((stat) => (
                <div key={stat.label} className="glossy-card rounded-2xl p-6">
                  <p className="text-3xl mb-2">{stat.icon}</p>
                  <p className="text-text-secondary text-sm mb-2">{stat.label}</p>
                  <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">📊 Summary Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Transactions', value: MOCK_TRANSACTIONS.length },
                { label: 'Completed', value: stats.completedCount },
                { label: 'Total Volume', value: `₹${stats.totalVolume.toLocaleString()}` },
                { label: 'Total Fees', value: `₹${stats.totalFees.toLocaleString()}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-text-secondary text-sm mb-2">{item.label}</p>
                  <p className="text-2xl font-bold text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Filter size={20} /> Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as any)
                    setCurrentPage(1)
                  }}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary"
                >
                  <option value="all">All Transactions</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Time Period</label>
                <select
                  value={dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary"
                >
                  <option value="24hours">Last 24 Hours</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="glossy-card rounded-2xl p-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/[0.08]">
                <tr>
                  {['Transaction ID', 'Client', 'Amount', 'Status', 'Date', 'Fee'].map((header) => (
                    <th key={header} className="px-4 py-3 font-bold text-text-secondary uppercase text-xs">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08]">
                {paginatedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-mono text-accent-blue">{txn.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-text-primary">{txn.clientName}</p>
                        <p className="text-xs text-text-secondary">{txn.clientEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-text-primary">₹{txn.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          txn.status === 'completed'
                            ? 'bg-accent-green/20 text-accent-green'
                            : txn.status === 'pending'
                              ? 'bg-accent-orange/20 text-accent-orange'
                              : 'bg-accent-red/20 text-accent-red'
                        }`}
                      >
                        {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{txn.timestamp.toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-semibold">₹{txn.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-sm">
                Page {currentPage} of {totalPages} ({filteredTransactions.length} transactions)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-50 p-2 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                      currentPage === page ? 'bg-accent-blue text-white' : 'bg-white/[0.05] hover:bg-white/[0.1]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-50 p-2 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reports & Export Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Export Options */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Download size={24} /> Export Reports
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary"
                >
                  <option value="summary">Summary Report</option>
                  <option value="detailed">Detailed Report</option>
                  <option value="financial">Financial Report</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary"
                >
                  <option value="csv">CSV (Excel)</option>
                  <option value="pdf">PDF</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => generateReport(exportFormat)}
                className="flex-1 bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} /> Export Report
              </button>
              <button className="flex-1 bg-white/[0.05] text-text-primary font-bold py-3 rounded-xl hover:bg-white/[0.1] transition-all flex items-center justify-center gap-2">
                <Mail size={20} /> Email Report
              </button>
            </div>
          </div>

          {/* Live Report Preview */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">📊 Live Report Preview</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Total Transactions',
                  value: filteredTransactions.length,
                  icon: '💳',
                },
                {
                  label: 'Total Volume',
                  value: `₹${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`,
                  icon: '📈',
                },
                {
                  label: 'Success Rate',
                  value: `${((filteredTransactions.filter((t) => t.status === 'completed').length / filteredTransactions.length) * 100).toFixed(1)}%`,
                  icon: '✅',
                },
                {
                  label: 'Total Fees',
                  value: `₹${filteredTransactions.reduce((sum, t) => sum + t.fee, 0).toLocaleString()}`,
                  icon: '💰',
                },
                {
                  label: 'Net Settlement',
                  value: `₹${(filteredTransactions.reduce((sum, t) => sum + t.amount, 0) - filteredTransactions.reduce((sum, t) => sum + t.fee, 0)).toLocaleString()}`,
                  icon: '💵',
                },
                {
                  label: 'Average Transaction',
                  value: `₹${Math.round(filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length).toLocaleString()}`,
                  icon: '📊',
                },
              ].map((metric) => (
                <div key={metric.label} className="bg-white/[0.03] rounded-lg p-4">
                  <p className="text-2xl mb-2">{metric.icon}</p>
                  <p className="text-text-secondary text-sm mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Analytics */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">📈 Financial Analytics</h3>

            <div className="space-y-4">
              {[
                {
                  label: 'Volume Breakdown',
                  value: `${filteredTransactions.length} transactions totaling ₹${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`,
                },
                {
                  label: 'Success Metrics',
                  value: `${filteredTransactions.filter((t) => t.status === 'completed').length} completed, ${filteredTransactions.filter((t) => t.status === 'pending').length} pending, ${filteredTransactions.filter((t) => t.status === 'failed').length} failed`,
                },
                {
                  label: 'Performance Rate',
                  value: `${((filteredTransactions.filter((t) => t.status === 'completed').length / filteredTransactions.length) * 100).toFixed(2)}% completion rate`,
                },
                {
                  label: 'Cost Analysis',
                  value: `₹${filteredTransactions.reduce((sum, t) => sum + t.fee, 0).toLocaleString()} in fees (${((filteredTransactions.reduce((sum, t) => sum + t.fee, 0) / filteredTransactions.reduce((sum, t) => sum + t.amount, 0)) * 100).toFixed(2)}% of volume)`,
                },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start p-4 bg-white/[0.03] rounded-lg">
                  <span className="font-semibold text-text-primary">{item.label}</span>
                  <span className="text-text-secondary text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
