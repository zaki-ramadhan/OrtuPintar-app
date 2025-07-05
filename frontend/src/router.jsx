import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import LandingPage from "@/pages/Client/LandingPage";
import HomePage from "@/pages/Client/HomePage";
import LoginPage from "@/pages/Client/LoginPage";
import DashboardPage from "@/pages/Admin/DashboardPage";
import RegisterPage from '@/pages/Client/RegisterPage';

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
		path: "/dashboard",
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
