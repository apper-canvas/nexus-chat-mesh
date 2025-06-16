import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Avatar from '@/components/atoms/Avatar'

const UserItem = ({ user, unreadCount = 0 }) => {
  return (
    <NavLink
      to={`/direct/${user.Id}`}
      className={({ isActive }) => `
        flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors group
        ${isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-300 hover:bg-surface-700 hover:text-white'
        }
      `}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <Avatar src={user.avatar} alt={user.name} status={user.status} size="sm" />
        <span className="truncate">{user.name}</span>
      </div>
      
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-semantic-error text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </motion.div>
      )}
    </NavLink>
  )
}

export default UserItem