import { useLanguage } from '@/context/LanguageContext'
import {
  MessageSquare, Download, Filter, Search, ArrowDownLeft,
  ArrowUpRight, Smartphone, CheckCircle2, XCircle, AlertCircle, RotateCcw,
  Calendar, ArrowRight, User, Hash, DollarSign, ShieldCheck, Info
} from 'lucide-react'
import { useState, useMemo } from 'react'

interface SMS {
  id: string
  provider: string
  type: 'incoming' | 'outgoing' | 'system'
  status: 'success' | 'failed' | 'pending'
  raw_sms: string
  amount: number
  currency: string
  sender_number: string
  sender_name: string
  receiver_number: string
  balance_after: number
  trx_id: string
  received_at: string
}

// Real-world mockup SMS data based on orange-cash, vodafone-cash, etisalat-cash, instapay
const initialSMSData: SMS[] = [
  {
    id: 'sms-1',
    provider: 'orange-cash',
    type: 'incoming',
    status: 'success',
    amount: 600.00,
    currency: 'EGP',
    sender_number: '01228992594',
    sender_name: 'عبدالرحمن محمد حسانين عبدالرحمن',
    receiver_number: '01217794135',
    balance_after: 600.67,
    trx_id: '2982919114',
    received_at: '2026-06-08T11:56:02.107Z',
    raw_sms: 'تم استلام عملية تحويل أموال بمبلغ 600.00 جنيه من عبدالرحمن محمد حسانين عبدالرحمن-01228992594، رصيدك الحالي 600.67 جنية. رقم المعاملة 2982919114'
  },
  {
    id: 'sms-2',
    provider: 'orange-cash',
    type: 'incoming',
    status: 'success',
    amount: 400.00,
    currency: 'EGP',
    sender_number: '01217789423',
    sender_name: 'Salem A Mohamed',
    receiver_number: '01217794135',
    balance_after: 1006.43,
    trx_id: '2990952682',
    received_at: '2026-06-08T11:56:35.011Z',
    raw_sms: 'تم استلام عملية تحويل أموال بمبلغ 400.00 جنيه من Salem A Mohamed، رصيدك الحالي 1006.43 جنية. رقم المعاملة 2990952682'
  },
  {
    id: 'sms-3',
    provider: 'orange-cash',
    type: 'outgoing',
    status: 'success',
    amount: 1605.00,
    currency: 'EGP',
    sender_number: 'OrangeCash',
    sender_name: 'Orange Cash System',
    receiver_number: '01202983612',
    balance_after: 1.43,
    trx_id: '2991110543',
    received_at: '2026-06-08T12:02:24.991Z',
    raw_sms: 'عملية تحويل أموال ناجحة بمبلغ 1605.00 جنيه، لرقم 01202983612، رسوم التحويل 0.00 جنيه، رصيدك الحالي 1.43 جنيه. رقم العملية 2991110543'
  },
  {
    id: 'sms-4',
    provider: 'orange-cash',
    type: 'incoming',
    status: 'success',
    amount: 1605.00,
    currency: 'EGP',
    sender_number: '01217783707',
    sender_name: 'محمود حسن احمد الذهبى',
    receiver_number: '01217794135',
    balance_after: 5814.74,
    trx_id: '2991110775',
    received_at: '2026-06-08T12:02:42.875Z',
    raw_sms: 'تم استلام عملية تحويل أموال بمبلغ 1605.00 جنيه من محمود حسن احمد الذهبى-01217783707، رصيدك الحالي 5814.74 جنية. رقم المعاملة 2991110775'
  },
  {
    id: 'sms-5',
    provider: 'orange-cash',
    type: 'incoming',
    status: 'success',
    amount: 600.00,
    currency: 'EGP',
    sender_number: '01217794135',
    sender_name: 'Ibrahim A Ahmed',
    receiver_number: '01217794135',
    balance_after: 1606.43,
    trx_id: '2991102186',
    received_at: '2026-06-08T13:04:52.041Z',
    raw_sms: 'تم استلام عملية تحويل أموال بمبلغ 600.00 جنيه من Ibrahim A Ahmed، رصيدك الحالي 1606.43 جنية. رقم المعاملة 2991102186'
  },
  {
    id: 'sms-6',
    provider: 'orange-cash',
    type: 'incoming',
    status: 'success',
    amount: 600.00,
    currency: 'EGP',
    sender_number: '01211387377',
    sender_name: 'رامى سمير ثابت فرج',
    receiver_number: '01217794135',
    balance_after: 1223.67,
    trx_id: '2980695024',
    received_at: '2026-06-08T12:59:59.535Z',
    raw_sms: 'تم استلام عملية تحويل أموال بمبلغ 600.00 جنيه من رامى سمير ثابت فرج-01211387377، رصيدك الحالي 1223.67 جنية. رقم المعاملة 2980695024'
  },
  {
    id: 'sms-7',
    provider: 'orange-cash',
    type: 'system',
    status: 'success',
    amount: 0,
    currency: 'EGP',
    sender_number: 'OrangeCash',
    sender_name: 'Orange Cash System',
    receiver_number: '',
    balance_after: 1.43,
    trx_id: '',
    received_at: '2026-06-08T13:28:33.792Z',
    raw_sms: 'رصيدك الحالي فى اورنچ كاش 1.43 جنيه. شكرا لاستخدامك اورنچ كاش'
  },
  {
    id: 'sms-8',
    provider: 'orange-cash',
    type: 'incoming',
    status: 'success',
    amount: 600.00,
    currency: 'EGP',
    sender_number: '01217794135',
    sender_name: 'Mohamed S Menshawy',
    receiver_number: '01217794135',
    balance_after: 601.43,
    trx_id: '2991285225',
    received_at: '2026-06-08T13:30:44.423Z',
    raw_sms: 'تم استلام عملية تحويل أموال بمبلغ 600.00 جنيه من Mohamed S Menshawy، رصيدك الحالي 601.43 جنية. رقم المعاملة 2991285225'
  },
  {
    id: 'sms-9',
    provider: 'vodafone-cash',
    type: 'incoming',
    status: 'success',
    amount: 1500.00,
    currency: 'EGP',
    sender_number: '01023948576',
    sender_name: 'أحمد علي',
    receiver_number: '01017839281',
    balance_after: 1500.50,
    trx_id: '9847192837',
    received_at: '2026-06-07T10:15:30.000Z',
    raw_sms: 'تم استقبال تحويل بقيمة 1500.00 جنيه من رقم 01023948576. رصيدك الحالي 1500.50 جنيه. رقم العملية: 9847192837'
  },
  {
    id: 'sms-10',
    provider: 'vodafone-cash',
    type: 'outgoing',
    status: 'success',
    amount: 500.00,
    currency: 'EGP',
    sender_number: 'Vodafone',
    sender_name: 'Vodafone Cash System',
    receiver_number: '01098765432',
    balance_after: 1000.50,
    trx_id: '9847192840',
    received_at: '2026-06-07T11:20:00.000Z',
    raw_sms: 'تم تحويل بقيمة 500.00 جنيه لرقم 01098765432 بنجاح. رسوم الخدمة 5.00 جنيه. رقم العملية: 9847192840'
  },
  {
    id: 'sms-11',
    provider: 'etisalat-cash',
    type: 'incoming',
    status: 'success',
    amount: 1000.00,
    currency: 'EGP',
    sender_number: '01149283748',
    sender_name: 'مصطفى محمود',
    receiver_number: '01118273645',
    balance_after: 3400.00,
    trx_id: '58291029',
    received_at: '2026-06-06T09:40:12.000Z',
    raw_sms: 'تم استلام 1000.00 جنيه من مصطفى محمود 01149283748. رصيدك الحالي 3400.00 جنيه. رقم العملية 58291029'
  },
  {
    id: 'sms-12',
    provider: 'instapay',
    type: 'incoming',
    status: 'success',
    amount: 2500.00,
    currency: 'EGP',
    sender_number: 'noha@instapay',
    sender_name: 'Noha Kamel',
    receiver_number: 'merchant@instapay',
    balance_after: 5900.00,
    trx_id: 'IP827192',
    received_at: '2026-06-05T14:30:15.000Z',
    raw_sms: 'InstaPay: You received EGP 2,500.00 from Noha Kamel. Trx Ref: IP827192.'
  },
  {
    id: 'sms-13',
    provider: 'instapay',
    type: 'outgoing',
    status: 'success',
    amount: 1200.00,
    currency: 'EGP',
    sender_number: 'merchant@instapay',
    sender_name: 'Merchant Main Account',
    receiver_number: 'sherif@instapay',
    balance_after: 4700.00,
    trx_id: 'IP827195',
    received_at: '2026-06-05T15:00:22.000Z',
    raw_sms: 'InstaPay: EGP 1,200.00 sent successfully to sherif@instapay. Trx Ref: IP827195.'
  },
  {
    id: 'sms-14',
    provider: 'vodafone-cash',
    type: 'incoming',
    status: 'failed',
    amount: 3000.00,
    currency: 'EGP',
    sender_number: '01018273645',
    sender_name: 'Unknown Depositor',
    receiver_number: '01017839281',
    balance_after: 0,
    trx_id: '',
    received_at: '2026-06-08T08:12:00.000Z',
    raw_sms: 'خطأ: فشل استلام التحويل بقيمة 3000.00 جنيه بسبب تعدي الحد اليومي للمحفظة.'
  },
  {
    id: 'sms-15',
    provider: 'etisalat-cash',
    type: 'incoming',
    status: 'pending',
    amount: 850.00,
    currency: 'EGP',
    sender_number: '01127384920',
    sender_name: 'خالد مصطفى',
    receiver_number: '01118273645',
    balance_after: 4250.00,
    trx_id: 'ET5829103',
    received_at: '2026-06-08T14:45:00.000Z',
    raw_sms: 'جاري مراجعة تحويل بقيمة 850.00 جنيه من خالد مصطفى. رقم المراجعة: ET5829103'
  }
]

export default function SMSReader() {
  const { language } = useLanguage()
  const [smsData] = useState<SMS[]>(initialSMSData)
  
  // Selection
  const [selectedSMS, setSelectedSMS] = useState<SMS>(initialSMSData[0])
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)

  // Filters state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedProvider('all')
    setSelectedType('all')
    setSelectedStatus('all')
    setStartDate('')
    setEndDate('')
  }

  // Filter & Search Logic
  const filteredSMS = useMemo(() => {
    return smsData.filter((sms) => {
      // Search Box filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        sms.raw_sms.toLowerCase().includes(searchLower) ||
        sms.sender_number.toLowerCase().includes(searchLower) ||
        sms.sender_name.toLowerCase().includes(searchLower) ||
        (sms.receiver_number && sms.receiver_number.toLowerCase().includes(searchLower)) ||
        sms.trx_id.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      // Provider filter
      if (selectedProvider !== 'all' && sms.provider !== selectedProvider) return false

      // Direction/Type filter
      if (selectedType !== 'all' && sms.type !== selectedType) return false

      // Status filter
      if (selectedStatus !== 'all' && sms.status !== selectedStatus) return false

      // Date Range filters
      if (startDate) {
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        if (new Date(sms.received_at) < start) return false
      }
      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        if (new Date(sms.received_at) > end) return false
      }

      return true
    })
  }, [smsData, searchTerm, selectedProvider, selectedType, selectedStatus, startDate, endDate])

  // Get Conversation for iPhone (all SMS with same contact number/name to look like a chat thread)
  const selectedConversation = useMemo(() => {
    if (!selectedSMS) return []
    // Match messages from same contact or provider
    const contactPhone = selectedSMS.sender_number
    return smsData
      .filter((s) => s.sender_number === contactPhone || s.receiver_number === contactPhone)
      .sort((a, b) => new Date(a.received_at).getTime() - new Date(b.received_at).getTime())
  }, [smsData, selectedSMS])

  // Stats
  const stats = useMemo(() => {
    const total = filteredSMS.length
    const incoming = filteredSMS.filter(s => s.type === 'incoming').length
    const outgoing = filteredSMS.filter(s => s.type === 'outgoing').length
    const successMatches = filteredSMS.filter(s => s.status === 'success' && s.trx_id).length
    return { total, incoming, outgoing, successMatches }
  }, [filteredSMS])

  // Export CSV
  const handleExport = () => {
    const headers = ['Date', 'Provider', 'Type', 'Status', 'Amount', 'Currency', 'Sender', 'Receiver', 'Trx ID', 'Message']
    const rows = filteredSMS.map(sms => [
      new Date(sms.received_at).toLocaleString(),
      sms.provider,
      sms.type,
      sms.status,
      sms.amount.toString(),
      sms.currency,
      sms.sender_name || sms.sender_number,
      sms.receiver_number || '',
      sms.trx_id,
      sms.raw_sms.replace(/\n/g, ' ')
    ])
    
    // Build CSV Content
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" // UTF-8 BOM for Excel Arabic character support
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n')
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `sms_inbox_export_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Helper styles
  const getBadgeStyles = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-accent-green/15 text-accent-green border border-accent-green/20'
      case 'failed':
        return 'bg-accent-red/15 text-accent-red border border-accent-red/20'
      case 'pending':
        return 'bg-accent-orange/15 text-accent-orange border border-accent-orange/20'
      default:
        return 'bg-apple-gray4 text-text-secondary border border-white/[0.08]'
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'incoming':
        return {
          label: language === 'ar' ? 'وارد' : 'Incoming',
          class: 'bg-accent-blue/15 text-accent-blue border border-accent-blue/20',
          icon: ArrowDownLeft
        }
      case 'outgoing':
        return {
          label: language === 'ar' ? 'صادر' : 'Outgoing',
          class: 'bg-accent-indigo/15 text-accent-indigo border border-accent-indigo/20',
          icon: ArrowUpRight
        }
      default:
        return {
          label: language === 'ar' ? 'نظام' : 'System',
          class: 'bg-apple-gray4 text-text-secondary border border-white/[0.08]',
          icon: Info
        }
    }
  }

  return (
    <div className="pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full font-apple">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-text-primary tracking-tight flex items-center gap-3">
            <MessageSquare size={36} className="text-accent-blue" />
            <span>{language === 'ar' ? 'صندوق وارد الرسائل' : 'SMS Inbox Hub'}</span>
          </h1>
          <p className="text-text-secondary mt-1.5">
            {language === 'ar' 
              ? 'مراقبة وإدارة الرسائل النصية القصيرة للتحقق من المعاملات المالية والمحافظ الإلكترونية'
              : 'Monitor, match, and audit mobile wallet transactions extracted from SMS alerts'}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 bg-accent-blue text-white font-bold px-6 py-3 rounded-xl hover:bg-accent-blue/95 transition-all transform active:scale-98 shadow-apple-button max-w-xs self-start md:self-center"
        >
          <Download size={18} />
          <span>{language === 'ar' ? 'تصدير البيانات CSV' : 'Export CSV'}</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: language === 'ar' ? 'إجمالي الرسائل المفلترة' : 'Filtered SMS',
            value: stats.total,
            icon: MessageSquare,
            color: 'text-accent-blue'
          },
          {
            label: language === 'ar' ? 'رسائل الإيداع (وارد)' : 'Incoming Alerts',
            value: stats.incoming,
            icon: ArrowDownLeft,
            color: 'text-accent-green'
          },
          {
            label: language === 'ar' ? 'رسائل السحب (صادر)' : 'Outgoing Alerts',
            value: stats.outgoing,
            icon: ArrowUpRight,
            color: 'text-accent-indigo'
          },
          {
            label: language === 'ar' ? 'عمليات ربط ناجحة' : 'Successful Matches',
            value: stats.successMatches,
            icon: ShieldCheck,
            color: 'text-accent-orange'
          }
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="apple-surface bg-apple-gray6 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-secondary text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                <Icon className={stat.color} size={18} />
              </div>
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Search and Advanced Filters Panel */}
      <div className="apple-surface bg-apple-gray6 p-6 mb-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <Filter size={16} className="text-accent-blue" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {language === 'ar' ? 'خيارات التصفية والبحث المتقدم' : 'Search & Filtering Options'}
          </h3>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Keyword Search */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary">{language === 'ar' ? 'بحث عن نص' : 'Keyword Search'}</label>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3.5 text-text-tertiary" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث برقم المعاملة، المحتوى...' : 'Search TXID, sender, body...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-apple-gray5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Provider Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary">{language === 'ar' ? 'مزود الخدمة' : 'Provider Wallet'}</label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full bg-apple-gray5 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
            >
              <option value="all">{language === 'ar' ? 'جميع المزودين' : 'All Providers'}</option>
              <option value="orange-cash">Orange Cash</option>
              <option value="vodafone-cash">Vodafone Cash</option>
              <option value="etisalat-cash">Etisalat Cash</option>
              <option value="instapay">InstaPay</option>
            </select>
          </div>

          {/* Type Direction */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary">{language === 'ar' ? 'نوع العملية' : 'Direction'}</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-apple-gray5 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
            >
              <option value="all">{language === 'ar' ? 'جميع العمليات' : 'All Directions'}</option>
              <option value="incoming">{language === 'ar' ? 'وارد (إيداع)' : 'Incoming (Deposit)'}</option>
              <option value="outgoing">{language === 'ar' ? 'صادر (سحب)' : 'Outgoing (Payout)'}</option>
              <option value="system">{language === 'ar' ? 'إشعار نظام' : 'System Alerts'}</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary">{language === 'ar' ? 'حالة المطابقة' : 'Mapping Status'}</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-apple-gray5 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
            >
              <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
              <option value="success">{language === 'ar' ? 'ناجح' : 'Success'}</option>
              <option value="failed">{language === 'ar' ? 'فشل' : 'Failed'}</option>
              <option value="pending">{language === 'ar' ? 'معلق / مراجعة' : 'Pending Review'}</option>
            </select>
          </div>
        </div>

        {/* Second row: Dates & Reset */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-4 pt-2 border-t border-white/[0.04]">
          <div className="grid grid-cols-2 gap-4 w-full lg:max-w-xl">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                <Calendar size={14} className="text-text-tertiary" />
                <span>{language === 'ar' ? 'من تاريخ' : 'Start Date'}</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-apple-gray5 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                <Calendar size={14} className="text-text-tertiary" />
                <span>{language === 'ar' ? 'إلى تاريخ' : 'End Date'}</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-apple-gray5 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleResetFilters}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white hover:text-accent-blue rounded-xl text-xs font-bold transition-all w-full lg:w-auto"
          >
            <RotateCcw size={14} />
            <span>{language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
          </button>
        </div>
      </div>

      {/* Main Inbox Dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Desktop List (Table) View & Mobile List view - 8/12 Columns */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* DESKTOP TABLE VIEW (Hidden on Mobile) */}
          <div className="hidden md:block apple-surface bg-apple-gray6 overflow-hidden">
            <div className="overflow-x-auto max-h-[650px] overflow-y-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/[0.06] text-text-secondary text-[10px] font-bold uppercase tracking-wider text-start">
                    <th className="px-6 py-4 text-start">{language === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}</th>
                    <th className="px-6 py-4 text-start">{language === 'ar' ? 'المزود' : 'Provider'}</th>
                    <th className="px-6 py-4 text-start">{language === 'ar' ? 'نوع العملية' : 'Type'}</th>
                    <th className="px-6 py-4 text-start">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                    <th className="px-6 py-4 text-start">{language === 'ar' ? 'المرسل/المستقبل' : 'Sender/Receiver'}</th>
                    <th className="px-6 py-4 text-start">{language === 'ar' ? 'رقم المعاملة' : 'TXID'}</th>
                    <th className="px-6 py-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredSMS.length > 0 ? (
                    filteredSMS.map((sms) => {
                      const isSelected = selectedSMS?.id === sms.id
                      const typeBadge = getTypeBadge(sms.type)
                      const TypeIcon = typeBadge.icon
                      return (
                        <tr
                          key={sms.id}
                          onClick={() => setSelectedSMS(sms)}
                          className={`table-row cursor-pointer transition-colors ${
                            isSelected ? 'bg-accent-blue/10 hover:bg-accent-blue/15' : ''
                          }`}
                        >
                          {/* Date */}
                          <td className="px-6 py-3.5 text-xs text-white whitespace-nowrap">
                            <div className="font-semibold">
                              {new Date(sms.received_at).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="text-[10px] text-text-secondary mt-0.5">
                              {new Date(sms.received_at).toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>

                          {/* Provider */}
                          <td className="px-6 py-3.5 text-xs font-bold text-white whitespace-nowrap capitalize">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
                              {sms.provider.replace('-', ' ')}
                            </span>
                          </td>

                          {/* Type */}
                          <td className="px-6 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${typeBadge.class}`}>
                              <TypeIcon size={12} />
                              <span>{typeBadge.label}</span>
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-3.5 text-xs font-black text-white whitespace-nowrap">
                            {sms.amount > 0 ? (
                              <span className={sms.type === 'incoming' ? 'text-accent-green' : 'text-accent-red'}>
                                {sms.type === 'incoming' ? '+' : '-'} {sms.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {sms.currency}
                              </span>
                            ) : (
                              <span className="text-text-secondary">-</span>
                            )}
                          </td>

                          {/* Contact */}
                          <td className="px-6 py-3.5 text-xs text-white max-w-[180px] truncate">
                            <div className="font-semibold text-start truncate">
                              {sms.sender_name || sms.sender_number}
                            </div>
                            <div className="text-[10px] text-text-secondary font-mono mt-0.5">
                              {sms.type === 'incoming' ? sms.sender_number : sms.receiver_number}
                            </div>
                          </td>

                          {/* Trx ID */}
                          <td className="px-6 py-3.5 text-xs font-mono text-text-secondary whitespace-nowrap">
                            {sms.trx_id ? (
                              <span className="bg-white/[0.03] px-2 py-1 rounded border border-white/[0.04] text-white">
                                {sms.trx_id}
                              </span>
                            ) : (
                              <span className="text-text-tertiary font-sans italic">{language === 'ar' ? 'لا يوجد' : 'None'}</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-3.5 text-center whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${getBadgeStyles(sms.status)}`}>
                              {sms.status === 'success' && (language === 'ar' ? 'مقبول' : 'Success')}
                              {sms.status === 'failed' && (language === 'ar' ? 'فشل' : 'Failed')}
                              {sms.status === 'pending' && (language === 'ar' ? 'مراجعة' : 'Pending')}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                        <MessageSquare className="mx-auto text-text-tertiary mb-3 opacity-60" size={36} />
                        <p>{language === 'ar' ? 'لم يتم العثور على رسائل تطابق الفلاتر المحددة' : 'No SMS alerts match the current filters'}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE SCROLLING AS SMS LIST (Visible only on Mobile) */}
          <div className="md:hidden space-y-3">
            <div className="px-1 flex justify-between items-center text-xs text-text-secondary font-bold uppercase">
              <span>{language === 'ar' ? 'الرسائل النصية المستلمة' : 'Mobile SMS Stream'}</span>
              <span>{filteredSMS.length} {language === 'ar' ? 'رسالة' : 'alerts'}</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-1">
              {filteredSMS.length > 0 ? (
                filteredSMS.map((sms) => {
                  const isSelected = selectedSMS?.id === sms.id
                  const typeBadge = getTypeBadge(sms.type)
                  const isAr = /[\u0600-\u06FF]/.test(sms.raw_sms) // Detect Arabic text
                  return (
                    <div
                      key={sms.id}
                      onClick={() => {
                        setSelectedSMS(sms)
                        setMobileDetailOpen(true) // Open overlay on mobile
                      }}
                      className={`apple-surface bg-apple-gray6 p-4 border transition-all cursor-pointer ${
                        isSelected ? 'border-accent-blue ring-1 ring-accent-blue/30' : 'border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-apple-gray5 flex items-center justify-center font-bold text-accent-blue text-xs uppercase">
                            {sms.provider.slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white capitalize">{sms.provider.replace('-', ' ')}</h4>
                            <span className="text-[10px] text-text-secondary font-mono">
                              {sms.sender_name ? sms.sender_name : sms.sender_number}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-text-secondary">
                            {new Date(sms.received_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      {/* Msg Body Shortened */}
                      <p 
                        className="text-xs text-text-secondary leading-relaxed line-clamp-2 my-2.5 font-sans"
                        style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
                      >
                        {sms.raw_sms}
                      </p>

                      <div className="flex items-center justify-between border-t border-white/[0.04] pt-2.5 mt-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${typeBadge.class}`}>
                          {typeBadge.label}
                        </span>
                        
                        {sms.amount > 0 && (
                          <span className={`text-xs font-bold ${sms.type === 'incoming' ? 'text-accent-green' : 'text-accent-red'}`}>
                            {sms.type === 'incoming' ? '+' : '-'} {sms.amount.toLocaleString()} {sms.currency}
                          </span>
                        )}

                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${getBadgeStyles(sms.status)}`}>
                          {sms.status}
                        </span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="apple-surface bg-apple-gray6 p-8 text-center text-text-secondary">
                  <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                  <p>{language === 'ar' ? 'لا توجد رسائل متطابقة' : 'No matching messages'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* iPhone Mobile Preview Screen (30% width / 4 Columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-6">
          
          {/* Desktop simulator frame */}
          <div className="hidden lg:block w-full">
            <IphoneSimulator
              sms={selectedSMS}
              conversation={selectedConversation}
              language={language}
            />
          </div>

          {/* Mobile Overlay Modal for Simulator */}
          {mobileDetailOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="relative w-full max-w-sm">
                <button
                  onClick={() => setMobileDetailOpen(false)}
                  className="absolute -top-12 right-0 w-8 h-8 rounded-full bg-apple-gray5 border border-white/[0.1] text-white flex items-center justify-center font-bold text-sm z-50 hover:bg-apple-gray4 transition-colors"
                >
                  ✕
                </button>
                <IphoneSimulator
                  sms={selectedSMS}
                  conversation={selectedConversation}
                  language={language}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Subcomponent: Iphone Simulator Preview for iOS layout
interface SimulatorProps {
  sms: SMS
  conversation: SMS[]
  language: string
}

function IphoneSimulator({ sms, conversation, language }: SimulatorProps) {

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* iPhone frame mockup container */}
      <div className="relative mx-auto w-full bg-[#000000] rounded-[50px] border-[12px] border-[#1a1a1a] shadow-apple-elevated overflow-hidden" style={{ aspectRatio: '9/19' }}>
        
        {/* iOS Dynamic Island / Notch */}
        <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-[110px] h-[26px] bg-black rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] absolute right-4" />
        </div>

        {/* Screen layout */}
        <div className="absolute inset-0 bg-apple-black flex flex-col pt-12 pb-6 px-4">
          
          {/* iOS Status Bar */}
          <div className="flex justify-between items-center text-[10px] font-bold text-white px-3 mb-4 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>📶</span>
              <span>5G</span>
              <div className="w-5 h-2.5 border border-white/60 rounded-md p-0.5 flex items-center">
                <div className="w-full h-full bg-white rounded-sm" />
              </div>
            </div>
          </div>

          {/* iMessage Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
            <button className="text-accent-blue text-xs flex items-center gap-0.5">
              <ArrowRight size={14} className="rotate-180" />
              <span>{language === 'ar' ? 'الرسائل' : 'Messages'}</span>
            </button>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-apple-gray5 flex items-center justify-center font-black text-text-primary text-[10px] uppercase border border-white/[0.06]">
                {sms ? sms.provider.slice(0, 2) : 'GP'}
              </div>
              <span className="text-[10px] font-bold text-white mt-1 capitalize">
                {sms ? sms.provider.replace('-', ' ') : 'Gateway'}
              </span>
            </div>
            <button className="text-accent-blue text-xs font-semibold">
              {language === 'ar' ? 'تفاصيل' : 'Info'}
            </button>
          </div>

          {/* iOS Chat Bubble scroll body */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none flex flex-col justify-end">
            
            {/* Timestamp label */}
            <div className="text-center text-[9px] font-bold text-text-tertiary uppercase select-none tracking-wider">
              {sms ? new Date(sms.received_at).toLocaleDateString(undefined, { weekday: 'long', hour: '2-digit', minute: '2-digit' }) : 'Today'}
            </div>

            {/* Bubble Thread of Same Contact */}
            {conversation.map((msg) => {
              const isSelected = msg.id === sms.id
              const isIncoming = msg.type === 'incoming' || msg.type === 'system'
              const isArabic = /[\u0600-\u06FF]/.test(msg.raw_sms)
              return (
                <div
                  key={msg.id}
                  className={`flex ${isIncoming ? 'justify-start' : 'justify-end'} animate-apple-enter`}
                >
                  <div
                    className={`max-w-[85%] rounded-[20px] px-3.5 py-2 text-xs leading-relaxed font-sans ${
                      isIncoming
                        ? isSelected 
                          ? 'bg-accent-blue text-white rounded-tl-sm' 
                          : 'bg-[#262629] text-white rounded-tl-sm border border-white/[0.04]'
                        : 'bg-accent-indigo text-white rounded-tr-sm'
                    }`}
                    style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}
                  >
                    <p className="whitespace-pre-line break-words">{msg.raw_sms}</p>
                    
                    <div className="flex items-center justify-between gap-4 mt-1.5 opacity-60 text-[8px] font-semibold">
                      <span>{new Date(msg.received_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</span>
                      {msg.trx_id && <span className="font-mono">ID: {msg.trx_id}</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* iMessage Input Bar */}
          <div className="border-t border-white/[0.08] pt-3 mt-3">
            <div className="flex items-center gap-2 bg-[#1C1C1E] border border-white/[0.08] rounded-full px-3 py-1.5">
              <span className="text-text-tertiary text-lg">⊕</span>
              <input
                type="text"
                placeholder={language === 'ar' ? 'رسالة iMessage' : 'iMessage'}
                disabled
                className="flex-1 bg-transparent border-none focus:outline-none text-xs text-text-secondary cursor-not-allowed placeholder-text-tertiary"
              />
              <span className="text-text-tertiary">🎤</span>
            </div>
          </div>
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-white/40 rounded-full z-20" />
      </div>

      {/* Structured Metadata Extraction Detail Panel underneath simulator */}
      {sms && (
        <div className="apple-surface bg-apple-gray6 p-5 mt-4 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
            <ShieldCheck size={16} className="text-accent-green" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'البيانات المستخرجة بنجاح' : 'Audit Extraction Logs'}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-apple-gray5 p-2.5 rounded-xl border border-white/[0.04] space-y-1">
              <div className="text-[10px] text-text-secondary font-bold flex items-center gap-1">
                <Hash size={10} className="text-accent-blue" />
                <span>{language === 'ar' ? 'رقم المعاملة' : 'Transaction ID'}</span>
              </div>
              <p className="font-mono font-bold text-white break-all">
                {sms.trx_id ? sms.trx_id : (language === 'ar' ? 'غير متوفر' : 'Not found')}
              </p>
            </div>

            <div className="bg-apple-gray5 p-2.5 rounded-xl border border-white/[0.04] space-y-1">
              <div className="text-[10px] text-text-secondary font-bold flex items-center gap-1">
                <DollarSign size={10} className="text-accent-green" />
                <span>{language === 'ar' ? 'المبلغ المستخلص' : 'Extracted Amount'}</span>
              </div>
              <p className="font-bold text-accent-green">
                {sms.amount > 0 ? `${sms.amount.toLocaleString()} ${sms.currency}` : (language === 'ar' ? 'لا يوجد' : 'None')}
              </p>
            </div>

            <div className="bg-apple-gray5 p-2.5 rounded-xl border border-white/[0.04] space-y-1">
              <div className="text-[10px] text-text-secondary font-bold flex items-center gap-1">
                <User size={10} className="text-accent-indigo" />
                <span>{language === 'ar' ? 'اسم العميل' : 'Customer/Sender'}</span>
              </div>
              <p className="font-bold text-white truncate" title={sms.sender_name}>
                {sms.sender_name ? sms.sender_name : (language === 'ar' ? 'نظام المحفظة' : 'Wallet System')}
              </p>
            </div>

            <div className="bg-apple-gray5 p-2.5 rounded-xl border border-white/[0.04] space-y-1">
              <div className="text-[10px] text-text-secondary font-bold flex items-center gap-1">
                <Smartphone size={10} className="text-accent-orange" />
                <span>{language === 'ar' ? 'رقم الهاتف' : 'Contact Phone'}</span>
              </div>
              <p className="font-mono font-bold text-white">
                {sms.sender_number}
              </p>
            </div>
          </div>

          {/* Matching Status */}
          <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-between text-xs">
            <span className="text-text-secondary font-bold">{language === 'ar' ? 'حالة المعالجة الآلية' : 'Webhook Status'}</span>
            <div className="flex items-center gap-1.5 font-bold">
              {sms.status === 'success' ? (
                <>
                  <CheckCircle2 size={14} className="text-accent-green" />
                  <span className="text-accent-green">{language === 'ar' ? 'تمت المطابقة وتحديث الرصيد' : 'Matched & Settled'}</span>
                </>
              ) : sms.status === 'failed' ? (
                <>
                  <XCircle size={14} className="text-accent-red" />
                  <span className="text-accent-red">{language === 'ar' ? 'فشلت التصفية / معيب' : 'Failed Parse'}</span>
                </>
              ) : (
                <>
                  <AlertCircle size={14} className="text-accent-orange animate-bounce" />
                  <span className="text-accent-orange">{language === 'ar' ? 'تحت المراجعة البشرية' : 'Pending Audit'}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
