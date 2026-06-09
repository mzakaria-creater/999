import { ReactNode } from 'react'
import { useAuth, type UserRole } from '@/context/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles: UserRole[]
  fallback?: ReactNode
}

export default function ProtectedRoute({ children, requiredRoles, fallback }: ProtectedRouteProps) {
  const { hasPermission } = useAuth()

  if (!hasPermission(requiredRoles)) {
    return fallback || (
      <div className="ml-64 pt-20 pb-8 px-8">
        <div className="apple-surface rounded-2xl p-8 text-center">
          <h2 className="font-apple text-2xl font-bold text-text-primary mb-2">Access Denied</h2>
          <p className="text-text-secondary">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
