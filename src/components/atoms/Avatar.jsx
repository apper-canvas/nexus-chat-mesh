import ApperIcon from '@/components/ApperIcon'

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  status,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  }

  const statusColors = {
    online: 'bg-accent',
    away: 'bg-semantic-warning',
    busy: 'bg-semantic-error',
    offline: 'bg-gray-500'
  }

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  }

  return (
    <div className={`relative ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover bg-surface-600`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-surface-600 flex items-center justify-center`}>
          <ApperIcon 
            name="User" 
            size={size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : 24} 
            className="text-gray-400" 
          />
        </div>
      )}
      {status && (
        <div className={`
          absolute -bottom-0.5 -right-0.5 
          ${statusSizes[size]} 
          ${statusColors[status]} 
          rounded-full border-2 border-surface-800
        `} />
      )}
    </div>
  )
}

export default Avatar