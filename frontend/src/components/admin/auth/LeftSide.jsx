export default function LeftSide() {
	return (
		<div className="hidden lg:flex lg:w-1/2 bg-white/80 backdrop-blur-xl flex-col justify-between p-12 relative">
			{/* Header with Logo */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4 group">
					<div className="relative">
						<div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
							<svg
								className="w-6 h-6 text-white"
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
						<div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
					</div>
					<div>
						<span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
							OrtuPintar
						</span>
						<div className="text-xs text-gray-500 -mt-1">
							Admin
							Portal
						</div>
					</div>
				</div>

				<button className="text-gray-600 hover:text-purple-600 font-medium transition-colors flex items-center space-x-2">
					<svg
						className="w-4 h-4"
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
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					<span>
						Back
						to
						main
						site
					</span>
				</button>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col justify-center space-y-8">
				<div className="space-y-6">
					<h1 className="text-4xl lg:text-5xl font-bold leading-tight">
						Manage{" "}
						<span className="relative">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
								OrtuPintar
							</span>
							<div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
						</span>{" "}
						Platform
					</h1>

					<p className="text-xl text-gray-600 leading-relaxed">
						Access
						the
						comprehensive
						admin
						dashboard
						to
						monitor
						users,
						manage
						content,
						and
						oversee
						the
						child
						development
						platform.
					</p>
				</div>

				{/* Admin Features Preview */}
				<div className="space-y-4">
					{[
						{
							icon: "👥",
							text: "User Management & Analytics",
						},
						{
							icon: "📊",
							text: "System Performance Monitoring",
						},
						{
							icon: "🎯",
							text: "Content & Activity Management",
						},
						{
							icon: "🔒",
							text: "Security & Access Control",
						},
					].map(
						(
							feature,
							index
						) => (
							<div
								key={
									index
								}
								className="flex items-center space-x-3"
							>
								<span className="text-2xl">
									{
										feature.icon
									}
								</span>
								<span className="text-gray-700 font-medium">
									{
										feature.text
									}
								</span>
							</div>
						)
					)}
				</div>
			</div>

			{/* Bottom Stats */}
			<div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
				<div className="text-center">
					<div className="text-2xl font-bold text-purple-600">
						10.2k
					</div>
					<div className="text-sm text-gray-500">
						Active
						Users
					</div>
				</div>
				<div className="text-center">
					<div className="text-2xl font-bold text-indigo-600">
						1.8k
					</div>
					<div className="text-sm text-gray-500">
						Daily
						Reports
					</div>
				</div>
				<div className="text-center">
					<div className="text-2xl font-bold text-blue-600">
						99.9%
					</div>
					<div className="text-sm text-gray-500">
						System
						Uptime
					</div>
				</div>
			</div>
		</div>
	);
}
