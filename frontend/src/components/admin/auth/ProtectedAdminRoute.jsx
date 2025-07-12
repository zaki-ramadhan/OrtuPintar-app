import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoadingCircle } from "@/components/admin/dashboard";
import { isAdminAuthenticated } from "@/utils/admin/auth";

export default function ProtectedAdminRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (isAdminAuthenticated()) {
        setIsAuthenticated(true);
      } else {
        navigate("/admin/login");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
