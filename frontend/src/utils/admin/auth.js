import toast from "react-hot-toast";

export const adminLogout = (navigate, message = "Logged out successfully") => {
  // Clear all admin-related data from localStorage
  localStorage.removeItem("admin");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRememberMe");

  // Show success message
  toast.success(message);

  // Navigate to admin login page
  navigate("/admin/login");
};

export const isAdminAuthenticated = () => {
  const adminData = localStorage.getItem("admin");
  const adminToken = localStorage.getItem("adminToken");

  if (!adminData || !adminToken) {
    return false;
  }

  try {
    const parsedAdmin = JSON.parse(adminData);
    return parsedAdmin && parsedAdmin.role === "admin";
  } catch (error) {
    console.error("Error parsing admin data:", error);
    // Clear corrupted data
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    return false;
  }
};

export const getAdminData = () => {
  const adminData = localStorage.getItem("admin");

  if (!adminData) {
    return null;
  }

  try {
    return JSON.parse(adminData);
  } catch (error) {
    console.error("Error parsing admin data:", error);
    return null;
  }
};

export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};
