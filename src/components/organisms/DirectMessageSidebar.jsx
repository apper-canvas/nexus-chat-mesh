import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import UserItem from "@/components/molecules/UserItem";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import { userService } from "@/services";

const DirectMessageSidebar = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Group state
  const [groups, setGroups] = useState([])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])
  const [creatingGroup, setCreatingGroup] = useState(false)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const userData = await userService.getAll()
        // Filter out current user (ID: 1)
        const otherUsers = userData.filter(user => user.Id !== 1)
        setUsers(otherUsers)
      } catch (err) {
        setError(err.message || 'Failed to load users')
        toast.error('Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
}, [])

  // Group management functions
  const toggleMemberSelection = (userId) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedMembers.length < 2) {
      toast.error('Please enter a group name and select at least 2 members')
      return
    }

    setCreatingGroup(true)
    try {
      // TODO: Implement actual group creation service
      const newGroup = {
        Id: Date.now(), // Temporary ID
        name: groupName.trim(),
        description: groupDescription.trim(),
        members: selectedMembers,
        createdAt: new Date().toISOString()
      }
      
      setGroups(prev => [...prev, newGroup])
      setShowCreateGroup(false)
      setGroupName("")
      setGroupDescription("")
      setSelectedMembers([])
      toast.success('Group created successfully!')
    } catch (err) {
      toast.error('Failed to create group')
      console.error('Group creation error:', err)
    } finally {
      setCreatingGroup(false)
    }
  }
  if (loading) {
    return (
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="h-4 bg-surface-600 rounded w-24 animate-pulse" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 px-3 py-2">
            <div className="w-6 h-6 bg-surface-600 rounded-full animate-pulse" />
            <div className="h-4 bg-surface-600 rounded w-20 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <ApperIcon name="AlertCircle" size={24} className="text-semantic-error mx-auto mb-2" />
        <p className="text-sm text-gray-400 mb-3">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-primary hover:text-primary-hover"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="p-2 space-y-2">
    {/* Direct Messages Header */}
    <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Direct Messages
                    </h3>
    </div>
    {/* User List */}
    <div className="space-y-1">
        {users.length === 0 ? <div className="px-3 py-4 text-center">
            <ApperIcon name="MessageCircle" size={24} className="text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No conversations yet</p>
            <p className="text-xs text-gray-600">Start a direct message</p>
        </div> : users.map((user, index) => <motion.div
            key={user.Id}
            initial={{
                opacity: 0,
                x: -20
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            transition={{
                delay: index * 0.1
            }}>
            <UserItem user={user} unreadCount={Math.floor(Math.random() * 3)} />
        </motion.div>)}
    </div>
    {/* Groups Section */}
    <div className="space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Group Conversations
                          </h3>
            <button
                onClick={() => setShowCreateGroup(true)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Create Group">
                <ApperIcon name="Plus" size={16} />
            </button>
        </div>
        <div className="space-y-1">
            {groups.length === 0 ? <div className="px-3 py-4 text-center">
                <ApperIcon name="Users" size={24} className="text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No groups yet</p>
                <button
                    onClick={() => setShowCreateGroup(true)}
                    className="text-xs text-primary hover:text-primary-hover">Create your first group
                                  </button>
            </div> : groups.map((group, index) => <motion.div
                key={group.Id}
                initial={{
                    opacity: 0,
                    x: -20
                }}
                animate={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    delay: (users.length + index) * 0.1
                }}>
                <UserItem group={group} unreadCount={Math.floor(Math.random() * 5)} />
            </motion.div>)}
        </div>
    </div>
    {/* Create Group Modal */}
    {showCreateGroup && <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
            initial={{
                scale: 0.9,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            className="bg-surface-800 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Create Group</h2>
                <button
                    onClick={() => setShowCreateGroup(false)}
                    className="text-gray-400 hover:text-white">
                    <ApperIcon name="X" size={20} />
                </button>
            </div>
            <div className="space-y-4">
                <Input
                    label="Group Name"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    required />
                <Input
                    label="Description (Optional)"
                    value={groupDescription}
                    onChange={e => setGroupDescription(e.target.value)}
                    placeholder="What's this group about?" />
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Members ({selectedMembers.length}selected)
                                        </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {users.map(user => <div
                            key={user.Id}
                            onClick={() => toggleMemberSelection(user.Id)}
                            className={`
                        flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors
                        ${selectedMembers.includes(user.Id) ? "bg-primary/20 border border-primary" : "hover:bg-surface-700"}
                      `}>
                            <div
                                className={`
                        w-4 h-4 rounded border-2 flex items-center justify-center
                        ${selectedMembers.includes(user.Id) ? "bg-primary border-primary" : "border-gray-400"}
                      `}>
                                {selectedMembers.includes(user.Id) && <ApperIcon name="Check" size={12} className="text-white" />}
                            </div>
                            <Avatar src={user.avatar} alt={user.name} size="sm" />
                            <span className="text-white">{user.name}</span>
                        </div>)}
                    </div>
                </div>
                <div className="flex space-x-3 pt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setShowCreateGroup(false)}
                        className="flex-1">Cancel
                                        </Button>
                    <Button
                        onClick={handleCreateGroup}
                        disabled={!groupName.trim() || selectedMembers.length < 2 || creatingGroup}
                        className="flex-1">
                        {creatingGroup ? "Creating..." : "Create Group"}
                    </Button>
                </div>
            </div>
        </motion.div>
    </div>}
</div>
  )
}

export default DirectMessageSidebar