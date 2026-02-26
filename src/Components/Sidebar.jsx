import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  CreditCard,
  Calculator,
  PieChart,
  Download,
  Upload,
  UserPlus,
  UserCog,
  FileSignature,
  FileSpreadsheet,
  FolderOpen,
  Archive,
  Clock,
  AlertCircle,
  Bell,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Check if a menu item or its subitem is active
  const isActive = (itemId, subItemId = null) => {
    if (subItemId) {
      return location.pathname === subItemId;
    }
    return (
      location.pathname === itemId || location.pathname.startsWith(`${itemId}/`)
    );
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      submenu: [
        {
          id: "overview",
          label: "Overview",
          icon: PieChart,
          path: "/dashboard/overview",
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: BarChart3,
          path: "/dashboard/analytics",
        },
        {
          id: "summary",
          label: "Summary",
          icon: Calculator,
          path: "/dashboard/summary",
        },
      ],
    },
    {
      id: "income",
      label: "Income",
      icon: TrendingUp,
      path: "/income",
      submenu: [
        {
          id: "all-income",
          label: "All Income",
          icon: Wallet,
          path: "/Income/all",
        },
        {
          id: "add-income",
          label: "Add Income",
          icon: Upload,
          path: "/income/add",
        },
        {
          id: "recurring",
          label: "Recurring Income",
          icon: CreditCard,
          path: "/income/recurring",
        },
        {
          id: "categories",
          label: "Categories",
          icon: FolderOpen,
          path: "/income/categories",
        },
      ],
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: TrendingDown,
      path: "/expenses",
      submenu: [
        {
          id: "all-expenses",
          label: "All Expenses",
          icon: Wallet,
          path: "/expenses/all",
        },
        {
          id: "add-expense",
          label: "Add Expense",
          icon: Download,
          path: "/expenses/add",
        },
        {
          id: "bills",
          label: "Bills & Utilities",
          icon: FileText,
          path: "/expenses/bills",
        },
        {
          id: "categories",
          label: "Categories",
          icon: FolderOpen,
          path: "/expenses/categories",
        },
      ],
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: Receipt,
      path: "/invoices",
      submenu: [
        {
          id: "all-invoices",
          label: "All Invoices",
          icon: FileText,
          path: "/invoices/all",
        },
        {
          id: "create-invoice",
          label: "Create Invoice",
          icon: FileSignature,
          path: "/invoices/create",
        },
        {
          id: "pending",
          label: "Pending",
          icon: Clock,
          path: "/invoices/pending",
        },
        { id: "paid", label: "Paid", icon: CreditCard, path: "/invoices/paid" },
        {
          id: "overdue",
          label: "Overdue",
          icon: AlertCircle,
          path: "/invoices/overdue",
        },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      path: "/reports",
      submenu: [
        {
          id: "profit-loss",
          label: "Profit & Loss",
          icon: TrendingUp,
          path: "/reports/profit-loss",
        },
        {
          id: "balance-sheet",
          label: "Balance Sheet",
          icon: FileSpreadsheet,
          path: "/reports/balance-sheet",
        },
        {
          id: "cash-flow",
          label: "Cash Flow",
          icon: Wallet,
          path: "/reports/cash-flow",
        },
        {
          id: "tax-reports",
          label: "Tax Reports",
          icon: Calculator,
          path: "/reports/tax",
        },
        {
          id: "custom-reports",
          label: "Custom Reports",
          icon: PieChart,
          path: "/reports/custom",
        },
      ],
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: Wallet,
      path: "/transactions",
      submenu: [
        {
          id: "all-transactions",
          label: "All Transactions",
          icon: Wallet,
          path: "/transactions/all",
        },
        {
          id: "bank-transfers",
          label: "Bank Transfers",
          icon: CreditCard,
          path: "/transactions/bank-transfers",
        },
        {
          id: "reconcile",
          label: "Reconcile",
          icon: Calculator,
          path: "/transactions/reconcile",
        },
        {
          id: "import",
          label: "Import",
          icon: Download,
          path: "/transactions/import",
        },
        {
          id: "export",
          label: "Export",
          icon: Upload,
          path: "/transactions/export",
        },
      ],
    },
    {
      id: "clients",
      label: "Clients",
      icon: Users,
      path: "/clients",
      submenu: [
        {
          id: "all-clients",
          label: "All Clients",
          icon: Users,
          path: "/clients/all",
        },
        {
          id: "add-client",
          label: "Add Client",
          icon: UserPlus,
          path: "/clients/add",
        },
        {
          id: "manage-clients",
          label: "Manage Clients",
          icon: UserCog,
          path: "/clients/manage",
        },
        {
          id: "client-payments",
          label: "Client Payments",
          icon: CreditCard,
          path: "/clients/payments",
        },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      path: "/documents",
      submenu: [
        {
          id: "all-documents",
          label: "All Documents",
          icon: FolderOpen,
          path: "/documents/all",
        },
        {
          id: "upload",
          label: "Upload",
          icon: Upload,
          path: "/documents/upload",
        },
        {
          id: "templates",
          label: "Templates",
          icon: FileText,
          path: "/documents/templates",
        },
        {
          id: "archive",
          label: "Archive",
          icon: Archive,
          path: "/documents/archive",
        },
      ],
    },
  ];

  const bottomMenuItems = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/settings",
      submenu: [
        {
          id: "profile",
          label: "Profile",
          icon: Users,
          path: "/settings/profile",
        },
        {
          id: "company",
          label: "Company Info",
          icon: FileText,
          path: "/settings/company",
        },
        {
          id: "tax-settings",
          label: "Tax Settings",
          icon: Calculator,
          path: "/settings/tax",
        },
        {
          id: "users",
          label: "Users & Roles",
          icon: UserCog,
          path: "/settings/users",
        },
        {
          id: "notifications",
          label: "Notifications",
          icon: Bell,
          path: "/settings/notifications",
        },
        {
          id: "backup",
          label: "Backup & Restore",
          icon: Archive,
          path: "/settings/backup",
        },
      ],
    },
    // { id: 'logout', label: 'Logout', icon: LogOut, path: '/logout', action: 'logout' },
  ];

  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleNavigation = (path, action = null) => {
    if (action === "logout") {
      // Handle logout logic here
      console.log("Logging out...");
      // Clear user data, redirect to login, etc.
    } else if (path) {
      navigate(path);
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.submenu && isOpen) {
      toggleSubmenu(item.id);
    } else if (item.path) {
      handleNavigation(item.path, item.action);
    }
  };

  const handleSubmenuItemClick = (subItem) => {
    handleNavigation(subItem.path);
  };

  // Render submenu items
  const renderSubmenu = (item) => {
    if (!item.submenu || !expandedMenus[item.id]) return null;

    return (
      <div className="ml-8 mt-1 space-y-1">
        {item.submenu.map((subItem) => (
          <button
            key={subItem.id}
            onClick={() => handleSubmenuItemClick(subItem)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
              ${
                isActive(subItem.path)
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              ${!isOpen && "lg:justify-center"}
            `}
          >
            <subItem.icon size={16} />
            {isOpen && <span>{subItem.label}</span>}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-30 h-screen bg-white dark:bg-gray-800 
        transition-all duration-300 ease-in-out shadow-lg overflow-y-auto overflow-x-hidden
        ${isOpen ? "w-64" : "w-20"}
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div
            className={`flex items-center gap-2 ${!isOpen && "lg:justify-center w-full"}`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {isOpen && (
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                AccountingSYS
              </span>
            )}
          </div>

          {/* Toggle Button - Desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isOpen ? (
              <ChevronLeft
                size={20}
                className="text-gray-700 dark:text-gray-300"
              />
            ) : (
              <ChevronRight
                size={20}
                className="text-gray-700 dark:text-gray-300"
              />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col justify-between py-4 min-h-[calc(100vh-64px)]">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item)}
                  className={`
                    w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors
                    ${
                      isActive(item.path) || expandedMenus[item.id]
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                    ${!isOpen && "lg:justify-center"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={20}
                      className={
                        isActive(item.path)
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }
                    />
                    {isOpen && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </div>
                  {isOpen && item.submenu && (
                    <span>
                      {expandedMenus[item.id] ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRightIcon size={16} className="text-gray-500" />
                      )}
                    </span>
                  )}
                </button>
                {isOpen && renderSubmenu(item)}
              </div>
            ))}
          </div>

          {/* Bottom Menu */}
          <div className="space-y-1 px-2 mt-4">
            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

            {bottomMenuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() =>
                    item.submenu
                      ? toggleSubmenu(item.id)
                      : handleNavigation(item.path, item.action)
                  }
                  className={`
                    w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors
                    ${
                      isActive(item.path) || expandedMenus[item.id]
                        ? item.id === "logout"
                          ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30"
                          : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : item.id === "logout"
                          ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                    ${!isOpen && "lg:justify-center"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={20}
                      className={
                        item.id === "logout"
                          ? "text-red-600 dark:text-red-400"
                          : isActive(item.path) || expandedMenus[item.id]
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300"
                      }
                    />
                    {isOpen && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </div>
                  {isOpen && item.submenu && (
                    <span>
                      {expandedMenus[item.id] ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRightIcon size={16} className="text-gray-500" />
                      )}
                    </span>
                  )}
                </button>
                {isOpen && renderSubmenu(item)}
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
