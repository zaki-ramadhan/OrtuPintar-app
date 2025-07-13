export default function FeaturesSection() {
	return (
		<section
			id="features"
			className="py-24 bg-white"
		>
			<div className="container mx-auto px-6 lg:px-12">
				<div className="text-center mb-16">
					<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
						Everything
						You
						Need
						to
						Support
						Your
						Child
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Our
						comprehensive
						platform
						provides
						tools,
						insights,
						and
						expert
						guidance
						to
						help
						you
						navigate
						your
						child's
						developmental
						journey
						with
						confidence.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[
						{
							icon: "📊",
							title: "Milestone Tracking",
							description: "Monitor your child's development across key areas with age-appropriate milestones and personalized progress insights.",
							color: "emerald",
							features: [
								"Real-time tracking",
								"Age-appropriate milestones",
								"Progress analytics",
							],
						},
						{
							icon: "📚",
							title: "Learning Activities",
							description: "Access curated activities and games designed by child development experts to support learning through play.",
							color: "blue",
							features: [
								"Expert-designed activities",
								"Age-based recommendations",
								"Interactive games",
							],
						},
						{
							icon: "👩‍⚕️",
							title: "Expert Guidance",
							description: "Connect with pediatric specialists, child psychologists, and development experts for personalized advice.",
							color: "purple",
							features: [
								"24/7 consultations",
								"Licensed professionals",
								"Personalized advice",
							],
						},
						{
							icon: "🧠",
							title: "Smart Insights",
							description: "Receive AI-powered insights and recommendations based on your child's unique development patterns.",
							color: "orange",
							features: [
								"AI-powered analysis",
								"Predictive insights",
								"Custom recommendations",
							],
						},
						{
							icon: "👨‍👩‍👧‍👦",
							title: "Family Connection",
							description: "Share progress with family members and caregivers, creating a supportive network around your child's development.",
							color: "rose",
							features: [
								"Multi-user access",
								"Secure sharing",
								"Family dashboard",
							],
						},
						{
							icon: "🔒",
							title: "Secure & Private",
							description: "Your child's data is protected with enterprise-grade security. Full privacy control with GDPR compliance.",
							color: "indigo",
							features: [
								"Enterprise security",
								"GDPR compliant",
								"Privacy controls",
							],
						},
					].map(
						(
							feature,
							index
						) => (
							<div
								key={
									index
								}
								className="group relative p-8 rounded-3xl border border-gray-100 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 hover:-translate-y-2 bg-white"
							>
								<div
									className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl`}
								>
									{
										feature.icon
									}
								</div>
								<h3 className="text-xl font-bold mb-4 text-gray-900">
									{
										feature.title
									}
								</h3>
								<p className="text-gray-600 leading-relaxed mb-6">
									{
										feature.description
									}
								</p>

								<div className="space-y-2">
									{feature.features.map(
										(
											item,
											itemIndex
										) => (
											<div
												key={
													itemIndex
												}
												className="flex items-center space-x-2"
											>
												<div
													className={`w-2 h-2 bg-${feature.color}-500 rounded-full`}
												></div>
												<span className="text-sm text-gray-600">
													{
														item
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
	);
}
