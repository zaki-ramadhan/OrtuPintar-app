import { Link } from "react-router";

export default function ProfessionalSupportSection() {
	return (
		<section
			id="professional-support"
			className="py-24 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden"
		>
			<div className="absolute inset-0 bg-black/10"></div>
			<div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						Start
						Your
						Child's
						Development
						Journey
						Today
					</h2>
					<p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto">
						Join
						thousands
						of
						parents
						who
						trust
						OrtuPintar
						to
						support
						their
						child's
						crucial
						early
						years.
						Start
						your
						free
						trial
						today
						and
						see
						the
						difference
						professional
						guidance
						can
						make.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
						<Link
							to="/register"
							className="group bg-white text-gray-900 px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3"
						>
							<span>
								Start
								Free
								Trial
							</span>
							<svg
								className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
						</Link>
						<button className="border-2 border-white text-white px-12 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
							Schedule
							Demo
						</button>
					</div>

					<div className="flex flex-wrap justify-center items-center gap-8 text-emerald-100">
						<div className="flex items-center space-x-2">
							<svg
								className="w-5 h-5"
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
							<span>
								No
								credit
								card
								required
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<svg
								className="w-5 h-5"
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
							<span>
								14-day
								free
								trial
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<svg
								className="w-5 h-5"
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
							<span>
								Cancel
								anytime
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
