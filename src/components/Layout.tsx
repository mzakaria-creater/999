import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth, type UserRole } from '@/context/AuthContext'
import { Shield, Briefcase, Radio, Landmark, Target, Sparkles } from 'lucide-react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { dir } = useLanguage()
  const { user, switchRole } = useAuth()
  const navigate = useNavigate()
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(true)

  const rolesList: { role: UserRole; label: string; path: string; icon: any; color: string }[] = [
    { role: 'admin', label: 'Admin', path: '/admin-portal', icon: Shield, color: 'bg-accent-red text-white' },
    { role: 'merchant', label: 'Merchant', path: '/merchant-portal', icon: Briefcase, color: 'bg-accent-blue text-white' },
    { role: 'operator', label: 'Operator', path: '/operator-portal', icon: Radio, color: 'bg-accent-green text-white' },
    { role: 'financial', label: 'Financial', path: '/financial-portal', icon: Landmark, color: 'bg-accent-indigo text-white' },
    { role: 'owner', label: 'Owner', path: '/owner-portal', icon: Target, color: 'bg-accent-orange text-white' },
  ]

  const handleRoleSwitch = (role: UserRole, path: string) => {
    switchRole(role)
    navigate(path)
  }

  return (
    <div
      className="flex h-screen bg-apple-black relative z-10"
      dir={dir}
      style={{ direction: dir }}
    >
      {/* Sidebar - visible on desktop, hidden on mobile unless toggled */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={setSidebarOpen} />

        {/* Content Area - responsive margin using dynamic stylesheet classes */}
        <main className="flex-1 overflow-y-auto pt-16 md:pt-0 animate-apple-enter">
          <div
            className={`transition-all duration-300 ${
              dir === 'rtl'
                ? isCollapsed ? 'content-shift-rtl-collapsed' : 'content-shift-rtl-expanded'
                : isCollapsed ? 'content-shift-ltr-collapsed' : 'content-shift-ltr-expanded'
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Developer/User Context Switcher for UI/UX testing */}
      <div className="fixed bottom-6 right-6 z-50 font-apple hidden sm:block">
        {isSwitcherOpen ? (
          <div className="bg-apple-gray6/80 backdrop-blur-xl border border-white/[0.08] p-4 rounded-2xl shadow-apple-elevated max-w-xs space-y-3 transition-all">
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent-blue animate-pulse" />
                <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">UX Portal Switcher</span>
              </div>
              <button 
                onClick={() => setIsSwitcherOpen(false)} 
                className="text-[10px] text-text-secondary hover:text-white"
              >
                Hide
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {rolesList.map((item) => {
                const isActive = user?.role === item.role
                const Icon = item.icon
                return (
                  <button
                    key={item.role}
                    onClick={() => handleRoleSwitch(item.role, item.path)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                      isActive 
                        ? `${item.color} shadow-lg scale-102` 
                        : 'text-text-secondary hover:text-white hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    <Icon size={14} />
                    <span className="flex-1">{item.label} Portal</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsSwitcherOpen(true)}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white p-3 rounded-full shadow-apple-button flex items-center justify-center transition-all hover:scale-110"
            title="Open UX Portal Switcher"
          >
            <Sparkles size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
