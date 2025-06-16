import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { userService } from '@/services'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'online'
  })

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)
      try {
        // Load current user (ID: 1)
        const userData = await userService.getById(1)
        setUser(userData)
        setFormData({
          name: userData.name,
          email: userData.email,
          status: userData.status
        })
      } catch (error) {
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const updatedUser = await userService.update(1, formData)
      setUser(updatedUser)
      setEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      status: user.status
    })
    setEditing(false)
  }

  const statusOptions = [
    { value: 'online', label: 'Online', color: 'bg-accent' },
    { value: 'away', label: 'Away', color: 'bg-semantic-warning' },
    { value: 'busy', label: 'Busy', color: 'bg-semantic-error' },
    { value: 'offline', label: 'Offline', color: 'bg-gray-500' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full overflow-y-auto custom-scrollbar"
    >
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-surface-800 rounded-lg border border-surface-700 overflow-hidden">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-primary to-primary-hover relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative -mt-16">
                <Avatar 
                  src={user?.avatar} 
                  alt={user?.name} 
                  status={user?.status}
                  size="xl"
                  className="ring-4 ring-surface-800"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg transition-colors">
                  <ApperIcon name="Camera" size={16} />
                </button>
              </div>
            </div>

            {/* Edit Toggle */}
            <div className="flex justify-center mt-4 mb-6">
              {!editing ? (
                <Button onClick={() => setEditing(true)} icon="Edit">
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="space-y-6">
              {editing ? (
                <>
                  <Input
                    label="Display Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Status
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {statusOptions.map(option => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, status: option.value }))}
                          className={`
                            flex items-center space-x-3 p-3 rounded-lg border transition-all
                            ${formData.status === option.value
                              ? 'border-primary bg-primary/10'
                              : 'border-surface-600 hover:border-surface-500'
                            }
                          `}
                        >
                          <div className={`w-3 h-3 rounded-full ${option.color}`} />
                          <span className="text-white">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white">{user?.name}</h2>
                    <p className="text-gray-400 mt-1">{user?.email}</p>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      statusOptions.find(s => s.value === user?.status)?.color
                    }`} />
                    <span className="text-white capitalize">{user?.status}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="mt-8 space-y-6">
          <div className="bg-surface-800 rounded-lg border border-surface-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Dark Mode</p>
                  <p className="text-sm text-gray-400">Use dark theme across the application</p>
                </div>
                <button className="w-12 h-6 bg-primary rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Desktop Notifications</p>
                  <p className="text-sm text-gray-400">Show notifications for new messages</p>
                </div>
                <button className="w-12 h-6 bg-surface-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Sound Effects</p>
                  <p className="text-sm text-gray-400">Play sounds for message notifications</p>
                </div>
                <button className="w-12 h-6 bg-primary rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-800 rounded-lg border border-surface-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start" icon="Key">
                Change Password
              </Button>
              <Button variant="ghost" className="w-full justify-start" icon="Download">
                Export Data
              </Button>
              <Button variant="danger" className="w-full justify-start" icon="Trash2">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile