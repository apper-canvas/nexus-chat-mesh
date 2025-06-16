import channelsData from '../mockData/channels.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const channelService = {
  async getAll() {
    await delay(300)
    return [...channelsData]
  },

  async getById(id) {
    await delay(200)
    const channel = channelsData.find(c => c.Id === parseInt(id, 10))
    if (!channel) {
      throw new Error('Channel not found')
    }
    return { ...channel }
  },

  async create(channelData) {
    await delay(400)
    const maxId = Math.max(...channelsData.map(c => c.Id), 0)
    const newChannel = {
      Id: maxId + 1,
      ...channelData,
      type: channelData.type || 'public',
      unreadCount: 0,
      lastMessage: new Date().toISOString()
    }
    channelsData.push(newChannel)
    return { ...newChannel }
  },

  async update(id, channelData) {
    await delay(300)
    const index = channelsData.findIndex(c => c.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Channel not found')
    }
    
    const updatedChannel = {
      ...channelsData[index],
      ...channelData,
      Id: channelsData[index].Id // Prevent Id modification
    }
    channelsData[index] = updatedChannel
    return { ...updatedChannel }
  },

  async delete(id) {
    await delay(250)
    const index = channelsData.findIndex(c => c.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Channel not found')
    }
    
    const deletedChannel = { ...channelsData[index] }
    channelsData.splice(index, 1)
    return deletedChannel
  },

  async updateUnreadCount(id, count) {
    await delay(200)
    return this.update(id, { unreadCount: count })
  }
}

export default channelService