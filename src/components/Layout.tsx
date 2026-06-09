import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-dark-bg relative z-10">
      {/* Sidebar - visible on desktop, hidden on mobile unless toggled */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={setSidebarOpen} />

        {/* Content Area - responsive margin */}
        <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
          <div className="md:ml-64">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
