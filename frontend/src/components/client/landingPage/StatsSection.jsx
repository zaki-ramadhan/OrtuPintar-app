export default function StatsSection() {
	return (
		<section className="py-16 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
			<div className="absolute inset-0 bg-black/10"></div>
			<div className="container mx-auto px-6 lg:px-12 relative z-10">
				<div className="grid grid-cols-2 place-content-center lg:grid-cols-3 gap-8 text-center text-white">
					{[
						{
							number: "10k+",
							label: "Active Families",
							icon: "👨‍👩‍👧‍👦",
						},
						{
							number: "50k+",
							label: "Milestones Tracked",
							icon: "📊",
						},
						{
							number: "95%",
							label: "Satisfaction Rate",
							icon: "⭐",
						},
					].map(
						(
							stat,
							index
						) => (
							<div
								key={
									index
								}
								className="space-y-3"
							>
								<div className="text-3xl">
									{
										stat.icon
									}
								</div>
								<div className="text-4xl lg:text-5xl font-bold">
									{
										stat.number
									}
								</div>
								<div className="text-emerald-100 font-medium">
									{
										stat.label
									}
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
}
