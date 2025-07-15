import React from "react";

export default function NavigationTabs({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  className = "", // Add className prop
}) {
  const tabs = [
    {
      id: "overview",
      name: "Overview",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "users",
      name: "Users",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      id: "content",
      name: "Content",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`bg-white border-b border-gray-200 relative z-40 ${className}`}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-6 xl:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {" "}
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-gray-50 border-t border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-purple-100 text-purple-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {" "}
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
              {activeTab === tab.id && (
                <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Tab Indicator */}
      <div className="lg:hidden px-4 py-2 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {tabs.find((tab) => tab.id === activeTab)?.icon}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {tabs.find((tab) => tab.id === activeTab)?.name}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
