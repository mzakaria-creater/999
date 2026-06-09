import { useLanguage } from '@/context/LanguageContext'

export default function Header() {
  const { language, setLanguage } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-apple-gray6 border-b border-white/[0.06] flex items-center px-8 z-50 shadow-apple-inset">
      <div className="flex-1">
        <h1 className="text-sm font-semibold tracking-tight text-white font-apple">
          OnTarget / Press2Pay Enterprise
        </h1>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 text-xs font-semibold uppercase rounded-lg transition-all duration-200 ${
            language === 'en'
              ? 'bg-accent-blue text-white shadow-apple-button'
              : 'text-text-secondary hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
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
