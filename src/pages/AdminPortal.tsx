import { useState, useEffect } from 'react'
import { Server, Activity, Shield, Code, ToggleLeft, ToggleRight, Play, Copy, Check, RefreshCw } from 'lucide-react'

interface Gateway {
  id: string
  name: string
  provider: string
  type: 'deposit' | 'payout' | 'dual'
  status: 'active' | 'inactive' | 'testing'
  latency: number
  successRate: number
}

interface LogEntry {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR'
  module: string
  message: string
}

export default function AdminPortal() {
  const [gateways, setGateways] = useState<Gateway[]>([
    { id: 'gw-1', name: 'MENA Gateway Premium', provider: 'Fawry/Meeza', type: 'dual', status: 'active', latency: 112, successRate: 98.4 },
    { id: 'gw-2', name: 'Gulf Credit Express', provider: 'Checkout.com', type: 'deposit', status: 'active', latency: 145, successRate: 97.2 },
    { id: 'gw-3', name: 'Binance P2P Engine', provider: 'Binance API', type: 'dual', status: 'testing', latency: 290, successRate: 91.5 },
    { id: 'gw-4', name: 'Africa Mobile Collect', provider: 'Flutterwave', type: 'deposit', status: 'inactive', latency: 420, successRate: 85.0 },
    { id: 'gw-5', name: 'Instant Bank Payouts', provider: 'Direct Rails', type: 'payout', status: 'active', latency: 95, successRate: 99.1 }
  ])

  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '16:20:11', level: 'INFO', module: 'GATEWAY_ROUTER', message: 'Calculated optimal path for TXN-491 via Gulf Credit Express' },
    { timestamp: '16:20:15', level: 'INFO', module: 'AUTH_SERVICE', message: 'Token generated for merchant user MID-90112' },
    { timestamp: '16:20:23', level: 'WARN', module: 'BINANCE_P2P', message: 'High order book spread detected in EGP/USDT pairing (1.8%)' },
    { timestamp: '16:20:30', level: 'INFO', module: 'SMS_READER', message: 'Successfully parsed Fawry deposit confirmation sms ID: 22109' },
    { timestamp: '16:20:44', level: 'INFO', module: 'RECON_ENGINE', message: 'Reconciled batch #2241 with Meeza gateway' }
  ])

  const [webhookUrl, setWebhookUrl] = useState('https://api.merchant.com/v1/payments-webhook')
  const [webhookEvent, setWebhookEvent] = useState('payment.completed')
  const [webhookResponse, setWebhookResponse] = useState<any>(null)
  const [isSendingWebhook, setIsSendingWebhook] = useState(false)
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [copiedKey, setCopiedKey] = useState('')

  // Simulate console logs streaming
  useEffect(() => {
    const modules = ['GATEWAY_ROUTER', 'AUTH_SERVICE', 'RECON_ENGINE', 'SMS_READER', 'MULTI_WALLET', 'VAULT_API']
    const levels: ('INFO' | 'WARN' | 'ERROR')[] = ['INFO', 'INFO', 'INFO', 'WARN', 'ERROR']
    const messages = [
      'Cleared stale redis cache for gateway metadata',
      'Binance order updated: ID 908127 - status COMPLETED',
      'Transaction check completed for payout batch #882',
      'Gateway checkout load balancer health check returned 200 OK',
      'Rate limit reached for anonymous IP 195.12.84.92 (50 requests/min)',
      'Payout request queued: Merchant MID-2201 - Amount ₦120,000'
    ]

    const interval = setInterval(() => {
      const randomModule = modules[Math.floor(Math.random() * modules.length)]
      const randomLevel = levels[Math.floor(Math.random() * levels.length)]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const now = new Date()
      const timeStr = now.toTimeString().split(' ')[0]

      setLogs(prev => [
        { timestamp: timeStr, level: randomLevel, module: randomModule, message: randomMessage },
        ...prev.slice(0, 14)
      ])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const toggleGateway = (id: string) => {
    setGateways(prev => prev.map(gw => {
      if (gw.id === id) {
        const nextStatus: Gateway['status'] = gw.status === 'active' ? 'inactive' : 'active'
        return { ...gw, status: nextStatus }
      }
      return gw
    }))
  }

  const handleTestWebhook = () => {
    setIsSendingWebhook(true)
    setTimeout(() => {
      setWebhookResponse({
        status: 200,
        ok: true,
        body: {
          event: webhookEvent,
          timestamp: new Date().toISOString(),
          data: {
            id: 'txn_test_' + Math.random().toString(36).substring(7),
            amount: 750.00,
            currency: 'AED',
            status: 'completed',
            payment_gateway: 'Gulf Credit Express',
            reference: 'ref_90210'
          }
        }
      })
      setIsSendingWebhook(false)
    }, 1200)
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(''), 2000)
  }

  return (
    <div className="pt-20 pb-12 px-4 md:px-8 space-y-8 font-apple">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Operations</h1>
          <p className="text-text-secondary mt-1">Global settings, developer APIs, infrastructure health, and routing gateways.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/[0.04] px-4 py-2 rounded-xl border border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
          <span className="text-xs font-semibold text-text-primary">Sys Status: Operations Nominal</span>
        </div>
      </div>

      {/* System Telemetry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Overall API Latency</p>
            <h3 className="text-2xl font-bold text-white mt-1">142ms</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">↓ 8% than last hour</p>
          </div>
          <div className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl">
            <Server size={24} />
          </div>
        </div>

        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Database Lock Time</p>
            <h3 className="text-2xl font-bold text-white mt-1">0.02ms</h3>
            <p className="text-[10px] text-accent-green font-semibold mt-1">Optimal execution</p>
          </div>
          <div className="p-3.5 bg-accent-green/10 text-accent-green rounded-2xl">
            <Activity size={24} />
          </div>
        </div>

        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Queue Backlog</p>
            <h3 className="text-2xl font-bold text-white mt-1">0 Txns</h3>
            <p className="text-[10px] text-text-secondary mt-1">Realtime sync</p>
          </div>
          <div className="p-3.5 bg-accent-indigo/10 text-accent-indigo rounded-2xl">
            <Shield size={24} />
          </div>
        </div>

        <div className="apple-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Server CPU (Avg)</p>
            <h3 className="text-2xl font-bold text-white mt-1">34.8%</h3>
            <p className="text-[10px] text-accent-orange font-semibold mt-1">5 Nodes Active</p>
          </div>
          <div className="p-3.5 bg-accent-orange/10 text-accent-orange rounded-2xl">
            <Server size={24} />
          </div>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gateway Connections Management */}
        <div className="lg:col-span-7 space-y-6">
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Payment Routing Gateways</h3>
                <p className="text-xs text-text-secondary">Enable/Disable active network gateways and monitor response health.</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {gateways.map(gw => (
                <div key={gw.id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      gw.status === 'active' ? 'bg-accent-green' : gw.status === 'testing' ? 'bg-accent-orange' : 'bg-text-tertiary'
                    }`} />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{gw.name}</h4>
                      <p className="text-xs text-text-secondary">Provider: {gw.provider} | Latency: <span className="text-text-primary">{gw.latency}ms</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-text-secondary">Success Rate</span>
                      <p className="text-sm font-bold text-accent-blue">{gw.successRate}%</p>
                    </div>
                    <button 
                      onClick={() => toggleGateway(gw.id)} 
                      className="text-text-secondary hover:text-white transition-colors"
                      title={gw.status === 'active' ? 'Deactivate Gateway' : 'Activate Gateway'}
                    >
                      {gw.status === 'active' ? (
                        <ToggleRight size={36} className="text-accent-blue" />
                      ) : (
                        <ToggleLeft size={36} className="text-text-tertiary" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhook and API Sandbox */}
          <div className="apple-surface p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code size={18} className="text-accent-indigo" />
                Developer Webhook Sandbox
              </h3>
              <p className="text-xs text-text-secondary">Simulate network event payloads to integration targets.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase mb-2 block">Target Endpoint URL</label>
                  <input 
                    type="text" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="input text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase mb-2 block">Webhook Event Type</label>
                  <select 
                    value={webhookEvent}
                    onChange={(e) => setWebhookEvent(e.target.value)}
                    className="input text-sm bg-apple-gray5 border border-white/[0.08] text-white"
                  >
                    <option value="payment.completed">payment.completed</option>
                    <option value="payment.failed">payment.failed</option>
                    <option value="payout.approved">payout.approved</option>
                    <option value="payout.rejected">payout.rejected</option>
                    <option value="chargeback.disputed">chargeback.disputed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary">Secured with merchant endpoint verification token.</p>
                <button 
                  onClick={handleTestWebhook}
                  disabled={isSendingWebhook}
                  className="btn bg-accent-indigo shadow-[0_4px_12px_rgba(94,92,230,0.35)] hover:bg-accent-indigo/90 flex items-center gap-2 py-2 text-xs"
                >
                  <Play size={14} />
                  {isSendingWebhook ? 'Triggering...' : 'Fire Test Event'}
                </button>
              </div>

              {webhookResponse && (
                <div className="bg-apple-black rounded-xl p-4 border border-white/[0.08] font-mono text-[11px] overflow-hidden space-y-2">
                  <div className="flex justify-between items-center text-text-secondary border-b border-white/[0.08] pb-2 mb-2">
                    <span>Response Payload from endpoint:</span>
                    <span className="text-accent-green font-bold">HTTP 200 OK</span>
                  </div>
                  <pre className="text-accent-green overflow-x-auto max-h-48 leading-relaxed">
                    {JSON.stringify(webhookResponse.body, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Console Logs Ticker and Secret Credentials */}
        <div className="lg:col-span-5 space-y-6">
          {/* Secret API Keys Card */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield size={18} className="text-accent-orange" />
                API Credentials Access
              </h3>
              <p className="text-xs text-text-secondary">Manage and roll global authorization credentials.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-text-secondary">Production Publishable Key</span>
                  <span className="text-[10px] bg-accent-blue/15 text-accent-blue px-2 py-0.5 rounded font-mono">pk_live</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type={showApiKeys ? 'text' : 'password'} 
                    value="pk_live_22091873fb901ce87d00f653490212a" 
                    readOnly
                    className="input font-mono text-xs bg-white/[0.02] border-white/[0.08] py-2 flex-1"
                  />
                  <button 
                    onClick={() => handleCopyKey('pk_live_22091873fb901ce87d00f653490212a')}
                    className="p-2.5 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors border border-white/[0.08]"
                  >
                    {copiedKey === 'pk_live_22091873fb901ce87d00f653490212a' ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-semibold text-text-secondary">Production Secret Private Key</span>
                  <span className="text-[10px] bg-accent-red/15 text-accent-red px-2 py-0.5 rounded font-mono">sk_live</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type={showApiKeys ? 'text' : 'password'} 
                    value="sk_live_DUMMY_KEY" 
                    readOnly
                    className="input font-mono text-xs bg-white/[0.02] border-white/[0.08] py-2 flex-1"
                  />
                  <button 
                    onClick={() => handleCopyKey('sk_live_DUMMY_KEY')}
                    className="p-2.5 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors border border-white/[0.08]"
                  >
                    {copiedKey === 'sk_live_DUMMY_KEY' ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="text-xs font-bold text-accent-blue hover:underline"
                  >
                    {showApiKeys ? 'Hide Private Secret Keys' : 'Reveal Private Secret Keys'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* System Console Logs */}
          <div className="apple-surface p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server size={18} className="text-accent-green" />
                  Live Event Stream
                </h3>
                <p className="text-xs text-text-secondary">Simulated real-time audit stream of server-level occurrences.</p>
              </div>
              <button 
                onClick={() => setLogs([])}
                className="text-xs font-semibold text-text-secondary hover:text-white flex items-center gap-1.5"
              >
                <RefreshCw size={12} /> Clear Console
              </button>
            </div>

            <div className="bg-apple-black rounded-xl border border-white/[0.08] p-4 font-mono text-[10px] h-[340px] overflow-y-auto space-y-3 scrollbar-thin">
              {logs.length === 0 ? (
                <div className="text-text-tertiary text-center py-20">No events in stream log buffer.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex gap-2 leading-relaxed animate-apple-slide">
                    <span className="text-text-tertiary">[{log.timestamp}]</span>
                    <span className={`font-bold ${
                      log.level === 'ERROR' ? 'text-accent-red' : log.level === 'WARN' ? 'text-accent-orange' : 'text-accent-blue'
                    }`}>{log.level}</span>
                    <span className="text-accent-indigo">[{log.module}]</span>
                    <span className="text-text-primary flex-1 break-all">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
