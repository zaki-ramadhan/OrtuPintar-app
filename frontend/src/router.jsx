import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import LandingPage from "@/pages/Client/LandingPage";
import HomePage from "@/pages/Client/HomePage";
import LoginPage from "@/pages/Client/LoginPage";
import DashboardPage from "@/pages/Admin/DashboardPage";
import RegisterPage from "@/pages/Client/RegisterPage";
import AdminLoginPage from "@/pages/Admin/AdminLoginPage";
import UserAccount from "./pages/Client/UserAccount";
import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";

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
    path: "/my-account",
    element: <UserAccount />,
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
]);

export default function AppRouter() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}
