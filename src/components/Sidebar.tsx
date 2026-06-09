import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, CheckSquare } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { path: '/deposits', label: 'Deposits', Icon: ArrowDownCircle },
  { path: '/payouts', label: 'Payouts', Icon: ArrowUpCircle },
  { path: '/approvals', label: 'Approvals', Icon: CheckSquare },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-apple-gray6 border-r border-white/[0.06] overflow-y-auto px-4 py-6 z-40">
      <div className="mb-8 px-2">
        <span className="text-sm font-bold tracking-tight text-white font-apple">OnTarget</span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.Icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-accent-blue text-white shadow-apple-button'
                  : 'text-text-secondary hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
