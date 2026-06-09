import { useLanguage } from '@/context/LanguageContext'
import { Menu, X, Globe, Bell, Settings, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  onMenuToggle?: (open: boolean) => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { language, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [notifDropdown, setNotifDropdown] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const navigate = useNavigate()

  const notifications = [
    { id: 1, message: 'Transaction approved: ₦50,000 deposit', time: '5 minutes ago', read: false },
    { id: 2, message: 'Wallet balance warning for UAE pool', time: '1 hour ago', read: false },
    { id: 3, message: 'Monthly compliance report ready', time: '3 hours ago', read: true },
  ]

  const handleMenuToggle = () => {
    const newState = !menuOpen
    setMenuOpen(newState)
    onMenuToggle?.(newState)
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'LTR' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'RTL' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-apple-gray6 border-b border-white/[0.06] flex items-center px-4 md:px-8 z-50 shadow-apple-inset">
      {/* Mobile Menu Button */}
      <button
        onClick={handleMenuToggle}
        className="md:hidden p-2 hover:bg-white/[0.08] rounded-lg transition-colors mr-2 flex-shrink-0"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Logo */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xs md:text-sm font-semibold tracking-tight text-white font-apple truncate">
          OnTarget PSP
        </h1>
        <p className="text-[10px] text-text-secondary hidden sm:block">{language === 'en' ? 'Payment Service Provider' : 'مزود خدمات الدفع'}</p>
      </div>

      {/* Notification Bell */}
      <div className="relative flex-shrink-0 mx-2">
        <button
          onClick={() => setNotifDropdown(!notifDropdown)}
          className="p-2 hover:bg-white/[0.08] rounded-lg transition-colors relative"
        >
          <Bell size={20} className="text-text-secondary hover:text-accent-blue" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
          )}
        </button>

        {/* Notification Dropdown */}
        {notifDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-apple-gray6 border border-white/[0.08] rounded-lg shadow-lg overflow-hidden z-50 min-w-80">
            <div className="p-4 border-b border-white/[0.08]">
              <h3 className="font-bold text-text-primary">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => setNotifDropdown(false)}
                  className="w-full px-4 py-3 text-left hover:bg-white/[0.05] transition-colors border-b border-white/[0.06] last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${notif.read ? 'bg-transparent' : 'bg-accent-blue'}`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{notif.message}</p>
                      <p className="text-xs text-text-secondary mt-1">{notif.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button className="w-full px-4 py-3 text-center text-sm text-accent-blue hover:bg-white/[0.05] font-semibold border-t border-white/[0.08]">
              View All
            </button>
          </div>
        )}
      </div>

      {/* Profile Menu */}
      <div className="relative flex-shrink-0 mx-2">
        <button
          onClick={() => setProfileDropdown(!profileDropdown)}
          className="flex items-center gap-2 p-1 hover:bg-white/[0.08] rounded-lg transition-colors"
        >
          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center text-white font-bold text-sm">
            AH
          </div>
          <span className="text-xs font-semibold hidden md:inline-block text-text-secondary">Ahmed</span>
        </button>

        {/* Profile Dropdown */}
        {profileDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-apple-gray6 border border-white/[0.08] rounded-lg shadow-lg overflow-hidden z-50 min-w-56">
            {/* Profile Header */}
            <div className="p-4 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center text-white font-bold">
                  AH
                </div>
                <div className="flex-1">
                  <p className="font-bold text-text-primary">Ahmed Hassan</p>
                  <p className="text-xs text-text-secondary">Administrator</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  navigate('/account')
                  setProfileDropdown(false)
                }}
                className="w-full px-4 py-2 text-left flex items-center gap-3 text-text-secondary hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <User size={16} /> Account Settings
              </button>
              <button
                onClick={() => setProfileDropdown(false)}
                className="w-full px-4 py-2 text-left flex items-center gap-3 text-text-secondary hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <Settings size={16} /> Preferences
              </button>
            </div>

            {/* Logout */}
            <button className="w-full px-4 py-2 text-left flex items-center gap-3 text-accent-orange hover:bg-accent-orange/10 transition-colors border-t border-white/[0.08]">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Language Switcher with Dropdown */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setLangDropdown(!langDropdown)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.08] transition-all group"
        >
          <span className="text-xl">
            {language === 'en' ? '🇺🇸' : '🇸🇦'}
          </span>
          <span className="text-xs font-bold hidden md:inline-block text-text-secondary group-hover:text-white transition-colors">
            {language === 'en' ? 'EN / LTR' : 'AR / RTL'}
          </span>
          <Globe size={16} className="text-text-secondary group-hover:text-accent-blue transition-colors" />
        </button>

        {/* Language Dropdown Menu */}
        {langDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-apple-gray6 border border-white/[0.08] rounded-lg shadow-lg overflow-hidden z-50 min-w-48">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'ar')
                  setLangDropdown(false)
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                  language === lang.code
                    ? 'bg-accent-blue/20 text-accent-blue'
                    : 'text-text-secondary hover:text-white hover:bg-white/[0.06]'
                } border-b border-white/[0.06] last:border-b-0`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{lang.name}</p>
                  <p className="text-xs text-text-secondary">{lang.dir}</p>
                </div>
                {language === lang.code && (
                  <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
