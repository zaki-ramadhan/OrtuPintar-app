export default function DevelopmentSection() {
    return (
        <section
				id="development-areas"
				className="py-24 bg-gradient-to-br from-slate-50 to-gray-100"
			>
				<div className="container mx-auto px-6 lg:px-12">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
							Age-Appropriate
							Development
							Milestones
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Track
							your
							child's
							progress
							with
							scientifically-backed
							milestones
							for
							every
							age
							group.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								age: "0-12 months",
								title: "Infant",
								color: "pink",
								milestones: [
									"First smile (2-3 months)",
									"Sitting without support (6-8 months)",
									"First words (9-12 months)",
									"Walking independently (12+ months)",
								],
								icon: "👶",
							},
							{
								age: "1-2 years",
								title: "Toddler",
								color: "blue",
								milestones: [
									"Running and climbing",
									"2-word sentences",
									"Following simple instructions",
									"Playing alongside other children",
								],
								icon: "🧒",
							},
							{
								age: "2-3 years",
								title: "Preschooler",
								color: "green",
								milestones: [
									"Potty training",
									"3-4 word sentences",
									"Imaginative play",
									"Basic counting to 10",
								],
								icon: "👧",
							},
							{
								age: "3-5 years",
								title: "School Ready",
								color: "purple",
								milestones: [
									"Writing their name",
									"Complex storytelling",
									"Understanding rules",
									"Independence in daily tasks",
								],
								icon: "🎒",
							},
						].map(
							(
								stage,
								index
							) => (
								<div
									key={
										index
									}
									className={`bg-white rounded-3xl p-8 shadow-lg shadow-gray-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-${stage.color}-400`}
								>
									<div className="text-center mb-6">
										<div className="text-4xl mb-3">
											{
												stage.icon
											}
										</div>
										<h3 className="text-xl font-bold text-gray-900">
											{
												stage.title
											}
										</h3>
										<p
											className={`text-${stage.color}-600 font-semibold`}
										>
											{
												stage.age
											}
										</p>
									</div>

									<div className="space-y-3">
										{stage.milestones.map(
											(
												milestone,
												milestoneIndex
											) => (
												<div
													key={
														milestoneIndex
													}
													className="flex items-start space-x-3"
												>
													<div
														className={`w-2 h-2 bg-${stage.color}-400 rounded-full mt-2 flex-shrink-0`}
													></div>
													<span className="text-sm text-gray-600 leading-relaxed">
														{
															milestone
														}
													</span>
												</div>
											)
										)}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</section>
    )
};
