function ReportsHeader() {
	return (
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
	);
}

function AnalyticsOverviewCard({ analyticsData }) {
	return (
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
							{
								analyticsData.totalRevenue
							}
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
								{
									analyticsData.revenueGrowth
								}
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
							{
								analyticsData.userEngagement
							}
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
								{
									analyticsData.engagementGrowth
								}
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
							{
								analyticsData.consultations
							}
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
								{
									analyticsData.consultationGrowth
								}
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
							{
								analyticsData.conversionRate
							}
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
								{
									analyticsData.conversionGrowth
								}
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
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2v-14a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}

function ChartsSection() {
	return (
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
	);
}

function DetailReportsTable() {
	return (
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
	);
}

function QuickStatsGrid() {
	return (
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
	);
}


export default function ReportsTab({ analyticsData }) {
	return (
		<div className="space-y-6">
			{/* Reports Header */}
			<ReportsHeader />

			{/* Analytics Overview Cards */}
			<AnalyticsOverviewCard
				analyticsData={
					analyticsData
				}
			/>

			{/* Charts Section */}
			<ChartsSection />

			{/* Detailed Reports Table */}
			<DetailReportsTable />

			{/* Quick Stats Grid */}
			<QuickStatsGrid />
		</div>
	);
}
