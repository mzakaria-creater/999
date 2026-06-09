import { useLanguage } from '@/context/LanguageContext'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onMenuToggle?: (open: boolean) => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { language, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    const newState = !menuOpen
    setMenuOpen(newState)
    onMenuToggle?.(newState)
  }

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
          OnTarget / Press2Pay
        </h1>
      </div>

      {/* Language Buttons */}
      <div className="flex gap-1 md:gap-2 flex-shrink-0">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 md:px-3 py-1.5 text-xs font-semibold uppercase rounded-lg transition-all duration-200 ${
            language === 'en'
              ? 'bg-accent-blue text-white shadow-apple-button'
              : 'text-text-secondary hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-2 md:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
            language === 'ar'
              ? 'bg-accent-blue text-white shadow-apple-button'
              : 'text-text-secondary hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          ع
        </button>
      </div>
    </header>
  )
}
