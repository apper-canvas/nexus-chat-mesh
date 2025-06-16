import messagesData from '../mockData/messages.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const messageService = {
  async getAll() {
    await delay(300)
    return [...messagesData]
  },

  async getById(id) {
    await delay(200)
    const message = messagesData.find(m => m.Id === parseInt(id, 10))
    if (!message) {
      throw new Error('Message not found')
    }
    return { ...message }
  },

  async getByChannelId(channelId) {
    await delay(250)
    return messagesData.filter(m => m.channelId === parseInt(channelId, 10))
  },

  async create(messageData) {
    await delay(300)
    const maxId = Math.max(...messagesData.map(m => m.Id), 0)
    const newMessage = {
      Id: maxId + 1,
      ...messageData,
      timestamp: new Date().toISOString(),
      reactions: messageData.reactions || [],
      edited: false
    }
    messagesData.push(newMessage)
    return { ...newMessage }
  },

  async update(id, messageData) {
    await delay(300)
    const index = messagesData.findIndex(m => m.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Message not found')
    }
    
    const updatedMessage = {
      ...messagesData[index],
      ...messageData,
      Id: messagesData[index].Id, // Prevent Id modification
      edited: true
    }
    messagesData[index] = updatedMessage
    return { ...updatedMessage }
  },

  async delete(id) {
    await delay(250)
    const index = messagesData.findIndex(m => m.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Message not found')
    }
    
    const deletedMessage = { ...messagesData[index] }
    messagesData.splice(index, 1)
    return deletedMessage
  },

  async addReaction(messageId, reaction) {
    await delay(200)
    const index = messagesData.findIndex(m => m.Id === parseInt(messageId, 10))
    if (index === -1) {
      throw new Error('Message not found')
    }

    const message = messagesData[index]
    const existingReaction = message.reactions.find(r => r.emoji === reaction.emoji)
    
    if (existingReaction) {
      const userIndex = existingReaction.users.indexOf(reaction.userId)
      if (userIndex === -1) {
        existingReaction.users.push(reaction.userId)
      } else {
        existingReaction.users.splice(userIndex, 1)
        if (existingReaction.users.length === 0) {
          message.reactions = message.reactions.filter(r => r.emoji !== reaction.emoji)
        }
      }
    } else {
      message.reactions.push({
        emoji: reaction.emoji,
        users: [reaction.userId]
      })
    }

    return { ...message }
  },

  async search(query, channelId = null) {
    await delay(350)
    let results = [...messagesData]
    
    if (channelId) {
      results = results.filter(m => m.channelId === parseInt(channelId, 10))
    }
    
    if (query) {
      results = results.filter(m => 
        m.content.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    return results
  }
}

export default messageService