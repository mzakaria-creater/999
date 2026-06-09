import { useState, useEffect } from 'react'
import { Copy, CheckCircle2, AlertCircle, Mail, Wallet } from 'lucide-react'

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

export default function PaymentCheckout() {
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [merchantName, setMerchantName] = useState('')
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null)
  const [provider, setProvider] = useState<PaymentProvider | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [ussdCode, setUssdCode] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [walletBalance, setWalletBalance] = useState(0)

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

    if (!selectedWallet) {
      alert('Please select a wallet to deduct payment from')
      return
    }

    const paymentAmount = parseFloat(amount)
    if (paymentAmount > selectedWallet.balance) {
      alert(`Insufficient balance. Wallet has ${(selectedWallet.balance / 1000).toFixed(0)}K`)
      return
    }

    if (!provider) {
      alert('This provider is not supported')
      return
    }

    if (!email || !merchantName) {
      alert('Please enter email and merchant name for invoice')
      return
    }

    setLoading(true)

    try {
      // Generate transaction ID
      const txnId = generateTransactionId()
      setTransactionId(txnId)

      // Deduct from selected wallet
      const newBalance = selectedWallet.balance - paymentAmount
      setWalletBalance(newBalance)

      // Generate USSD code
      const ussd = `${provider.ussd}${phone}*${amount}#`
      setUssdCode(ussd)

      // Generate QR code
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(ussd)}`
      setQrCode(qrUrl)

      // Send email invoice
      await sendEmailInvoice({
        transactionId: txnId,
        contactName: merchantName,
        email: email,
        phone: phone,
        amount: paymentAmount,
        walletProvider: selectedWallet.provider,
        walletBalance: newBalance,
        provider: provider.name,
        paymentDate: new Date().toLocaleDateString(),
      })

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
    setProvider(null)
    setShowResult(false)
    setUssdCode('')
    setQrCode('')
    setTransactionId('')
    setWalletBalance(0)
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

            {/* Wallet Selection */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                <Wallet size={16} className="inline mr-1" /> Select Payment Wallet
              </label>
              <div className="grid grid-cols-2 gap-3">
                {mockWallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => setSelectedWallet(wallet)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedWallet?.id === wallet.id
                        ? 'border-accent-blue bg-accent-blue/10'
                        : 'border-white/[0.08] hover:border-white/[0.15] bg-apple-gray5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{wallet.icon}</span>
                      {selectedWallet?.id === wallet.id && (
                        <CheckCircle2 size={18} className="text-accent-blue" />
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
              disabled={loading || !phone || !amount || !email || !merchantName || !selectedWallet}
              className="w-full btn flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                background: provider?.color || '#007AFF',
              }}
            >
              {loading ? '⏳ Processing...' : '✓ Generate Payment Code'}
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
                  <span className="text-text-secondary">Payment Wallet:</span>
                  <span className="font-semibold text-text-primary flex items-center gap-2">
                    <span>{selectedWallet?.icon}</span> {selectedWallet?.provider}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Remaining Balance:</span>
                  <span className="font-semibold text-accent-green">{(walletBalance / 1000).toFixed(0)}K EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Recipient Provider:</span>
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
