import { useLanguage } from '@/context/LanguageContext'
import { Lock, Key, Unlock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function Vault() {
  const { t } = useLanguage()
  const [showSecrets, setShowSecrets] = useState(false)

  const secrets = [
    { name: 'API_KEY_MAIN', masked: 'sk_live_****bcd1234', value: 'sk_live_xxxxxxxxxxbcd1234' },
    { name: 'BINANCE_SECRET', masked: '****j9k8l7m6n5o4', value: 'abcdefghj9k8l7m6n5o4' },
    { name: 'WEBHOOK_SECRET', masked: '****wxyz9876', value: 'abcdefghwxyz9876' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-text-primary">Secret Vault</h1>
          <p className="text-text-secondary mt-2">Securely store and manage API keys and secrets</p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="glossy-card rounded-2xl p-6 border border-accent-orange/20 bg-accent-orange/5">
        <div className="flex gap-4">
          <Lock className="text-accent-orange flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-text-primary mb-1">Encryption at Rest</h3>
            <p className="text-sm text-text-secondary">All secrets are encrypted with AES-256. Only authorized users can view decrypted values.</p>
          </div>
        </div>
      </div>

      {/* Toggle View */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary">Stored Secrets ({secrets.length})</h2>
        <button
          onClick={() => setShowSecrets(!showSecrets)}
          className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-text-primary px-4 py-2 rounded-xl transition-colors"
        >
          {showSecrets ? <EyeOff size={18} /> : <Eye size={18} />}
          {showSecrets ? 'Hide' : 'Show'} Values
        </button>
      </div>

      {/* Secrets List */}
      <div className="space-y-4">
        {secrets.map((secret) => (
          <div key={secret.name} className="glossy-card rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Key size={20} className="text-accent-blue" />
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{secret.name}</h3>
                  <p className="text-text-secondary text-sm">Created 2024-05-15</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-accent-green/20 text-accent-green rounded-full text-xs font-bold">
                Active
              </span>
            </div>

            <div className="bg-white/[0.02] rounded-lg p-4 font-mono text-sm text-text-secondary">
              {showSecrets ? secret.value : secret.masked}
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-accent-blue/20 text-accent-blue font-bold py-2 rounded-lg hover:bg-accent-blue/30 transition-colors">
                Copy
              </button>
              <button className="flex-1 bg-white/[0.05] text-text-primary font-bold py-2 rounded-lg hover:bg-white/[0.1] transition-colors">
                Rotate
              </button>
              <button className="flex-1 bg-accent-red/20 text-accent-red font-bold py-2 rounded-lg hover:bg-accent-red/30 transition-colors">
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Secret */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">Add New Secret</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Secret Name (e.g., API_KEY_BACKUP)"
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors"
          />
          <textarea
            placeholder="Secret Value (will be encrypted)"
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none transition-colors h-24 resize-none"
          />
          <button className="w-full bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all">
            Add Secret
          </button>
        </div>
      </div>
    </div>
  )
}
