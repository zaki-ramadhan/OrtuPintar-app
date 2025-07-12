import { adminLogout } from "./auth";

export const createAdminApiCall = (navigate) => {
  return async (url, options = {}) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      adminLogout(navigate, "Session expired. Please login again.");
      return null;
    }

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };

    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, finalOptions);

      // Check if token is expired or invalid
      if (response.status === 401) {
        adminLogout(navigate, "Session expired. Please login again.");
        return null;
      }

      return response;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };
};
