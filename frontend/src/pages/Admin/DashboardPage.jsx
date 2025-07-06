import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function DashboardPage() {
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] =
		useState("overview");
	const [loading, setLoading] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigate = useNavigate();

	// Sample data - replace with real API calls
	const [dashboardData, setDashboardData] = useState({
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
			icon: "📊",
		},
		{
			id: "users",
			name: "Users",
			icon: "👥",
		},
		{
			id: "content",
			name: "Content",
			icon: "📝",
		},
		{
			id: "reports",
			name: "Reports",
			icon: "📈",
		},
		{
			id: "settings",
			name: "Settings",
			icon: "⚙️",
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
									<span className="text-base">
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
									<span className="text-lg">
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
							</div>
							<div className="flex gap-3">
								<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
									Export
									Users
								</button>
								<button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
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
													</td>
													<td className="py-3 px-4">
														<div className="flex items-center space-x-2">
															<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
																View
															</button>
															<button className="text-green-600 hover:text-green-700 text-sm font-medium">
																Edit
															</button>
															<button className="text-red-600 hover:text-red-700 text-sm font-medium">
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
				)}

				{/* Other tabs content */}
				{activeTab !==
					"overview" && (
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
		</div>
	);
}
