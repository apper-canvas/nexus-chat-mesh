import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SearchBar from '@/components/molecules/SearchBar'
import MessageItem from '@/components/molecules/MessageItem'
import ApperIcon from '@/components/ApperIcon'
import { messageService, channelService } from '@/services'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const channelData = await channelService.getAll()
        setChannels(channelData)
      } catch (error) {
        console.error('Failed to load channels:', error)
      }
    }
    loadChannels()
  }, [])

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery)
    
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const searchResults = await messageService.search(
        searchQuery, 
        selectedChannel?.Id
      )
      setResults(searchResults)
    } catch (error) {
      toast.error('Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const getChannelName = (channelId) => {
    const channel = channels.find(c => c.Id === channelId)
    return channel ? channel.name : 'Unknown Channel'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col overflow-hidden"
    >
      {/* Search Header */}
      <div className="border-b border-surface-700 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold text-white mb-4">Search Messages</h1>
          
          <div className="space-y-4">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for messages, files, or people..."
            />
            
            {/* Channel Filter */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">Filter by channel:</span>
              <select
                value={selectedChannel?.Id || ''}
                onChange={(e) => {
                  const channelId = e.target.value
                  const channel = channels.find(c => c.Id === parseInt(channelId, 10))
                  setSelectedChannel(channel || null)
                  if (query.trim()) {
                    handleSearch(query)
                  }
                }}
                className="px-3 py-1 bg-surface-700 border border-surface-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All channels</option>
                {channels.map(channel => (
                  <option key={channel.Id} value={channel.Id}>
                    #{channel.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Searching...</p>
            </div>
          </div>
        ) : query && results.length === 0 && !loading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <ApperIcon name="Search" size={48} className="text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
              <p className="text-gray-400">
                Try searching with different keywords or check a different channel.
              </p>
            </motion.div>
          </div>
        ) : !query ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <ApperIcon name="Search" size={48} className="text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Search Messages</h3>
              <p className="text-gray-400 max-w-md">
                Enter a search term to find messages across all channels or filter by a specific channel.
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="p-4">
              <p className="text-sm text-gray-400 mb-4">
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                {selectedChannel && ` in #${selectedChannel.name}`}
              </p>
            </div>

            <div className="space-y-2">
              {results.map((message, index) => (
                <motion.div
                  key={message.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-surface-800/50 border border-surface-700 rounded-lg overflow-hidden"
                >
                  <div className="px-4 py-2 bg-surface-800 border-b border-surface-700">
                    <div className="flex items-center space-x-2 text-sm">
                      <ApperIcon name="Hash" size={14} className="text-gray-400" />
                      <span className="text-gray-400">{getChannelName(message.channelId)}</span>
                    </div>
                  </div>
                  <MessageItem message={message} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Search