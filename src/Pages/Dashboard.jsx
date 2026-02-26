import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Receipt,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$45,231.89', 
      change: '+20.1%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
    },
    { 
      title: 'Total Expenses', 
      value: '$23,456.78', 
      change: '-12.5%', 
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
    },
    { 
      title: 'Net Profit', 
      value: '$21,775.11', 
      change: '+15.3%', 
      trend: 'up',
      icon: Wallet,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
    },
    { 
      title: 'Pending Invoices', 
      value: '12', 
      change: '-3', 
      trend: 'down',
      icon: Receipt,
      color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
  ];

  const recentTransactions = [
    { id: 1, description: 'Client Payment - ABC Corp', amount: '+$5,000', type: 'income', date: '2024-01-15' },
    { id: 2, description: 'Office Rent', amount: '-$2,500', type: 'expense', date: '2024-01-14' },
    { id: 3, description: 'Software Subscription', amount: '-$299', type: 'expense', date: '2024-01-13' },
    { id: 4, description: 'Client Payment - XYZ Ltd', amount: '+$3,200', type: 'income', date: '2024-01-12' },
    { id: 5, description: 'Utilities', amount: '-$450', type: 'expense', date: '2024-01-11' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, John! Here's your financial overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight size={16} className="text-green-500" />
                  ) : (
                    <ArrowDownRight size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
              </div>
              <span className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;