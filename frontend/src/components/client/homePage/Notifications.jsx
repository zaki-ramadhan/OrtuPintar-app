import { useState } from "react";

export default function Notifications({
	notifications,
	onMarkAsRead,
	onMarkAllAsRead,
}) {
	const [
		selectedNotification,
		setSelectedNotification,
	] = useState(null);

	if (!notifications || notifications.length === 0) {
		return (
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold text-gray-900">
						Notifications
					</h3>
					<span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">
						0
					</span>
				</div>
				<div className="text-center py-8">
					<div className="text-4xl mb-4">
						🔔
					</div>
					<h4 className="text-lg font-semibold text-gray-700 mb-2">
						All
						caught
						up!
					</h4>
					<p className="text-gray-500 text-sm">
						No
						new
						notifications
						at
						the
						moment.
					</p>
				</div>
			</div>
		);
	}

	const getNotificationIcon = (type) => {
		switch (type) {
			case "milestone":
				return "🎯";
			case "reminder":
				return "⏰";
			case "achievement":
				return "🎉";
			case "alert":
				return "⚠️";
			case "info":
				return "ℹ️";
			default:
				return "🔔";
		}
	};

	const getNotificationStyle = (type) => {
		switch (type) {
			case "milestone":
				return "bg-blue-50 border-blue-200 hover:bg-blue-100";
			case "reminder":
				return "bg-yellow-50 border-yellow-200 hover:bg-yellow-100";
			case "achievement":
				return "bg-green-50 border-green-200 hover:bg-green-100";
			case "alert":
				return "bg-red-50 border-red-200 hover:bg-red-100";
			case "info":
				return "bg-gray-50 border-gray-200 hover:bg-gray-100";
			default:
				return "bg-gray-50 border-gray-200 hover:bg-gray-100";
		}
	};

	const getNotificationDetails = (notification) => {
		switch (notification.type) {
			case "milestone":
				return {
					title: "Milestone Ready",
					description: "Emma has shown great progress in cognitive development and is ready for new challenging activities.",
					action: "View Activities",
					actionUrl: "/activities?child=emma&category=cognitive",
				};
			case "reminder":
				return {
					title: "Assessment Due",
					description: "It's time for Alex's weekly developmental assessment to track progress and identify new learning opportunities.",
					action: "Start Assessment",
					actionUrl: "/assessment?child=alex",
				};
			case "achievement":
				return {
					title: "Milestone Completed!",
					description: "Congratulations! Emma has successfully completed the drawing milestone. This is a significant step in her fine motor development.",
					action: "View Progress",
					actionUrl: "/progress?child=emma&milestone=drawing",
				};
			case "alert":
				return {
					title: "Health Reminder",
					description: "Alex's next vaccination is scheduled for next week. Please contact your healthcare provider to confirm the appointment.",
					action: "Schedule Appointment",
					actionUrl: "/medical?child=alex&type=vaccination",
				};
			default:
				return {
					title: "Notification",
					description: notification.message,
					action: "View Details",
					actionUrl: "#",
				};
		}
	};

	const handleViewDetails = (notification) => {
		setSelectedNotification(
			notification
		);
	};

	const handleCloseModal = () => {
		setSelectedNotification(
			null
		);
	};

	const handleAction = (actionUrl) => {
		console.log(
			`Navigate to: ${actionUrl}`
		);
		setSelectedNotification(
			null
		);
	};

	const handleMarkAsReadAndClose = (notificationId) => {
		onMarkAsRead(
			notificationId
		);
		setSelectedNotification(
			null
		);
	};

	return (
		<>
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold text-gray-900">
						Notifications
					</h3>
					<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
						{
							notifications.length
						}
					</span>
				</div>

				<div className="space-y-3 max-h-80 overflow-y-auto">
					{notifications.map(
						(
							notification
						) => (
							<div
								key={
									notification.id
								}
								className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${getNotificationStyle(
									notification.type
								)}`}
							>
								<div className="flex items-start space-x-3">
									<div className="text-lg flex-shrink-0">
										{getNotificationIcon(
											notification.type
										)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm text-gray-900 font-medium leading-relaxed">
											{
												notification.message
											}
										</p>
										<div className="flex items-center justify-between mt-2">
											<p className="text-xs text-gray-500">
												{
													notification.time
												}
											</p>
											<div className="flex space-x-2">
												{notification.actionable && (
													<button
														onClick={() =>
															handleViewDetails(
																notification
															)
														}
														className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
													>
														View
														Details
													</button>
												)}
												<button
													onClick={() =>
														onMarkAsRead(
															notification.id
														)
													}
													className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors"
												>
													✓
													Mark
													Read
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					)}
				</div>

				{/* Mark All as Read */}
				{notifications.length >
					0 && (
					<div className="mt-4 pt-4 border-t border-gray-200">
						<button
							onClick={
								onMarkAllAsRead
							}
							className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
						>
							Mark
							all
							as
							read
						</button>
					</div>
				)}
			</div>

			{/* Notification Details Modal */}
			{selectedNotification && (
				<div className="fixed w-full h-full inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
						{/* Modal Header */}
						<div
							className={`p-6 rounded-t-2xl ${getNotificationStyle(
								selectedNotification.type
							)}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="text-2xl">
										{getNotificationIcon(
											selectedNotification.type
										)}
									</div>
									<h3 className="text-lg font-bold text-gray-900">
										{
											getNotificationDetails(
												selectedNotification
											)
												.title
										}
									</h3>
								</div>
								<button
									onClick={
										handleCloseModal
									}
									className="text-gray-400 hover:text-gray-600 transition-colors"
								>
									<svg
										className="w-6 h-6"
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						{/* Modal Body */}
						<div className="p-6">
							<div className="mb-4">
								<p className="text-gray-700 leading-relaxed">
									{
										getNotificationDetails(
											selectedNotification
										)
											.description
									}
								</p>
							</div>

							<div className="mb-6">
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-500">
										Received:
									</span>
									<span className="font-medium text-gray-700">
										{
											selectedNotification.time
										}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm mt-2">
									<span className="text-gray-500">
										Type:
									</span>
									<span className="font-medium text-gray-700 capitalize">
										{
											selectedNotification.type
										}
									</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex space-x-3">
								<button
									onClick={() =>
										handleAction(
											getNotificationDetails(
												selectedNotification
											)
												.actionUrl
										)
									}
									className="flex-1 bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
								>
									{
										getNotificationDetails(
											selectedNotification
										)
											.action
									}
								</button>
								<button
									onClick={
										handleCloseModal
									}
									className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
								>
									Close
								</button>
							</div>

							{/* Mark as Read */}
							<div className="mt-4 pt-4 border-t border-gray-200">
								<button
									onClick={() =>
										handleMarkAsReadAndClose(
											selectedNotification.id
										)
									}
									className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
								>
									Mark
									as
									read
									and
									dismiss
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
