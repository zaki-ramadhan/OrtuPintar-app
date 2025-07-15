import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UserManagementModal from "../../modals/UserManagementModal";
import AdminModal from "../../modals/AdminModal";

function UserManagementHeader({
  openUserModal,
  onExportUsers,
  onExportUsersPDF,
  totalUsers,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <p className="text-gray-600">
          Manage and monitor all registered users ({totalUsers} total)
        </p>
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <button
            onClick={onExportUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Export CSV
          </button>
        </div>
        <div className="relative">
          <button
            onClick={onExportUsersPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Export PDF
          </button>
        </div>
        <button
          onClick={() => openUserModal("add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add User
        </button>
      </div>
    </div>
  );
}

function FilterAndSearch({ filters, onFilterChange, onSearch }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Users
          </label>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role Filter
          </label>
          <select
            value={filters.role}
            onChange={(e) => onFilterChange("role", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Roles</option>
            <option value="users">Regular User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="created_at">Registration Date</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div></div> {/* Empty column for layout */}
      </div>
    </div>
  );
}

function UsersTable({
  users,
  onUserEdit,
  onUserDelete,
  onUserView,
  loading,
  pagination,
  setPagination,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
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
            </div>
            <p className="text-gray-500">No users found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                User
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Children
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Role
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Joined
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.name || "No Name"}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-900">
                    {user.children_count || 0} children
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-500">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUserView(user)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => onUserEdit(user)}
                      className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => onUserDelete(user)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: Math.max(1, prev.page - 1),
                }))
              }
              disabled={pagination.page <= 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md">
              {pagination.page}
            </span>
            <button
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={
                pagination.page >=
                Math.ceil(pagination.total / pagination.limit)
              }
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserManagementTab({ onModalStateChange }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    sortBy: "created_at",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [userModal, setUserModal] = useState({
    isOpen: false,
    mode: "view",
    userData: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userData: null,
    loading: false,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("No admin token found");
      }

      console.log(
        "🔑 Fetching users with token:",
        token ? "Token exists" : "No token"
      );

      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        role: filters.role === "all" ? "" : filters.role,
        sortBy: filters.sortBy,
        _t: Date.now(), // Add timestamp to force fresh request
        _bust: Math.random().toString(36).substr(2, 9), // Additional cache buster
        _force: "no-cache", // Force no cache
        _reload: "force", // Force reload
      });

      const response = await axios.get(
        `${API_URL}/admin/users?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      if (response.data.success) {
        console.log(
          "✅ Users fetched successfully:",
          response.data.data?.length || 0
        );
        console.log("📊 Full response:", response.data);
        setUsers(response.data.data || []);
        setPagination((prev) => ({
          ...prev,
          total: response.data.total || 0,
        }));
        toast.success(`Loaded ${response.data.data?.length || 0} users`);
      }
    } catch (err) {
      console.error("Error fetching users:", err);

      // Check if it's an authentication error
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Token might be expired, redirect to login
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      setError("Failed to fetch users");
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, filters]);

  // Report modal state change to parent
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(userModal.isOpen || deleteModal.isOpen);
    }
  }, [userModal.isOpen, deleteModal.isOpen, onModalStateChange]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
    }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Modal handlers
  const openUserModal = (mode, userData = null) => {
    setUserModal({
      isOpen: true,
      mode,
      userData,
    });
  };

  const closeUserModal = () => {
    setUserModal({
      isOpen: false,
      mode: "view",
      userData: null,
    });
  };

  // Delete modal handlers
  const openDeleteModal = (userData) => {
    setDeleteModal({
      isOpen: true,
      userData,
      loading: false,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      userData: null,
      loading: false,
    });
  };

  // User CRUD operations
  const handleUserSave = async (userData) => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("No admin token found");
      }

      console.log("💾 Saving user data:", userData);
      console.log("🔧 Modal mode:", userModal.mode);

      if (userModal.mode === "add") {
        console.log("➕ Creating new user...");
        const response = await axios.post(`${API_URL}/admin/users`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ Create response:", response.data);
        if (response.data.success) {
          toast.success("User created successfully");
          fetchUsers(); // Refresh the list
        }
      } else if (userModal.mode === "edit") {
        console.log("✏️ Updating user with ID:", userData.id);
        console.log("📤 Update payload:", userData);

        const response = await axios.put(
          `${API_URL}/admin/users/${userData.id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("✅ Update response:", response.data);
        if (response.data.success) {
          toast.success("User updated successfully");
          fetchUsers(); // Refresh the list
        }
      }
      closeUserModal();
    } catch (err) {
      console.error("Error saving user:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      toast.error(err.response?.data?.message || "Failed to save user");
    }
  };

  const handleUserDelete = async () => {
    if (!deleteModal.userData) return;

    try {
      setDeleteModal((prev) => ({ ...prev, loading: true }));

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("No admin token found");
      }

      const response = await axios.delete(
        `${API_URL}/admin/users/${deleteModal.userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh the list
        closeDeleteModal();
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleExportUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("No admin token found");
      }

      console.log("📤 Starting CSV export...");

      const response = await axios.get(`${API_URL}/admin/users/export`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Users exported to CSV successfully");
    } catch (err) {
      console.error("Error exporting users to CSV:", err);
      toast.error("Failed to export users to CSV");
    }
  };

  const handleExportUsersPDF = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("No admin token found");
      }

      console.log("📄 Starting PDF export...");
      toast.loading("Generating PDF report...");

      const response = await axios.get(`${API_URL}/admin/users/export-pdf`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000, // 30 second timeout for PDF generation
      });

      console.log("✅ PDF response received, size:", response.data.size);

      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `users-report-${new Date().toISOString().split("T")[0]}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.dismiss(); // Remove loading toast
      toast.success("Users exported to PDF successfully");
      console.log("📄 PDF export completed successfully");
    } catch (err) {
      console.error("Error exporting users to PDF:", err);
      toast.dismiss(); // Remove loading toast
      toast.error("Failed to export users to PDF");
    }
  };

  return (
    <div className="space-y-6">
      {/* Users Management Header */}
      <UserManagementHeader
        openUserModal={openUserModal}
        onExportUsers={handleExportUsers}
        onExportUsersPDF={handleExportUsersPDF}
        totalUsers={pagination.total}
      />

      {/* Filters & Search */}
      <FilterAndSearch
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      {/* Users Table */}
      <UsersTable
        users={users}
        onUserEdit={(user) => openUserModal("edit", user)}
        onUserDelete={(user) => openDeleteModal(user)}
        onUserView={(user) => openUserModal("view", user)}
        loading={loading}
        pagination={pagination}
        setPagination={setPagination}
      />

      {/* User Modal */}
      {userModal.isOpen && (
        <UserManagementModal
          isOpen={userModal.isOpen}
          onClose={closeUserModal}
          mode={userModal.mode}
          userData={userModal.userData}
          onSave={handleUserSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <AdminModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          title="Delete User"
          size="md"
          type="danger"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  Are you sure you want to delete this user?
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {deleteModal.userData && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {deleteModal.userData.name?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {deleteModal.userData.name || "No Name"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {deleteModal.userData.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={closeDeleteModal}
              disabled={deleteModal.loading}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUserDelete}
              disabled={deleteModal.loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {deleteModal.loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{deleteModal.loading ? "Deleting..." : "Delete User"}</span>
            </button>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
