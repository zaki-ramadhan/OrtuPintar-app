import { useState, useEffect } from "react";
import AdminModal from "./AdminModal";
import toast from "react-hot-toast";

export default function UserManagementModal({
  isOpen,
  onClose,
  userData = null,
  mode = "view", // "view", "edit", "add"
  onSave,
  onDelete,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "users",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData && isOpen) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "users",
        phone: userData.phone || "",
        location: userData.location || "",
        password: "",
        confirmPassword: "",
      });
    } else if (mode === "add" && isOpen) {
      setFormData({
        name: "",
        email: "",
        role: "users",
        phone: "",
        location: "",
        password: "",
        confirmPassword: "",
      });
    }
    setErrors({});
  }, [userData, isOpen, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (mode === "add" && !formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const dataToSave = { ...formData };

      // Remove confirmPassword and empty password fields
      delete dataToSave.confirmPassword;
      if (!dataToSave.password) {
        delete dataToSave.password;
      }

      // Add ID for edit mode
      if (mode === "edit" && userData) {
        dataToSave.id = userData.id;
      }

      await onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userData) return;

    if (window.confirm(`Are you sure you want to delete ${userData.name}?`)) {
      setLoading(true);
      try {
        await onDelete(userData);
        onClose();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      } finally {
        setLoading(false);
      }
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case "add":
        return "Add New User";
      case "edit":
        return "Edit User";
      case "view":
      default:
        return "User Details";
    }
  };

  const renderModalContent = () => (
    <div className="space-y-4">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.name ? "border-red-500" : "border-gray-300"
            } ${mode === "view" ? "bg-gray-50" : ""}`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            } ${mode === "view" ? "bg-gray-50" : ""}`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              mode === "view" ? "bg-gray-50" : "border-gray-300"
            }`}
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              mode === "view" ? "bg-gray-50" : "border-gray-300"
            }`}
            placeholder="Enter location"
          />
        </div>
      </div>

      {/* Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              mode === "view" ? "bg-gray-50" : "border-gray-300"
            }`}
          >
            <option value="users">Regular User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div></div> {/* Empty for layout */}
      </div>

      {/* Password Fields (only for add/edit) */}
      {mode !== "view" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password{" "}
              {mode === "add" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={
                mode === "edit"
                  ? "Leave blank to keep current password"
                  : "Enter password"
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Additional Info for view mode */}
      {mode === "view" && userData && (
        <div className="border-t pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Date
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                {userData.created_at
                  ? new Date(userData.created_at).toLocaleDateString()
                  : "Unknown"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Children Count
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                {userData.children_count || 0} children
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                {userData.phone || "Not provided"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                {userData.location || "Not provided"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderModalActions = () => {
    if (mode === "view") {
      return (
        <div className="flex justify-between">
          <button
            onClick={() => onDelete && handleDelete()}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
            disabled={loading}
          >
            Delete User
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : mode === "add"
            ? "Create User"
            : "Save Changes"}
        </button>
      </div>
    );
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size="lg"
    >
      {renderModalContent()}
      <div className="mt-6">{renderModalActions()}</div>
    </AdminModal>
  );
}
