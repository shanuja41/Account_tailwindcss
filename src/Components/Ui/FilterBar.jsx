import { Filter, X } from 'lucide-react';
import Button from './Button';
import Input from './Input';

const FilterBar = ({
  filters,
  onFilterChange,
  onClearFilters,
  showFilterButton = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {showFilterButton && (
        <Button variant="outline" size="sm" icon={Filter}>
          Filters
        </Button>
      )}
      
      {filters.map((filter, index) => (
        <div key={index} className="flex items-center gap-2">
          {filter.type === 'select' ? (
            <select
              value={filter.value}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">{filter.placeholder}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              type={filter.type || 'text'}
              placeholder={filter.placeholder}
              value={filter.value}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              size="sm"
            />
          )}
          
          {filter.value && (
            <button
              onClick={() => onFilterChange(filter.key, '')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ))}
      
      {onClearFilters && (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterBar;