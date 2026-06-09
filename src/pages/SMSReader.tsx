import { useLanguage } from '@/context/LanguageContext'
import { MessageSquare, Download, Filter, Search, Clock, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface SMS {
  id: number
  from: string
  message: string
  time: string
  type: 'transaction' | 'alert' | 'system'
  timestamp: Date
  read: boolean
  icon?: string
}

const smsData: SMS[] = [
  {
    id: 1,
    from: 'Vodafone',
    message: 'Your payment of ₦5,000 was successful. Transaction ID: TXN-001',
    time: '2 minutes ago',
    type: 'transaction',
    timestamp: new Date(Date.now() - 2 * 60000),
    read: false,
    icon: '📱',
  },
  {
    id: 2,
    from: 'Bank Alert',
    message: 'Balance update: Your account balance is ₦125,450',
    time: '1 hour ago',
    type: 'alert',
    timestamp: new Date(Date.now() - 60 * 60000),
    read: false,
    icon: '🏦',
  },
  {
    id: 3,
    from: 'InstaPay',
    message: 'Payout of ₦12,500 approved. Will arrive within 2 hours.',
    time: '3 hours ago',
    type: 'transaction',
    timestamp: new Date(Date.now() - 3 * 60 * 60000),
    read: true,
    icon: '💳',
  },
  {
    id: 4,
    from: 'System',
    message: 'USSD session timeout. Please authenticate again.',
    time: '5 hours ago',
    type: 'system',
    timestamp: new Date(Date.now() - 5 * 60 * 60000),
    read: true,
    icon: '⚙️',
  },
  {
    id: 5,
    from: 'Etisalat',
    message: 'Payment received: ₦8,750. Reference: REF-2024-5678',
    time: '1 day ago',
    type: 'transaction',
    timestamp: new Date(Date.now() - 24 * 60 * 60000),
    read: true,
    icon: '💚',
  },
]

export default function SMSReader() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSMS, setSelectedSMS] = useState<SMS>(smsData[0])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'bg-accent-green/20 text-accent-green'
      case 'alert':
        return 'bg-accent-orange/20 text-accent-orange'
      case 'system':
        return 'bg-accent-blue/20 text-accent-blue'
      default:
        return 'bg-white/[0.05] text-text-secondary'
    }
  }

  const filteredSMS = smsData.filter((msg) =>
    msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-text-primary">SMS Reader</h1>
          <p className="text-text-secondary mt-2">View and manage payment-related SMS messages</p>
        </div>
        <button className="flex items-center gap-2 bg-accent-blue text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all">
          <Download size={20} /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total SMS', value: '156', icon: MessageSquare },
          { label: 'Transactions', value: '89', icon: MessageSquare },
          { label: 'Alerts', value: '42', icon: MessageSquare },
          { label: 'Unread', value: '3', icon: MessageSquare },
        ].map((stat, idx) => (
          <div key={idx} className="glossy-card rounded-2xl p-6">
            <p className="text-text-secondary text-sm font-semibold mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] lg:h-auto">
        {/* SMS List - Left Column */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-3.5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-text-primary px-4 py-3 rounded-xl transition-colors">
              <Filter size={18} /> Filter
            </button>
          </div>

          {/* SMS Messages List */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredSMS.length > 0 ? (
              filteredSMS.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedSMS(msg)}
                  className={`w-full glossy-card rounded-2xl p-4 text-left transition-all cursor-pointer ${
                    selectedSMS.id === msg.id ? 'ring-2 ring-accent-blue' : 'hover:bg-white/[0.08]'
                  } ${msg.read ? 'opacity-70' : 'opacity-100'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{msg.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-text-primary truncate">{msg.from}</h3>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{msg.message}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-text-secondary flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(msg.type)}`}>
                      {msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}
                    </span>
                    <span className="text-xs text-text-tertiary">{msg.time}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="glossy-card rounded-2xl p-12 text-center">
                <MessageSquare size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                <p className="text-text-secondary">No messages found</p>
              </div>
            )}
          </div>
        </div>

        {/* iPhone Message Preview - Right Column */}
        <div className="lg:col-span-1 flex items-center justify-center lg:block">
          <div className="w-full max-w-sm mx-auto">
            {/* iPhone Frame */}
            <div className="relative mx-auto w-full bg-black rounded-3xl border-8 border-black shadow-2xl" style={{ aspectRatio: '9/19.5' }}>
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-3xl z-10" />

              {/* Screen Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-apple-gray6 to-apple-black rounded-2xl overflow-hidden pt-8 pb-8 px-4 flex flex-col">
                {/* Status Bar */}
                <div className="text-xs font-bold text-white mb-4 flex justify-between items-center px-2">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span>📶</span>
                    <span>📡</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Message Header */}
                <div className="border-b border-white/[0.08] pb-4 mb-4">
                  <p className="text-sm font-semibold text-text-secondary text-center">SMS from</p>
                  <p className="text-lg font-bold text-white text-center mt-1">{selectedSMS.from}</p>
                  <p className="text-xs text-text-tertiary text-center mt-2">{selectedSMS.time}</p>
                </div>

                {/* Message Content */}
                <div className="flex-1 overflow-y-auto mb-4">
                  <div className="space-y-3">
                    {/* Incoming Message Bubble */}
                    <div className="flex justify-start">
                      <div className="max-w-xs bg-white/[0.12] rounded-3xl rounded-tl-none px-4 py-2.5 backdrop-blur">
                        <p className="text-xs text-white leading-relaxed">{selectedSMS.message}</p>
                        <p className="text-[10px] text-text-secondary mt-1">{selectedSMS.time}</p>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex justify-center mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(selectedSMS.type)}`}>
                        {selectedSMS.type === 'transaction' && '💰 Payment'}
                        {selectedSMS.type === 'alert' && '⚠️ Alert'}
                        {selectedSMS.type === 'system' && '⚙️ System'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reply Input (Non-functional for demo) */}
                <div className="border-t border-white/[0.08] pt-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Reply..."
                      disabled
                      className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2 text-xs text-text-secondary placeholder-text-tertiary cursor-not-allowed"
                    />
                    <button
                      disabled
                      className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* iPhone Home Indicator */}
            <div className="mt-2 flex justify-center">
              <div className="w-32 h-1 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* SMS Gateway Status */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">SMS Gateway Status</h3>
        <div className="space-y-4">
          {[
            { provider: 'Vodafone Gateway', status: 'active', messages: '2,450/day' },
            { provider: 'Etisalat Gateway', status: 'active', messages: '1,890/day' },
            { provider: 'Orange Gateway', status: 'active', messages: '890/day' },
            { provider: 'Local Server', status: 'active', messages: 'unlimited' },
          ].map((gateway, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-white/[0.03] rounded-lg">
              <div>
                <p className="font-semibold text-text-primary">{gateway.provider}</p>
                <p className="text-xs text-text-secondary">{gateway.messages}</p>
              </div>
              <span className="text-accent-green font-bold">✓ {gateway.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
