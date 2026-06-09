import { useState, useEffect } from 'react'
import { ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'

interface WalletOption {
  id: string
  provider: string
  balance: number
  capacity: number
  healthScore: number
  processingTime: number
  dailyLimit: number
  dailyUsed: number
  isAvailable: boolean
}

interface CheckoutProps {
  amount: number
  currency: string
  onSelectWallet: (walletId: string) => void
  onConfirm: () => void
}

export default function MultiWalletCheckout({
  amount,
  currency,
  onSelectWallet,
  onConfirm,
}: CheckoutProps) {
  const [selectedWallet, setSelectedWallet] = useState<string>('')
  const [wallets, setWallets] = useState<WalletOption[]>([
    {
      id: 'vodafone-egypt',
      provider: 'Vodafone Cash',
      balance: 500000,
      capacity: 1000000,
      healthScore: 98,
      processingTime: 500,
      dailyLimit: 10000000,
      dailyUsed: 3500000,
      isAvailable: true,
    },
    {
      id: 'instapay-egypt',
      provider: 'InstaPay',
      balance: 250000,
      capacity: 500000,
      healthScore: 95,
      processingTime: 1200,
      dailyLimit: 5000000,
      dailyUsed: 2000000,
      isAvailable: true,
    },
    {
      id: 'bank-egypt',
      provider: 'Commercial Bank',
      balance: 750000,
      capacity: 2000000,
      healthScore: 92,
      processingTime: 2000,
      dailyLimit: 20000000,
      dailyUsed: 5000000,
      isAvailable: true,
    },
  ])

  useEffect(() => {
    if (wallets.length > 0) {
      setSelectedWallet(wallets[0].id)
      onSelectWallet(wallets[0].id)
    }
  }, [])

  const selected = wallets.find((w) => w.id === selectedWallet)
  const remainingDaily = selected ? selected.dailyLimit - selected.dailyUsed : 0
  const availableBalance = selected ? selected.balance : 0
  const canProcess = availableBalance >= amount && remainingDaily >= amount

  const getProviderColor = (provider: string) => {
    const colors: Record<string, string> = {
      'Vodafone Cash': 'from-red-500/20 to-red-500/10 border-red-500/30',
      InstaPay: 'from-blue-500/20 to-blue-500/10 border-blue-500/30',
      'Commercial Bank': 'from-green-500/20 to-green-500/10 border-green-500/30',
    }
    return colors[provider] || 'from-gray-500/20 to-gray-500/10 border-gray-500/30'
  }

  const getHealthColor = (score: number) => {
    if (score >= 95) return 'text-green-400'
    if (score >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Amount Summary */}
      <div className="glass rounded-2xl p-6">
        <p className="text-text-secondary text-sm mb-2">Amount to Process</p>
        <p className="font-jakarta text-3xl font-bold text-primary">
          {amount.toLocaleString()} {currency}
        </p>
      </div>

      {/* Wallet Selection */}
      <div className="space-y-3">
        <h3 className="section-title text-lg">Select Payment Method</h3>

        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => {
                setSelectedWallet(wallet.id)
                onSelectWallet(wallet.id)
              }}
              className={`w-full glass rounded-2xl p-4 text-left transition-all duration-200 border-2 cursor-pointer hover:border-primary/40 ${
                selectedWallet === wallet.id
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-white/[0.08]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Provider Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedWallet === wallet.id
                          ? 'border-primary bg-primary'
                          : 'border-text-secondary'
                      }`}
                    />
                    <span className="font-bold text-text-primary">
                      {wallet.provider}
                    </span>
                    {wallet.isAvailable ? (
                      <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-md">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs bg-error/20 text-error px-2 py-1 rounded-md">
                        Unavailable
                      </span>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                    <div>
                      <p className="text-text-secondary">Balance</p>
                      <p className="font-bold text-text-primary">
                        {(wallet.balance / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Health</p>
                      <p className={`font-bold ${getHealthColor(wallet.healthScore)}`}>
                        {wallet.healthScore}%
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Speed</p>
                      <p className="font-bold text-text-primary">
                        {wallet.processingTime}ms
                      </p>
                    </div>
                  </div>

                  {/* Daily Limit Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Daily Limit</span>
                      <span className="text-text-primary">
                        {(wallet.dailyUsed / 1000000).toFixed(1)}M / {(wallet.dailyLimit / 1000000).toFixed(0)}M
                      </span>
                    </div>
                    <div className="bg-dark-elevation rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                        style={{
                          width: `${(wallet.dailyUsed / wallet.dailyLimit) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Arrow */}
                <ChevronRight
                  className={`text-primary mt-1 transition-transform ${
                    selectedWallet === wallet.id ? 'scale-110' : ''
                  }`}
                  size={20}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Wallet Details */}
      {selected && (
        <div className="glass rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-text-primary">Transaction Details</h3>

          <div className="space-y-3">
            {/* Availability Check */}
            <div className="flex items-center gap-3">
              {canProcess ? (
                <>
                  <CheckCircle2 className="text-success" size={20} />
                  <div>
                    <p className="text-text-primary font-semibold">Ready to Process</p>
                    <p className="text-text-secondary text-sm">Sufficient balance and daily limit</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="text-warning" size={20} />
                  <div>
                    <p className="text-warning font-semibold">Cannot Process</p>
                    <p className="text-text-secondary text-sm">
                      {availableBalance < amount
                        ? `Insufficient balance. Need ${(amount - availableBalance).toLocaleString()}`
                        : `Exceeds daily limit. Only ${remainingDaily.toLocaleString()} available today`}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Fee Estimate */}
            <div className="pt-3 border-t border-white/[0.08]">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Amount</span>
                <span className="text-text-primary font-semibold">
                  {amount.toLocaleString()} {currency}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-text-secondary">Processing Fee (1.5%)</span>
                <span className="text-text-primary font-semibold">
                  {(amount * 0.015).toLocaleString()} {currency}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/[0.08]">
                <span className="text-text-primary font-bold">Total</span>
                <span className="text-primary font-bold">
                  {(amount * 1.015).toLocaleString()} {currency}
                </span>
              </div>
            </div>

            {/* Provider Info */}
            <div className="text-xs text-text-secondary pt-3">
              <p>Processing via {selected.provider}</p>
              <p>Estimated time: {selected.processingTime}ms</p>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        disabled={!canProcess}
        className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
          canProcess
            ? 'btn hover:shadow-lg'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        {canProcess
          ? `Confirm Payment - ${(amount * 1.015).toLocaleString()} ${currency}`
          : 'Cannot Process'}
      </button>

      {/* Back to Edit */}
      <button className="w-full py-2 btn-secondary rounded-xl font-semibold">
        Change Amount
      </button>
    </div>
  )
}
