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
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
