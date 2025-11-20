import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useOwnerAuth from "./hooks/useOwnerAuth.js";
import ownerApi from "../../api/client.js";

// Primary accent color: #FF7A18
const PRIMARY_COLOR = "#FF7A18";

/**
 * OwnerSidebar Component
 * Responsive sidebar navigation for owner portal
 */
const OwnerSidebar = ({ isOpen, onClose, unreadCount }) => {
  const navigate = useNavigate();
  const { logout } = useOwnerAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/owner/login");
  };

  const navLinks = [
    { path: "/owner/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/owner/orders", label: "Orders", icon: "📦" },
    {
      path: "/owner/notifications",
      label: "Notifications",
      icon: "🔔",
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { path: "/owner/inventory", label: "Inventory", icon: "📋" },
    { path: "/owner/staff", label: "Staff", icon: "👥" },
    { path: "/owner/feedback", label: "Feedback", icon: "💬" },
    { path: "/owner/suppliers", label: "Suppliers", icon: "🚚" },
    { path: "/owner/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
              Yumify
            </h1>
            <p className="text-sm text-gray-500 mt-1">Owner Portal</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4" aria-label="Navigation menu">
            <ul className="space-y-1 px-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-white font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    style={({ isActive }) =>
                      isActive ? { backgroundColor: PRIMARY_COLOR } : {}
                    }
                    aria-current="page"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg" aria-hidden="true">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    {link.badge && (
                      <span
                        className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                        aria-label={`${link.badge} unread notifications`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              aria-label="Logout"
            >
              <span className="text-lg" aria-hidden="true">
                🚪
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

/**
 * OwnerTopbar Component
 * Top navigation bar with app name and profile
 */
const OwnerTopbar = ({ onMenuClick, owner }) => {
  // Get owner's initials for avatar
  const getInitials = (name) => {
    if (!name) return "O";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200 z-30 sticky top-0"
      role="banner"
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* App/Restaurant Name */}
        <div className="flex-1 lg:flex-none">
          <h2
            className="text-xl font-bold lg:text-2xl"
            style={{ color: PRIMARY_COLOR }}
          >
            {owner?.restaurant?.name || "Yumify"}
          </h2>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: PRIMARY_COLOR }}
            aria-label={`Profile for ${owner?.name || "Owner"}`}
            title={owner?.name || "Owner"}
          >
            {getInitials(owner?.name)}
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * DevToolsPanel Component
 * Development tools (only visible in non-production)
 */
const DevToolsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (import.meta.env.NODE_ENV === "production") {
    return null;
  }

  const handleSimulateOrder = async () => {
    try {
      await ownerApi.simulateNewOrder();
      alert("New order simulated!");
    } catch (error) {
      console.error("Failed to simulate order:", error);
      alert("Failed to simulate order");
    }
  };

  const handleSimulateNotification = async () => {
    try {
      await ownerApi.simulateNewNotification();
      alert("New notification simulated!");
    } catch (error) {
      console.error("Failed to simulate notification:", error);
      alert("Failed to simulate notification");
    }
  };

  const handleClearToken = () => {
    localStorage.removeItem("owner_token");
    alert("owner_token cleared! Please refresh the page.");
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" aria-label="Development tools">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200 min-w-[200px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-gray-700">Dev Tools</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close dev tools"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleSimulateOrder}
              className="w-full px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              aria-label="Simulate new order"
            >
              Simulate Order
            </button>
            <button
              onClick={handleSimulateNotification}
              className="w-full px-3 py-2 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              aria-label="Simulate new notification"
            >
              Simulate Notification
            </button>
            <button
              onClick={handleClearToken}
              className="w-full px-3 py-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              aria-label="Clear authentication token"
            >
              Clear owner_token
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          aria-label="Open dev tools"
          title="Development Tools"
        >
          🔧
        </button>
      )}
    </div>
  );
};

/**
 * OwnerLayout Component
 * Main layout wrapper for owner portal pages
 * Includes sidebar, topbar, and dev tools
 */
const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { owner } = useOwnerAuth();

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const notifications = await ownerApi.getNotifications();
        const unread = notifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchUnreadCount();

    // Subscribe to notification events to update count in real-time
    const unsubscribe = ownerApi.subscribe((event) => {
      if (event.type === "new_notification") {
        setUnreadCount((prev) => prev + 1);
      }
    });

    // Fetch count periodically (every 30 seconds)
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <OwnerSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        unreadCount={unreadCount}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <OwnerTopbar onMenuClick={toggleSidebar} owner={owner} />

        {/* Page Content */}
        <main className="p-4 lg:p-6" role="main">
          <Outlet />
        </main>
      </div>

      {/* Dev Tools Panel */}
      <DevToolsPanel />
    </div>
  );
};

export default OwnerLayout;

