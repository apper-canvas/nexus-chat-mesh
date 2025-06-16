import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import UserItem from '@/components/molecules/UserItem'
import ApperIcon from '@/components/ApperIcon'
import { userService } from '@/services'

const DirectMessageSidebar = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const userData = await userService.getAll()
        // Filter out current user (ID: 1)
        const otherUsers = userData.filter(user => user.Id !== 1)
        setUsers(otherUsers)
      } catch (err) {
        setError(err.message || 'Failed to load users')
        toast.error('Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  if (loading) {
    return (
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="h-4 bg-surface-600 rounded w-24 animate-pulse" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 px-3 py-2">
            <div className="w-6 h-6 bg-surface-600 rounded-full animate-pulse" />
            <div className="h-4 bg-surface-600 rounded w-20 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <ApperIcon name="AlertCircle" size={24} className="text-semantic-error mx-auto mb-2" />
        <p className="text-sm text-gray-400 mb-3">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-primary hover:text-primary-hover"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="p-2 space-y-2">
      {/* Direct Messages Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Direct Messages
        </h3>
      </div>

      {/* User List */}
      <div className="space-y-1">
        {users.length === 0 ? (
          <div className="px-3 py-4 text-center">
            <ApperIcon name="MessageCircle" size={24} className="text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No conversations yet</p>
            <p className="text-xs text-gray-600">Start a direct message</p>
          </div>
        ) : (
          users.map((user, index) => (
            <motion.div
              key={user.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <UserItem 
                user={user} 
                unreadCount={Math.floor(Math.random() * 3)} // Mock unread count
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default DirectMessageSidebar