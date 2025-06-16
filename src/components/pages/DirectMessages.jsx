import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import DirectMessageSidebar from '@/components/organisms/DirectMessageSidebar'
import ChannelSidebar from '@/components/organisms/ChannelSidebar'
import MessageList from '@/components/organisms/MessageList'
import MessageInput from '@/components/molecules/MessageInput'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { userService } from '@/services'

const DirectMessages = () => {
  const { userId } = useParams()
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        setSelectedUser(null)
        return
      }

      setLoading(true)
      try {
        const userData = await userService.getById(userId)
        setSelectedUser(userData)
      } catch (error) {
        console.error('Failed to load user:', error)
        setSelectedUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [userId])

  const handleNewMessage = (message) => {
    console.log('New DM:', message)
  }

  return (
    <div className="h-full flex overflow-hidden">
      {/* Extended Sidebar */}
      <div className="w-64 bg-surface-800 border-r border-surface-700 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <ChannelSidebar />
          <div className="border-t border-surface-700 mt-4">
            <DirectMessageSidebar />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading conversation...</p>
            </div>
          </div>
        ) : selectedUser ? (
          <>
            {/* DM Header */}
            <div className="border-b border-surface-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    status={selectedUser.status}
                    size="lg" 
                  />
                  <div>
                    <h1 className="text-xl font-semibold text-white">{selectedUser.name}</h1>
                    <p className="text-sm text-gray-400 capitalize">{selectedUser.status}</p>
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
                    <ApperIcon name="MoreVertical" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages - Using channelId as userId for mock data */}
            <MessageList channelId={selectedUser.Id} />
            
            <MessageInput 
              channelId={selectedUser.Id}
              onMessageSent={handleNewMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <ApperIcon name="MessageCircle" size={64} className="text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Direct Messages
              </h2>
              <p className="text-gray-400 max-w-md">
                Select a person from the sidebar to start a direct conversation.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DirectMessages