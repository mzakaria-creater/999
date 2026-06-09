import { useState } from 'react'
import { Globe, TrendingUp, CheckCircle2, AlertCircle, Zap } from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  country: string
  flag: string
  category: 'mobile' | 'bank' | 'eWallet' | 'fintech'
  logo: string
  color: string
  successRate: number
  avgTime: string
  fee: number
  available: boolean
  description: string
}

const menPaymentMethods: PaymentMethod[] = [
  // Egypt
  {
    id: 'vodafone-cash',
    name: 'Vodafone Cash',
    country: 'Egypt',
    flag: '🇪🇬',
    category: 'mobile',
    logo: '📱',
    color: '#e60000',
    successRate: 99.45,
    avgTime: '1-2 mins',
    fee: 1.5,
    available: true,
    description: 'Mobile money service from Vodafone Egypt',
  },
  {
    id: 'instapay',
    name: 'InstaPay',
    country: 'Egypt',
    flag: '🇪🇬',
    category: 'fintech',
    logo: '⚡',
    color: '#0066cc',
    successRate: 98.8,
    avgTime: '2-3 mins',
    fee: 1.2,
    available: true,
    description: 'Instant payment platform in Egypt',
  },
  {
    id: 'etisalat-cash',
    name: 'Etisalat Cash',
    country: 'Egypt',
    flag: '🇪🇬',
    category: 'mobile',
    logo: '💛',
    color: '#ff9f0a',
    successRate: 97.2,
    avgTime: '2-3 mins',
    fee: 1.5,
    available: true,
    description: 'Mobile money from Etisalat Egypt',
  },
  {
    id: 'orange-money',
    name: 'Orange Money',
    country: 'Egypt',
    flag: '🇪🇬',
    category: 'mobile',
    logo: '🟠',
    color: '#ff7900',
    successRate: 96.5,
    avgTime: '2-4 mins',
    fee: 1.8,
    available: true,
    description: 'Mobile wallet by Orange Egypt',
  },
  {
    id: 'we-telecom',
    name: 'WE Telecom',
    country: 'Egypt',
    flag: '🇪🇬',
    category: 'mobile',
    logo: '📞',
    color: '#4c0099',
    successRate: 95.8,
    avgTime: '2-5 mins',
    fee: 2.0,
    available: true,
    description: 'Telecom payments from WE (Telecom Egypt)',
  },
  {
    id: 'fawry',
    name: 'Fawry',
    country: 'Egypt',
    flag: '🇪🇬',
    category: 'eWallet',
    logo: '🏪',
    color: '#0099ff',
    successRate: 98.0,
    avgTime: '1-2 mins',
    fee: 0.8,
    available: true,
    description: 'Bill payment and digital wallet',
  },

  // UAE
  {
    id: 'adib-wallet',
    name: 'ADIB Wallet',
    country: 'UAE',
    flag: '🇦🇪',
    category: 'bank',
    logo: '🏦',
    color: '#1a5490',
    successRate: 99.85,
    avgTime: '1-2 mins',
    fee: 0.5,
    available: true,
    description: 'Abu Dhabi Islamic Bank digital wallet',
  },
  {
    id: 'fab-digital',
    name: 'FAB Digital',
    country: 'UAE',
    flag: '🇦🇪',
    category: 'bank',
    logo: '💳',
    color: '#003d7a',
    successRate: 99.75,
    avgTime: '1-2 mins',
    fee: 0.5,
    available: true,
    description: 'First Abu Dhabi Bank digital payments',
  },
  {
    id: 'emirates-nbd',
    name: 'Emirates NBD',
    country: 'UAE',
    flag: '🇦🇪',
    category: 'bank',
    logo: '🏛️',
    color: '#004d7a',
    successRate: 99.7,
    avgTime: '1-2 mins',
    fee: 0.5,
    available: true,
    description: 'Emirates NBD banking services',
  },
  {
    id: 'meeza',
    name: 'Meeza',
    country: 'UAE',
    flag: '🇦🇪',
    category: 'eWallet',
    logo: '💰',
    color: '#0066cc',
    successRate: 98.8,
    avgTime: '2-3 mins',
    fee: 1.0,
    available: true,
    description: 'UAEPAY digital wallet and payment',
  },
  {
    id: 'etisalat-uae',
    name: 'Etisalat UAE',
    country: 'UAE',
    flag: '🇦🇪',
    category: 'mobile',
    logo: '📱',
    color: '#719917',
    successRate: 98.5,
    avgTime: '2-3 mins',
    fee: 1.2,
    available: true,
    description: 'Mobile payments from Etisalat UAE',
  },

  // Saudi Arabia
  {
    id: 'samba-bank',
    name: 'SAMBA Bank',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    category: 'bank',
    logo: '🏦',
    color: '#1e40af',
    successRate: 99.65,
    avgTime: '1-2 mins',
    fee: 0.5,
    available: true,
    description: 'SAMBA Banking Services',
  },
  {
    id: 'alrajhi-bank',
    name: 'Al Rajhi Bank',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    category: 'bank',
    logo: '🏦',
    color: '#00a651',
    successRate: 99.6,
    avgTime: '1-2 mins',
    fee: 0.5,
    available: true,
    description: 'Al Rajhi Banking and Investment',
  },
  {
    id: 'alinma-bank',
    name: 'Al Inma Bank',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    category: 'bank',
    logo: '💳',
    color: '#d4af37',
    successRate: 99.55,
    avgTime: '1-2 mins',
    fee: 0.6,
    available: true,
    description: 'Al Inma Banking services',
  },
  {
    id: 'stc-pay',
    name: 'STC Pay',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    category: 'mobile',
    logo: '📱',
    color: '#ff6b00',
    successRate: 98.9,
    avgTime: '2-3 mins',
    fee: 1.0,
    available: true,
    description: 'Mobile wallet from STC',
  },
  {
    id: 'zain-ksa',
    name: 'Zain KSA',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    category: 'mobile',
    logo: '📱',
    color: '#e60000',
    successRate: 98.5,
    avgTime: '2-3 mins',
    fee: 1.2,
    available: true,
    description: 'Mobile payments from Zain',
  },

  // Other MENA
  {
    id: 'jawwal-palestine',
    name: 'Jawwal',
    country: 'Palestine',
    flag: '🇵🇸',
    category: 'mobile',
    logo: '📱',
    color: '#003d7a',
    successRate: 96.8,
    avgTime: '2-4 mins',
    fee: 1.5,
    available: true,
    description: 'Jawwal Mobile Money Palestine',
  },
  {
    id: 'bank-audi',
    name: 'Bank Audi',
    country: 'Lebanon',
    flag: '🇱🇧',
    category: 'bank',
    logo: '🏦',
    color: '#003d7a',
    successRate: 97.0,
    avgTime: '2-3 mins',
    fee: 1.0,
    available: true,
    description: 'Bank Audi Lebanon',
  },
]

const categoryColors = {
  mobile: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
  bank: 'bg-accent-green/10 text-accent-green border-accent-green/30',
  eWallet: 'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
  fintech: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30',
}

export default function MENAPaymentMethods() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const countries = Array.from(new Set(menPaymentMethods.map((m) => m.country)))
  const categories = Array.from(new Set(menPaymentMethods.map((m) => m.category)))

  const filteredMethods = menPaymentMethods.filter((method) => {
    if (selectedCountry && method.country !== selectedCountry) return false
    if (selectedCategory && method.category !== selectedCategory) return false
    return true
  })

  const stats = {
    total: menPaymentMethods.length,
    countries: countries.length,
    avgSuccessRate: (
      menPaymentMethods.reduce((sum, m) => sum + m.successRate, 0) / menPaymentMethods.length
    ).toFixed(2),
    available: menPaymentMethods.filter((m) => m.available).length,
  }

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-slide-down">
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <Globe size={36} /> MENA Payment Methods
          </h1>
          <p className="text-text-secondary">Comprehensive payment network across Middle East and North Africa</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-down" style={{ animationDelay: '0.05s' }}>
          <div className="apple-surface rounded-2xl p-6">
            <div className="text-sm text-text-secondary mb-2">Total Methods</div>
            <div className="text-3xl font-bold text-text-primary">{stats.total}</div>
          </div>
          <div className="apple-surface rounded-2xl p-6">
            <div className="text-sm text-text-secondary mb-2">Countries</div>
            <div className="text-3xl font-bold text-accent-blue">{stats.countries}</div>
          </div>
          <div className="apple-surface rounded-2xl p-6">
            <div className="text-sm text-text-secondary mb-2">Avg Success Rate</div>
            <div className="text-3xl font-bold text-accent-green">{stats.avgSuccessRate}%</div>
          </div>
          <div className="apple-surface rounded-2xl p-6">
            <div className="text-sm text-text-secondary mb-2">Available</div>
            <div className="text-3xl font-bold text-accent-orange">{stats.available}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="animate-slide-down" style={{ animationDelay: '0.1s' }}>
          <h3 className="section-title mb-4">Filter by Region</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-3">Country</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCountry(null)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedCountry === null
                      ? 'bg-accent-blue text-white'
                      : 'bg-apple-gray5 text-text-secondary hover:text-white'
                  }`}
                >
                  All
                </button>
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedCountry === country
                        ? 'bg-accent-blue text-white'
                        : 'bg-apple-gray5 text-text-secondary hover:text-white'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedCategory === null
                      ? 'bg-accent-blue text-white'
                      : 'bg-apple-gray5 text-text-secondary hover:text-white'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all capitalize ${
                      selectedCategory === cat
                        ? 'bg-accent-blue text-white'
                        : 'bg-apple-gray5 text-text-secondary hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="animate-slide-down" style={{ animationDelay: '0.15s' }}>
          <h3 className="section-title mb-4">
            Available Methods ({filteredMethods.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMethods.map((method) => (
              <div
                key={method.id}
                className="apple-surface rounded-2xl p-6 card-hover-lift hover:border-accent-blue"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${method.color}20` }}
                    >
                      {method.logo}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{method.name}</h4>
                      <p className="text-xs text-text-secondary">{method.flag} {method.country}</p>
                    </div>
                  </div>
                  {method.available && <CheckCircle2 size={18} className="text-accent-green flex-shrink-0" />}
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize border ${
                      categoryColors[method.category]
                    }`}
                  >
                    {method.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-4">{method.description}</p>

                {/* Metrics */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Success Rate</span>
                    <span className="font-bold text-accent-green">{method.successRate}%</span>
                  </div>
                  <div className="w-full bg-apple-gray5 rounded-full h-2">
                    <div
                      className="bg-accent-green h-2 rounded-full"
                      style={{ width: `${method.successRate}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-3">
                    <span className="text-text-secondary">Avg Time</span>
                    <span className="font-semibold text-text-primary">{method.avgTime}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-text-secondary">Transaction Fee</span>
                    <span className="font-semibold text-accent-blue">{method.fee}%</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="w-full mt-4 btn text-sm"
                  style={{ background: method.color }}
                >
                  Select {method.name}
                </button>
              </div>
            ))}
          </div>

          {filteredMethods.length === 0 && (
            <div className="apple-surface rounded-2xl p-8 text-center">
              <AlertCircle size={32} className="text-accent-orange mx-auto mb-3" />
              <p className="text-text-secondary">No payment methods found for selected filters</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="apple-surface rounded-2xl p-6">
          <h3 className="section-title mb-4">Payment Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center text-lg flex-shrink-0">
                📱
              </div>
              <div>
                <p className="font-semibold text-accent-blue">Mobile Money</p>
                <p className="text-text-secondary text-xs">Telecom-based payments</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center text-lg flex-shrink-0">
                🏦
              </div>
              <div>
                <p className="font-semibold text-accent-green">Banking</p>
                <p className="text-text-secondary text-xs">Traditional banks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center text-lg flex-shrink-0">
                💰
              </div>
              <div>
                <p className="font-semibold text-accent-orange">E-Wallet</p>
                <p className="text-text-secondary text-xs">Digital wallets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center text-lg flex-shrink-0">
                ⚡
              </div>
              <div>
                <p className="font-semibold text-accent-purple">FinTech</p>
                <p className="text-text-secondary text-xs">Instant payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
