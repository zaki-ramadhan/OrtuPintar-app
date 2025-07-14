import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import LandingPage from "@/pages/Client/LandingPage";
import HomePage from "@/pages/Client/HomePage";
import LoginPage from "@/pages/Client/LoginPage";
import DashboardPage from "@/pages/Admin/DashboardPage";
import RegisterPage from "@/pages/Client/RegisterPage";
import AdminLoginPage from "@/pages/Admin/AdminLoginPage";
import UserAccount from "./pages/Client/UserAccount";
import ReportsPage from "./pages/Client/ReportsPage";
import NotFoundPage from "@/pages/Client/NotFoundPage";
import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";
import ErrorBoundary from "@/components/client/ErrorBoundary";
import MilestonesPage from "./pages/Client/MilestonesPage";
import LogActivityPage from "./pages/Client/LogActivityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/milestones",
    element: <MilestonesPage />,
  },
  {
    path: "/log-activity",
    element: <LogActivityPage />,
  },
  {
    path: "/my-account",
    element: <UserAccount />,
  },
  {
    path: "/reports",
    element: <ReportsPage />,
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedAdminRoute>
        <DashboardPage />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return (
    <ErrorBoundary>
      <Toaster
        position="top-right"
        containerClassName="toast-container"
        containerStyle={{
          top: 20,
          right: 20,
          zIndex: 999999,
          position: "fixed",
        }}
        toastOptions={{
          duration: 4000,
          className: "toast-notification",
          style: {
            background: "#fff",
            color: "#333",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            zIndex: 999999,
            position: "relative",
            maxWidth: "350px",
            pointerEvents: "auto",
          },
          success: {
            style: {
              border: "2px solid #10B981",
              backgroundColor: "#F0FDF4",
              color: "#065F46",
            },
            iconTheme: {
              primary: "#10B981",
              secondary: "#F0FDF4",
            },
          },
          error: {
            style: {
              border: "2px solid #EF4444",
              backgroundColor: "#FEF2F2",
              color: "#991B1B",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#FEF2F2",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
