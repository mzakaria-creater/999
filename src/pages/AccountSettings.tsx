import { useLanguage } from '@/context/LanguageContext'
import { User, Lock, Bell, Shield, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function AccountSettings() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'compliance', label: 'Compliance', icon: Shield },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="glossy-card rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Account Settings</h1>
        <p className="text-text-secondary">Manage your OnTarget PSP account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-accent-blue text-white shadow-lg'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="glossy-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Profile Information</h2>
              <div className="space-y-6">
                {[
                  { label: 'Full Name', value: 'Ahmed Hassan' },
                  { label: 'Email', value: 'ahmed@ontarget.psp' },
                  { label: 'Company', value: 'OnTarget Payments' },
                  { label: 'Phone', value: '+20 100 123 4567' },
                  { label: 'Country', value: 'Egypt' },
                  { label: 'Role', value: 'Administrator' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-sm font-semibold text-text-secondary mb-2 block">{field.label}</label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="glossy-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Security Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-primary mb-4">Password</h3>
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary mb-3 focus:border-accent-blue focus:outline-none transition-colors"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary mb-3 focus:border-accent-blue focus:outline-none transition-colors"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
                />
                <button className="mt-4 bg-accent-blue text-white font-bold py-2 px-6 rounded-xl hover:brightness-110 transition-all">
                  Update Password
                </button>
              </div>

              <div className="border-t border-white/[0.08] pt-6">
                <h3 className="font-bold text-text-primary mb-4">Two-Factor Authentication</h3>
                <p className="text-text-secondary mb-4">Add an extra layer of security to your account</p>
                <button className="bg-accent-green text-black font-bold py-2 px-6 rounded-xl hover:brightness-110 transition-all">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="glossy-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { label: 'Transaction Alerts', desc: 'Get notified for large transactions' },
                { label: 'System Updates', desc: 'Receive platform maintenance notifications' },
                { label: 'Security Events', desc: 'Alert on suspicious activity' },
                { label: 'Compliance Reports', desc: 'Monthly compliance summaries' },
                { label: 'Payment Failures', desc: 'Instant notification of failed payments' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                  <div>
                    <p className="font-semibold text-text-primary">{item.label}</p>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6 accent-blue" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="glossy-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Compliance & Legal</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-primary mb-2">KYC Status</h3>
                <p className="text-accent-green font-semibold mb-4">✓ Verified</p>
                <p className="text-text-secondary text-sm">Last verified: 2024-06-01</p>
              </div>
              <div className="border-t border-white/[0.08] pt-6">
                <h3 className="font-bold text-text-primary mb-2">AML Compliance</h3>
                <p className="text-accent-green font-semibold mb-4">✓ Compliant</p>
                <p className="text-text-secondary text-sm">Next review: 2025-06-01</p>
              </div>
              <div className="border-t border-white/[0.08] pt-6">
                <h3 className="font-bold text-text-primary mb-4">Documents</h3>
                <button className="w-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-text-primary py-3 rounded-xl transition-colors">
                  Download Compliance Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
