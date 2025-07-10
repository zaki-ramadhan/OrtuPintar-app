import { useMemo } from "react";

export default function WeeklySummary({ reminders = [], notifications = [] }) {
	// Hitung tanggal awal dan akhir minggu ini
	const today = new Date();
	const startOfWeek = new Date(today);
	startOfWeek.setDate(today.getDate() - today.getDay()); // Minggu
	startOfWeek.setHours(0, 0, 0, 0);
	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	// Helper: cek apakah tanggal dalam range minggu ini
	const isThisWeek = (dateStr) => {
		const d = new Date(dateStr);
		return (
			d >=
				startOfWeek &&
			d <=
				endOfWeek
		);
	};

	// Activities completed minggu ini
	const activitiesCompleted = useMemo(
		() =>
			reminders.filter(
				(
					r
				) =>
					r.completed &&
					isThisWeek(
						r.date
					)
			)
				.length,
		[reminders]
	);

	// Milestones achieved minggu ini (dari notifikasi type achievement)
	const milestonesAchieved = useMemo(
		() =>
			notifications.filter(
				(
					n
				) =>
					n.type ===
						"achievement" &&
					!n.read &&
					isThisWeek(
						today
					)
			)
				.length,
		[notifications, today]
	);

	// Expert consultations minggu ini (dari notifikasi type info atau expert)
	const expertConsults = useMemo(
		() =>
			notifications.filter(
				(
					n
				) =>
					(n.type ===
						"info" ||
						n.type ===
							"expert") &&
					isThisWeek(
						today
					)
			)
				.length,
		[notifications, today]
	);

	// Progress score: rata-rata persentase progress harian (dari reminders)
	const days = 7;
	let totalProgress = 0;
	for (let i = 0; i < days; i++) {
		const date = new Date(
			startOfWeek
		);
		date.setDate(
			startOfWeek.getDate() +
				i
		);
		const dateStr = date
			.toISOString()
			.split(
				"T"
			)[0];
		const dayReminders =
			reminders.filter(
				(
					r
				) =>
					r.date ===
					dateStr
			);
		const completed =
			dayReminders.filter(
				(
					r
				) =>
					r.completed
			).length;
		const progress =
			dayReminders.length >
			0
				? completed /
				  dayReminders.length
				: 0;
		totalProgress += progress;
	}
	const avgProgress = Math.round(
		(totalProgress / days) * 100
	);
	const progressScore =
		avgProgress >= 90
			? "A+"
			: avgProgress >=
			  75
			? "A"
			: avgProgress >=
			  60
			? "B"
			: avgProgress >=
			  40
			? "C"
			: "D";

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
			<h3 className="text-lg font-bold text-gray-900 mb-4">
				This
				Week's
				Summary
			</h3>
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">
						Activities
						Completed
					</span>
					<span className="font-bold text-emerald-600">
						{
							activitiesCompleted
						}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">
						Milestones
						Achieved
					</span>
					<span className="font-bold text-blue-600">
						{
							milestonesAchieved
						}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">
						Expert
						Consultations
					</span>
					<span className="font-bold text-purple-600">
						{
							expertConsults
						}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">
						Progress
						Score
					</span>
					<span className="font-bold text-orange-600">
						{
							progressScore
						}
					</span>
				</div>
			</div>
		</div>
	);
}
