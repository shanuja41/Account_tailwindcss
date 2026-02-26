import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';


//MoreVertical to MoreHorizontal

const DropdownMenu = ({ 
  onView, 
  onEdit, 
  onDelete,
  position = 'right' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'View', icon: Eye, onClick: onView, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Edit', icon: Edit2, onClick: onEdit, color: 'text-green-600 dark:text-green-400' },
    { label: 'Delete', icon: Trash2, onClick: onDelete, color: 'text-red-600 dark:text-red-400' },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent row click when clicking the dots
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Row actions"
      >
        <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div 
          className={`
            absolute z-50 mt-1 w-32 bg-white dark:bg-gray-800 
            rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
            py-1 animate-in fade-in zoom-in duration-200
            ${position === 'right' ? 'right-0' : 'left-0'}
          `}
          onClick={(e) => e.stopPropagation()} // Prevent row click when clicking menu
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click
                item.onClick?.();
                setIsOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left text-xs flex items-center gap-2
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                ${item.color}
              `}
            >
              <item.icon size={14} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;