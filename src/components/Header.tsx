import { useLanguage } from '@/context/LanguageContext'
import { Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onMenuToggle?: (open: boolean) => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { language, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)

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
