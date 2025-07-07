export default function UpcomingReminders() {
	const upcomingReminders = [
		{
			title: "Doctor Appointment",
			date: "Tomorrow, 10:00 AM",
			type: "medical",
		},
		{
			title: "Weekly Assessment",
			date: "Friday, 2:00 PM",
			type: "assessment",
		},
		{
			title: "Vaccination Due",
			date: "Next Week",
			type: "medical",
		},
	];

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
			<h3 className="text-lg font-bold text-gray-900 mb-4">
				Upcoming
				Reminders
			</h3>
			<div className="space-y-3">
				{upcomingReminders.map(
					(
						reminder,
						index
					) => (
						<div
							key={
								index
							}
							className="p-3 border border-gray-200 rounded-lg"
						>
							<div className="flex items-center space-x-3">
								<div className="text-lg">
									{reminder.type ===
									"medical"
										? "🏥"
										: "📊"}
								</div>
								<div>
									<h4 className="font-medium text-gray-900 text-sm">
										{
											reminder.title
										}
									</h4>
									<p className="text-xs text-gray-500">
										{
											reminder.date
										}
									</p>
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
