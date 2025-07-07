export default function WeeklySummary() {
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
						12
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">
						Milestones
						Achieved
					</span>
					<span className="font-bold text-blue-600">
						3
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">
						Expert
						Consultations
					</span>
					<span className="font-bold text-purple-600">
						1
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">
						Progress
						Score
					</span>
					<span className="font-bold text-orange-600">
						A+
					</span>
				</div>
			</div>
		</div>
	);
}
