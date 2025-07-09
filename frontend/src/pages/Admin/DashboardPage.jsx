import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/admin/modals/ConfirmationModal";
import UserManagementModal from "../../components/admin/modals/UserManagementModal";
import ContentManagementModal from "../../components/admin/modals/ContentManagementModal";

export default function DashboardPage() {
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] =
		useState("overview");
	const [loading, setLoading] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	// Modal states
	const [confirmModal, setConfirmModal] = useState({
		isOpen: false,
		type: "",
		data: null,
	});
	const [userModal, setUserModal] = useState({
		isOpen: false,
		mode: "view",
		user: null,
	});
	const [contentModal, setContentModal] = useState({
		isOpen: false,
		mode: "view",
		content: null,
	});
	const [logoutModal, setLogoutModal] = useState(false);

	const navigate = useNavigate();

	// Sample data - replace with real API calls
	const [dashboardData, _setDashboardData] = useState({
		stats: {
			totalUsers: 10248,
			activeUsers: 8932,
			totalChildren: 12456,
			monthlyGrowth: 12.5,
			systemHealth: 99.9,
			dailyReports: 1834,
		},
		recentUsers: [
			{
				id: 1,
				name: "Sarah Johnson",
				email: "sarah@email.com",
				children: 2,
				joinDate: "2025-01-05",
				status: "active",
			},
			{
				id: 2,
				name: "Michael Chen",
				email: "michael@email.com",
				children: 1,
				joinDate: "2025-01-04",
				status: "active",
			},
			{
				id: 3,
				name: "Emma Wilson",
				email: "emma@email.com",
				children: 3,
				joinDate: "2025-01-03",
				status: "pending",
			},
			{
				id: 4,
				name: "David Brown",
				email: "david@email.com",
				children: 1,
				joinDate: "2025-01-02",
				status: "active",
			},
			{
				id: 5,
				name: "Lisa Garcia",
				email: "lisa@email.com",
				children: 2,
				joinDate: "2025-01-01",
				status: "inactive",
			},
		],
		activities: [
			{
				id: 1,
				type: "user_signup",
				message: "New user registered: Sarah Johnson",
				time: "2 minutes ago",
			},
			{
				id: 2,
				type: "milestone_added",
				message: "Milestone achieved by child Emma Chen",
				time: "15 minutes ago",
			},
			{
				id: 3,
				type: "consultation_booked",
				message: "Consultation booked with Dr. Smith",
				time: "1 hour ago",
			},
			{
				id: 4,
				type: "system_update",
				message: "System maintenance completed",
				time: "3 hours ago",
			},
			{
				id: 5,
				type: "report_generated",
				message: "Monthly report generated",
				time: "5 hours ago",
			},
		],
	});
	const tabs = [
		{
			id: "overview",
			name: "Overview",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={
							2
						}
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			),
		},
		{
			id: "users",
			name: "Users",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={
							2
						}
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
					/>
				</svg>
			),
		},
		{
			id: "content",
			name: "Content",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={
							2
						}
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
			),
		},
		{
			id: "reports",
			name: "Reports",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={
							2
						}
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			),
		},
		{
			id: "settings",
			name: "Settings",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={
							2
						}
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={
							2
						}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
		},
	];

	useEffect(() => {
		// Check if admin is logged in
		const adminData =
			localStorage.getItem(
				"admin"
			);
		// if (!adminData) {
		// 	navigate(
		// 		"/back/login"
		// 	);
		// 	return;
		// }

		setUser(
			JSON.parse(
				adminData
			)
		);
		setLoading(false);
	}, [navigate]);
	const handleLogout = () => {
		setLogoutModal(true);
	};

	const confirmLogout = () => {
		localStorage.removeItem(
			"admin"
		);
		localStorage.removeItem(
			"adminToken"
		);
		toast.success(
			"Logged out successfully"
		);
		navigate("/back/login");
		setLogoutModal(false);
	};

	// Modal handlers
	const openConfirmModal = (type, data) => {
		setConfirmModal({
			isOpen: true,
			type,
			data,
		});
	};

	const closeConfirmModal = () => {
		setConfirmModal({
			isOpen: false,
			type: "",
			data: null,
		});
	};

	const openUserModal = (mode, user = null) => {
		setUserModal({
			isOpen: true,
			mode,
			user,
		});
	};

	const closeUserModal = () => {
		setUserModal({
			isOpen: false,
			mode: "view",
			user: null,
		});
	};

	const openContentModal = (mode, content = null) => {
		setContentModal({
			isOpen: true,
			mode,
			content,
		});
	};

	const closeContentModal = () => {
		setContentModal({
			isOpen: false,
			mode: "view",
			content: null,
		});
	};

	// CRUD operations
	const handleUserSave = async (userData) => {
		console.log(
			"Saving user:",
			userData
		);
		// Implement API call here
		toast.success(
			"User saved successfully"
		);
	};

	const handleUserDelete = async (userId) => {
		console.log(
			"Deleting user:",
			userId
		);
		// Implement API call here
		toast.success(
			"User deleted successfully"
		);
	};

	const handleContentSave = async (contentData) => {
		console.log(
			"Saving content:",
			contentData
		);
		// Implement API call here
		toast.success(
			"Content saved successfully"
		);
	};

	const handleContentDelete = async (contentId) => {
		console.log(
			"Deleting content:",
			contentId
		);
		// Implement API call here
		toast.success(
			"Content deleted successfully"
		);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "inactive":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getActivityIcon = (type) => {
		const iconClasses =
			"w-3 h-3 sm:w-4 sm:h-4 text-white";
		const containerClasses =
			"w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center";

		switch (type) {
			case "user_signup":
				return (
					<div
						className={`${containerClasses} bg-green-500`}
					>
						<svg
							className={
								iconClasses
							}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={
									2
								}
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
				);
			case "milestone_added":
				return (
					<div
						className={`${containerClasses} bg-blue-500`}
					>
						<svg
							className={
								iconClasses
							}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={
									2
								}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				);
			case "consultation_booked":
				return (
					<div
						className={`${containerClasses} bg-purple-500`}
					>
						<svg
							className={
								iconClasses
							}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={
									2
								}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				);
			case "system_update":
				return (
					<div
						className={`${containerClasses} bg-orange-500`}
					>
						<svg
							className={
								iconClasses
							}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={
									2
								}
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					</div>
				);
			case "report_generated":
				return (
					<div
						className={`${containerClasses} bg-indigo-500`}
					>
						<svg
							className={
								iconClasses
							}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={
									2
								}
								d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
				);
			default:
				return (
					<div
						className={`${containerClasses} bg-gray-500`}
					>
						<svg
							className={
								iconClasses
							}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={
									2
								}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
				<div className="flex flex-col items-center space-y-4">
					<svg
						className="animate-spin h-8 w-8 sm:h-12 sm:w-12 text-purple-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span className="text-gray-600 font-medium text-sm sm:text-base">
						Loading
						Dashboard...
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-14 sm:h-16">
						{/* Mobile Menu Button */}
						<div className="flex items-center space-x-3 sm:space-x-4">
							<button
								onClick={() =>
									setSidebarOpen(
										!sidebarOpen
									)
								}
								className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
							>
								{/* Hamburger Icon */}
								<svg
									className={`w-6 h-6 transform transition-transform duration-200 ${
										sidebarOpen
											? "rotate-180 opacity-0"
											: "rotate-0 opacity-100"
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									style={{
										display: sidebarOpen
											? "none"
											: "block",
									}}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={
											2
										}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>

								{/* Close Icon */}
								<svg
									className={`w-6 h-6 transform transition-transform duration-200 ${
										sidebarOpen
											? "rotate-0 opacity-100"
											: "rotate-180 opacity-0"
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									style={{
										display: sidebarOpen
											? "block"
											: "none",
									}}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={
											2
										}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>

							{/* Logo and Title */}
							<div className="flex items-center space-x-2 sm:space-x-3">
								<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
									<svg
										className="w-4 h-4 sm:w-6 sm:h-6 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
								</div>
								<div className="hidden sm:block">
									<h1 className="text-lg sm:text-xl font-bold text-gray-900">
										OrtuPintar
										Admin
									</h1>
									<p className="text-xs text-gray-500 hidden md:block">
										Management
										Dashboard
									</p>
								</div>
							</div>
						</div>

						{/* User Menu */}
						<div className="flex items-center space-x-2 sm:space-x-4">
							{/* Notifications */}
							<button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
								<svg
									className="w-5 h-5 sm:w-6 sm:h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={
											2
										}
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
								<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
							</button>

							{/* User Profile */}
							<div className="flex items-center space-x-2 sm:space-x-3">
								<div className="text-right hidden sm:block">
									<p className="text-sm font-medium text-gray-900">
										{user?.name ||
											"Admin User"}
									</p>
									<p className="text-xs text-gray-500">
										{user?.role ||
											"Super Admin"}
									</p>
								</div>
								<div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
									<span className="text-white text-xs sm:text-sm font-medium">
										{(
											user?.name ||
											"A"
										)
											.charAt(
												0
											)
											.toUpperCase()}
									</span>
								</div>
								<button
									onClick={
										handleLogout
									}
									className="text-gray-400 hover:text-gray-600 transition-colors p-1"
								>
									<svg
										className="w-4 h-4 sm:w-5 sm:h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* Navigation Tabs */}
			<div className="bg-white border-b border-gray-200 relative z-40">
				{/* Desktop Navigation */}
				<div className="hidden lg:block px-4 sm:px-6 lg:px-8">
					<nav className="flex space-x-6 xl:space-x-8">
						{tabs.map(
							(
								tab
							) => (
								<button
									key={
										tab.id
									}
									onClick={() =>
										setActiveTab(
											tab.id
										)
									}
									className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
										activeTab ===
										tab.id
											? "border-purple-500 text-purple-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									}`}
								>
									{" "}
									<span>
										{
											tab.icon
										}
									</span>
									<span>
										{
											tab.name
										}
									</span>
								</button>
							)
						)}
					</nav>
				</div>

				{/* Mobile Navigation Dropdown */}
				<div
					className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						sidebarOpen
							? "max-h-96 opacity-100"
							: "max-h-0 opacity-0"
					}`}
				>
					<div className="px-4 py-3 space-y-1 bg-gray-50 border-t border-gray-200">
						{tabs.map(
							(
								tab
							) => (
								<button
									key={
										tab.id
									}
									onClick={() => {
										setActiveTab(
											tab.id
										);
										setSidebarOpen(
											false
										);
									}}
									className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
										activeTab ===
										tab.id
											? "bg-purple-100 text-purple-700 shadow-sm"
											: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
									}`}
								>
									{" "}
									<span>
										{
											tab.icon
										}
									</span>
									<span>
										{
											tab.name
										}
									</span>
									{activeTab ===
										tab.id && (
										<div className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></div>
									)}
								</button>
							)
						)}
					</div>
				</div>

				{/* Mobile Tab Indicator */}
				<div className="lg:hidden px-4 py-2 bg-white border-t border-gray-100">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<span className="text-lg">
								{
									tabs.find(
										(
											tab
										) =>
											tab.id ===
											activeTab
									)
										?.icon
								}
							</span>
							<span className="text-sm font-medium text-gray-900">
								{
									tabs.find(
										(
											tab
										) =>
											tab.id ===
											activeTab
									)
										?.name
								}
							</span>
						</div>
						<div className="flex items-center space-x-1">
							<div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
							<span className="text-xs text-gray-500">
								Active
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* Main Content */}
			<main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
				{activeTab ===
					"overview" && (
					<div className="space-y-6 sm:space-y-8">
						{/* Stats Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											Total
											Users
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											{dashboardData.stats.totalUsers.toLocaleString()}
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-green-600 font-medium">
										+
										{
											dashboardData
												.stats
												.monthlyGrowth
										}

										%
									</span>
									<span className="text-xs sm:text-sm text-gray-500 ml-1">
										from
										last
										month
									</span>
								</div>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											Active
											Users
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											{dashboardData.stats.activeUsers.toLocaleString()}
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-green-600 font-medium">
										87.2%
									</span>
									<span className="text-xs sm:text-sm text-gray-500 ml-1">
										engagement
										rate
									</span>
								</div>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											Total
											Children
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											{dashboardData.stats.totalChildren.toLocaleString()}
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-blue-600 font-medium">
										1.2
									</span>
									<span className="text-xs sm:text-sm text-gray-500 ml-1">
										avg
										per
										family
									</span>
								</div>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											System
											Health
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											{
												dashboardData
													.stats
													.systemHealth
											}

											%
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-green-600 font-medium">
										Excellent
									</span>
									<span className="text-xs sm:text-sm text-gray-500 ml-1">
										system
										status
									</span>
								</div>
							</div>
						</div>

						{/* Recent Activity and Users */}
						<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
							{/* Recent Users */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100">
								<div className="p-4 sm:p-6 border-b border-gray-100">
									<h3 className="text-base sm:text-lg font-semibold text-gray-900">
										Recent
										Users
									</h3>
									<p className="text-xs sm:text-sm text-gray-500 mt-1">
										Latest
										user
										registrations
									</p>
								</div>
								<div className="p-4 sm:p-6">
									<div className="space-y-3 sm:space-y-4">
										{dashboardData.recentUsers.map(
											(
												user
											) => (
												<div
													key={
														user.id
													}
													className="flex items-center justify-between"
												>
													<div className="flex items-center space-x-3 min-w-0 flex-1">
														<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
															<span className="text-white text-xs sm:text-sm font-medium">
																{user.name.charAt(
																	0
																)}
															</span>
														</div>
														<div className="min-w-0 flex-1">
															<p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
																{
																	user.name
																}
															</p>
															<p className="text-xs text-gray-500 truncate">
																{
																	user.email
																}
															</p>
														</div>
													</div>
													<div className="text-right flex-shrink-0 ml-4">
														<span
															className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
																user.status
															)}`}
														>
															{
																user.status
															}
														</span>
														<p className="text-xs text-gray-500 mt-1">
															{
																user.children
															}{" "}
															children
														</p>
													</div>
												</div>
											)
										)}
									</div>
								</div>
							</div>

							{/* Recent Activity */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100">
								<div className="p-4 sm:p-6 border-b border-gray-100">
									<h3 className="text-base sm:text-lg font-semibold text-gray-900">
										Recent
										Activity
									</h3>
									<p className="text-xs sm:text-sm text-gray-500 mt-1">
										Latest
										system
										activities
									</p>
								</div>
								<div className="p-4 sm:p-6">
									<div className="space-y-3 sm:space-y-4">
										{dashboardData.activities.map(
											(
												activity
											) => (
												<div
													key={
														activity.id
													}
													className="flex items-start space-x-3"
												>
													<div className="flex-shrink-0">
														{getActivityIcon(
															activity.type
														)}
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-xs sm:text-sm font-medium text-gray-900">
															{
																activity.message
															}
														</p>
														<p className="text-xs text-gray-500 mt-1">
															{
																activity.time
															}
														</p>
													</div>
												</div>
											)
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{/* User Management Tab */}
				{activeTab ===
					"users" && (
					<div className="space-y-6">
						{/* Users Management Header */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<div>
								<h2 className="text-2xl font-bold text-gray-900">
									User
									Management
								</h2>
								<p className="text-gray-600">
									Manage
									and
									monitor
									all
									registered
									users
								</p>
							</div>{" "}
							<div className="flex gap-3">
								<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
										/>
									</svg>
									Export
									Users
								</button>
								<button
									onClick={() =>
										openUserModal(
											"add"
										)
									}
									className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									Add
									User
								</button>
							</div>
						</div>

						{/* Filters & Search */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Search
										Users
									</label>
									<input
										type="text"
										placeholder="Search by name or email..."
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Status
										Filter
									</label>
									<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
										<option value="all">
											All
											Status
										</option>
										<option value="active">
											Active
										</option>
										<option value="pending">
											Pending
										</option>
										<option value="inactive">
											Inactive
										</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Date
										Range
									</label>
									<input
										type="date"
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Sort
										By
									</label>
									<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
										<option value="createdAt">
											Registration
											Date
										</option>
										<option value="name">
											Name
										</option>
										<option value="email">
											Email
										</option>
										<option value="lastActive">
											Last
											Active
										</option>
									</select>
								</div>
							</div>
						</div>

						{/* Users Table */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-gray-50 border-b border-gray-200">
										<tr>
											<th className="text-left py-3 px-4 font-medium text-gray-700">
												<input
													type="checkbox"
													className="rounded"
												/>
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-700">
												User
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-700">
												Children
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-700">
												Status
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-700">
												Last
												Active
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-700">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{dashboardData.recentUsers.map(
											(
												user
											) => (
												<tr
													key={
														user.id
													}
													className="hover:bg-gray-50"
												>
													<td className="py-3 px-4">
														<input
															type="checkbox"
															className="rounded"
														/>
													</td>
													<td className="py-3 px-4">
														<div className="flex items-center space-x-3">
															<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
																<span className="text-white text-sm font-medium">
																	{user.name.charAt(
																		0
																	)}
																</span>
															</div>
															<div>
																<p className="font-medium text-gray-900">
																	{
																		user.name
																	}
																</p>
																<p className="text-sm text-gray-500">
																	{
																		user.email
																	}
																</p>
															</div>
														</div>
													</td>
													<td className="py-3 px-4">
														<span className="text-sm text-gray-900">
															{
																user.children
															}{" "}
															children
														</span>
													</td>
													<td className="py-3 px-4">
														<span
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
																user.status
															)}`}
														>
															{
																user.status
															}
														</span>
													</td>
													<td className="py-3 px-4">
														<span className="text-sm text-gray-500">
															{
																user.joinDate
															}
														</span>
													</td>{" "}
													<td className="py-3 px-4">
														<div className="flex items-center space-x-2">
															<button
																onClick={() =>
																	openUserModal(
																		"view",
																		user
																	)
																}
																className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
															>
																<svg
																	className="w-4 h-4 mr-1"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={
																			2
																		}
																		d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																	/>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={
																			2
																		}
																		d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
																	/>
																</svg>
																View
															</button>
															<button
																onClick={() =>
																	openUserModal(
																		"edit",
																		user
																	)
																}
																className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
															>
																<svg
																	className="w-4 h-4 mr-1"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={
																			2
																		}
																		d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
																	/>
																</svg>
																Edit
															</button>
															<button
																onClick={() =>
																	openConfirmModal(
																		"suspend",
																		user
																	)
																}
																className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
															>
																<svg
																	className="w-4 h-4 mr-1"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={
																			2
																		}
																		d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
																	/>
																</svg>
																Suspend
															</button>
														</div>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							<div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
								<div className="flex items-center justify-between">
									<div className="text-sm text-gray-700">
										Showing
										1
										to
										10
										of
										97
										results
									</div>
									<div className="flex items-center space-x-2">
										<button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
											Previous
										</button>
										<button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md">
											1
										</button>
										<button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
											2
										</button>
										<button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
											Next
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}{" "}
				{/* Content Management Tab */}
				{activeTab ===
					"content" && (
					<div className="space-y-6">
						{/* Content Management Header */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<div>
								<h2 className="text-2xl font-bold text-gray-900">
									Content
									Management
								</h2>
								<p className="text-gray-600">
									Manage
									articles,
									activities,
									and
									educational
									content
								</p>
							</div>
							<div className="flex gap-3">
								<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
										/>
									</svg>
									Export
									Content
								</button>
								<button
									onClick={() =>
										openContentModal(
											"add"
										)
									}
									className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									Create
									Content
								</button>
							</div>
						</div>

						{/* Content Stats */}
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											Total
											Articles
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											156
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-green-600 font-medium">
										+12
										this
										month
									</span>
								</div>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											Published
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											89
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-blue-600 font-medium">
										57%
										published
									</span>
								</div>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											Draft
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											45
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-yellow-600 font-medium">
										In
										progress
									</span>
								</div>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
											Views
											This
											Month
										</p>
										<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
											24.5K
										</p>
									</div>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									</div>
								</div>
								<div className="mt-3 sm:mt-4">
									<span className="text-xs sm:text-sm text-purple-600 font-medium">
										+18%
										growth
									</span>
								</div>
							</div>
						</div>

						{/* Content Filters */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Search
										Content
									</label>
									<input
										type="text"
										placeholder="Search by title..."
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Content
										Type
									</label>
									<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
										<option value="all">
											All
											Types
										</option>
										<option value="article">
											Article
										</option>
										<option value="activity">
											Activity
										</option>
										<option value="milestone">
											Milestone
										</option>
										<option value="tip">
											Tip
										</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Status
									</label>
									<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
										<option value="all">
											All
											Status
										</option>
										<option value="published">
											Published
										</option>
										<option value="draft">
											Draft
										</option>
										<option value="review">
											Under
											Review
										</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Category
									</label>
									<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
										<option value="all">
											All
											Categories
										</option>
										<option value="development">
											Development
										</option>
										<option value="nutrition">
											Nutrition
										</option>
										<option value="health">
											Health
										</option>
										<option value="education">
											Education
										</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Date
										Range
									</label>
									<input
										type="date"
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
									/>
								</div>
							</div>
						</div>

						{/* Content List */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
							<div className="p-6 border-b border-gray-200">
								<h3 className="text-lg font-semibold text-gray-900">
									Recent
									Content
								</h3>
							</div>
							<div className="divide-y divide-gray-200">
								{[
									{
										id: 1,
										title: "Understanding Child Development Milestones",
										type: "article",
										category: "development",
										status: "published",
										author: "Dr. Sarah Johnson",
										publishDate: "2025-01-05",
										views: "1.2K",
										featured: true,
									},
									{
										id: 2,
										title: "Fun Learning Activities for Toddlers",
										type: "activity",
										category: "education",
										status: "draft",
										author: "Mike Chen",
										publishDate: "2025-01-04",
										views: "856",
										featured: false,
									},
									{
										id: 3,
										title: "Healthy Nutrition Tips for Growing Kids",
										type: "tip",
										category: "nutrition",
										status: "published",
										author: "Emma Wilson",
										publishDate: "2025-01-03",
										views: "2.1K",
										featured: true,
									},
								].map(
									(
										content
									) => (
										<div
											key={
												content.id
											}
											className="p-6 hover:bg-gray-50 transition-colors"
										>
											<div className="flex items-center justify-between">
												<div className="flex-1 min-w-0">
													<div className="flex items-center space-x-3 mb-2">
														<h4 className="text-lg font-medium text-gray-900 truncate">
															{
																content.title
															}
														</h4>
														{content.featured && (
															<span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
																Featured
															</span>
														)}
														<span
															className={`px-2 py-1 rounded-full text-xs font-medium ${
																content.status ===
																"published"
																	? "bg-green-100 text-green-800"
																	: content.status ===
																	  "draft"
																	? "bg-yellow-100 text-yellow-800"
																	: "bg-blue-100 text-blue-800"
															}`}
														>
															{
																content.status
															}
														</span>
													</div>
													<div className="flex items-center space-x-4 text-sm text-gray-500">
														<span className="capitalize">
															{
																content.type
															}
														</span>
														<span>
															•
														</span>
														<span className="capitalize">
															{
																content.category
															}
														</span>
														<span>
															•
														</span>
														<span>
															By{" "}
															{
																content.author
															}
														</span>
														<span>
															•
														</span>
														<span>
															{
																content.publishDate
															}
														</span>
														<span>
															•
														</span>
														<span>
															{
																content.views
															}{" "}
															views
														</span>
													</div>
												</div>
												<div className="flex items-center space-x-2 ml-4">
													<button
														onClick={() =>
															openContentModal(
																"view",
																content
															)
														}
														className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
													>
														<svg
															className="w-4 h-4 mr-1"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={
																	2
																}
																d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={
																	2
																}
																d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
															/>
														</svg>
														View
													</button>
													<button
														onClick={() =>
															openContentModal(
																"edit",
																content
															)
														}
														className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
													>
														<svg
															className="w-4 h-4 mr-1"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={
																	2
																}
																d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
															/>
														</svg>
														Edit
													</button>
													<button
														onClick={() =>
															openConfirmModal(
																"delete",
																content
															)
														}
														className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
													>
														<svg
															className="w-4 h-4 mr-1"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={
																	2
																}
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
														Delete
													</button>
												</div>
											</div>
										</div>
									)
								)}
							</div>
						</div>
					</div>
				)}{" "}
				{/* Reports Tab */}
				{activeTab ===
					"reports" && (
					<div className="space-y-6">
						{/* Reports Header */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<div>
								<h2 className="text-2xl font-bold text-gray-900">
									Reports
									&
									Analytics
								</h2>
								<p className="text-gray-600">
									Comprehensive
									system
									analytics
									and
									user
									insights
								</p>
							</div>
							<div className="flex gap-3">
								<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
										/>
									</svg>
									Export
									Report
								</button>
								<button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									Generate
									Report
								</button>
							</div>
						</div>

						{/* Analytics Overview Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* Total Revenue */}
							<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-600">
											Total
											Revenue
										</p>
										<p className="text-2xl font-bold text-gray-900">
											$125,430
										</p>
										<div className="flex items-center mt-2">
											<svg
												className="w-4 h-4 text-green-500 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={
														2
													}
													d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
												/>
											</svg>
											<span className="text-sm text-green-600 font-medium">
												+12.5%
											</span>
											<span className="text-sm text-gray-500 ml-1">
												vs
												last
												month
											</span>
										</div>
									</div>
									<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
										<svg
											className="w-6 h-6 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
											/>
										</svg>
									</div>
								</div>
							</div>

							{/* User Engagement */}
							<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-600">
											User
											Engagement
										</p>
										<p className="text-2xl font-bold text-gray-900">
											87.2%
										</p>
										<div className="flex items-center mt-2">
											<svg
												className="w-4 h-4 text-blue-500 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={
														2
													}
													d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
												/>
											</svg>
											<span className="text-sm text-blue-600 font-medium">
												+5.2%
											</span>
											<span className="text-sm text-gray-500 ml-1">
												this
												week
											</span>
										</div>
									</div>
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
										<svg
											className="w-6 h-6 text-blue-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
									</div>
								</div>
							</div>

							{/* Consultations */}
							<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-600">
											Consultations
										</p>
										<p className="text-2xl font-bold text-gray-900">
											1,234
										</p>
										<div className="flex items-center mt-2">
											<svg
												className="w-4 h-4 text-purple-500 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={
														2
													}
													d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
												/>
											</svg>
											<span className="text-sm text-purple-600 font-medium">
												+18.3%
											</span>
											<span className="text-sm text-gray-500 ml-1">
												this
												month
											</span>
										</div>
									</div>
									<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
										<svg
											className="w-6 h-6 text-purple-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
											/>
										</svg>
									</div>
								</div>
							</div>

							{/* Conversion Rate */}
							<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-600">
											Conversion
											Rate
										</p>
										<p className="text-2xl font-bold text-gray-900">
											3.45%
										</p>
										<div className="flex items-center mt-2">
											<svg
												className="w-4 h-4 text-orange-500 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={
														2
													}
													d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
												/>
											</svg>
											<span className="text-sm text-orange-600 font-medium">
												+2.1%
											</span>
											<span className="text-sm text-gray-500 ml-1">
												vs
												last
												quarter
											</span>
										</div>
									</div>
									<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
										<svg
											className="w-6 h-6 text-orange-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						{/* Charts Section */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* User Growth Chart */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100">
								<div className="p-6 border-b border-gray-200">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-lg font-semibold text-gray-900">
												User
												Growth
											</h3>
											<p className="text-sm text-gray-500">
												Monthly
												user
												registrations
											</p>
										</div>
										<div className="flex items-center space-x-2">
											<button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
												7D
											</button>
											<button className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
												30D
											</button>
											<button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
												90D
											</button>
										</div>
									</div>
								</div>
								<div className="p-6">
									<div className="h-64 flex items-end justify-between space-x-2">
										{/* Chart bars - simulated with divs */}
										{[
											65,
											78,
											90,
											85,
											95,
											88,
											92,
											98,
											85,
											90,
											94,
											100,
										].map(
											(
												height,
												index
											) => (
												<div
													key={
														index
													}
													className="flex-1 flex flex-col items-center"
												>
													<div
														className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md w-full transition-all duration-300 hover:from-purple-700 hover:to-purple-500"
														style={{
															height: `${height}%`,
														}}
													></div>
													<span className="text-xs text-gray-500 mt-2">
														{
															[
																"Jan",
																"Feb",
																"Mar",
																"Apr",
																"May",
																"Jun",
																"Jul",
																"Aug",
																"Sep",
																"Oct",
																"Nov",
																"Dec",
															][
																index
															]
														}
													</span>
												</div>
											)
										)}
									</div>
								</div>
							</div>

							{/* Content Performance */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100">
								<div className="p-6 border-b border-gray-200">
									<h3 className="text-lg font-semibold text-gray-900">
										Content
										Performance
									</h3>
									<p className="text-sm text-gray-500">
										Top
										performing
										content
										types
									</p>
								</div>
								<div className="p-6">
									<div className="space-y-4">
										{[
											{
												name: "Development Articles",
												value: 85,
												color: "bg-blue-500",
											},
											{
												name: "Learning Activities",
												value: 72,
												color: "bg-green-500",
											},
											{
												name: "Nutrition Tips",
												value: 68,
												color: "bg-yellow-500",
											},
											{
												name: "Health Guides",
												value: 54,
												color: "bg-purple-500",
											},
											{
												name: "Expert Consultations",
												value: 45,
												color: "bg-pink-500",
											},
										].map(
											(
												item,
												index
											) => (
												<div
													key={
														index
													}
													className="flex items-center justify-between"
												>
													<div className="flex items-center space-x-3">
														<div
															className={`w-3 h-3 ${item.color} rounded-full`}
														></div>
														<span className="text-sm font-medium text-gray-900">
															{
																item.name
															}
														</span>
													</div>
													<div className="flex items-center space-x-3">
														<div className="w-24 bg-gray-200 rounded-full h-2">
															<div
																className={`h-2 ${item.color} rounded-full transition-all duration-300`}
																style={{
																	width: `${item.value}%`,
																}}
															></div>
														</div>
														<span className="text-sm text-gray-600 w-10 text-right">
															{
																item.value
															}

															%
														</span>
													</div>
												</div>
											)
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Detailed Reports Table */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100">
							<div className="p-6 border-b border-gray-200">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											Recent
											Reports
										</h3>
										<p className="text-sm text-gray-500">
											Generated
											analytics
											reports
										</p>
									</div>
									<button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
										<svg
											className="w-4 h-4 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
										Generate
										New
										Report
									</button>
								</div>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-gray-50">
										<tr>
											<th className="text-left py-3 px-6 font-medium text-gray-700">
												Report
												Name
											</th>
											<th className="text-left py-3 px-6 font-medium text-gray-700">
												Type
											</th>
											<th className="text-left py-3 px-6 font-medium text-gray-700">
												Date
												Range
											</th>
											<th className="text-left py-3 px-6 font-medium text-gray-700">
												Generated
											</th>
											<th className="text-left py-3 px-6 font-medium text-gray-700">
												Status
											</th>
											<th className="text-left py-3 px-6 font-medium text-gray-700">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{[
											{
												name: "Monthly User Analytics",
												type: "User Report",
												dateRange: "Dec 1-31, 2024",
												generated: "2025-01-01",
												status: "completed",
											},
											{
												name: "Content Performance Q4",
												type: "Content Report",
												dateRange: "Oct-Dec 2024",
												generated: "2025-01-01",
												status: "completed",
											},
											{
												name: "Revenue Analysis",
												type: "Financial Report",
												dateRange: "Nov 1-30, 2024",
												generated: "2024-12-31",
												status: "completed",
											},
											{
												name: "Weekly Activity Summary",
												type: "Activity Report",
												dateRange: "Dec 23-29, 2024",
												generated: "2024-12-30",
												status: "pending",
											},
										].map(
											(
												report,
												index
											) => (
												<tr
													key={
														index
													}
													className="hover:bg-gray-50"
												>
													<td className="py-4 px-6">
														<div className="font-medium text-gray-900">
															{
																report.name
															}
														</div>
													</td>
													<td className="py-4 px-6">
														<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
															{
																report.type
															}
														</span>
													</td>
													<td className="py-4 px-6 text-sm text-gray-600">
														{
															report.dateRange
														}
													</td>
													<td className="py-4 px-6 text-sm text-gray-600">
														{
															report.generated
														}
													</td>
													<td className="py-4 px-6">
														<span
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
																report.status ===
																"completed"
																	? "bg-green-100 text-green-800"
																	: "bg-yellow-100 text-yellow-800"
															}`}
														>
															{
																report.status
															}
														</span>
													</td>
													<td className="py-4 px-6">
														<div className="flex items-center space-x-2">
															<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
																View
															</button>
															<button className="text-green-600 hover:text-green-700 text-sm font-medium">
																Download
															</button>
															<button className="text-red-600 hover:text-red-700 text-sm font-medium">
																Delete
															</button>
														</div>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						</div>

						{/* Quick Stats Grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Top Regions */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Top
									Regions
								</h3>
								<div className="space-y-3">
									{[
										{
											region: "Jakarta",
											users: "2,847",
											percentage: 35,
										},
										{
											region: "Surabaya",
											users: "1,923",
											percentage: 24,
										},
										{
											region: "Bandung",
											users: "1,456",
											percentage: 18,
										},
										{
											region: "Medan",
											users: "1,089",
											percentage: 13,
										},
										{
											region: "Others",
											users: "812",
											percentage: 10,
										},
									].map(
										(
											item,
											index
										) => (
											<div
												key={
													index
												}
												className="flex items-center justify-between"
											>
												<div className="flex items-center space-x-3">
													<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
														<span className="text-xs font-medium text-gray-600">
															{index +
																1}
														</span>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-900">
															{
																item.region
															}
														</p>
														<p className="text-xs text-gray-500">
															{
																item.users
															}{" "}
															users
														</p>
													</div>
												</div>
												<div className="text-right">
													<p className="text-sm font-medium text-gray-900">
														{
															item.percentage
														}

														%
													</p>
												</div>
											</div>
										)
									)}
								</div>
							</div>

							{/* Device Analytics */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Device
									Usage
								</h3>
								<div className="space-y-4">
									{[
										{
											device: "Mobile",
											percentage: 68,
											color: "bg-blue-500",
										},
										{
											device: "Desktop",
											percentage: 25,
											color: "bg-green-500",
										},
										{
											device: "Tablet",
											percentage: 7,
											color: "bg-yellow-500",
										},
									].map(
										(
											item,
											index
										) => (
											<div
												key={
													index
												}
												className="space-y-2"
											>
												<div className="flex items-center justify-between">
													<span className="text-sm font-medium text-gray-900">
														{
															item.device
														}
													</span>
													<span className="text-sm text-gray-600">
														{
															item.percentage
														}

														%
													</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div
														className={`h-2 ${item.color} rounded-full transition-all duration-300`}
														style={{
															width: `${item.percentage}%`,
														}}
													></div>
												</div>
											</div>
										)
									)}
								</div>
							</div>

							{/* Age Demographics */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Age
									Demographics
								</h3>
								<div className="space-y-3">
									{[
										{
											age: "25-30",
											users: "3,245",
											percentage: 40,
										},
										{
											age: "31-35",
											users: "2,156",
											percentage: 27,
										},
										{
											age: "36-40",
											users: "1,687",
											percentage: 21,
										},
										{
											age: "20-24",
											users: "648",
											percentage: 8,
										},
										{
											age: "40+",
											users: "324",
											percentage: 4,
										},
									].map(
										(
											item,
											index
										) => (
											<div
												key={
													index
												}
												className="flex items-center justify-between"
											>
												<div className="flex items-center space-x-3">
													<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
														<span className="text-xs font-medium text-purple-600">
															{
																item.age
															}
														</span>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-900">
															{
																item.users
															}{" "}
															users
														</p>
														<p className="text-xs text-gray-500">
															{
																item.percentage
															}

															%
															of
															total
														</p>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					</div>
				)}{" "}
				{/* Settings Tab */}
				{activeTab ===
					"settings" && (
					<div className="space-y-6">
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<div>
								<h2 className="text-2xl font-bold text-gray-900">
									System
									Settings
								</h2>
								<p className="text-gray-600">
									Configure
									system
									preferences
									and
									security
									settings
								</p>
							</div>
						</div>

						{/* Settings Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* System Configuration */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-center mb-4">
									<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
										<svg
											className="w-4 h-4 text-blue-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
											/>
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-gray-900">
										System
										Configuration
									</h3>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Site
											Name
										</span>
										<span className="text-sm font-medium text-gray-900">
											OrtuPintar
										</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Version
										</span>
										<span className="text-sm font-medium text-green-600">
											v2.1.0
										</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Environment
										</span>
										<span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
											Production
										</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Maintenance
											Mode
										</span>
										<button className="w-10 h-5 bg-gray-300 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
								</div>
							</div>

							{/* User Management Settings */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-center mb-4">
									<div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
										<svg
											className="w-4 h-4 text-purple-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
											/>
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-gray-900">
										User
										Management
									</h3>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											User
											Registration
										</span>
										<button className="w-10 h-5 bg-green-500 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Email
											Verification
										</span>
										<button className="w-10 h-5 bg-green-500 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Auto-approve
											Users
										</span>
										<button className="w-10 h-5 bg-gray-300 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Session
											Timeout
										</span>
										<span className="text-sm font-medium text-gray-900">
											24
											hours
										</span>
									</div>
								</div>
							</div>

							{/* Content Management Settings */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-center mb-4">
									<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
										<svg
											className="w-4 h-4 text-emerald-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-gray-900">
										Content
										Management
									</h3>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Content
											Moderation
										</span>
										<button className="w-10 h-5 bg-green-500 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Auto-publish
										</span>
										<button className="w-10 h-5 bg-gray-300 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Max
											File
											Size
										</span>
										<span className="text-sm font-medium text-gray-900">
											10
											MB
										</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Allowed
											Formats
										</span>
										<span className="text-sm font-medium text-gray-900">
											JPG,
											PNG,
											PDF
										</span>
									</div>
								</div>
							</div>

							{/* Notification Settings */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-center mb-4">
									<div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
										<svg
											className="w-4 h-4 text-orange-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M15 17h5l-5 5v-5zM4 19h4.5a2.5 2.5 0 002.5-2.5V6a2 2 0 012-2h2a2 2 0 012 2v10.5a2.5 2.5 0 002.5 2.5H21"
											/>
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-gray-900">
										Notifications
									</h3>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Email
											Notifications
										</span>
										<button className="w-10 h-5 bg-green-500 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Push
											Notifications
										</span>
										<button className="w-10 h-5 bg-green-500 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											SMS
											Notifications
										</span>
										<button className="w-10 h-5 bg-gray-300 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm text-gray-700">
											Admin
											Alerts
										</span>
										<button className="w-10 h-5 bg-green-500 rounded-full relative">
											<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Security Settings */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<div className="flex items-center mb-6">
								<div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
									<svg
										className="w-4 h-4 text-red-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900">
									Security
									Settings
								</h3>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<div className="space-y-4">
									<h4 className="font-medium text-gray-900">
										Password
										Policy
									</h4>
									<div className="space-y-2">
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												Min
												Length
											</span>
											<span className="text-sm font-medium text-gray-900">
												8
												characters
											</span>
										</div>
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												Require
												Numbers
											</span>
											<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
												<svg
													className="w-2 h-2 text-white"
													fill="currentColor"
													viewBox="0 0 8 8"
												>
													<path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
												</svg>
											</div>
										</div>
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												Require
												Symbols
											</span>
											<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
												<svg
													className="w-2 h-2 text-white"
													fill="currentColor"
													viewBox="0 0 8 8"
												>
													<path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
												</svg>
											</div>
										</div>
									</div>
								</div>
								<div className="space-y-4">
									<h4 className="font-medium text-gray-900">
										Two-Factor
										Auth
									</h4>
									<div className="space-y-2">
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												Enable
												2FA
											</span>
											<button className="w-10 h-5 bg-gray-300 rounded-full relative">
												<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
											</button>
										</div>
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												SMS
												Backup
											</span>
											<button className="w-10 h-5 bg-gray-300 rounded-full relative">
												<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
											</button>
										</div>
									</div>
								</div>
								<div className="space-y-4">
									<h4 className="font-medium text-gray-900">
										Data
										Backup
									</h4>
									<div className="space-y-2">
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												Auto
												Backup
											</span>
											<button className="w-10 h-5 bg-green-500 rounded-full relative">
												<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
											</button>
										</div>
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												Frequency
											</span>
											<span className="text-sm font-medium text-gray-900">
												Daily
											</span>
										</div>
										<div className="flex justify-between items-center py-1">
											<span className="text-sm text-gray-700">
												Last
												Backup
											</span>
											<span className="text-sm font-medium text-green-600">
												2
												hours
												ago
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* System Actions */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								System
								Actions
							</h3>
							<div className="flex flex-wrap gap-4">
								<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
									Clear
									Cache
								</button>
								<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
									Generate
									Backup
								</button>
								<button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
									System
									Health
									Check
								</button>
								<button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
									Update
									System
								</button>
								<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
									Reset
									Analytics
								</button>
							</div>
						</div>
					</div>
				)}{" "}
				{/* Other tabs fallback */}
				{![
					"overview",
					"users",
					"content",
					"reports",
					"settings",
				].includes(
					activeTab
				) && (
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
						<h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
							{activeTab
								.charAt(
									0
								)
								.toUpperCase() +
								activeTab.slice(
									1
								)}{" "}
							Section
						</h3>
						<p className="text-sm sm:text-base text-gray-500">
							This
							section
							is
							under
							development.
						</p>
					</div>
				)}
			</main>
			{/* Modals */}
			<ConfirmationModal
				isOpen={
					confirmModal.isOpen
				}
				onClose={
					closeConfirmModal
				}
				onConfirm={async () => {
					if (
						confirmModal.type ===
							"suspend" &&
						confirmModal.data
					) {
						await handleUserDelete(
							confirmModal
								.data
								.id
						);
					}
				}}
				title={
					confirmModal.type ===
					"suspend"
						? "Suspend User"
						: confirmModal.type ===
						  "delete"
						? "Delete User"
						: "Confirm Action"
				}
				message={
					confirmModal.type ===
					"suspend"
						? `Are you sure you want to suspend ${confirmModal.data?.name}? This action can be reversed later.`
						: confirmModal.type ===
						  "delete"
						? `Are you sure you want to permanently delete ${confirmModal.data?.name}? This action cannot be undone.`
						: "Are you sure you want to proceed?"
				}
				type={
					confirmModal.type ===
					"delete"
						? "danger"
						: "warning"
				}
				confirmText={
					confirmModal.type ===
					"suspend"
						? "Suspend User"
						: confirmModal.type ===
						  "delete"
						? "Delete User"
						: "Confirm"
				}
			/>
			<UserManagementModal
				isOpen={
					userModal.isOpen
				}
				onClose={
					closeUserModal
				}
				user={
					userModal.user
				}
				mode={
					userModal.mode
				}
				onSave={
					handleUserSave
				}
				onDelete={
					handleUserDelete
				}
			/>{" "}
			<ContentManagementModal
				isOpen={
					contentModal.isOpen
				}
				onClose={
					closeContentModal
				}
				content={
					contentModal.content
				}
				mode={
					contentModal.mode
				}
				onSave={
					handleContentSave
				}
				onDelete={
					handleContentDelete
				}
			/>
			{/* Logout Confirmation Modal */}
			<ConfirmationModal
				isOpen={
					logoutModal
				}
				onClose={() =>
					setLogoutModal(
						false
					)
				}
				onConfirm={
					confirmLogout
				}
				title="Confirm Logout"
				message="Are you sure you want to logout? You will need to login again to access the admin panel."
				confirmLabel="Logout"
				confirmColor="bg-red-600 hover:bg-red-700"
			/>
		</div>
	);
}
