import { useLanguage } from '@/context/LanguageContext'
import { Activity, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function BinanceAPI() {
  const { t } = useLanguage()
  const [connected, setConnected] = useState(true)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text-primary">Binance API Integration</h1>
        <p className="text-text-secondary mt-2">Connect and manage Binance payment services</p>
      </div>

      {/* Connection Status */}
      <div className={`glossy-card rounded-2xl p-6 border ${
        connected ? 'border-accent-green/20 bg-accent-green/5' : 'border-accent-red/20 bg-accent-red/5'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-1">Connection Status</h3>
            <p className={`font-semibold ${connected ? 'text-accent-green' : 'text-accent-red'}`}>
              {connected ? '✓ Connected' : '✗ Disconnected'}
            </p>
          </div>
          <Activity size={32} className={connected ? 'text-accent-green' : 'text-accent-red'} />
        </div>
      </div>

      {/* API Keys Configuration */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-text-primary mb-6">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-text-secondary mb-2 block">API Key</label>
            <input
              type="password"
              placeholder="Enter your Binance API Key"
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
            />
            <p className="text-xs text-text-secondary mt-2">Store securely in Vault after connecting</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-text-secondary mb-2 block">Secret Key</label>
            <input
              type="password"
              placeholder="Enter your Binance Secret Key"
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
            />
          </div>
          <button className="w-full bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all">
            Save & Connect
          </button>
        </div>
      </div>

      {/* Trading Limits */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-text-primary mb-6">Trading Limits</h3>
        <div className="space-y-4">
          {[
            { label: 'Daily Volume Limit', value: '100,000 USDT', status: 'warning' },
            { label: 'Single Trade Limit', value: '50,000 USDT', status: 'healthy' },
            { label: 'Withdrawal Limit', value: '25,000 USDT/day', status: 'healthy' },
          ].map((limit, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 bg-white/[0.03] rounded-xl">
              <div>
                <p className="font-semibold text-text-primary">{limit.label}</p>
                <p className="text-sm text-text-secondary">{limit.value}</p>
              </div>
              <span className={`text-sm font-bold ${
                limit.status === 'warning' ? 'text-accent-orange' : 'text-accent-green'
              }`}>
                {limit.status === 'warning' ? '⚠️ 80% used' : '✓ Normal'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Balance */}
      <div className="glossy-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-text-primary">Account Balance</h3>
          <button className="text-accent-blue hover:text-accent-blue/80">
            <RefreshCw size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { asset: 'USDT', balance: '50,234.50', change: '+2.3%' },
            { asset: 'BUSD', balance: '15,890.00', change: '-0.8%' },
            { asset: 'BNB', balance: '12.5', change: '+5.2%' },
          ].map((asset, idx) => (
            <div key={idx} className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <div>
                <p className="font-semibold text-text-primary">{asset.asset}</p>
                <p className="text-text-secondary text-sm">{asset.balance}</p>
              </div>
              <span className="text-accent-green font-bold">{asset.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* API Activity */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-text-primary mb-4">Recent API Activity</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {[
            { action: 'Login', ip: '192.168.1.1', time: '2 minutes ago' },
            { action: 'Trade Executed', ip: '192.168.1.1', time: '15 minutes ago' },
            { action: 'Balance Check', ip: '192.168.1.1', time: '1 hour ago' },
            { action: 'Settings Updated', ip: '192.168.1.1', time: '3 hours ago' },
          ].map((log, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 text-sm">
              <span className="text-text-primary font-semibold">{log.action}</span>
              <div className="text-right">
                <p className="text-text-secondary text-xs">{log.ip}</p>
                <p className="text-text-tertiary text-xs">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
