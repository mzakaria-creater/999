import { useState, useEffect } from 'react'
import { Copy, CheckCircle2, AlertCircle, Upload, Clock, QrCode, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { WalletAccount } from '@/types/wallet'
import { INITIAL_WALLETS, AVAILABLE_CHANNELS, getWalletCost } from '@/data/wallets'

interface Provider {
  id: string
  name: string
  code: string
  color: string
  icon: string
  ussdPrefix: string
  instructions: string[]
}

const providers: Provider[] = [
  {
    id: 'vodafone',
    name: 'Vodafone Cash',
    code: '010',
    color: '#e60000',
    icon: '📱',
    ussdPrefix: '*9*7*',
    instructions: ['Dial the USSD code on your phone', 'Confirm the amount in the prompt', 'Enter your PIN to complete'],
  },
  {
    id: 'etisalat',
    name: 'Etisalat Cash',
    code: '011',
    color: '#719917',
    icon: '💳',
    ussdPrefix: '*777*1*',
    instructions: ['Open Etisalat Cash app', 'Scan the QR code below', 'Confirm and enter your PIN'],
  },
  {
    id: 'orange',
    name: 'Orange Money',
    code: '012',
    color: '#ff7900',
    icon: '🟠',
    ussdPrefix: '#7115*1*',
    instructions: ['Dial USSD code from your phone', 'Select payment option', 'Complete the transaction'],
  },
  {
    id: 'we',
    name: 'WE Pay',
    code: '015',
    color: '#4c0099',
    icon: '💜',
    ussdPrefix: '*990*1*',
    instructions: ['Open WE Pay app or dial USSD', 'Scan the QR code', 'Confirm the payment'],
  },
]

const merchants = Array.from(new Set(INITIAL_WALLETS.map((w) => w.merchant).filter((m) => m !== 'all')))

const getProviderIcon = (provider: string): string => {
  switch (provider) {
    case 'Vodafone Cash':
      return '📱'
    case 'InstaPay':
      return '💳'
    case 'Bank Transfer':
      return '🏦'
    case 'Orange Cash':
      return '🟠'
    case 'Etisalat Cash':
      return '💚'
    case 'USDT':
      return '₿'
    case 'Wise':
      return '💱'
    default:
      return '💰'
  }
}

export default function PaymentCheckout() {
  const { t, language, dir } = useLanguage()
  const [transactionType, setTransactionType] = useState<'deposit' | 'payout'>('deposit')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(providers[0])
  const [selectedWallet, setSelectedWallet] = useState<WalletAccount | null>(INITIAL_WALLETS[0])
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [merchantName, setMerchantName] = useState('')
  const [phone, setPhone] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [ussdCode, setUssdCode] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const [timeLeft, setTimeLeft] = useState(900)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [copied, setCopied] = useState(false)

  const provider = selectedProvider!

  useEffect(() => {
    if (phone) {
      const prefix = phone.substring(0, 3)
      const found = providers.find((p) => p.code === prefix)
      if (found) setSelectedProvider(found)
    }
  }, [phone])

  useEffect(() => {
    if (showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showResult])

  const handlePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    if (transactionType === 'payout' && !selectedWallet) {
      alert('Please select a wallet')
      return
    }

    if (!merchantName || !email) {
      alert('Please enter merchant name and email')
      return
    }

    const txId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setTransactionId(txId)

    const code = `${provider.ussdPrefix}${phone}*${parseFloat(amount).toFixed(0)}#`
    setUssdCode(code)

    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(code)}`
    setQrUrl(qr)

    setShowResult(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ussdCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (showResult) {
    return (
      <div className="p-6 space-y-6" dir={dir}>
        {/* Header */}
        <div className="glossy-card rounded-2xl p-8" style={{ borderColor: `${provider.color}40`, backgroundColor: `${provider.color}05` }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{provider.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-text-primary">{provider.name} Checkout</h1>
              <p className="text-text-secondary mt-1">Secure Payment Gateway</p>
            </div>
          </div>
        </div>

        {/* Timer Banner */}
        <div className="glossy-card rounded-2xl p-6 flex items-center justify-between" style={{ borderColor: `${provider.color}40` }}>
          <div className="flex items-center gap-3">
            <Clock size={24} style={{ color: provider.color }} />
            <div>
              <p className="text-text-secondary text-sm font-semibold">Payment Session Expires In</p>
              <p className="text-2xl font-bold text-text-primary">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </p>
            </div>
          </div>
          <div className="w-32 h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{ width: `${(timeLeft / 900) * 100}%`, backgroundColor: provider.color }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Order Summary */}
            <div className="glossy-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/[0.08]">
                  <span className="text-text-secondary">Reference ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-text-primary">{transactionId}</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-accent-blue hover:text-accent-blue/80 transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-text-secondary text-lg">Total Amount</span>
                  <span className="text-3xl font-bold" style={{ color: provider.color }}>
                    EGP {parseFloat(amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Wallet Allocation */}
            {transactionType === 'payout' && (
              <div className="glossy-card rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-text-primary mb-4">Wallet Allocation</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedWallet?.icon}</span>
                      <div>
                        <p className="font-semibold text-text-primary">{selectedWallet?.name}</p>
                        <p className="text-xs text-text-secondary">Deducted</p>
                      </div>
                    </div>
                    <span className="font-bold text-text-primary">EGP {parseFloat(amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Instructions */}
            <div className="glossy-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-text-primary mb-4">How to Complete Payment</h3>
              <div className="space-y-4">
                {provider.instructions.map((instruction, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                      style={{ backgroundColor: provider.color }}
                    >
                      {idx + 1}
                    </div>
                    <p className="text-text-secondary pt-1">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Proof */}
            <div className="glossy-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Upload size={20} /> Upload Proof of Payment
              </h3>
              <p className="text-text-secondary text-sm mb-4">Upload a screenshot of your transaction confirmation</p>
              <label className="block border-2 border-dashed border-white/[0.08] rounded-xl p-8 text-center cursor-pointer hover:border-white/[0.15] transition-colors">
                <div className="space-y-2">
                  <QrCode size={32} className="mx-auto text-text-secondary opacity-50" />
                  <p className="text-sm font-semibold text-text-primary">Click to upload or drag and drop</p>
                  <p className="text-xs text-text-secondary">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                />
              </label>
              {proofFile && <p className="text-sm text-accent-green mt-2">✓ {proofFile.name}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col">
            {/* QR Code */}
            <div className="glossy-card rounded-2xl p-8 text-center" style={{ borderColor: `${provider.color}40` }}>
              <h3 className="text-lg font-bold text-text-primary mb-2">Scan to Pay</h3>
              <p className="text-text-secondary text-sm mb-6">Open your {provider.name} app and scan</p>
              {qrUrl && (
                <div className="relative inline-block mb-6">
                  <div
                    className="absolute inset-0 rounded-lg blur opacity-20"
                    style={{ backgroundColor: provider.color }}
                  />
                  <img src={qrUrl} alt="Payment QR" className="w-64 h-64 rounded-lg relative" />
                </div>
              )}
            </div>

            {/* USSD Code */}
            <div className="glossy-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Zap size={20} /> USSD Code
              </h3>
              <p className="text-text-secondary text-sm mb-4">Dial this code on your phone:</p>
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4 mb-4">
                <p className="font-mono text-center font-bold text-text-primary text-lg break-all">{ussdCode}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="w-full bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Copy size={18} /> {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* Action Button */}
            <button className="w-full bg-accent-green text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 text-lg">
              <CheckCircle2 size={20} /> I Sent Payment
            </button>

            {/* Security Info */}
            <div className="text-center text-xs text-text-secondary space-y-2">
              <p>🔒 PCI-DSS Compliant</p>
              <p>🛡️ SSL Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6" dir={dir}>
      {/* Header */}
      <div className="glossy-card rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Payment Checkout</h1>
        <p className="text-text-secondary">Select your payment provider and enter details</p>
      </div>

      {/* Transaction Type */}
      <div className="flex gap-4">
        <button
          onClick={() => setTransactionType('deposit')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
            transactionType === 'deposit'
              ? 'bg-accent-green text-white'
              : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.1]'
          }`}
        >
          📥 Deposit
        </button>
        <button
          onClick={() => setTransactionType('payout')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
            transactionType === 'payout'
              ? 'bg-accent-orange text-white'
              : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.1]'
          }`}
        >
          📤 Payout
        </button>
      </div>

      {/* Provider Selection */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">Select Payment Provider</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {providers.map((prov) => (
            <button
              key={prov.id}
              onClick={() => setSelectedProvider(prov)}
              className={`p-4 rounded-xl transition-all border-2 ${
                selectedProvider?.id === prov.id
                  ? 'border-white/[0.3] bg-white/[0.1]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06]'
              }`}
            >
              <span className="text-3xl mb-2 block">{prov.icon}</span>
              <p className="text-sm font-bold text-text-primary">{prov.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Merchant Info */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Merchant Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Merchant Name</label>
                <select
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
                >
                  <option value="">Select Merchant</option>
                  {merchants.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="merchant@example.com"
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-accent-blue focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="glossy-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  maxLength={11}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-accent-blue focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Amount (EGP)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1000"
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-accent-blue focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Wallet Selection (for Payout) */}
          {transactionType === 'payout' && (
            <div className="glossy-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Select Wallet</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {INITIAL_WALLETS.filter((w) => w.active).map((wallet) => {
                  const dailyUtilization = (wallet.used_today / wallet.daily_limit) * 100
                  const cost = getWalletCost(wallet, parseFloat(amount || '0'))
                  return (
                    <button
                      key={wallet.id}
                      onClick={() => setSelectedWallet(wallet)}
                      className={`w-full p-4 rounded-xl transition-all border-2 text-left ${
                        selectedWallet?.id === wallet.id
                          ? 'border-white/[0.3] bg-white/[0.1]'
                          : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl">{getProviderIcon(wallet.provider)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-text-primary truncate">{wallet.provider}</p>
                            <p className="text-xs text-text-secondary">{wallet.label}</p>
                          </div>
                        </div>
                        {selectedWallet?.id === wallet.id && <CheckCircle2 size={20} className="text-accent-blue flex-shrink-0" />}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-text-secondary">Daily Limit</p>
                          <p className="font-semibold text-text-primary">₦{wallet.daily_limit.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Used Today</p>
                          <p className={`font-semibold ${dailyUtilization > 75 ? 'text-accent-orange' : 'text-accent-green'}`}>
                            {dailyUtilization.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                      {amount && (
                        <div className="mt-2 text-xs border-t border-white/[0.08] pt-2">
                          <p className="text-text-secondary">
                            Estimated Cost: <span className="text-accent-orange font-semibold">₦{cost.toFixed(2)}</span>
                          </p>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="glossy-card rounded-2xl p-6" style={{ borderColor: `${provider.color}40` }}>
            <h3 className="text-lg font-bold text-text-primary mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Provider:</span>
                <span className="font-bold text-text-primary">{provider.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amount:</span>
                <span className="font-bold text-text-primary">EGP {parseFloat(amount || '0').toLocaleString()}</span>
              </div>
              {transactionType === 'payout' && selectedWallet && (
                <>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Wallet:</span>
                    <span className="font-bold text-text-primary">{selectedWallet.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Transaction Fee:</span>
                    <span className="font-bold text-accent-orange">
                      ₦{getWalletCost(selectedWallet, parseFloat(amount || '0')).toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
