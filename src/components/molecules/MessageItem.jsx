import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import EmojiPicker from './EmojiPicker'
import { userService, messageService } from '@/services'

const MessageItem = ({ message, onReactionAdd, onMessageUpdate }) => {
  const [user, setUser] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)

  // Load user data
  useState(() => {
    const loadUser = async () => {
      try {
        const userData = await userService.getById(message.userId)
        setUser(userData)
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }
    loadUser()
  }, [message.userId])

  const handleReaction = async (emoji) => {
    try {
      const updatedMessage = await messageService.addReaction(message.Id, {
        emoji,
        userId: 1 // Current user ID
      })
      onReactionAdd?.(updatedMessage)
      setShowEmojiPicker(false)
      toast.success('Reaction added')
    } catch (error) {
      toast.error('Failed to add reaction')
    }
  }

  const handleEdit = async () => {
    if (!editContent.trim()) return

    try {
      const updatedMessage = await messageService.update(message.Id, {
        content: editContent.trim()
      })
      onMessageUpdate?.(updatedMessage)
      setIsEditing(false)
      toast.success('Message updated')
    } catch (error) {
      toast.error('Failed to update message')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      await messageService.delete(message.Id)
      onMessageUpdate?.(null) // Signal deletion
      toast.success('Message deleted')
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex space-x-3 p-4"
      >
        <div className="w-8 h-8 bg-surface-600 rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-surface-600 rounded w-1/4 animate-pulse" />
          <div className="h-4 bg-surface-600 rounded w-3/4 animate-pulse" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group flex space-x-3 p-4 hover:bg-surface-800/50 transition-colors"
    >
      <Avatar 
        src={user.avatar} 
        alt={user.name} 
        status={user.status}
        size="md" 
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline space-x-2">
          <span className="font-medium text-white">{user.name}</span>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
          {message.edited && (
            <span className="text-xs text-gray-500">(edited)</span>
          )}
        </div>
        
        {isEditing ? (
          <div className="mt-1 space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-3 py-2 bg-surface-700 border border-surface-600 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleEdit}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-gray-300 break-words">{message.content}</p>
        )}

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <motion.button
                key={`${reaction.emoji}-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleReaction(reaction.emoji)}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-surface-700 hover:bg-surface-600 rounded-full text-xs transition-colors"
              >
                <span>{reaction.emoji}</span>
                <span className="text-gray-400">{reaction.users.length}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Message Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4">
          <div className="flex items-center space-x-1 bg-surface-800 rounded-lg p-1 shadow-lg">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <ApperIcon name="Smile" size={16} />
            </motion.button>
            
            {message.userId === 1 && ( // Current user's message
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <ApperIcon name="Edit" size={16} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  className="p-1 text-gray-400 hover:text-semantic-error transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} />
                </motion.button>
              </>
            )}
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute top-full right-0 mt-2 z-10">
              <EmojiPicker onEmojiSelect={handleReaction} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MessageItem