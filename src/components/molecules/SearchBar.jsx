import { useState } from 'react'
import Input from '@/components/atoms/Input'

const SearchBar = ({ onSearch, placeholder = "Search messages..." }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    // Debounce search
    clearTimeout(window.searchTimeout)
    window.searchTimeout = setTimeout(() => {
      onSearch(value)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        icon="Search"
        className="w-full"
      />
    </form>
  )
}

export default SearchBar