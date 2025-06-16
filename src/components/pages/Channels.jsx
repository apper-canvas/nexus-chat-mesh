import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ChannelSidebar from '@/components/organisms/ChannelSidebar'
import DirectMessageSidebar from '@/components/organisms/DirectMessageSidebar'
import ChannelHeader from '@/components/organisms/ChannelHeader'
import MessageList from '@/components/organisms/MessageList'
import MessageInput from '@/components/molecules/MessageInput'
import ApperIcon from '@/components/ApperIcon'

const Channels = () => {
  const { channelId } = useParams()
  const [selectedChannelId, setSelectedChannelId] = useState(channelId || '1')

  useEffect(() => {
    if (channelId) {
      setSelectedChannelId(channelId)
    }
  }, [channelId])

  const handleNewMessage = (message) => {
    // This would trigger a re-fetch or real-time update
    console.log('New message:', message)
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
        {selectedChannelId ? (
          <>
            <ChannelHeader channelId={selectedChannelId} />
            <MessageList channelId={selectedChannelId} />
            <MessageInput 
              channelId={selectedChannelId} 
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
              <ApperIcon name="Hash" size={64} className="text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome to Nexus Chat
              </h2>
              <p className="text-gray-400 max-w-md">
                Select a channel from the sidebar to start chatting with your team.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Channels