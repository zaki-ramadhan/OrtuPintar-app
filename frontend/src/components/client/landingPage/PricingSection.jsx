export default function PricingSection() {
    return (
        <section
				id="pricing"
				className="py-24 bg-white"
			>
				<div className="container mx-auto px-6 lg:px-12">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
							Choose
							Your
							Plan
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Start
							free
							and
							upgrade
							as
							your
							family
							grows.
							All
							plans
							include
							professional
							support
							and
							unlimited
							tracking.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{[
							{
								name: "Starter",
								price: "Free",
								period: "forever",
								description: "Perfect for new parents getting started",
								features: [
									"Track 1 child",
									"Basic milestone tracking",
									"50+ activities",
									"Community support",
									"Mobile app access",
								],
								cta: "Start Free",
								popular: false,
								color: "gray",
							},
							{
								name: "Family",
								price: "$9.99",
								period: "/month",
								description: "Ideal for growing families",
								features: [
									"Track up to 3 children",
									"Advanced milestone tracking",
									"500+ activities & games",
									"Professional chat support",
									"Progress reports",
									"Family sharing",
									"Video consultations (2/month)",
								],
								cta: "Try Free for 14 Days",
								popular: true,
								color: "emerald",
							},
							{
								name: "Premium",
								price: "$19.99",
								period: "/month",
								description: "Complete support for dedicated parents",
								features: [
									"Unlimited children",
									"AI-powered insights",
									"1000+ premium activities",
									"24/7 professional support",
									"Detailed analytics",
									"Custom learning plans",
									"Unlimited consultations",
									"Priority customer support",
								],
								cta: "Try Free for 14 Days",
								popular: false,
								color: "blue",
							},
						].map(
							(
								plan,
								index
							) => (
								<div
									key={
										index
									}
									className={`relative rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
										plan.popular
											? "bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-400 scale-105"
											: "bg-white border border-gray-200"
									}`}
								>
									{plan.popular && (
										<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
											<span className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
												🔥
												Most
												Popular
											</span>
										</div>
									)}

									<div className="text-center mb-8">
										<h3 className="text-2xl font-bold text-gray-900 mb-2">
											{
												plan.name
											}
										</h3>
										<p className="text-gray-600 text-sm mb-4">
											{
												plan.description
											}
										</p>
										<div className="flex items-center justify-center mb-2">
											<span className="text-4xl font-bold text-gray-900">
												{
													plan.price
												}
											</span>
											<span className="text-gray-500 ml-1">
												{
													plan.period
												}
											</span>
										</div>
									</div>

									<div className="space-y-4 mb-8">
										{plan.features.map(
											(
												feature,
												featureIndex
											) => (
												<div
													key={
														featureIndex
													}
													className="flex items-center space-x-3"
												>
													<svg
														className={`w-5 h-5 text-${
															plan.color ===
															"gray"
																? "emerald"
																: plan.color
														}-500`}
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
															d="M5 13l4 4L19 7"
														/>
													</svg>
													<span className="text-gray-700">
														{
															feature
														}
													</span>
												</div>
											)
										)}
									</div>

									<button
										className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
											plan.popular
												? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
									>
										{
											plan.cta
										}
									</button>

									{plan.price !==
										"Free" && (
										<p className="text-center text-xs text-gray-500 mt-3">
											No
											commitment
											•
											Cancel
											anytime
										</p>
									)}
								</div>
							)
						)}
					</div>

					<div className="text-center mt-12">
						<p className="text-gray-600 mb-4">
							All
							plans
							include
							our
							happiness
							guarantee
						</p>
						<div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
							<span>
								✓
								14-day
								free
								trial
							</span>
							<span>
								✓
								No
								setup
								fees
							</span>
							<span>
								✓
								30-day
								money
								back
								guarantee
							</span>
						</div>
					</div>
				</div>
			</section>
    )
};
