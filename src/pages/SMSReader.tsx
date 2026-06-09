import { useLanguage } from '@/context/LanguageContext'
import { MessageSquare, Download, Filter, Search } from 'lucide-react'
import { useState } from 'react'

export default function SMSReader() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const sms = [
    {
      id: 1,
      from: 'Vodafone',
      message: 'Your payment of ₦5,000 was successful. Transaction ID: TXN-001',
      time: '2 minutes ago',
      type: 'transaction',
    },
    {
      id: 2,
      from: 'Bank Alert',
      message: 'Balance update: Your account balance is ₦125,450',
      time: '1 hour ago',
      type: 'alert',
    },
    {
      id: 3,
      from: 'InstaPay',
      message: 'Payout of ₦12,500 approved. Will arrive within 2 hours.',
      time: '3 hours ago',
      type: 'transaction',
    },
    {
      id: 4,
      from: 'System',
      message: 'USSD session timeout. Please authenticate again.',
      time: '5 hours ago',
      type: 'system',
    },
    {
      id: 5,
      from: 'Etisalat',
      message: 'Payment received: ₦8,750. Reference: REF-2024-5678',
      time: '1 day ago',
      type: 'transaction',
    },
  ]

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

  const filteredSMS = sms.filter((msg) =>
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

      {/* SMS Messages */}
      <div className="space-y-3">
        {filteredSMS.length > 0 ? (
          filteredSMS.map((msg) => (
            <div key={msg.id} className="glossy-card rounded-2xl p-6 hover:bg-white/[0.05] transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary">{msg.from}</h3>
                  <p className="text-text-secondary text-sm mt-1">{msg.message}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${getTypeColor(msg.type)}`}>
                  {msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}
                </span>
              </div>
              <p className="text-xs text-text-tertiary">{msg.time}</p>
            </div>
          ))
        ) : (
          <div className="glossy-card rounded-2xl p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
            <p className="text-text-secondary">No messages found</p>
          </div>
        )}
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
