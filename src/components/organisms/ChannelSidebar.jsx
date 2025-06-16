import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import ChannelItem from '@/components/molecules/ChannelItem'
import ApperIcon from '@/components/ApperIcon'
import { channelService } from '@/services'

const ChannelSidebar = () => {
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newChannelName, setNewChannelName] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const loadChannels = async () => {
      setLoading(true)
      setError(null)
      try {
        const channelData = await channelService.getAll()
        setChannels(channelData)
      } catch (err) {
        setError(err.message || 'Failed to load channels')
        toast.error('Failed to load channels')
      } finally {
        setLoading(false)
      }
    }
    loadChannels()
  }, [])

  const handleCreateChannel = async (e) => {
    e.preventDefault()
    if (!newChannelName.trim() || creating) return

    setCreating(true)
    try {
      const newChannel = await channelService.create({
        name: newChannelName.trim().toLowerCase().replace(/\s+/g, '-'),
        type: 'public'
      })
      
      setChannels(prev => [...prev, newChannel])
      setNewChannelName('')
      setShowCreateForm(false)
      toast.success('Channel created successfully')
    } catch (error) {
      toast.error('Failed to create channel')
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="h-4 bg-surface-600 rounded w-20 animate-pulse" />
          <div className="w-4 h-4 bg-surface-600 rounded animate-pulse" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 bg-surface-600 rounded mx-3 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <ApperIcon name="AlertCircle" size={24} className="text-semantic-error mx-auto mb-2" />
        <p className="text-sm text-gray-400 mb-3">{error}</p>
        <Button size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="p-2 space-y-2">
      {/* Channels Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Channels
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ApperIcon name="Plus" size={16} />
        </motion.button>
      </div>

      {/* Create Channel Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-3 pb-2"
        >
          <form onSubmit={handleCreateChannel} className="space-y-2">
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="Channel name"
              className="w-full px-2 py-1 bg-surface-700 border border-surface-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
            <div className="flex space-x-1">
              <Button size="sm" type="submit" disabled={creating}>
                {creating ? 'Creating...' : 'Create'}
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                type="button"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Channel List */}
      <div className="space-y-1">
        {channels.length === 0 ? (
          <div className="px-3 py-4 text-center">
            <ApperIcon name="Hash" size={24} className="text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No channels yet</p>
            <p className="text-xs text-gray-600">Create your first channel</p>
          </div>
        ) : (
          channels.map((channel, index) => (
            <motion.div
              key={channel.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ChannelItem channel={channel} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default ChannelSidebar