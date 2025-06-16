import usersData from '../mockData/users.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const userService = {
  async getAll() {
    await delay(300)
    return [...usersData]
  },

  async getById(id) {
    await delay(200)
    const user = usersData.find(u => u.Id === parseInt(id, 10))
    if (!user) {
      throw new Error('User not found')
    }
    return { ...user }
  },

  async create(userData) {
    await delay(400)
    const maxId = Math.max(...usersData.map(u => u.Id), 0)
    const newUser = {
      Id: maxId + 1,
      ...userData,
      status: userData.status || 'online'
    }
    usersData.push(newUser)
    return { ...newUser }
  },

  async update(id, userData) {
    await delay(300)
    const index = usersData.findIndex(u => u.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('User not found')
    }
    
    const updatedUser = {
      ...usersData[index],
      ...userData,
      Id: usersData[index].Id // Prevent Id modification
    }
    usersData[index] = updatedUser
    return { ...updatedUser }
  },

  async delete(id) {
    await delay(250)
    const index = usersData.findIndex(u => u.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('User not found')
    }
    
    const deletedUser = { ...usersData[index] }
    usersData.splice(index, 1)
    return deletedUser
  },

  async updateStatus(id, status) {
    await delay(200)
    return this.update(id, { status })
  }
}

export default userService