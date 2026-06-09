import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Settings() {
  const { user, switchRole } = useAuth()
  const [settings, setSettings] = useState({
    apiKey: '••••••••••••••••••',
    webhookUrl: 'https://your-domain.com/webhooks',
    timezone: 'UTC',
    theme: 'dark',
  })

  const handleRoleSwitch = (role: any) => {
    switchRole(role)
  }

  return (
    <div className="pb-8 px-4 md:px-8 mx-auto w-full">
      <div className="space-y-8">
        <div>
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">Settings</h1>
          <p className="text-text-secondary">Manage system configuration and preferences</p>
        </div>

        {/* User Profile Section */}
        <div className="apple-surface rounded-2xl p-8">
          <h2 className="section-title">User Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">Name</label>
              <input type="text" value={user?.name} className="input" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">Email</label>
              <input type="email" value={user?.email} className="input" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">Role</label>
              <div className="flex gap-2">
                {['admin', 'operator', 'merchant', 'viewer'].map(role => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role as any)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      user?.role === role
                        ? 'bg-accent-blue text-white'
                        : 'bg-white/[0.08] text-text-secondary hover:bg-white/[0.12]'
                    }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="apple-surface rounded-2xl p-8">
          <h2 className="section-title">API Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">API Key</label>
              <input type="text" value={settings.apiKey} className="input" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">Webhook URL</label>
              <input type="text" value={settings.webhookUrl} className="input" />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="apple-surface rounded-2xl p-8">
          <h2 className="section-title">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">Timezone</label>
              <select value={settings.timezone} className="input">
                <option>UTC</option>
                <option>EST</option>
                <option>CST</option>
                <option>PST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">Theme</label>
              <select value={settings.theme} className="input">
                <option>Dark</option>
                <option>Light</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="btn w-full">Save Settings</button>
      </div>
    </div>
  )
}
