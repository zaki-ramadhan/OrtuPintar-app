export const getActivityIcon = (type) => {
	const iconClasses =
		"w-3 h-3 sm:w-4 sm:h-4 text-white";
	const containerClasses =
		"w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center";

	switch (type) {
		case "user_signup":
			return (
				<div
					className={`${containerClasses} bg-green-500`}
				>
					<svg
						className={
							iconClasses
						}
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
							d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
						/>
					</svg>
				</div>
			);
		case "milestone_added":
			return (
				<div
					className={`${containerClasses} bg-blue-500`}
				>
					<svg
						className={
							iconClasses
						}
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
			);
		case "consultation_booked":
			return (
				<div
					className={`${containerClasses} bg-purple-500`}
				>
					<svg
						className={
							iconClasses
						}
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
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			);
		case "system_update":
			return (
				<div
					className={`${containerClasses} bg-orange-500`}
				>
					<svg
						className={
							iconClasses
						}
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
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</div>
			);
		case "report_generated":
			return (
				<div
					className={`${containerClasses} bg-indigo-500`}
				>
					<svg
						className={
							iconClasses
						}
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
				</div>
			);
		default:
			return (
				<div
					className={`${containerClasses} bg-gray-500`}
				>
					<svg
						className={
							iconClasses
						}
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
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
			);
	}
};
