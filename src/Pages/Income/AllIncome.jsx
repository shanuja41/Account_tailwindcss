import { useState, useMemo } from 'react';
import { Plus, Download, Calendar } from 'lucide-react';
import PageHeader from '../../Components/Ui/PageHeader';
import SearchBar from '../../Components/Ui/SearchBar';
import FilterBar from '../../Components/Ui/FilterBar';
import Table from '../../Components/Ui/Table';
import Pagination from '../../Components/Ui/Pagination';
import Button from '../../Components/Ui/Button';

const AllIncome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    category: '',
    status: ''
  });

  // Sample data
  const incomeData = [
    { id: 1, source: 'Client Payment - ABC Corp', category: 'Services', amount: 5000, date: '2024-01-15', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 2, source: 'Product Sales - XYZ Ltd', category: 'Sales', amount: 3200, date: '2024-01-12', status: 'Received', paymentMethod: 'Credit Card' },
    { id: 3, source: 'Consulting Fee - TechStart', category: 'Consulting', amount: 2500, date: '2024-01-10', status: 'Pending', paymentMethod: 'Invoice' },
    { id: 4, source: 'Subscription Revenue - Netflix', category: 'Recurring', amount: 899, date: '2024-01-08', status: 'Received', paymentMethod: 'ACH' },
    { id: 5, source: 'Affiliate Commission - Amazon', category: 'Commission', amount: 450, date: '2024-01-05', status: 'Received', paymentMethod: 'PayPal' },
    { id: 6, source: 'Interest Income - Savings', category: 'Investment', amount: 120, date: '2024-01-03', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 7, source: 'Refund - Overpayment', category: 'Refund', amount: 75, date: '2024-01-01', status: 'Processed', paymentMethod: 'Credit Card' },
    { id: 8, source: 'Web Development - Client A', category: 'Services', amount: 3500, date: '2024-01-18', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 9, source: 'Product Sales - TechGear', category: 'Sales', amount: 1200, date: '2024-01-19', status: 'Received', paymentMethod: 'Credit Card' },
    { id: 10, source: 'Consulting - Startup Inc', category: 'Consulting', amount: 1800, date: '2024-01-20', status: 'Pending', paymentMethod: 'Invoice' },
    { id: 11, source: 'Monthly Retainer - Client B', category: 'Recurring', amount: 2000, date: '2024-01-21', status: 'Received', paymentMethod: 'ACH' },
    { id: 12, source: 'Affiliate - Shopify', category: 'Commission', amount: 320, date: '2024-01-22', status: 'Received', paymentMethod: 'PayPal' },
    { id: 13, source: 'Dividend Income - Stocks', category: 'Investment', amount: 450, date: '2024-01-23', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 14, source: 'Refund - Software License', category: 'Refund', amount: 299, date: '2024-01-24', status: 'Processed', paymentMethod: 'Credit Card' },
    { id: 15, source: 'Design Services - Creative Co', category: 'Services', amount: 2800, date: '2024-01-25', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 16, source: 'E-commerce Sales - Fashion', category: 'Sales', amount: 950, date: '2024-01-26', status: 'Received', paymentMethod: 'Credit Card' },
    { id: 17, source: 'Business Consulting - SME', category: 'Consulting', amount: 4200, date: '2024-01-27', status: 'Pending', paymentMethod: 'Invoice' },
    { id: 18, source: 'SaaS Subscription - Monthly', category: 'Recurring', amount: 149, date: '2024-01-28', status: 'Received', paymentMethod: 'ACH' },
    { id: 19, source: 'Referral Bonus - Partner', category: 'Commission', amount: 500, date: '2024-01-29', status: 'Received', paymentMethod: 'PayPal' },
    { id: 20, source: 'Real Estate Investment', category: 'Investment', amount: 1500, date: '2024-01-30', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 21, source: 'Refund - Hardware Purchase', category: 'Refund', amount: 899, date: '2024-01-31', status: 'Processed', paymentMethod: 'Credit Card' },
    { id: 22, source: 'Marketing Services - Agency', category: 'Services', amount: 5200, date: '2024-02-01', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 23, source: 'Product Sales - Electronics', category: 'Sales', amount: 2100, date: '2024-02-02', status: 'Received', paymentMethod: 'Credit Card' },
    { id: 24, source: 'IT Consulting - Enterprise', category: 'Consulting', amount: 6800, date: '2024-02-03', status: 'Pending', paymentMethod: 'Invoice' },
    { id: 25, source: 'Annual Subscription - Premium', category: 'Recurring', amount: 999, date: '2024-02-04', status: 'Received', paymentMethod: 'ACH' },
    { id: 26, source: 'Affiliate - Digital Products', category: 'Commission', amount: 780, date: '2024-02-05', status: 'Received', paymentMethod: 'PayPal' },
    { id: 27, source: 'Cryptocurrency Gains', category: 'Investment', amount: 2300, date: '2024-02-06', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 28, source: 'Refund - Travel Expenses', category: 'Refund', amount: 450, date: '2024-02-07', status: 'Processed', paymentMethod: 'Credit Card' },
    { id: 29, source: 'Training Services - Corporate', category: 'Services', amount: 3700, date: '2024-02-08', status: 'Received', paymentMethod: 'Bank Transfer' },
    { id: 30, source: 'Product Sales - Accessories', category: 'Sales', amount: 670, date: '2024-02-09', status: 'Received', paymentMethod: 'Credit Card' },
  ];

  // Action handlers
  const handleView = (row) => {
    console.log('View row:', row);
  };

  const handleEdit = (row) => {
    console.log('Edit row:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  // Table columns configuration
  const columns = [
    { 
      key: 'source', 
      title: 'Source',
      width: '25%',
      render: (value) => (
        <div className="font-medium text-gray-900 dark:text-white">{value}</div>
      )
    },
    { 
      key: 'category', 
      title: 'Category',
      width: '12%',
      render: (value) => (
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          {value}
        </span>
      )
    },
    { 
      key: 'amount', 
      title: 'Amount',
      width: '12%',
      render: (value) => (
        <span className="font-semibold text-green-600 dark:text-green-400">
          ${value.toLocaleString()}
        </span>
      )
    },
    { 
      key: 'date', 
      title: 'Date',
      width: '12%',
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
      width: '12%',
      render: (value) => {
        const statusColors = {
          'Received': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          'Processed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        };
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'paymentMethod', 
      title: 'Payment Method',
      width: '15%',
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
        { value: 'investment', label: 'Investment' },
        { value: 'refund', label: 'Refund' }
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
      const matchesSearch = searchQuery === '' || 
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filters.category === '' || 
        item.category.toLowerCase() === filters.category.toLowerCase();

      const matchesStatus = filters.status === '' || 
        item.status.toLowerCase() === filters.status.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ category: '', status: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
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
   <div className="w-full px-4">
      {/* Page Header */}
      <div className="mb-6">
        <PageHeader
          title="All Income"
          subtitle="Track and manage all your income transactions"
          breadcrumbs={breadcrumbs}
          actions={pageActions}
        />
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="w-full lg:w-96">
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

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Income Card */}
        <div className="col-span-1">
          <div className="h-full rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              ${filteredData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
            </p>
            <p className="text-xs text-green-600 mt-2">↑ 12.5% from last month</p>
          </div>
        </div>
        
        {/* Transactions Card */}
        <div className="col-span-1">
          <div className="h-full rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {filteredData.length}
            </p>
            <p className="text-xs text-gray-500 mt-2">{pageSize} per page</p>
          </div>
        </div>
        
        {/* Average Amount Card */}
        <div className="col-span-1">
          <div className="h-full rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Amount</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              ${(filteredData.reduce((sum, item) => sum + item.amount, 0) / filteredData.length || 0).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-2">per transaction</p>
          </div>
        </div>
        
        {/* Pending Card */}
        <div className="col-span-1">
          <div className="h-full rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {filteredData.filter(item => item.status === 'Pending').length}
            </p>
            <p className="text-xs text-yellow-600 mt-2">awaiting payment</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Table Container */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={paginatedData}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showActions={true}
            onRowClick={(row) => console.log('Row clicked:', row)}
            emptyMessage="No income transactions found"
          />
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredData.length}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              pageSizeOptions={[10, 20, 30, 50]}
              showFirstLast={true}
              className="px-4 py-3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIncome;