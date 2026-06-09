import { useState } from 'react'
import { Plus, Trash2, Edit2, Shield } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface UserItem {
  id: string
  name: string
  email: string
  role: string
  lastActive: string
  status: 'active' | 'inactive'
}

const mockUsers: UserItem[] = [
  { id: '1', name: 'Admin User', email: 'admin@ontarget.com', role: 'admin', lastActive: '2 mins ago', status: 'active' },
  { id: '2', name: 'John Operator', email: 'operator@ontarget.com', role: 'operator', lastActive: '1 hour ago', status: 'active' },
  { id: '3', name: 'Merchant ABC', email: 'merchant@abc.com', role: 'merchant', lastActive: '3 hours ago', status: 'active' },
  { id: '4', name: 'Viewer User', email: 'viewer@ontarget.com', role: 'viewer', lastActive: '1 day ago', status: 'inactive' },
]

export default function Users() {
  const [users, setUsers] = useState<UserItem[]>(mockUsers)
  const { user: currentUser } = useAuth()
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-accent-red/15 text-accent-red border border-accent-red/30',
      operator: 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30',
      merchant: 'bg-accent-orange/15 text-accent-orange border border-accent-orange/30',
      viewer: 'bg-accent-green/15 text-accent-green border border-accent-green/30',
    }
    return colors[role] || 'bg-white/10 text-white'
  }

  const handleDelete = (id: string) => {
    if (id !== currentUser?.id) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  return (
    <div className="ml-64 pt-20 pb-8 px-8">
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">Users</h1>
            <p className="text-text-secondary">Manage system users and permissions</p>
          </div>
          <button className="btn">
            <Plus size={18} className="inline mr-2" />
            Add User
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${viewMode === 'list' ? 'bg-accent-blue text-white' : 'bg-white/[0.08] text-text-secondary'}`}>
            List View
          </button>
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${viewMode === 'grid' ? 'bg-accent-blue text-white' : 'bg-white/[0.08] text-text-secondary'}`}>
            Grid View
          </button>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="apple-surface rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Last Active</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="table-row">
                    <td className="px-6 py-4 font-semibold text-text-primary">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${getRoleBadgeColor(u.role)}`}>
                        <Shield size={12} className="inline mr-1" />
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{u.lastActive}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-1 hover:bg-white/10 rounded"><Edit2 size={16} className="text-accent-blue" /></button>
                      {u.id !== currentUser?.id && <button onClick={() => handleDelete(u.id)} className="p-1 hover:bg-white/10 rounded"><Trash2 size={16} className="text-accent-red" /></button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(u => (
              <div key={u.id} className="apple-card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-text-primary">{u.name}</h3>
                  <span className={`badge ${getRoleBadgeColor(u.role)}`}>
                    <Shield size={12} className="inline mr-1" />
                    {u.role}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{u.email}</p>
                <p className="text-xs text-text-tertiary mb-2">Last: {u.lastActive}</p>
                <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
