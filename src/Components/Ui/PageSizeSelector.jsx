import { ChevronDown } from 'lucide-react';

const PageSizeSelector = ({ 
  pageSize, 
  onPageSizeChange, 
  options = [10, 20, 30, 50, 100],
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 dark:text-gray-400">Show</span>
      <div className="relative">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown 
          size={14} 
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" 
        />
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
    </div>
  );
};

export default PageSizeSelector;