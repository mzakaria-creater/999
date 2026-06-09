import { useState } from 'react'
import { MessageCircle, Bell, Settings, Copy, CheckCircle2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function TelegramSettings() {
  const { t, dir } = useLanguage()
  const [telegramConnected, setTelegramConnected] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const [copied, setCopied] = useState(false)

  const [notificationSettings, setNotificationSettings] = useState({
    paymentConfirmation: true,
    transactionAlert: true,
    settlementSummary: true,
    dailyReport: false,
    weeklyReport: true,
    merchantAlert: true,
    failedPayment: true,
  })

  const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN'
  const BOT_USERNAME = process.env.REACT_APP_TELEGRAM_BOT_USERNAME || 'ontarget_psp_bot'

  const handleCopyBotLink = () => {
    navigator.clipboard.writeText(`https://t.me/${BOT_USERNAME}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleConnect = () => {
    // Open Telegram bot in new window
    window.open(`https://t.me/${BOT_USERNAME}`, '_blank')
    setTelegramConnected(true)
  }

  return (
    <div className="p-6 space-y-8" dir={dir}>
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">Telegram Integration</h1>
        <p className="text-text-secondary">Connect your Telegram account to receive payment notifications</p>
      </div>

      {/* Connection Status */}
      <div className={`glossy-card rounded-2xl p-8 border-l-4 ${
        telegramConnected ? 'border-accent-green bg-accent-green/5' : 'border-accent-orange bg-accent-orange/5'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {telegramConnected ? (
              <CheckCircle2 size={32} className="text-accent-green mt-1" />
            ) : (
              <AlertCircle size={32} className="text-accent-orange mt-1" />
            )}
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {telegramConnected ? 'Connected' : 'Not Connected'}
              </h3>
              <p className="text-text-secondary mb-4">
                {telegramConnected
                  ? 'Your Telegram account is connected and receiving notifications'
                  : 'Connect your Telegram account to start receiving payment notifications'}
              </p>
              {telegramConnected ? (
                <div className="space-y-1">
                  <p className="text-sm text-text-secondary">
                    Username: <span className="font-semibold text-text-primary">{userName || 'Not set'}</span>
                  </p>
                  <p className="text-sm text-text-secondary">
                    User ID: <span className="font-semibold text-text-primary">{userId || 'Not set'}</span>
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="bg-accent-blue text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <MessageCircle size={20} /> Connect Telegram
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bot Information */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-text-primary mb-6">Bot Information</h3>
        <div className="space-y-4">
          <div>
            <p className="text-text-secondary text-sm mb-2">Bot Username</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={`@${BOT_USERNAME}`}
                readOnly
                className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary focus:outline-none"
              />
              <button
                onClick={handleCopyBotLink}
                className="bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 p-3 rounded-xl transition-colors"
              >
                <Copy size={20} />
              </button>
            </div>
            {copied && <p className="text-xs text-accent-green mt-1">Copied to clipboard!</p>}
          </div>

          <div>
            <p className="text-text-secondary text-sm mb-2">API Features (Bot API 10.0)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '👤', name: 'Guest Mode', desc: 'Notifications without being in chat' },
                { icon: '📊', name: 'Polls with Media', desc: 'Interactive payment confirmations' },
                { icon: '📸', name: 'Live Photos', desc: 'Receipt photos with videos' },
                { icon: '🤖', name: 'Bot-to-Bot', desc: 'Merchant communication' },
                { icon: '⚡', name: 'Draft Messages', desc: 'Review before sending' },
                { icon: '😊', name: 'Reactions', desc: 'Message reactions support' },
              ].map((feature) => (
                <div key={feature.name} className="bg-white/[0.03] rounded-lg p-4">
                  <p className="text-2xl mb-2">{feature.icon}</p>
                  <p className="font-semibold text-text-primary mb-1">{feature.name}</p>
                  <p className="text-xs text-text-secondary">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      {telegramConnected && (
        <div className="glossy-card rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <Bell size={24} /> Notification Preferences
          </h3>

          <div className="space-y-4">
            {[
              {
                key: 'paymentConfirmation',
                label: 'Payment Confirmations',
                description: 'Get notified when payments are approved or rejected',
              },
              {
                key: 'transactionAlert',
                label: 'Transaction Alerts',
                description: 'Real-time alerts for all transactions',
              },
              {
                key: 'settlementSummary',
                label: 'Settlement Summary',
                description: 'Daily settlement reports',
              },
              {
                key: 'dailyReport',
                label: 'Daily Reports',
                description: 'Complete daily transaction reports',
              },
              {
                key: 'weeklyReport',
                label: 'Weekly Reports',
                description: 'Comprehensive weekly analytics',
              },
              {
                key: 'merchantAlert',
                label: 'Merchant Alerts',
                description: 'Alerts from connected merchant bots',
              },
              {
                key: 'failedPayment',
                label: 'Failed Payment Alerts',
                description: 'Urgent notifications for failed transactions',
              },
            ].map((notification) => (
              <div key={notification.key} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg">
                <div>
                  <p className="font-semibold text-text-primary">{notification.label}</p>
                  <p className="text-sm text-text-secondary">{notification.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(notification.key as keyof typeof notificationSettings)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    notificationSettings[notification.key as keyof typeof notificationSettings]
                      ? 'bg-accent-green'
                      : 'bg-white/[0.1]'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      notificationSettings[notification.key as keyof typeof notificationSettings]
                        ? 'translate-x-7'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-accent-blue text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all">
            Save Preferences
          </button>
        </div>
      )}

      {/* API Documentation */}
      <div className="glossy-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <Settings size={24} /> API Documentation
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-text-primary mb-3">Payment Confirmation Message</h4>
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-lg p-4 font-mono text-sm text-text-secondary">
              {`✅ Payment APPROVED\n\nTransaction ID: txn_1234567890\nMerchant: Ahmed Electronics\nAmount: ₹5,000\nTime: 2026-06-09 14:30:00\n\nStatus: Approved\n\n[View Details] [Track Payment]`}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-3">Guest Mode Notification</h4>
            <p className="text-text-secondary text-sm mb-3">
              Even if you're not in the bot's chat, you'll receive payment notifications through Telegram's guest mode.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-3">Supported Features</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>✅ Real-time payment confirmations</li>
              <li>✅ Interactive polls for confirmations</li>
              <li>✅ Live photos of receipts</li>
              <li>✅ Bot-to-bot merchant communication</li>
              <li>✅ Draft messages for review</li>
              <li>✅ Message reactions</li>
              <li>✅ Inline keyboard buttons</li>
              <li>✅ Markdown formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
