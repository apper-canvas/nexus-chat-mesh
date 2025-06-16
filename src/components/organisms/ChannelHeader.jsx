import { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'
import { channelService, userService } from '@/services'

const ChannelHeader = ({ channelId }) => {
  const [channel, setChannel] = useState(null)
  const [memberCount, setMemberCount] = useState(0)

  useEffect(() => {
    const loadChannelData = async () => {
      if (!channelId) return

      try {
        const channelData = await channelService.getById(channelId)
        setChannel(channelData)

        // Mock member count (would be from a members API)
        const users = await userService.getAll()
        setMemberCount(users.length)
      } catch (error) {
        console.error('Failed to load channel data:', error)
      }
    }

    loadChannelData()
  }, [channelId])

  if (!channel) {
    return (
      <div className="border-b border-surface-700 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-surface-600 rounded animate-pulse" />
          <div className="h-6 bg-surface-600 rounded w-32 animate-pulse" />
        </div>
      </div>
    )
  }

  const channelIcon = channel.type === 'private' ? 'Lock' : 'Hash'

  return (
    <div className="border-b border-surface-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ApperIcon name={channelIcon} size={20} className="text-gray-400" />
          <h1 className="text-xl font-semibold text-white">{channel.name}</h1>
          <div className="text-sm text-gray-400">
            <ApperIcon name="Users" size={16} className="inline mr-1" />
            {memberCount} member{memberCount !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <ApperIcon name="Phone" size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <ApperIcon name="Video" size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <ApperIcon name="Settings" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChannelHeader