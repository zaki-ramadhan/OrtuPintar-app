import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import {
  dashboardData,
  getStatusColor,
  getActivityIcon,
  analyticsData,
} from "@/utils/admin";
import { adminLogout, getAdminData } from "@/utils/admin/auth";
import { useAdminSession } from "@/utils/admin/useAdminSession";

import {
  ConfirmationModal,
  UserManagementModal,
  ContentManagementModal,
} from "@/components/admin/modals";

import { DashboardHeader, LoadingCircle } from "@/components/admin/dashboard";

import {
  NavigationTabs,
  OverviewTab,
  UserManagementTab,
  SettingsTab,
  ContentManagementTab,
  ReportsTab,
} from "@/components/admin/dashboard/tabs";

import useModalHandlers from "@/utils/admin/modalHandlers";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutModal, setLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false); // Track UserManagement modal state
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const {
    confirmModal,
    userModal,
    contentModal,
    openUserModal,
    closeUserModal,
    openConfirmModal,
    closeConfirmModal,
    openContentModal,
    closeContentModal,
  } = useModalHandlers();

  const navigate = useNavigate();

  // Use admin session management
  useAdminSession();

  // Fetch admin notifications
  const fetchAdminNotifications = async () => {
    try {
      setNotificationsLoading(true);
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.log("❌ No admin token found");
        return;
      }

      console.log("📬 Fetching admin notifications...");

      const response = await axios.get(
        `${API_URL}/dashboard/admin-notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      console.log("✅ Admin notifications response:", response.data);
      setNotifications(response.data.notifications || []);
    } catch (err) {
      console.error("❌ Error fetching admin notifications:", err);
      console.error("❌ Error response:", err.response?.data);

      // Fallback to empty array if error
      setNotifications([]);

      if (err.response?.status === 401) {
        console.log("🔐 Admin token expired, redirecting to login...");
        navigate("/admin/login");
      }
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    // Check if admin is logged in using helper function
    const adminData = getAdminData();

    if (!adminData) {
      navigate("/admin/login");
      return;
    }

    setUser(adminData);
    setLoading(false);

    // Fetch admin notifications after login verification
    fetchAdminNotifications();
  }, [navigate]);

  // Add keyboard shortcut for logout (Ctrl+Shift+L)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "L") {
        event.preventDefault();
        setLogoutModal(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const confirmLogout = () => {
    adminLogout(navigate);
    setLogoutModal(false);
  };

  const onReadNotifications = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.log("❌ No admin token found");
        return;
      }

      console.log("📬 Marking all admin notifications as read...");

      // Call backend API to mark as read
      const response = await axios.put(
        `${API_URL}/dashboard/admin-notifications/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Mark as read response:", response.data);

      // Mark all notifications as read locally
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );

      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("❌ Error marking notifications as read:", error);
      console.error("❌ Error response:", error.response?.data);

      // Still update local state even if API fails
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );

      toast.error("Failed to mark notifications as read");
    }
  };

  // Handle UserManagement modal state change
  const handleUserModalStateChange = (isOpen) => {
    setIsUserModalOpen(isOpen);
  };

  // CRUD operations
  const handleUserSave = async (userData) => {
    console.log("Saving user:", userData);
    // Implement API call here
    toast.success("User saved successfully");
  };

  const handleUserDelete = async (userId) => {
    console.log("Deleting user:", userId);
    // Implement API call here
    toast.success("User deleted successfully");
  };

  const handleContentSave = async (contentData) => {
    console.log("Saving content:", contentData);
    // Implement API call here
    toast.success("Content saved successfully");
  };

  const handleContentDelete = async (contentId) => {
    console.log("Deleting content:", contentId);
    // Implement API call here
    toast.success("Content deleted successfully");
  };

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader
        setLogoutModal={setLogoutModal}
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        notifications={notifications}
        onReadNotifications={onReadNotifications}
        isModalOpen={isUserModalOpen}
        notificationsLoading={notificationsLoading}
        onRefreshNotifications={fetchAdminNotifications}
      />
      {/* Navigation Tabs */}
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        className={`transition-all duration-300 ${
          isUserModalOpen ? "opacity-75" : ""
        }`}
      />
      {/* Main Content */}
      <main
        className={`px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10 transition-all duration-300 ${
          isUserModalOpen ? "opacity-75" : ""
        }`}
      >
        {activeTab === "overview" && (
          <OverviewTab
            getStatusColor={getStatusColor}
            getActivityIcon={getActivityIcon}
          />
        )}
        {/* User Management Tab */}
        {activeTab === "users" && (
          <UserManagementTab
            dashboardData={dashboardData}
            getStatusColor={getStatusColor}
            openUserModal={openUserModal}
            openConfirmModal={openConfirmModal}
            onModalStateChange={handleUserModalStateChange}
          />
        )}{" "}
        {/* Content Management Tab */}
        {activeTab === "content" && (
          <ContentManagementTab
            openContentModal={openContentModal}
            openConfirmModal={openConfirmModal}
          />
        )}{" "}
        {/* Other tabs fallback */}
        {!["overview", "users", "content"].includes(activeTab) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              This section is under development.
            </p>
          </div>
        )}
      </main>
      {/* Modals */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={async () => {
          if (confirmModal.type === "suspend" && confirmModal.data) {
            await handleUserDelete(confirmModal.data.id);
          }
        }}
        title={
          confirmModal.type === "suspend"
            ? "Suspend User"
            : confirmModal.type === "delete"
            ? "Delete User"
            : "Confirm Action"
        }
        message={
          confirmModal.type === "suspend"
            ? `Are you sure you want to suspend ${confirmModal.data?.name}? This action can be reversed later.`
            : confirmModal.type === "delete"
            ? `Are you sure you want to permanently delete ${confirmModal.data?.name}? This action cannot be undone.`
            : "Are you sure you want to proceed?"
        }
        type={confirmModal.type === "delete" ? "danger" : "warning"}
        confirmText={
          confirmModal.type === "suspend"
            ? "Suspend User"
            : confirmModal.type === "delete"
            ? "Delete User"
            : "Confirm"
        }
      />
      <UserManagementModal
        isOpen={userModal.isOpen}
        onClose={closeUserModal}
        user={userModal.user}
        mode={userModal.mode}
        onSave={handleUserSave}
        onDelete={handleUserDelete}
      />{" "}
      <ContentManagementModal
        isOpen={contentModal.isOpen}
        onClose={closeContentModal}
        content={contentModal.content}
        mode={contentModal.mode}
        onSave={handleContentSave}
        onDelete={handleContentDelete}
      />
      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message={`Are you sure you want to logout, ${user?.name}? You will need to login again to access the admin panel.`}
        confirmLabel="Logout"
        confirmColor="bg-red-600 hover:bg-red-700"
        type="danger"
      />
    </div>
  );
}
