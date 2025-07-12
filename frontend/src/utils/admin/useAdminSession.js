import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { adminLogout, isAdminAuthenticated } from "./auth";

export const useAdminSession = () => {
  const navigate = useNavigate();

  const checkSession = useCallback(() => {
    if (!isAdminAuthenticated()) {
      adminLogout(navigate, "Session expired. Please login again.");
    }
  }, [navigate]);

  useEffect(() => {
    // Check session immediately
    checkSession();

    // Set up interval to check session every 5 minutes
    const sessionCheckInterval = setInterval(checkSession, 5 * 60 * 1000);

    // Listen for storage events (logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === "adminToken" && !e.newValue) {
        // Token was removed in another tab
        adminLogout(navigate, "Logged out from another tab.");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(sessionCheckInterval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkSession, navigate]);

  return { checkSession };
};
