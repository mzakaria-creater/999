import { useState } from 'react'

export default function Header() {
  const [lang, setLang] = useState('en')

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-dark-surface/60 backdrop-blur-2xl border-b border-white/[0.08] flex items-center px-8 z-50 shadow-lg">
      <div className="flex-1">
        <h1 className="text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          ◆ OnTarget/Press2Pay Enterprise
        </h1>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-lg transition-all duration-200 ${
            lang === 'en'
              ? 'bg-gradient-to-r from-primary to-accent text-dark-bg'
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('ar')}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-lg transition-all duration-200 ${
            lang === 'ar'
              ? 'bg-gradient-to-r from-primary to-accent text-dark-bg'
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          العربية
        </button>
      </div>
    </header>
  )
}
