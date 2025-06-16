import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const ChannelItem = ({ channel }) => {
  const channelIcon = channel.type === 'private' ? 'Lock' : 'Hash'

  return (
    <NavLink
      to={`/channels/${channel.Id}`}
      className={({ isActive }) => `
        flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors group
        ${isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-300 hover:bg-surface-700 hover:text-white'
        }
      `}
    >
      <div className="flex items-center space-x-2 min-w-0">
        <ApperIcon name={channelIcon} size={16} className="shrink-0" />
        <span className="truncate">{channel.name}</span>
      </div>
      
      {channel.unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-semantic-error text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center"
        >
          {channel.unreadCount > 99 ? '99+' : channel.unreadCount}
        </motion.div>
      )}
    </NavLink>
  )
}

export default ChannelItem