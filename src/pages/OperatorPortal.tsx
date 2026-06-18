import { useState, useEffect } from 'react'
import { Check, X, ShieldAlert, Settings, Radio, Sparkles, MessageSquare, Database } from 'lucide-react'

interface PayoutRequest {
  id: string
  merchantId: string
  merchantName: string
  amount: number
  currency: string
  bankName: string
  accountNo: string
  timestamp: string
  status: 'pending' | 'approved' | 'rejected'
}

interface LiveTransaction {
  id: string
  merchant: string
  amount: number
  currency: string
  gateway: string
  status: 'processing' | 'completed' | 'failed'
  time: string
}

export default function OperatorPortal() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>([
    { id: 'PAY-891', merchantId: 'MID-1022', merchantName: 'Cairo Commerce LLC', amount: 45000, currency: 'EGP', bankName: 'National Bank of Egypt', accountNo: '****9021', timestamp: '16:05', status: 'pending' },
    { id: 'PAY-892', merchantId: 'MID-4011', merchantName: 'Riyadh Retail Group', amount: 125000, currency: 'SAR', bankName: 'Al Rajhi Bank', accountNo: '****1182', timestamp: '16:11', status: 'pending' },
    { id: 'PAY-893', merchantId: 'MID-2099', merchantName: 'Dubai Fashion Hub', amount: 8400, currency: 'AED', bankName: 'Emirates NBD', accountNo: '****4403', timestamp: '16:14', status: 'pending' }
  ])

  const [liveTransactions, setLiveTransactions] = useState<LiveTransaction[]>([
    { id: 'TXN-9011', merchant: 'Cairo Commerce', amount: 3200, currency: 'EGP', gateway: 'Fawry Direct', status: 'completed', time: '16:20:10' },
    { id: 'TXN-9012', merchant: 'Dubai Fashion', amount: 750, currency: 'AED', gateway: 'Checkout.com', status: 'processing', time: '16:20:45' },
    { id: 'TXN-9013', merchant: 'Lagos Deliveries', amount: 85000, currency: 'NGN', gateway: 'Flutterwave', status: 'completed', time: '16:20:50' }
  ])

  // SMS Parsing tool state
  const [smsInput, setSmsInput] = useState(
    'ALERT: Bank Credit of EGP 15,000.00 from MOHAMMED ALI Ref: Fawry-908122-C. Bal: EGP 452,000.'
  )
  const [parsedData, setParsedData] = useState<any>({
    amount: 15000,
    currency: 'EGP',
    sender: 'MOHAMMED ALI',
    reference: 'Fawry-908122-C',
    gateway: 'Fawry SMS Engine'
  })
  const [creditResult, setCreditResult] = useState('')
  const [isParsing, setIsParsing] = useState(false)

  // Terminal Mappings weight
  const [terminals, setTerminals] = useState([
    { id: 'term-01', gateway: 'Fawry API Engine', weight: 40, status: 'online' },
    { id: 'term-02', gateway: 'Meeza Wallet Hub', weight: 30, status: 'online' },
    { id: 'term-03', gateway: 'Binance P2P Rail', weight: 30, status: 'online' },
    { id: 'term-04', gateway: 'Alternative SMS Gateway', weight: 0, status: 'offline' }
  ])

  // Spawn new live transactions randomly
  useEffect(() => {
    const merchants = ['Cairo Commerce', 'Dubai Fashion', 'Lagos Deliveries', 'Riyadh Retail', 'Casablanca Markets']
    const currencies = ['EGP', 'AED', 'NGN', 'SAR', 'MAD']
    const gatewaysList = ['Fawry Direct', 'Checkout.com', 'Flutterwave', 'Binance P2P', 'Meeza API']

    const interval = setInterval(() => {
      const id = 'TXN-' + Math.floor(1000 + Math.random() * 9000)
      const merchant = merchants[Math.floor(Math.random() * merchants.length)]
      const currency = currencies[Math.floor(Math.random() * currencies.length)]
      const amount = Math.floor(100 + Math.random() * 20000)
      const gateway = gatewaysList[Math.floor(Math.random() * gatewaysList.length)]
      const status: LiveTransaction['status'] = Math.random() > 0.15 ? 'completed' : Math.random() > 0.5 ? 'processing' : 'failed'
      const now = new Date()
      const time = now.toTimeString().split(' ')[0]

      setLiveTransactions(prev => [
        { id, merchant, amount, currency, gateway, status, time },
        ...prev.slice(0, 7)
      ])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleParseSms = () => {
    setIsParsing(true)
    setTimeout(() => {
      // Very basic regex parsing simulator for demonstration
      const amountMatch = smsInput.match(/(?:EGP|NGN|AED|SAR|₦|\$)\s?([\d,]+(?:\.\d+)?)/i) || smsInput.match(/([\d,]+(?:\.\d+)?)\s?(?:EGP|NGN|AED|SAR)/i)
      const refMatch = smsInput.match(/Ref:\s?([A-Za-z0-9-_]+)/i)
      const senderMatch = smsInput.match(/from\s?([A-Za-z0-9 ]+)(?:Ref|ALERT|\.)/i)

      let amt = 0
      if (amountMatch) {
        amt = parseFloat(amountMatch[1].replace(/,/g, ''))
      }

      let currency = 'EGP'
      if (smsInput.includes('NGN') || smsInput.includes('₦')) currency = 'NGN'
      if (smsInput.includes('AED')) currency = 'AED'
      if (smsInput.includes('SAR')) currency = 'SAR'

      setParsedData({
        amount: amt || 5000,
        currency,
        sender: senderMatch ? senderMatch[1].trim() : 'Unknown Sender',
        reference: refMatch ? refMatch[1].trim() : 'REF-' + Math.floor(Math.random() * 1000000),
        gateway: 'Parsed SMS Pipeline'
      })
      setIsParsing(false)
      setCreditResult('')
    }, 800)
  }

  const handleCreditTransaction = () => {
    if (!parsedData) return
    
    // Add to live transaction list
    const newTx: LiveTransaction = {
      id: parsedData.reference,
      merchant: 'SMS Credited: ' + parsedData.sender,
      amount: parsedData.amount,
      currency: parsedData.currency,
      gateway: parsedData.gateway,
      status: 'completed',
      time: new Date().toTimeString().split(' ')[0]
    }

    setLiveTransactions(prev => [newTx, ...prev])
    setCreditResult('Successfully matched and credited ' + parsedData.currency + ' ' + parsedData.amount.toLocaleString() + '!')
    setParsedData(null)
  }

  const handlePayoutDecision = (id: string, action: 'approve' | 'reject') => {
    setPayouts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: action === 'approve' ? 'approved' : 'rejected' }
      }
      return p
    }))
  }

  const handleWeightChange = (id: string, newWeight: number) => {
    setTerminals(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, weight: newWeight }
      }
      return t
    }))
  }

  const handleToggleTerminal = (id: string) => {
    setTerminals(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'online' ? 'offline' : 'online'
        const nextWeight = nextStatus === 'offline' ? 0 : 25
        return { ...t, status: nextStatus, weight: nextWeight }
      }
      return t
    }))
  }

  return (
    <div className="pt-20 pb-12 px-4 md:px-8 space-y-8 font-apple">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Operator Command</h1>
          <p className="text-text-secondary mt-1">Manual payout auditing, SMS-based transaction parsing, and router gateway terminal weights.</p>
        </div>
        <div className="flex items-center gap-2 bg-accent-blue/10 px-4 py-2 rounded-xl border border-accent-blue/20">
          <Radio size={16} className="text-accent-blue animate-pulse" />
          <span className="text-xs font-semibold text-accent-blue">Operator Terminal Live</span>
        </div>
      </div>

      {/* Operator KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">SMS Auto-Match Rate</p>
            <h3 className="text-2xl font-bold text-white mt-1">94.2%</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">Target matched (+0.5%)</p>
          </div>
          <div className="p-3.5 bg-accent-green/10 text-accent-green rounded-2xl">
            <MessageSquare size={24} />
          </div>
        </div>

        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Avg Manual Approval Time</p>
            <h3 className="text-2xl font-bold text-white mt-1">1.8 mins</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">SLA: &lt; 5.0 mins</p>
          </div>
          <div className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl">
            <Settings size={24} />
          </div>
        </div>

        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Active Terminal Load</p>
            <h3 className="text-2xl font-bold text-white mt-1">4 Terminals</h3>
            <p className="text-[10px] text-text-secondary mt-1">1 Backup Standby</p>
          </div>
          <div className="p-3.5 bg-accent-indigo/10 text-accent-indigo rounded-2xl">
            <Database size={24} />
          </div>
        </div>

        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Unmatched Deposits</p>
            <h3 className="text-2xl font-bold text-white mt-1">2 Alerts</h3>
            <p className="text-[10px] text-accent-red font-semibold mt-1">Action Required</p>
          </div>
          <div className="p-3.5 bg-accent-red/10 text-accent-red rounded-2xl">
            <ShieldAlert size={24} />
          </div>
        </div>
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Live processing queue & SMS parser */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* SMS Manual Match and Parsing Engine */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-accent-blue" />
                Mobile Banking SMS Parser Pipeline
              </h3>
              <p className="text-xs text-text-secondary">Parse raw SMS receipts from agent transactions and match them to deposits.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-secondary uppercase mb-2 block">Raw SMS Content</label>
                <textarea 
                  rows={3}
                  value={smsInput}
                  onChange={(e) => setSmsInput(e.target.value)}
                  className="input font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-text-secondary">Supported Banks: NBE, Fawry, Vodafone Cash, Meeza, Kuda.</span>
                <button 
                  onClick={handleParseSms}
                  disabled={isParsing}
                  className="btn text-xs py-2 bg-accent-blue shadow-[0_4px_12px_rgba(0,122,255,0.35)]"
                >
                  {isParsing ? 'Parsing SMS...' : 'Extract Transaction Data'}
                </button>
              </div>

              {creditResult && (
                <div className="bg-accent-green/15 border border-accent-green/30 text-accent-green text-xs font-semibold px-4 py-3 rounded-xl">
                  {creditResult}
                </div>
              )}

              {parsedData && (
                <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 space-y-4">
                  <span className="text-xs font-bold text-accent-blue uppercase tracking-wider block border-b border-white/[0.08] pb-2">Extracted Transaction Structure</span>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-text-secondary block">Transaction Amount</span>
                      <p className="font-bold text-white mt-0.5">{parsedData.currency} {parsedData.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Gateway Reference</span>
                      <p className="font-bold text-white mt-0.5 font-mono text-accent-orange">{parsedData.reference}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Depositor / Sender Name</span>
                      <p className="font-bold text-white mt-0.5">{parsedData.sender}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Parsing Engine</span>
                      <p className="font-bold text-white mt-0.5">{parsedData.gateway}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2 border-t border-white/[0.08]">
                    <button 
                      onClick={() => setParsedData(null)}
                      className="px-4 py-2 text-xs font-semibold text-text-secondary hover:text-white rounded-lg transition-colors"
                    >
                      Reset Parser
                    </button>
                    <button 
                      onClick={handleCreditTransaction}
                      className="px-4 py-2 text-xs font-semibold text-white bg-accent-green hover:bg-accent-green/90 rounded-lg shadow-lg flex items-center gap-1.5"
                    >
                      <Check size={14} /> Match and Credit Deposit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Monitor Queue */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Live Operations Traffic Monitor</h3>
              <p className="text-xs text-text-secondary">Real-time incoming payment transactions processed by OnTarget PSP router.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs font-bold text-text-secondary uppercase">
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Txn Reference</th>
                    <th className="pb-3">Merchant</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Gateway Path</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-xs">
                  {liveTransactions.map((tx) => (
                    <tr key={tx.id} className="table-row">
                      <td className="py-3.5 text-text-secondary">{tx.time}</td>
                      <td className="py-3.5 font-mono text-text-primary">{tx.id}</td>
                      <td className="py-3.5 text-text-primary font-semibold">{tx.merchant}</td>
                      <td className="py-3.5 font-bold text-white">{tx.currency} {tx.amount.toLocaleString()}</td>
                      <td className="py-3.5 text-text-secondary">{tx.gateway}</td>
                      <td className="py-3.5 text-right">
                        <span className={`badge ${
                          tx.status === 'completed' ? 'badge-success' : tx.status === 'processing' ? 'badge-pending' : 'badge-error'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payout Approvals Center & Routing Terminal weights */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Manual Payout Approval Center */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Payout Approval Dashboard</h3>
              <p className="text-xs text-text-secondary">Review and approve manual payout requests to partner bank accounts.</p>
            </div>

            <div className="space-y-4">
              {payouts.length === 0 ? (
                <div className="text-center py-10 text-text-tertiary">All pending payouts resolved.</div>
              ) : (
                payouts.map(pay => (
                  <div key={pay.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded uppercase">{pay.id}</span>
                        <h4 className="text-sm font-bold text-white mt-1.5">{pay.merchantName}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{pay.currency} {pay.amount.toLocaleString()}</p>
                        <span className="text-[10px] text-text-secondary">Requested {pay.timestamp}</span>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04] text-[11px] grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-text-secondary block">Destination Bank</span>
                        <span className="font-semibold text-text-primary">{pay.bankName}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary block">Account Info</span>
                        <span className="font-mono text-text-primary">{pay.accountNo}</span>
                      </div>
                    </div>

                    {pay.status === 'pending' ? (
                      <div className="flex gap-2 justify-end pt-1">
                        <button 
                          onClick={() => handlePayoutDecision(pay.id, 'reject')}
                          className="px-3 py-1.5 bg-accent-red/10 text-accent-red border border-accent-red/20 rounded-lg hover:bg-accent-red/25 transition-all text-xs font-semibold flex items-center gap-1"
                        >
                          <X size={12} /> Reject
                        </button>
                        <button 
                          onClick={() => handlePayoutDecision(pay.id, 'approve')}
                          className="px-3 py-1.5 bg-accent-green/10 text-accent-green border border-accent-green/20 rounded-lg hover:bg-accent-green/25 transition-all text-xs font-semibold flex items-center gap-1"
                        >
                          <Check size={12} /> Approve
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end pt-1">
                        <span className={`badge ${pay.status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                          {pay.status}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Router Terminal weights */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Terminal Traffic Splits</h3>
              <p className="text-xs text-text-secondary">Distribute transaction flows across available provider processing terminals.</p>
            </div>

            <div className="space-y-4 pt-2">
              {terminals.map(term => (
                <div key={term.id} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${term.status === 'online' ? 'bg-accent-green' : 'bg-text-tertiary'}`}></div>
                      <span className="font-semibold text-text-primary">{term.gateway}</span>
                    </div>
                    <button 
                      onClick={() => handleToggleTerminal(term.id)}
                      className="text-accent-blue font-bold hover:underline text-[10px]"
                    >
                      {term.status === 'online' ? 'Force Offline' : 'Set Online'}
                    </button>
                  </div>
                  {term.status === 'online' ? (
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={term.weight} 
                        onChange={(e) => handleWeightChange(term.id, parseInt(e.target.value))}
                        className="flex-1 accent-accent-blue bg-white/[0.1] h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs font-bold text-white font-mono min-w-8 text-right">{term.weight}%</span>
                    </div>
                  ) : (
                    <div className="bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg text-center text-text-tertiary text-xs">
                      Terminal is offline. Traffic bypassed.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
