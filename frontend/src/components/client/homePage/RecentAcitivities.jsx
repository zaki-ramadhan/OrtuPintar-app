export default function RecentAcitivities() {
    const recentActivities = [
		{
			activity: "Completed puzzle game",
			child: "Emma",
			time: "30 minutes ago",
			score: 95,
		},
		{
			activity: "Practiced walking",
			child: "Alex",
			time: "2 hours ago",
			score: 88,
		},
		{
			activity: "Story reading session",
			child: "Emma",
			time: "1 day ago",
			score: 100,
		},
	];

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
			<h3 className="text-xl font-bold text-gray-900 mb-4">
				Recent
				Activities
			</h3>
			<div className="space-y-4">
				{recentActivities.map(
					(
						item,
						index
					) => (
						<div
							key={
								index
							}
							className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
						>
							<div className="flex items-center space-x-4">
								<div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
								<div>
									<h4 className="font-medium text-gray-900">
										{
											item.activity
										}
									</h4>
									<p className="text-sm text-gray-500">
										{
											item.child
										}{" "}
										•{" "}
										{
											item.time
										}
									</p>
								</div>
							</div>
							<div className="text-right">
								<div className="text-lg font-bold text-emerald-600">
									{
										item.score
									}

									%
								</div>
								<p className="text-xs text-gray-500">
									Score
								</p>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
