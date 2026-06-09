import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/deposits', label: 'Deposits', icon: '📥' },
  { path: '/payouts', label: 'Payouts', icon: '📤' },
  { path: '/approvals', label: 'Approvals', icon: '✅' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-16 w-72 h-[calc(100vh-64px)] bg-gradient-to-b from-dark-surface/50 to-dark-elevation/40 backdrop-blur-3xl border-r border-white/[0.08] overflow-y-auto p-8 z-40">
      <div className="mb-8">
        <h2 className="text-lg font-bold font-syne bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          ◆ OnTarget
        </h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-gradient-to-r from-primary/15 to-accent/10 text-primary border-l-4 border-primary'
                : 'text-text-secondary hover:text-primary hover:bg-primary/10'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
