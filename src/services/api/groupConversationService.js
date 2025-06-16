const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock data for group conversations
const groupConversationsData = [
  {
    Id: 1,
    name: "Design Team",
    description: "UI/UX design discussions",
    createdBy: 1,
    members: [1, 2, 3, 5],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    Id: 2,
    name: "Project Alpha",
    description: "Development coordination",
    createdBy: 2,
    members: [1, 2, 4, 6],
    createdAt: "2024-01-16T14:30:00Z",
    updatedAt: "2024-01-16T14:30:00Z"
  }
]

let nextId = Math.max(...groupConversationsData.map(g => g.Id), 0) + 1

const groupConversationService = {
  async getAll() {
    await delay(300)
    return [...groupConversationsData]
  },

  async getById(id) {
    await delay(200)
    const group = groupConversationsData.find(g => g.Id === parseInt(id, 10))
    if (!group) {
      throw new Error('Group conversation not found')
    }
    return { ...group }
  },

  async getUserGroups(userId) {
    await delay(250)
    return groupConversationsData.filter(g => 
      g.members.includes(parseInt(userId, 10))
    )
  },

  async create(groupData) {
    await delay(400)
    const newGroup = {
      Id: nextId++,
      name: groupData.name,
      description: groupData.description || '',
      createdBy: groupData.createdBy,
      members: [...groupData.members],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    groupConversationsData.push(newGroup)
    return { ...newGroup }
  },

  async update(id, groupData) {
    await delay(300)
    const index = groupConversationsData.findIndex(g => g.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Group conversation not found')
    }
    
    const updatedGroup = {
      ...groupConversationsData[index],
      ...groupData,
      Id: groupConversationsData[index].Id, // Prevent Id modification
      updatedAt: new Date().toISOString()
    }
    groupConversationsData[index] = updatedGroup
    return { ...updatedGroup }
  },

  async delete(id) {
    await delay(250)
    const index = groupConversationsData.findIndex(g => g.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Group conversation not found')
    }
    
    const deletedGroup = { ...groupConversationsData[index] }
    groupConversationsData.splice(index, 1)
    return deletedGroup
  },

  async addMember(groupId, userId) {
    await delay(200)
    const index = groupConversationsData.findIndex(g => g.Id === parseInt(groupId, 10))
    if (index === -1) {
      throw new Error('Group conversation not found')
    }

    const group = groupConversationsData[index]
    const userIdInt = parseInt(userId, 10)
    
    if (!group.members.includes(userIdInt)) {
      group.members.push(userIdInt)
      group.updatedAt = new Date().toISOString()
    }
    
    return { ...group }
  },

  async removeMember(groupId, userId) {
    await delay(200)
    const index = groupConversationsData.findIndex(g => g.Id === parseInt(groupId, 10))
    if (index === -1) {
      throw new Error('Group conversation not found')
    }

    const group = groupConversationsData[index]
    const userIdInt = parseInt(userId, 10)
    
    group.members = group.members.filter(id => id !== userIdInt)
    group.updatedAt = new Date().toISOString()
    
    return { ...group }
  }
}

export default groupConversationService