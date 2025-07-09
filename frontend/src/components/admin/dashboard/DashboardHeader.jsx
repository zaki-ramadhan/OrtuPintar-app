import React from "react";
export default function DashboardHeader({ setLogoutModal, user }) {
	const [sidebarOpen, setSidebarOpen] =
		React.useState(false);

	const handleLogout = () => {
		setLogoutModal(true);
	};

	return (
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
	);
}
