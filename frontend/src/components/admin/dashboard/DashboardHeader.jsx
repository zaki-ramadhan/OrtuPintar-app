import React, { useEffect, useRef } from "react";

function NotificationBell({
  notificationOpen,
  setNotificationOpen,
  notifications,
  onRead,
  isLoading = false,
  onRefresh,
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    }
    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [notificationOpen, setNotificationOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={() => setNotificationOpen(!notificationOpen)}
        aria-label="Show notifications"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow">
            {unreadCount}
          </span>
        )}
      </button>
      {notificationOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b font-semibold text-gray-900 flex justify-between items-center">
            <span>Notifications</span>
            <div className="flex items-center space-x-2">
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="text-xs text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
                  title="Refresh notifications"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              )}
              {unreadCount > 0 && (
                <button
                  onClick={onRead}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
          <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
            {isLoading ? (
              <li className="px-4 py-6 text-center text-gray-400 text-sm">
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading notifications...
                </div>
              </li>
            ) : notifications.length > 0 ? (
              notifications.map((notif, idx) => (
                <li
                  key={idx}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-2 ${
                    notif.read ? "bg-white" : "bg-purple-50"
                  }`}
                >
                  {!notif.read && (
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0"></span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        notif.read
                          ? "text-gray-800"
                          : "font-bold text-purple-900"
                      }`}
                    >
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-gray-400 text-sm">
                No notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function DashboardHeader({
  setLogoutModal,
  user,
  sidebarOpen,
  setSidebarOpen,
  notificationOpen,
  setNotificationOpen,
  notifications,
  onReadNotifications,
  isModalOpen = false, // New prop to control blur effect
  notificationsLoading = false, // New prop for loading state
  onRefreshNotifications, // New prop for refresh function
}) {
  const handleLogout = () => {
    setLogoutModal(true);
  };
  return (
    <header
      className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
        isModalOpen ? "opacity-75" : ""
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
            >
              {/* Hamburger Icon */}
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
                  sidebarOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  display: sidebarOpen ? "none" : "block",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              {/* Close Icon */}
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
                  sidebarOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  display: sidebarOpen ? "block" : "none",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  OrtuPintar Admin
                </h1>
                <p className="text-xs text-gray-500 hidden md:block">
                  Management Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NotificationBell
              notificationOpen={notificationOpen}
              setNotificationOpen={setNotificationOpen}
              notifications={notifications}
              onRead={onReadNotifications}
              isLoading={notificationsLoading}
              onRefresh={onRefreshNotifications}
            />
            {/* User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role || "Super Admin"}
                </p>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {(user?.name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-600 transition-colors p-1 sm:p-2 rounded-lg hover:bg-red-50"
                title="Logout"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
