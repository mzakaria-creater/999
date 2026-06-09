import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, CheckSquare, Wallet, DollarSign, Users, Settings, Store, CreditCard, Globe, Brain, MapPin, Zap } from 'lucide-react'
import { useAuth, type UserRole } from '@/context/AuthContext'

interface NavItem {
  path: string
  label: string
  Icon: any
  requiredRoles: UserRole[]
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const allNavItems: NavItem[] = [
  { path: '/', label: 'Dashboard', Icon: LayoutDashboard, requiredRoles: ['admin', 'operator', 'merchant', 'viewer'] },
  { path: '/command-center', label: 'Command Center', Icon: Globe, requiredRoles: ['admin', 'operator'] },
  { path: '/routing-engine', label: 'Routing Engine', Icon: Brain, requiredRoles: ['admin', 'operator'] },
  { path: '/audit-map', label: 'Audit Map', Icon: MapPin, requiredRoles: ['admin', 'operator'] },
  { path: '/mena-payments', label: 'MENA Payments', Icon: Zap, requiredRoles: ['admin', 'operator'] },
  { path: '/checkout', label: 'Payment', Icon: CreditCard, requiredRoles: ['admin', 'operator', 'merchant', 'viewer'] },
  { path: '/deposits', label: 'Deposits', Icon: ArrowDownCircle, requiredRoles: ['admin', 'operator', 'merchant'] },
  { path: '/payouts', label: 'Payouts', Icon: ArrowUpCircle, requiredRoles: ['admin', 'operator', 'merchant'] },
  { path: '/approvals', label: 'Approvals', Icon: CheckSquare, requiredRoles: ['admin', 'operator'] },
  { path: '/wallets', label: 'Wallets', Icon: Wallet, requiredRoles: ['admin', 'operator'] },
  { path: '/costs', label: 'Costs', Icon: DollarSign, requiredRoles: ['admin', 'operator'] },
  { path: '/merchants', label: 'Merchants', Icon: Store, requiredRoles: ['admin', 'operator'] },
  { path: '/users', label: 'Users', Icon: Users, requiredRoles: ['admin'] },
  { path: '/settings', label: 'Settings', Icon: Settings, requiredRoles: ['admin'] },
]

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuth()

  const visibleItems = allNavItems.filter(item =>
    user && item.requiredRoles.includes(user.role)
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30 top-16"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-apple-gray6 border-r border-white/[0.06] overflow-y-auto px-4 py-6 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-8 px-2">
          <span className="text-sm font-bold tracking-tight text-white font-apple">OnTarget</span>
          {user && <span className="text-xs text-text-secondary block mt-1 capitalize">Role: {user.role}</span>}
        </div>

        <nav className="space-y-2">
          {visibleItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.Icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
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
    </>
  )
}
