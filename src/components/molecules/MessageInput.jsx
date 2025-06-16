import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import EmojiPicker from "./EmojiPicker";
import { messageService } from "@/services";

const MessageInput = ({ channelId, onMessageSent, isInboxMode = false, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || sending) return

    setSending(true)
    try {
      const messageData = {
        userId: 1, // Current user ID
        content: message.trim()
      }
      
      // Add channelId only if not in inbox mode
      if (!isInboxMode && channelId) {
        messageData.channelId = parseInt(channelId, 10)
      }
      
      const newMessage = await messageService.create(messageData)
      
      setMessage('')
      onMessageSent?.(newMessage)
      toast.success('Message sent')
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-surface-700 p-4">
<form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-surface-700 border border-surface-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={1}
            style={{
              minHeight: '44px',
              maxHeight: '120px'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
          />
          
          {/* Emoji Button */}
          <div className="absolute right-2 bottom-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <ApperIcon name="Smile" size={20} />
            </motion.button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          disabled={!message.trim() || sending}
          icon="Send"
          className="shrink-0"
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  )
}

export default MessageInput