import { ChevronRight, Home } from 'lucide-react';
import Button from './Button'; 

const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions = [],
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <a href="/" className="hover:text-gray-900 dark:hover:text-gray-200">
            <Home size={16} />
          </a>
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight size={14} />
              {item.href ? (
                <a
                  href={item.href}
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 dark:text-gray-200">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Title and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'primary'}
              size={action.size || 'md'}
              icon={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;