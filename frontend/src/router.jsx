import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import LandingPage from "@/pages/Client/LandingPage";
import HomePage from "@/pages/Client/HomePage";
import LoginPage from "@/pages/Client/LoginPage";
import DashboardPage from "@/pages/Admin/DashboardPage";
import RegisterPage from '@/pages/Client/RegisterPage';
import AdminLoginPage from '@/pages/Admin/AdminLoginPage';
import UserAccount from "./pages/Client/UserAccount";

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
		path: "/back/login",
		element: <AdminLoginPage />,
	},
	{
		path: "/back/dashboard",
		element: <DashboardPage />,
	},
]);

export default function AppRouter() {
	return (
		<>
			<Toaster position="top-right"/>
			<RouterProvider
				router={
					router
				}
			/>
		</>
	);
}
