import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import LogoutModal from "./homePage/LogoutModal";

export default function HeaderClient() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is home page
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1800);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OrtuPintar</h1>
              <p className="text-xs text-gray-500">Smart Child Development</p>
            </div>
          </Link>

          {/* Profile */}
          <div className="flex items-center space-x-4">
            {/* Notification */}
            {/* <div className="relative">
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-sm">🔔</span>
              </button>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div> */}

            {/* Back to Home - Only show when NOT on home page */}
            {!isHomePage && (
              <Link
                to="/home"
                className="text-gray-500 hover:text-gray-900 p-2 md:px-3 md:py-2 rounded-lg flex items-center space-x-1"
                title="Back to Home"
              >
                {/* Home icon only on mobile */}
                <span className="lg:hidden p-2.5 border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-100 transition-all">
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>

                {/* Arrow + Text on desktop */}
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 hidden lg:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="hidden lg:block mr-4 text-sm font-medium">
                  Back to Home
                </span>
              </Link>
            )}

            {/* User Menu */}
            <div className="relative -ml-3.5">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <span className="text-white text-sm font-medium">👩</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "-"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "-"}
                      </p>
                    </div>

                    <Link
                      to="/my-account"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-3">👤</span>
                      My Account
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      type="button"
                    >
                      <span className="mr-3">🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}

      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}
