import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import MessageList from '@/components/organisms/MessageList'
import MessageInput from '@/components/molecules/MessageInput'
import ApperIcon from '@/components/ApperIcon'

const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleNewMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage])
    toast.success('Message sent to inbox')
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
  }

  return (
    <div className="h-full flex flex-col bg-background-dark">
      {/* Header */}
      <div className="border-b border-surface-700 p-4 bg-surface-800">
        <div className="flex items-center space-x-3">
          <ApperIcon name="Mail" size={24} className="text-primary" />
          <div>
            <h1 className="text-xl font-semibold text-white">Inbox</h1>
            <p className="text-sm text-gray-400">Send and receive messages</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MessageList 
          isInboxMode={true}
          onMessageUpdate={handleMessageUpdate}
        />
        
        {/* Message Input */}
        <MessageInput 
          isInboxMode={true}
          onMessageSent={handleNewMessage}
          placeholder="Send a message to inbox..."
        />
      </div>
    </div>
  )
}

export default Inbox