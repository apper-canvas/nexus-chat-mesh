import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Avatar from '@/components/atoms/Avatar'

const UserItem = ({ user, group, unreadCount = 0 }) => {
  const isGroup = !!group
  const displayName = isGroup ? group.name : user?.name
  const navigateUrl = isGroup ? `/direct/group/${group.Id}` : `/direct/${user?.Id}`
  
  return (
    <NavLink
      to={navigateUrl}
      className={({ isActive }) => `
        flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors group
        ${isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-300 hover:bg-surface-700 hover:text-white'
        }
      `}
    >
      <div className="flex items-center space-x-3 min-w-0">
        {isGroup ? (
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-white">
              {group.members?.length || 0}
            </span>
          </div>
        ) : (
          <Avatar src={user?.avatar} alt={user?.name} status={user?.status} size="sm" />
        )}
        <div className="min-w-0 flex-1">
          <span className="truncate block">{displayName}</span>
          {isGroup && (
            <span className="text-xs text-gray-500 truncate block">
              {group.members?.length || 0} members
            </span>
          )}
        </div>
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