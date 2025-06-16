const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const commonEmojis = [
  { emoji: '👍', name: 'thumbs_up' },
  { emoji: '❤️', name: 'heart' },
  { emoji: '😂', name: 'laugh' },
  { emoji: '😮', name: 'surprised' },
  { emoji: '😢', name: 'sad' },
  { emoji: '🎉', name: 'party' },
  { emoji: '🔥', name: 'fire' },
  { emoji: '✅', name: 'check' }
]

const reactionService = {
  async getCommonEmojis() {
    await delay(100)
    return [...commonEmojis]
  },

  async getReactionsByMessageId(messageId) {
    await delay(150)
    // This would typically fetch from a reactions table
    // For now, we'll simulate with empty reactions
    return []
  }
}

export default reactionService