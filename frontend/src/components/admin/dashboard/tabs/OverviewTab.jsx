function TotalUsersCard({ stats }) {
	return (
		<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
			<div className="flex items-center justify-between">
				<div className="min-w-0 flex-1">
					<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
						Total
						Users
					</p>
					<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
						{stats.totalUsers.toLocaleString()}
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
						stats.monthlyGrowth
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
	);
}

function ActiveUsersCard({ stats }) {
	return (
		<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
			<div className="flex items-center justify-between">
				<div className="min-w-0 flex-1">
					<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
						Active
						Users
					</p>
					<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
						{stats.activeUsers.toLocaleString()}
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
					87.2
					%
				</span>
				<span className="text-xs sm:text-sm text-gray-500 ml-1">
					engagement
					rate
				</span>
			</div>
		</div>
	);
}

function TotalChildrenCard({ stats }) {
	return (
		<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
			<div className="flex items-center justify-between">
				<div className="min-w-0 flex-1">
					<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
						Total
						Children
					</p>
					<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
						{stats.totalChildren.toLocaleString()}
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
	);
}

function SystemHealthCard({ stats }) {
	return (
		<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
			<div className="flex items-center justify-between">
				<div className="min-w-0 flex-1">
					<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
						System
						Health
					</p>
					<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
						{
							stats.systemHealth
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
	);
}

function StatsCard({ dashboardData }) {
	if (!dashboardData || !dashboardData.stats)
		return null;
	const stats = dashboardData.stats;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
			<TotalUsersCard
				stats={
					stats
				}
			/>
			<ActiveUsersCard
				stats={
					stats
				}
			/>
			<TotalChildrenCard
				stats={
					stats
				}
			/>
			<SystemHealthCard
				stats={
					stats
				}
			/>
		</div>
	);
}

function RecentUsers({ dashboardData, getStatusColor }) {
	if (!dashboardData || !dashboardData.recentUsers)
		return null;
	return (
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
	);
}

function RecentActivities({ dashboardData, getActivityIcon }) {
	if (!dashboardData || !dashboardData.activities)
		return null;
	return (
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
	);
}

export default function OverviewTab({
	dashboardData,
	getStatusColor,
	getActivityIcon,
}) {
	return (
		<div className="space-y-6 sm:space-y-8">
			{/* Stats Cards */}
			<StatsCard
				dashboardData={
					dashboardData
				}
			/>
			{/* Recent Activity and Users */}
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
				<RecentUsers
					dashboardData={
						dashboardData
					}
					getStatusColor={
						getStatusColor
					}
				/>
				<RecentActivities
					dashboardData={
						dashboardData
					}
					getActivityIcon={
						getActivityIcon
					}
				/>
			</div>
		</div>
	);
}
