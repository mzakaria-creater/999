import { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'admin' | 'operator' | 'merchant' | 'viewer'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  role: UserRole | null
  login: (email: string, password: string, role: UserRole) => void
  logout: () => void
  switchRole: (role: UserRole) => void
  hasPermission: (requiredRole: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@ontarget.com',
    role: 'admin',
    isActive: true,
  })

  const login = (email: string, password: string, role: UserRole) => {
    setUser({
      id: Math.random().toString(),
      name: email.split('@')[0],
      email,
      role,
      isActive: true,
    })
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  const hasPermission = (requiredRoles: UserRole[]) => {
    return user ? requiredRoles.includes(user.role) : false
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, login, logout, switchRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
