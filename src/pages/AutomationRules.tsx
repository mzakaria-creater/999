import { useMemo, useState } from 'react'
import { Activity, Plus, Play, ShieldCheck, ToggleLeft, ToggleRight, Workflow } from 'lucide-react'

type RuleStatus = 'active' | 'testing' | 'paused'

interface AutomationRule {
  id: string
  name: string
  trigger: string
  action: string
  channel: string
  status: RuleStatus
  lastRun: string
  successRate: number
}

const INITIAL_RULES: AutomationRule[] = [
  {
    id: 'rule-ngpay-approval',
    name: 'ngpay Approval Gate',
    trigger: 'payout.created',
    action: 'approve payout batch',
    channel: 'ngpay',
    status: 'active',
    lastRun: '2 mins ago',
    successRate: 98.6,
  },
  {
    id: 'rule-auto-reconcile',
    name: 'Auto Reconcile Deposits',
    trigger: 'sms.parsed',
    action: 'match deposit and credit wallet',
    channel: 'internal',
    status: 'testing',
    lastRun: '11 mins ago',
    successRate: 95.2,
  },
  {
    id: 'rule-fallback-route',
    name: 'Fallback Routing',
    trigger: 'gateway.failed',
    action: 'route to backup provider',
    channel: 'router',
    status: 'active',
    lastRun: 'now',
    successRate: 99.1,
  },
]

export default function AutomationRules() {
  const [rules, setRules] = useState<AutomationRule[]>(INITIAL_RULES)
  const [form, setForm] = useState({
    name: '',
    trigger: 'payout.created',
    action: 'approve payout batch',
    channel: 'ngpay',
  })
  const [testingRuleId, setTestingRuleId] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<string>('')

  const activeCount = useMemo(() => rules.filter((rule) => rule.status === 'active').length, [rules])
  const testingCount = useMemo(() => rules.filter((rule) => rule.status === 'testing').length, [rules])

  const handleToggle = (id: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id
          ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
          : rule
      )
    )
  }

  const handleTest = (id: string) => {
    const rule = rules.find((item) => item.id === id)
    if (!rule) return

    setTestingRuleId(id)
    setTestResult('')

    setTimeout(() => {
      setTestingRuleId(null)
      setTestResult(`${rule.name} passed test for ${rule.trigger} with ${rule.channel}.`)
      setRules((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, lastRun: 'just now', status: item.status === 'paused' ? 'paused' : 'active' }
            : item
        )
      )
    }, 900)
  }

  const handleAddRule = () => {
    if (!form.name.trim()) return

    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: form.name.trim(),
      trigger: form.trigger,
      action: form.action,
      channel: form.channel,
      status: 'testing',
      lastRun: 'never',
      successRate: 0,
    }

    setRules((prev) => [newRule, ...prev])
    setForm({
      name: '',
      trigger: 'payout.created',
      action: 'approve payout batch',
      channel: 'ngpay',
    })
    setTestResult(`${newRule.name} added and queued for testing.`)
  }

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        <div className="animate-slide-down">
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <Workflow size={36} /> Automation Rules
          </h1>
          <p className="text-text-secondary">
            Configure and test ngpay approvals, payout actions, and automation triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-down" style={{ animationDelay: '0.05s' }}>
          <div className="apple-surface rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-text-secondary font-bold mb-2">Active Rules</div>
            <div className="text-3xl font-bold text-text-primary">{activeCount}</div>
          </div>
          <div className="apple-surface rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-text-secondary font-bold mb-2">Testing Queue</div>
            <div className="text-3xl font-bold text-text-primary">{testingCount}</div>
          </div>
          <div className="apple-surface rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-text-secondary font-bold mb-2">ngpay Ready</div>
            <div className="text-3xl font-bold text-accent-green">Yes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
          <div className="lg:col-span-4 apple-surface rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Plus size={18} className="text-accent-blue" />
              <h2 className="text-xl font-bold text-text-primary">Add Rule</h2>
            </div>

            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Rule name"
              className="input"
            />
            <input
              value={form.trigger}
              onChange={(e) => setForm((prev) => ({ ...prev, trigger: e.target.value }))}
              placeholder="Trigger"
              className="input"
            />
            <input
              value={form.action}
              onChange={(e) => setForm((prev) => ({ ...prev, action: e.target.value }))}
              placeholder="Action"
              className="input"
            />
            <select
              value={form.channel}
              onChange={(e) => setForm((prev) => ({ ...prev, channel: e.target.value }))}
              className="input bg-apple-gray5"
            >
              <option value="ngpay">ngpay</option>
              <option value="router">router</option>
              <option value="internal">internal</option>
              <option value="webhook">webhook</option>
            </select>

            <button onClick={handleAddRule} className="btn w-full flex items-center justify-center gap-2">
              <ShieldCheck size={18} />
              Create & Queue Test
            </button>

            {testResult && (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm text-text-secondary">
                {testResult}
              </div>
            )}
          </div>

          <div className="lg:col-span-8 space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="apple-surface rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-text-primary">{rule.name}</h3>
                      <span className={`badge ${rule.status === 'active' ? 'badge-success' : rule.status === 'testing' ? 'badge-pending' : 'badge-error'}`}>
                        {rule.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Trigger: <span className="text-text-primary">{rule.trigger}</span>
                    </p>
                    <p className="text-sm text-text-secondary">
                      Action: <span className="text-text-primary">{rule.action}</span>
                    </p>
                    <p className="text-sm text-text-secondary">
                      Channel: <span className="text-text-primary">{rule.channel}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Activity size={16} className="text-accent-blue" />
                      Success {rule.successRate ? `${rule.successRate}%` : 'pending'}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTest(rule.id)}
                        className="btn-secondary flex items-center gap-2 px-4 py-2"
                        disabled={testingRuleId === rule.id}
                      >
                        <Play size={16} />
                        {testingRuleId === rule.id ? 'Testing...' : 'Test Rule'}
                      </button>
                      <button
                        onClick={() => handleToggle(rule.id)}
                        className="text-text-secondary hover:text-white transition-colors"
                        title={rule.status === 'active' ? 'Pause Rule' : 'Activate Rule'}
                      >
                        {rule.status === 'active' ? <ToggleRight size={30} className="text-accent-green" /> : <ToggleLeft size={30} />}
                      </button>
                    </div>
                    <div className="text-xs text-text-secondary">Last run: {rule.lastRun}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
