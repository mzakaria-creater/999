import { useState, useEffect } from 'react'
import { Copy, CheckCircle2, AlertCircle, Mail, Wallet, MapPin, Globe } from 'lucide-react'

interface PaymentProvider {
  name: string
  color: string
  ussd: string
  icon: string
}

interface WalletOption {
  id: string
  provider: string
  balance: number
  color: string
  icon: string
}

interface LocationOption {
  id: string
  city: string
  country: string
  code: string
  flag: string
  lat: number
  lng: number
}

const providers: Record<string, PaymentProvider> = {
  '010': { name: 'Vodafone Cash', color: '#e60000', ussd: '*9*7*', icon: '📱' },
  '011': { name: 'Etisalat Cash', color: '#719917', ussd: '*777*1*', icon: '💳' },
  '012': { name: 'Orange Money', color: '#ff7900', ussd: '#7115*1*', icon: '🟠' },
  '015': { name: 'WE Pay', color: '#4c0099', ussd: '*990*1*', icon: '💰' },
}

const mockWallets: WalletOption[] = [
  { id: 'vodafone-egypt', provider: 'Vodafone Cash', balance: 500000, color: '#e60000', icon: '📱' },
  { id: 'instapay-egypt', provider: 'InstaPay', balance: 250000, color: '#0066cc', icon: '💳' },
  { id: 'bank-egypt', provider: 'Commercial Bank', balance: 750000, color: '#1a5490', icon: '🏦' },
  { id: 'stripe-intl', provider: 'Stripe', balance: 150000, color: '#635bff', icon: '💎' },
]

const mockLocations: LocationOption[] = [
  { id: 'cairo', city: 'Cairo', country: 'Egypt', code: 'EG', flag: '🇪🇬', lat: 30.0444, lng: 31.2357 },
  { id: 'alexandria', city: 'Alexandria', country: 'Egypt', code: 'EG', flag: '🇪🇬', lat: 31.2001, lng: 29.9187 },
  { id: 'dubai', city: 'Dubai', country: 'UAE', code: 'AE', flag: '🇦🇪', lat: 25.2048, lng: 55.2708 },
  { id: 'abudhabi', city: 'Abu Dhabi', country: 'UAE', code: 'AE', flag: '🇦🇪', lat: 24.4539, lng: 54.3773 },
  { id: 'riyadh', city: 'Riyadh', country: 'KSA', code: 'SA', flag: '🇸🇦', lat: 24.7136, lng: 46.6753 },
  { id: 'jeddah', city: 'Jeddah', country: 'KSA', code: 'SA', flag: '🇸🇦', lat: 21.5433, lng: 39.1727 },
]

const merchantWalletAssignments: Record<string, WalletOption> = {
  'Ahmed Electronics': mockWallets[0], // Vodafone
  'Cairo Retail': mockWallets[1], // InstaPay
  'Emirates Foods': mockWallets[2], // Commercial Bank
  'Dubai Trade': mockWallets[3], // Stripe
}

type TransactionType = 'deposit' | 'payout'

export default function PaymentCheckout() {
  const [transactionType, setTransactionType] = useState<TransactionType>('deposit')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [merchantName, setMerchantName] = useState('')
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(mockLocations[0])
  const [provider, setProvider] = useState<PaymentProvider | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [ussdCode, setUssdCode] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [walletBalance, setWalletBalance] = useState(0)
  const [assignedMerchantWallet, setAssignedMerchantWallet] = useState<WalletOption | null>(null)

  useEffect(() => {
    const prefix = phone.substring(0, 3)
    if (providers[prefix]) {
      setProvider(providers[prefix])
    } else {
      setProvider(null)
    }
  }, [phone])

  const generateTransactionId = () => {
    return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  const handlePayment = async () => {
    if (!phone || phone.length !== 11 || !amount) {
      alert('Please enter a valid phone number and amount')
      return
    }

    if (!email || !merchantName) {
      alert('Please enter email and merchant name for invoice')
      return
    }

    const paymentAmount = parseFloat(amount)

    // DEPOSIT: Uses merchant's assigned wallet (no client wallet selection/deduction needed)
    if (transactionType === 'deposit') {
      const merchantWallet = merchantWalletAssignments[merchantName]
      if (!merchantWallet) {
        alert(`No wallet assigned to merchant: ${merchantName}`)
        return
      }
      setAssignedMerchantWallet(merchantWallet)
    }

    // PAYOUT: Requires client wallet selection and balance validation
    if (transactionType === 'payout') {
      if (!selectedWallet) {
        alert('Please select a wallet to deduct payment from')
        return
      }

      if (paymentAmount > selectedWallet.balance) {
        alert(`Insufficient balance. Wallet has ${(selectedWallet.balance / 1000).toFixed(0)}K`)
        return
      }
    }

    if (!provider) {
      alert('This provider is not supported')
      return
    }

    setLoading(true)

    try {
      // Generate transaction ID
      const txnId = generateTransactionId()
      setTransactionId(txnId)

      // Handle wallet deduction based on transaction type
      if (transactionType === 'payout' && selectedWallet) {
        const newBalance = selectedWallet.balance - paymentAmount
        setWalletBalance(newBalance)
      }

      // Generate USSD code
      const ussd = `${provider.ussd}${phone}*${amount}#`
      setUssdCode(ussd)

      // Generate QR code
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(ussd)}`
      setQrCode(qrUrl)

      // Prepare invoice data based on transaction type
      const invoiceData = {
        transactionId: txnId,
        contactName: merchantName,
        email: email,
        phone: phone,
        amount: paymentAmount,
        transactionType: transactionType,
        provider: provider.name,
        paymentDate: new Date().toLocaleDateString(),
      }

      if (transactionType === 'deposit') {
        // DEPOSIT: Use merchant's assigned wallet
        Object.assign(invoiceData, {
          walletProvider: assignedMerchantWallet?.provider,
          walletUsed: 'Merchant Assigned Wallet',
          walletAction: 'CREDIT (receives funds)',
        })
      } else {
        // PAYOUT: Deduct from client wallet
        Object.assign(invoiceData, {
          walletProvider: selectedWallet?.provider,
          walletUsed: 'Client Wallet',
          walletBalance: walletBalance,
          walletAction: 'DEBIT (sends funds)',
        })
      }

      // Send email invoice
      await sendEmailInvoice(invoiceData)

      setShowResult(true)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Error processing payment')
    } finally {
      setLoading(false)
    }
  }

  const sendEmailInvoice = async (invoiceData: any) => {
    // Simulate email sending (in production, call backend API)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email invoice sent to:', invoiceData.email, invoiceData)
        resolve(true)
      }, 500)
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ussdCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetForm = () => {
    setPhone('')
    setAmount('')
    setEmail('')
    setMerchantName('')
    setSelectedWallet(null)
    setSelectedLocation(mockLocations[0])
    setProvider(null)
    setShowResult(false)
    setUssdCode('')
    setQrCode('')
    setTransactionId('')
    setWalletBalance(0)
    setAssignedMerchantWallet(null)
  }

  return (
    <div className="pb-8 px-4 md:px-8 max-w-3xl mx-auto w-full">
      <div className="space-y-8">
        <div>
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">USSD Payment</h1>
          <p className="text-text-secondary">Fast & secure payment via USSD</p>
        </div>

        {!showResult ? (
          // Payment Form
          <div className="apple-surface rounded-2xl p-8 space-y-6">
            {/* Transaction Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-3">
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTransactionType('deposit')}
                  className={`p-4 rounded-xl border-2 transition-all text-left font-semibold ${
                    transactionType === 'deposit'
                      ? 'border-accent-green bg-accent-green/10 text-accent-green'
                      : 'border-white/[0.08] hover:border-white/[0.15] bg-apple-gray5 text-text-secondary'
                  }`}
                >
                  📥 DEPOSIT
                  <p className="text-xs text-current opacity-75 mt-1">Merchant receives funds</p>
                </button>
                <button
                  onClick={() => setTransactionType('payout')}
                  className={`p-4 rounded-xl border-2 transition-all text-left font-semibold ${
                    transactionType === 'payout'
                      ? 'border-accent-orange bg-accent-orange/10 text-accent-orange'
                      : 'border-white/[0.08] hover:border-white/[0.15] bg-apple-gray5 text-text-secondary'
                  }`}
                >
                  📤 PAYOUT
                  <p className="text-xs text-current opacity-75 mt-1">You send funds</p>
                </button>
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-3">
                <MapPin size={16} className="inline mr-1" /> Transaction Location
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mockLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      selectedLocation?.id === location.id
                        ? 'border-accent-blue bg-accent-blue/10'
                        : 'border-white/[0.08] hover:border-white/[0.15] bg-apple-gray5'
                    }`}
                  >
                    <div className="text-2xl mb-2">{location.flag}</div>
                    <div className="text-sm font-semibold text-text-primary">{location.city}</div>
                    <div className="text-xs text-text-secondary">{location.country}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Merchant Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  Merchant Name
                </label>
                <input
                  type="text"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  placeholder="Your Business"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="invoice@business.com"
                  className="input w-full"
                />
              </div>
            </div>

            {/* Wallet Section - Different based on transaction type */}
            {transactionType === 'deposit' ? (
              // DEPOSIT: Show merchant's assigned wallet (read-only)
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-3">
                  <Wallet size={16} className="inline mr-1" /> Merchant Assigned Wallet (Auto)
                </label>
                <div className="p-4 rounded-xl border-2 border-accent-green/30 bg-accent-green/10">
                  {merchantWalletAssignments[merchantName] ? (
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{merchantWalletAssignments[merchantName].icon}</span>
                        <div>
                          <p className="font-semibold text-text-primary">{merchantWalletAssignments[merchantName].provider}</p>
                          <p className="text-xs text-accent-green font-bold">
                            Merchant receives: {parseFloat(amount || '0').toLocaleString()} EGP
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary">Balance: {(merchantWalletAssignments[merchantName].balance / 1000).toFixed(0)}K EGP</p>
                    </div>
                  ) : (
                    <p className="text-sm text-text-secondary">Enter merchant name to see assigned wallet</p>
                  )}
                </div>
                <p className="text-xs text-accent-green mt-2">✓ No wallet balance deduction (merchant wallet receives credit)</p>
              </div>
            ) : (
              // PAYOUT: Show client wallet selector for deduction
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  <Wallet size={16} className="inline mr-1" /> Select Wallet to Deduct From
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {mockWallets.map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => setSelectedWallet(wallet)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedWallet?.id === wallet.id
                          ? 'border-accent-orange bg-accent-orange/10'
                          : 'border-white/[0.08] hover:border-white/[0.15] bg-apple-gray5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{wallet.icon}</span>
                        {selectedWallet?.id === wallet.id && (
                          <CheckCircle2 size={18} className="text-accent-orange" />
                        )}
                      </div>
                      <div className="text-sm font-semibold text-text-primary">{wallet.provider}</div>
                      <div className="text-xs text-text-secondary mt-1">
                        {(wallet.balance / 1000).toFixed(0)}K EGP
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phone & Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  Recipient Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.slice(0, 11))}
                  placeholder="01XXXXXXXXX"
                  maxLength={11}
                  className="input w-full text-lg font-bold text-center"
                />
                {provider && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl">{provider.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: provider.color }}>
                      {provider.name}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  Amount (EGP)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="input w-full text-lg font-bold text-center"
                />
                {selectedWallet && (
                  <div className="mt-2 text-xs text-text-secondary">
                    Available: {(selectedWallet.balance / 1000).toFixed(0)}K EGP
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-4">
              <p className="text-sm text-text-secondary">
                An invoice will be sent to <span className="font-semibold text-text-primary">{email || 'your email'}</span> with payment details and transaction ID.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={
                loading ||
                !phone ||
                !amount ||
                !email ||
                !merchantName ||
                (transactionType === 'payout' && !selectedWallet)
              }
              className="w-full btn flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                background:
                  transactionType === 'deposit'
                    ? '#10b981'
                    : provider?.color || '#007AFF',
              }}
            >
              {loading ? '⏳ Processing...' : `✓ Generate ${transactionType === 'deposit' ? 'Deposit' : 'Payout'} Code`}
            </button>
          </div>
        ) : (
          // Payment Result
          <div className="space-y-6 animate-slide-down">
            {/* Success */}
            <div className="apple-surface rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 size={48} className="text-accent-green" />
              </div>
              <h2 className="font-apple text-2xl font-bold text-text-primary mb-2">
                Payment Ready ✅
              </h2>
              <p className="text-text-secondary text-sm mb-4">
                Invoice sent to <span className="font-semibold text-text-primary">{email}</span>
              </p>
            </div>

            {/* Transaction Details */}
            <div className="apple-surface rounded-2xl p-6">
              <h3 className="section-title">Transaction Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Transaction ID:</span>
                  <span className="font-mono font-semibold text-text-primary">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Merchant:</span>
                  <span className="font-semibold text-text-primary">{merchantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Amount:</span>
                  <span className="font-semibold text-accent-blue">{amount} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Transaction Type:</span>
                  <span className="font-semibold uppercase" style={{ color: transactionType === 'deposit' ? '#10b981' : '#ff9f0a' }}>
                    {transactionType === 'deposit' ? '📥 Deposit' : '📤 Payout'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    {transactionType === 'deposit' ? 'Merchant Wallet (Receives):' : 'Payout Wallet (Deducts):'}
                  </span>
                  <span className="font-semibold text-text-primary flex items-center gap-2">
                    <span>
                      {transactionType === 'deposit'
                        ? assignedMerchantWallet?.icon
                        : selectedWallet?.icon}
                    </span>
                    {transactionType === 'deposit'
                      ? assignedMerchantWallet?.provider
                      : selectedWallet?.provider}
                  </span>
                </div>
                {transactionType === 'payout' && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Remaining Balance:</span>
                    <span className="font-semibold text-accent-green">{(walletBalance / 1000).toFixed(0)}K EGP</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">Location:</span>
                  <span className="font-semibold text-text-primary flex items-center gap-2">
                    <span>{selectedLocation?.flag}</span> {selectedLocation?.city}, {selectedLocation?.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">USSD Provider:</span>
                  <span className="font-semibold" style={{ color: provider?.color }}>
                    {provider?.icon} {provider?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Date:</span>
                  <span className="font-semibold text-text-primary">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="apple-surface rounded-2xl p-6 text-center">
              <h3 className="section-title mb-4">Scan QR Code</h3>
              <div className="inline-block bg-white p-4 rounded-xl">
                <img src={qrCode} alt="QR Code" style={{ width: '180px', height: '180px' }} />
              </div>
              <p className="text-text-secondary text-sm mt-4">
                Scan with your phone camera to initiate payment
              </p>
            </div>

            {/* USSD Code */}
            <div className="apple-surface rounded-2xl p-6">
              <h3 className="section-title mb-4">USSD Code</h3>
              <div className="relative">
                <div className="bg-apple-gray5 border border-white/[0.08] rounded-xl p-4 font-mono text-lg font-bold text-text-primary text-center break-all">
                  {ussdCode}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  {copied ? (
                    <CheckCircle2 size={20} className="text-accent-green" />
                  ) : (
                    <Copy size={20} className="text-accent-blue" />
                  )}
                </button>
              </div>
              <p className="text-text-secondary text-sm mt-3">
                {copied ? '✓ Copied to clipboard' : 'Click to copy USSD code'}
              </p>
            </div>

            {/* Payment Instructions */}
            <div className="apple-surface rounded-2xl p-6">
              <h3 className="section-title mb-4">How to Pay</h3>
              <ol className="space-y-3 text-sm text-text-secondary">
                <li className="flex gap-3">
                  <span className="font-bold text-accent-blue">1.</span>
                  <span>
                    Open your phone's dialer and dial the USSD code above, or scan the QR code
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent-blue">2.</span>
                  <span>
                    Complete the payment on your {provider?.name}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent-blue">3.</span>
                  <span>
                    You'll receive a confirmation SMS and email invoice
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent-blue">4.</span>
                  <span>
                    Payment will be processed automatically
                  </span>
                </li>
              </ol>
            </div>

            {/* Email Invoice Info */}
            <div className="apple-surface rounded-2xl p-6 border-l-4 border-accent-blue">
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-accent-blue mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Invoice Email Sent</h4>
                  <p className="text-sm text-text-secondary">
                    A detailed invoice including transaction ID {transactionId}, amount, merchant name, and payment method has been sent to {email}. Keep this for your records.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button onClick={resetForm} className="btn flex-1">
                New Payment
              </button>
              <button className="btn-secondary flex-1">
                Download Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
