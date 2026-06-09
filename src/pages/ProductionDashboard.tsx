import { useState } from 'react'
import { MapPin, Zap, Shield, TrendingUp, Activity, BarChart3, AlertCircle, CheckCircle2, Gauge } from 'lucide-react'

interface LiveTerminal {
  id: string
  gateway: string
  status: 'settlement' | 'auth' | 'confirmed' | 'failed'
  amount: number
  timestamp: string
  merchant: string
  color: string
}

interface GatewayStatus {
  name: string
  uptime: number
  color: string
  requests_sec: number
  latency: number
}

export default function ProductionDashboard() {
  const [liveTerminals, setLiveTerminals] = useState<LiveTerminal[]>([
    {
      id: 'TRM-A1',
      gateway: 'Vodafone',
      status: 'settlement',
      amount: 4500,
      timestamp: 'JUST NOW',
      merchant: 'Cairo Retail Co',
      color: '#e60000',
    },
    {
      id: 'TRM-B4',
      gateway: 'Etisalat',
      status: 'auth',
      amount: 12250,
      timestamp: '2S AGO',
      merchant: 'Alexandria Trade',
      color: '#76b82a',
    },
    {
      id: 'TRM-A9',
      gateway: 'WE Pay',
      status: 'confirmed',
      amount: 850,
      timestamp: '5S AGO',
      merchant: 'Giza Services',
      color: '#4b2e83',
    },
    {
      id: 'TRM-C2',
      gateway: 'InstaPay',
      status: 'settlement',
      amount: 7650,
      timestamp: '8S AGO',
      merchant: 'Dubai Corp',
      color: '#0066cc',
    },
  ])

  const gateways: GatewayStatus[] = [
    { name: 'Vodafone Cash', uptime: 99.9, color: '#e60000', requests_sec: 4200, latency: 1.2 },
    { name: 'Etisalat Cash', uptime: 99.7, color: '#76b82a', requests_sec: 3100, latency: 1.8 },
    { name: 'WE Pay', uptime: 98.2, color: '#4b2e83', requests_sec: 2400, latency: 2.5 },
    { name: 'InstaPay', uptime: 99.5, color: '#0066cc', requests_sec: 3800, latency: 1.4 },
  ]

  const regions = [
    { name: 'Cairo', traffic: 2400, color: 'from-accent-blue to-accent-blue/50' },
    { name: 'New Cairo', traffic: 4100, color: 'from-accent-green to-accent-green/50' },
    { name: 'Alexandria', traffic: 1800, color: 'from-accent-orange to-accent-orange/50' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settlement':
        return 'text-accent-green'
      case 'auth':
        return 'text-accent-blue'
      case 'confirmed':
        return 'text-accent-green'
      case 'failed':
        return 'text-accent-red'
      default:
        return 'text-text-secondary'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'settlement':
        return 'bg-accent-green/10'
      case 'auth':
        return 'bg-accent-blue/10'
      case 'confirmed':
        return 'bg-accent-green/10'
      case 'failed':
        return 'bg-accent-red/10'
      default:
        return 'bg-white/5'
    }
  }

  const totalVolume = 42891204.5
  const successRate = 99.45
  const activeGateways = 4

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full slide-in-up">
      <div className="space-y-8">
        {/* Hero Header */}
        <header className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stagger-item">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
              <span className="text-xs font-bold text-accent-green uppercase tracking-wider">
                Live Production Network
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">OnTarget PSP</h1>
            <p className="text-text-secondary mt-2">Real-time payment network across MENA</p>
          </div>

          <div className="glossy-card p-6 rounded-2xl text-right stagger-item">
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">TOTAL VOLUME (24H)</p>
            <p className="text-3xl md:text-4xl font-bold text-text-primary">
              ₦{(totalVolume / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-accent-blue mt-2">Across 4 gateway providers</p>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - System Health */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Health Monitor */}
            <div className="glossy-card p-6 rounded-2xl stagger-item">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-primary">System Health</h3>
                <Shield size={24} className="text-accent-green" />
              </div>

              <div className="space-y-4">
                {/* Liquidity Pool */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/[0.08]">
                  <p className="text-xs font-bold text-accent-blue uppercase mb-2">Liquidity Pool</p>
                  <p className="text-lg font-bold text-text-primary mb-3">98.4% Capacity</p>
                  <div className="w-full bg-apple-gray5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent-green h-2 rounded-full shadow-lg"
                      style={{
                        width: '98%',
                        boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                      }}
                    />
                  </div>
                </div>

                {/* Settlement Engine */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-accent-blue uppercase">Settlement Engine</p>
                    <CheckCircle2 size={16} className="text-accent-green" />
                  </div>
                  <p className="text-sm text-text-primary font-semibold">NOMINAL (14ms Latency)</p>
                </div>

                {/* Gateway Redundancy */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-accent-blue uppercase">Gateway Redundancy</p>
                    <Activity size={16} className="text-accent-orange" />
                  </div>
                  <p className="text-sm text-text-primary font-semibold">ACTIVE / ACTIVE</p>
                </div>
              </div>
            </div>

            {/* Gateway Performance */}
            <div className="glossy-card p-6 rounded-2xl stagger-item">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Gateway Live</h3>
              <div className="space-y-5">
                {gateways.map((gateway) => (
                  <div key={gateway.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                          style={{
                            backgroundColor: `${gateway.color}20`,
                            borderColor: `${gateway.color}30`,
                            border: `1px solid ${gateway.color}30`,
                          }}
                        >
                          {gateway.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{gateway.name}</p>
                          <p className="text-xs text-text-secondary">{gateway.requests_sec} req/sec</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-accent-green">{gateway.uptime}%</span>
                    </div>
                    <div className="w-full bg-apple-gray5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${gateway.uptime}%`,
                          backgroundColor: gateway.color,
                          boxShadow: `0 0 8px ${gateway.color}80`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Live Traffic Map & Table */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Live Traffic Hub */}
            <div className="glossy-card rounded-2xl overflow-hidden stagger-item relative min-h-80">
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                  <MapPin size={24} className="text-accent-blue" /> Live Traffic Hub
                </h3>
                <p className="text-sm text-text-secondary">Monitoring MENA Core Network</p>
              </div>

              {/* Map Background Visualization */}
              <div
                className="w-full h-80 bg-gradient-to-br from-accent-blue/10 to-accent-orange/10 relative overflow-hidden"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 40%, rgba(0,122,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,159,10,0.1) 0%, transparent 50%)',
                }}
              >
                {/* Hotspot Indicators */}
                {regions.map((region, idx) => (
                  <div
                    key={idx}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${30 + idx * 20}%`,
                      top: `${40 + idx * 10}%`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full border-2 animate-pulse flex items-center justify-center text-white font-bold"
                      style={{
                        borderColor: region.color.split(' ')[1],
                        boxShadow: `0 0 20px ${region.color.split(' ')[1]}80`,
                      }}
                    >
                      {region.traffic / 1000}k
                    </div>
                    <p className="text-xs text-text-secondary mt-2 font-semibold">{region.name}</p>
                  </div>
                ))}
              </div>

              {/* Hotspot Stats Bottom */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
                {regions.map((region) => (
                  <div key={region.name} className="glossy-card p-4 rounded-lg">
                    <p className="text-xs font-bold text-accent-blue uppercase mb-1">Hotspot: {region.name}</p>
                    <p className="text-sm font-bold text-text-primary">{region.traffic / 1000}k req/sec</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Terminals Table */}
            <div className="glossy-card rounded-2xl overflow-hidden stagger-item">
              <div className="p-6 border-b border-white/[0.08] flex justify-between items-center">
                <h3 className="text-2xl font-bold text-text-primary">Live Terminals</h3>
                <button className="text-accent-blue text-xs font-bold uppercase px-4 py-2 rounded border border-accent-blue/30 hover:bg-accent-blue/10 transition-all">
                  View All Activity
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/[0.08]">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Terminal ID
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Gateway
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08]">
                    {liveTerminals.map((terminal) => (
                      <tr key={terminal.id} className="hover:bg-white/[0.05] transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-text-primary">{terminal.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="px-3 py-1 text-xs font-bold rounded text-white"
                            style={{
                              backgroundColor: `${terminal.color}20`,
                              color: terminal.color,
                              border: `1px solid ${terminal.color}40`,
                            }}
                          >
                            {terminal.gateway.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 text-xs font-semibold ${getStatusColor(terminal.status)}`}>
                            <div className={`w-2 h-2 rounded-full ${terminal.status === 'settlement' || terminal.status === 'confirmed' ? 'animate-pulse' : ''}`}
                                 style={{
                                   backgroundColor: terminal.status === 'settlement' ? '#10b981' :
                                                  terminal.status === 'confirmed' ? '#10b981' :
                                                  terminal.status === 'auth' ? '#0066cc' : '#ef4444'
                                 }} />
                            {terminal.status === 'settlement' && 'Settlement in Progress'}
                            {terminal.status === 'auth' && 'Awaiting Auth'}
                            {terminal.status === 'confirmed' && 'Confirmed'}
                            {terminal.status === 'failed' && 'Failed'}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-text-primary text-sm">
                          ₦{terminal.amount.toLocaleString()}.00
                        </td>
                        <td className="px-6 py-4 text-xs text-text-secondary text-right">{terminal.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glossy-card p-6 rounded-2xl text-center stagger-item">
            <Gauge size={32} className="mx-auto mb-4 text-accent-blue" />
            <p className="text-xs font-bold text-text-secondary uppercase mb-2">Success Rate</p>
            <p className="text-4xl font-bold text-text-primary">{successRate}%</p>
          </div>
          <div className="glossy-card p-6 rounded-2xl text-center stagger-item">
            <TrendingUp size={32} className="mx-auto mb-4 text-accent-green" />
            <p className="text-xs font-bold text-text-secondary uppercase mb-2">Active Providers</p>
            <p className="text-4xl font-bold text-text-primary">{activeGateways}</p>
          </div>
          <div className="glossy-card p-6 rounded-2xl text-center stagger-item glow-effect">
            <Zap size={32} className="mx-auto mb-4 text-accent-orange" />
            <p className="text-xs font-bold text-text-secondary uppercase mb-2">System Status</p>
            <p className="text-4xl font-bold text-accent-green">NOMINAL</p>
          </div>
        </div>

        {/* FAB Button */}
        <div className="fixed bottom-8 right-8 floating">
          <button className="w-16 h-16 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-lg glow-effect hover:scale-110 transition-transform">
            <Zap size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}
