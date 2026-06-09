import { useLanguage } from '@/context/LanguageContext'
import { Settings, Play, Pause, Plus, ArrowRight } from 'lucide-react'

export default function N8nIntegration() {
  const { t } = useLanguage()

  const workflows = [
    {
      name: 'Payment Webhook Processor',
      status: 'active',
      executions: 24580,
      lastRun: '2 minutes ago',
      triggers: ['webhook', 'schedule'],
    },
    {
      name: 'Compliance Report Generator',
      status: 'active',
      executions: 156,
      lastRun: '1 hour ago',
      triggers: ['schedule'],
    },
    {
      name: 'Fraud Detection Pipeline',
      status: 'active',
      executions: 5823,
      lastRun: 'now',
      triggers: ['webhook', 'cron'],
    },
    {
      name: 'Invoice Email Sender',
      status: 'paused',
      executions: 8942,
      lastRun: '3 days ago',
      triggers: ['webhook'],
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-text-primary">n8n Automation</h1>
          <p className="text-text-secondary mt-2">Manage workflow automation and integrations</p>
        </div>
        <button className="flex items-center gap-2 bg-accent-blue text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all">
          <Plus size={20} /> New Workflow
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Workflows', value: '3', color: 'accent-green' },
          { label: 'Total Executions', value: '39,501', color: 'accent-blue' },
          { label: 'Error Rate', value: '0.3%', color: 'accent-orange' },
        ].map((stat, idx) => (
          <div key={idx} className="glossy-card rounded-2xl p-6">
            <p className="text-text-secondary text-sm font-semibold mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Workflows */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">Workflows</h2>
        {workflows.map((workflow) => (
          <div key={workflow.name} className="glossy-card rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-text-primary">{workflow.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      workflow.status === 'active'
                        ? 'bg-accent-green/20 text-accent-green'
                        : 'bg-accent-orange/20 text-accent-orange'
                    }`}
                  >
                    {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">Last run: {workflow.lastRun}</p>
              </div>
              <button className="text-accent-blue hover:text-accent-blue/80">
                <Settings size={24} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/[0.08]">
              <div>
                <p className="text-text-secondary text-xs mb-1">Executions</p>
                <p className="text-xl font-bold text-text-primary">{workflow.executions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Triggers</p>
                <p className="text-sm text-text-primary">{workflow.triggers.join(', ')}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button className={`p-2 rounded-lg transition-colors ${
                  workflow.status === 'active'
                    ? 'bg-accent-orange/20 text-accent-orange hover:bg-accent-orange/30'
                    : 'bg-accent-green/20 text-accent-green hover:bg-accent-green/30'
                }`}>
                  {workflow.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button className="p-2 rounded-lg bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connection Status */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">n8n Instance</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
            <span className="text-text-secondary">Host</span>
            <span className="text-text-primary font-semibold">n8n.ontarget.local</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
            <span className="text-text-secondary">Status</span>
            <span className="text-accent-green font-semibold">Connected</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Version</span>
            <span className="text-text-primary font-semibold">1.48.2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
