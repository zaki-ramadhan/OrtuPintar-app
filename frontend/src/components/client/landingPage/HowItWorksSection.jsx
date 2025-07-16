export default function HowItWorksSection() {
    return (
        <section className="py-24 bg-white">
				<div className="container mx-auto px-6 lg:px-12">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
							How
							OrtuPintar
							Works
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Simple
							steps
							to
							start
							supporting
							your
							child's
							development
							journey
							today.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-12 relative">
						<div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300"></div>

						{[
							{
								step: "01",
								title: "Create Profile",
								description: "Set up your child's profile with basic information, age, and current developmental stage to get personalized recommendations.",
								icon: "👶",
								color: "emerald",
							},
							{
								step: "02",
								title: "Track Progress",
								description: "Log milestones, activities, and observations. Our smart system analyzes patterns and provides insights into your child's development.",
								icon: "📱",
								color: "blue",
							},
							{
								step: "03",
								title: "Get Guidance",
								description: "Receive personalized activities, professional advice, and milestone predictions to support your child's optimal development.",
								icon: "🎯",
								color: "purple",
							},
						].map(
							(
								step,
								index
							) => (
								<div
									key={
										index
									}
									className="text-center relative"
								>
									<div
										className={`w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white font-bold text-2xl`}
									>
										{
											step.step
										}
									</div>

									<div className="text-5xl mb-4">
										{
											step.icon
										}
									</div>

									<h3 className="text-2xl font-bold text-gray-900 mb-4">
										{
											step.title
										}
									</h3>
									<p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
										{
											step.description
										}
									</p>

									{index <
										2 && (
										<div className="hidden md:block absolute top-10 -right-6 text-gray-300">
											<svg
												className="w-8 h-8"
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
													d="M13 7l5 5m0 0l-5 5m5-5H6"
												/>
											</svg>
										</div>
									)}
								</div>
							)
						)}
					</div>
				</div>
			</section>
    )
};
