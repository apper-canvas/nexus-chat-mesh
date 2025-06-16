import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label,
  error,
  icon,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={16} className="text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            block w-full px-3 py-2 bg-surface-700 border border-surface-600 rounded-md
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-semantic-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-semantic-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input