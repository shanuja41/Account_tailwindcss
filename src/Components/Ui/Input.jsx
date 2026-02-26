import { Search } from 'lucide-react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon size={18} className="text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 
            placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 
            focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 
            disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-800 
            dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Input;