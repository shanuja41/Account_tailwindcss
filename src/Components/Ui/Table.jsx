import DropdownMenu from './DropdownMenu';

const Table = ({ 
  columns, 
  data, 
  onRowClick,
  onView,
  onEdit,
  onDelete,
  showActions = true,
  isLoading = false,
  emptyMessage = 'No data available'
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't add actions column to the header, just render it in the body
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                style={column.width ? { width: column.width } : {}}
              >
                {column.title}
              </th>
            ))}
            {/* Empty header for actions column - no text, minimal width */}
            {showActions && (
              <th className="px-2 py-3 w-10" />
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                
                {/* Actions Column - Only the dots, no padding */}
                {showActions && (
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                    <DropdownMenu
                      onView={() => onView?.(row)}
                      onEdit={() => onEdit?.(row)}
                      onDelete={() => onDelete?.(row)}
                      position="right"
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;