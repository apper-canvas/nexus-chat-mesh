import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { routes } from '@/config/routes'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background-dark">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        w-64 bg-surface-800 flex flex-col border-r border-surface-700
        lg:static lg:translate-x-0
        fixed inset-y-0 left-0 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Team Header */}
        <div className="p-4 border-b border-surface-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="MessageSquare" size={18} className="text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">Nexus Chat</h1>
                <p className="text-xs text-gray-400">Team Workspace</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
          {Object.values(routes).map((route) => (
            <NavLink
              key={route.id}
              to={route.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors
                ${isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-surface-700 hover:text-white'
                }
              `}
            >
              <ApperIcon name={route.icon} size={18} />
              <span>{route.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Status */}
        <div className="p-4 border-t border-surface-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={16} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-surface-800"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-surface-800 border-b border-surface-700 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <ApperIcon name="Menu" size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white">Nexus Chat</h1>
          <div className="w-6"></div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout