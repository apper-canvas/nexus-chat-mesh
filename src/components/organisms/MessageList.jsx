import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MessageItem from '@/components/molecules/MessageItem'
import ApperIcon from '@/components/ApperIcon'
import { messageService } from '@/services'

const MessageList = ({ channelId, isInboxMode = false, onMessageUpdate }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true)
      setError(null)
      try {
        let messageData
        if (isInboxMode) {
          // Load all messages for inbox mode
          messageData = await messageService.getAll()
        } else if (channelId) {
          // Load channel-specific messages
          messageData = await messageService.getByChannelId(channelId)
        } else {
          return
        }
        
        setMessages(messageData)
        setTimeout(scrollToBottom, 100)
      } catch (err) {
        setError(err.message || 'Failed to load messages')
        toast.error('Failed to load messages')
      } finally {
        setLoading(false)
      }
    }
    loadMessages()
  }, [channelId, isInboxMode])

  const handleReactionAdd = (updatedMessage) => {
    setMessages(prev => prev.map(msg => 
      msg.Id === updatedMessage.Id ? updatedMessage : msg
    ))
  }

const handleMessageUpdate = (updatedMessage) => {
    if (updatedMessage === null) {
      // Message was deleted
      setMessages(prev => prev.filter(msg => msg.Id !== updatedMessage?.Id))
    } else {
      setMessages(prev => prev.map(msg => 
        msg.Id === updatedMessage.Id ? updatedMessage : msg
      ))
    }
    // Call parent handler if provided
    onMessageUpdate?.(updatedMessage)
  }

  const handleNewMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage])
    setTimeout(scrollToBottom, 100)
  }

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-4 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-3">
              <div className="w-8 h-8 bg-surface-600 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-600 rounded w-1/4 animate-pulse" />
                <div className="h-4 bg-surface-600 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-semantic-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Failed to load messages</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <ApperIcon name="MessageSquare" size={48} className="text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
            <p className="text-gray-400">Be the first to send a message in this channel!</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
          >
            <MessageItem
              message={message}
              onReactionAdd={handleReactionAdd}
              onMessageUpdate={handleMessageUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList