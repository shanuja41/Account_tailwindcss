import { useState, useMemo } from 'react';
import { Plus, Download, Filter, Calendar } from 'lucide-react';
import PageHeader from '../Components/Ui/PageHeader';
import SearchBar from '../Components/Ui/SearchBar';
import FilterBar from '../Components/Ui/FilterBar';
import Table from '../Components/Ui/Table';
import Pagination from '../Components/Ui/Pagination';
import Button from '../Components/Ui/Button';

const Income = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: '',
    status: ''
  });
  
  const itemsPerPage = 10;

  // Sample data - replace with actual data from your backend
  const incomeData = [
    { id: 1, source: 'Client Payment - ABC Corp', category: 'Services', amount: 5000, date: '2024-01-15', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 2, source: 'Product Sales - XYZ Ltd', category: 'Sales', amount: 3200, date: '2024-01-12', status: 'Received', paymentMethod: 'Credit Card' },
    { id: 3, source: 'Consulting Fee - TechStart', category: 'Consulting', amount: 2500, date: '2024-01-10', status: 'Pending', paymentMethod: 'Invoice' },
    { id: 4, source: 'Subscription Revenue', category: 'Recurring', amount: 899, date: '2024-01-08', status: 'Received', paymentMethod: 'ACH' },
    { id: 5, source: 'Affiliate Commission', category: 'Commission', amount: 450, date: '2024-01-05', status: 'Received', paymentMethod: 'PayPal' },
    { id: 6, source: 'Interest Income', category: 'Investment', amount: 120, date: '2024-01-03', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 7, source: 'Refund - Overpayment', category: 'Refund', amount: 75, date: '2024-01-01', status: 'Processed', paymentMethod: 'Credit Card' },
  ];

  // Table columns configuration
  const columns = [
    { 
      key: 'source', 
      title: 'Source',
      render: (value) => (
        <div className="font-medium text-gray-900 dark:text-white">{value}</div>
      )
    },
    { 
      key: 'category', 
      title: 'Category',
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          {value}
        </span>
      )
    },
    { 
      key: 'amount', 
      title: 'Amount',
      render: (value) => (
        <span className="font-semibold text-green-600 dark:text-green-400">
          ${value.toLocaleString()}
        </span>
      )
    },
    { 
      key: 'date', 
      title: 'Date',
      render: (value) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => {
        const statusColors = {
          'Received': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          'Processed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'paymentMethod', 
      title: 'Payment Method',
      render: (value) => (
        <span className="text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
  ];

  // Filter options
  const filterOptions = [
    {
      key: 'category',
      type: 'select',
      placeholder: 'All Categories',
      value: filters.category,
      options: [
        { value: 'services', label: 'Services' },
        { value: 'sales', label: 'Sales' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'recurring', label: 'Recurring' },
        { value: 'commission', label: 'Commission' },
        { value: 'investment', label: 'Investment' }
      ]
    },
    {
      key: 'status',
      type: 'select',
      placeholder: 'All Status',
      value: filters.status,
      options: [
        { value: 'received', label: 'Received' },
        { value: 'pending', label: 'Pending' },
        { value: 'processed', label: 'Processed' }
      ]
    }
  ];

  // Filter and search logic
  const filteredData = useMemo(() => {
    return incomeData.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = filters.category === '' || 
        item.category.toLowerCase() === filters.category.toLowerCase();

      // Status filter
      const matchesStatus = filters.status === '' || 
        item.status.toLowerCase() === filters.status.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, filters, incomeData]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleClearFilters = () => {
    setFilters({ category: '', dateRange: '', status: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Income', href: '/income' },
    { label: 'All Income' }
  ];

  const pageActions = [
    {
      label: 'Add Income',
      icon: Plus,
      variant: 'primary',
      onClick: () => console.log('Add income clicked')
    },
    {
      label: 'Export',
      icon: Download,
      variant: 'outline',
      onClick: () => console.log('Export clicked')
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Income"
        subtitle="Track and manage all your income transactions"
        breadcrumbs={breadcrumbs}
        actions={pageActions}
      />

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-96">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search income by source, category..."
          />
        </div>
        
        <div className="flex items-center gap-3">
          <FilterBar
            filters={filterOptions}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          
          <Button variant="outline" size="sm" icon={Calendar}>
            Date Range
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${filteredData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-1">↑ 12.5% from last month</p>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredData.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">{itemsPerPage} per page</p>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Amount</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${(filteredData.reduce((sum, item) => sum + item.amount, 0) / filteredData.length || 0).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">per transaction</p>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredData.filter(item => item.status === 'Pending').length}
          </p>
          <p className="text-xs text-yellow-600 mt-1">awaiting payment</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
        <Table
          columns={columns}
          data={paginatedData}
          onRowClick={(row) => console.log('Row clicked:', row)}
          emptyMessage="No income transactions found"
        />

        {/* Pagination */}
        {filteredData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            className="border-t border-gray-200 dark:border-gray-700"
          />
        )}
      </div>
    </div>
  );
};

export default Income;