import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, ArrowDownCircle, ArrowUpCircle, CheckSquare, Wallet, DollarSign, Users,
  Settings, Store, CreditCard, Globe, Brain, MapPin, Zap, Sparkles, Gauge, User, Lock,
  MessageSquare, Workflow, TrendingUp, ChevronDown, ChevronUp, BarChart3, Send
} from 'lucide-react'
import { useAuth, type UserRole } from '@/context/AuthContext'
import { useState } from 'react'

interface NavItem {
  path: string
  label: string
  Icon: any
  requiredRoles: UserRole[]
}

interface NavGroup {
  name: string
  items: NavItem[]
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navGroups: NavGroup[] = [
  {
    name: 'Dashboard',
    items: [
      { path: '/', label: 'Dashboard', Icon: LayoutDashboard, requiredRoles: ['admin', 'operator', 'merchant', 'viewer'] },
      { path: '/production', label: 'Production Hub', Icon: Gauge, requiredRoles: ['admin', 'operator'] },
      { path: '/glossy-showcase', label: 'Glossy 3D', Icon: Sparkles, requiredRoles: ['admin', 'operator', 'merchant', 'viewer'] },
    ],
  },
  {
    name: 'Command Center',
    items: [
      { path: '/command-center', label: 'Command Center', Icon: Globe, requiredRoles: ['admin', 'operator'] },
      { path: '/routing-engine', label: 'Routing Engine', Icon: Brain, requiredRoles: ['admin', 'operator'] },
      { path: '/audit-map', label: 'Audit Map', Icon: MapPin, requiredRoles: ['admin', 'operator'] },
      { path: '/mena-payments', label: 'MENA Payments', Icon: Zap, requiredRoles: ['admin', 'operator'] },
    ],
  },
  {
    name: 'Transactions',
    items: [
      { path: '/checkout', label: 'Payment', Icon: CreditCard, requiredRoles: ['admin', 'operator', 'merchant', 'viewer'] },
      { path: '/deposits', label: 'Deposits', Icon: ArrowDownCircle, requiredRoles: ['admin', 'operator', 'merchant'] },
      { path: '/payouts', label: 'Payouts', Icon: ArrowUpCircle, requiredRoles: ['admin', 'operator', 'merchant'] },
      { path: '/approvals', label: 'Approvals', Icon: CheckSquare, requiredRoles: ['admin', 'operator'] },
      { path: '/deposits-transaction', label: 'Deposit Report', Icon: BarChart3, requiredRoles: ['admin', 'operator'] },
      { path: '/payouts-transaction', label: 'Payout Report', Icon: BarChart3, requiredRoles: ['admin', 'operator'] },
    ],
  },
  {
    name: 'Wallets',
    items: [
      { path: '/wallets', label: 'Wallets', Icon: Wallet, requiredRoles: ['admin', 'operator'] },
      { path: '/wallet-pool', label: 'Wallet Pool', Icon: Wallet, requiredRoles: ['admin', 'operator'] },
      { path: '/costs', label: 'Costs', Icon: DollarSign, requiredRoles: ['admin', 'operator'] },
    ],
  },
  {
    name: 'Management',
    items: [
      { path: '/merchants', label: 'Merchants', Icon: Store, requiredRoles: ['admin', 'operator'] },
      { path: '/users', label: 'Users', Icon: Users, requiredRoles: ['admin'] },
      { path: '/account', label: 'Account', Icon: User, requiredRoles: ['admin', 'operator', 'merchant', 'viewer'] },
    ],
  },
  {
    name: 'Integration',
    items: [
      { path: '/n8n', label: 'n8n', Icon: Workflow, requiredRoles: ['admin', 'operator'] },
      { path: '/binance', label: 'Binance', Icon: TrendingUp, requiredRoles: ['admin', 'operator'] },
      { path: '/sms-reader', label: 'SMS Reader', Icon: MessageSquare, requiredRoles: ['admin', 'operator'] },
      { path: '/telegram', label: 'Telegram', Icon: Send, requiredRoles: ['admin', 'operator', 'merchant', 'viewer'] },
      { path: '/vault', label: 'Vault', Icon: Lock, requiredRoles: ['admin'] },
    ],
  },
  {
    name: 'Settings',
    items: [
      { path: '/settings', label: 'Settings', Icon: Settings, requiredRoles: ['admin'] },
    ],
  },
]

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuth()
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Dashboard', 'Transactions']))
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName)
    } else {
      newExpanded.add(groupName)
    }
    setExpandedGroups(newExpanded)
  }

  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => user && item.requiredRoles.includes(user.role)),
    }))
    .filter((group) => group.items.length > 0)

  const sidebarWidth = isCollapsed && !isHovering ? 'w-20' : 'w-64'
  const shouldShowLabels = !isCollapsed || isHovering

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
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-apple-gray6 border-r border-white/[0.06] overflow-y-auto px-4 py-6 z-40 transition-all duration-300 ${sidebarWidth} ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Sidebar Header */}
        <div className="mb-8 px-2 flex items-center justify-between">
          {shouldShowLabels && (
            <div>
              <span className="text-sm font-bold tracking-tight text-white font-apple">OnTarget</span>
              {user && <span className="text-xs text-text-secondary block mt-1 capitalize">Role: {user.role}</span>}
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="md:flex hidden items-center justify-center p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed && !isHovering ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="space-y-2">
          {visibleGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.name)
            return (
              <div key={group.name}>
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors mb-1"
                >
                  {shouldShowLabels && <span>{group.name}</span>}
                  {shouldShowLabels && (isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                </button>

                {/* Group Items */}
                {isExpanded && (
                  <div className="space-y-1 ml-0">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path
                      const Icon = item.Icon
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                            isActive
                              ? 'bg-accent-blue text-white shadow-apple-button'
                              : 'text-text-secondary hover:text-white hover:bg-white/[0.06]'
                          }`}
                          title={shouldShowLabels ? '' : item.label}
                        >
                          <Icon size={18} className="flex-shrink-0" />
                          {shouldShowLabels && <span className="text-sm font-semibold">{item.label}</span>}
                          {shouldShowLabels && isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
