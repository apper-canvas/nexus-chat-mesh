import { motion } from 'framer-motion'
import { reactionService } from '@/services'
import { useState, useEffect } from 'react'

const EmojiPicker = ({ onEmojiSelect }) => {
  const [emojis, setEmojis] = useState([])

  useEffect(() => {
    const loadEmojis = async () => {
      try {
        const emojiList = await reactionService.getCommonEmojis()
        setEmojis(emojiList)
      } catch (error) {
        console.error('Failed to load emojis:', error)
      }
    }
    loadEmojis()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-surface-800 border border-surface-600 rounded-lg p-3 shadow-xl z-20"
    >
      <div className="grid grid-cols-4 gap-2">
        {emojis.map((emoji, index) => (
          <motion.button
            key={emoji.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEmojiSelect(emoji.emoji)}
            className="p-2 hover:bg-surface-700 rounded text-lg transition-colors"
            title={emoji.name}
          >
            {emoji.emoji}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default EmojiPicker