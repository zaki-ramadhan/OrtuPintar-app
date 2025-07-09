function UserManagementHeader({ openUserModal }) {
	return (
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
	);
}

function FilterAndSearch() {
	return (
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
	);
}

function UsersTable({
	dashboardData,
	getStatusColor,
	openUserModal,
	openConfirmModal,
}) {
	return (
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
	);
}

export default function UserManagementTab({
	openUserModal,
	openConfirmModal,
	getStatusColor,
	dashboardData,
}) {
	return (
		<div className="space-y-6">
			{/* Users Management Header */}
			<UserManagementHeader
				openUserModal={
					openUserModal
				}
			/>

			{/* Filters & Search */}
			<FilterAndSearch />

			{/* Users Table */}
			<UsersTable
				openUserModal={
					openUserModal
				}
				openConfirmModal={
					openConfirmModal
				}
				getStatusColor={
					getStatusColor
				}
				dashboardData={
					dashboardData
				}
			/>
		</div>
	);
}
