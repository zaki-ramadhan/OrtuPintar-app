import { useState } from "react";
import { Link } from "react-router";

export default function HeroSection() {
	const [activeTab, setActiveTab] = useState(0);

	const developmentTabs = [
		{
			title: "Physical Development",
			subtitle: "Motor Skills & Coordination",
			progress: 85,
			icon: "🏃‍♂️",
			color: "emerald",
		},
		{
			title: "Cognitive Development",
			subtitle: "Learning & Problem Solving",
			progress: 92,
			icon: "🧠",
			color: "blue",
		},
		{
			title: "Social-Emotional",
			subtitle: "Relationships & Emotions",
			progress: 78,
			icon: "❤️",
			color: "purple",
		},
		{
			title: "Language & Communication",
			subtitle: "Speaking & Understanding",
			progress: 88,
			icon: "💬",
			color: "orange",
		},
	];

	return (
		<section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
			{/* ...existing hero content... */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
			</div>

			<div className="container mx-auto px-6 lg:px-12 relative z-10">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Hero content */}
					<div className="space-y-8">
						<div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200 rounded-full px-6 py-3 shadow-sm">
							<div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
							<span className="text-emerald-700 font-semibold text-sm">
								Trusted
								by
								10,000+
								parents
								worldwide
							</span>
						</div>

						<div className="space-y-6">
							<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
								Support
								Your
								Child's{" "}
								<span className="relative">
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
										Development
									</span>
									<div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
								</span>{" "}
								Journey
							</h1>

							<p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
								OrtuPintar helps you track milestones, get personalized guidance, and get the support you need to help your child thrive during their crucial early years.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								to="/register"
								className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
							>
								<span className="text-lg">
									Let's Get Started
									
									
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
							{/* <button className="group bg-white/80 backdrop-blur text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3">
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
										d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>
									Watch
									Demo
								</span>
							</button> */}
						</div>

						<div className="flex flex-wrap items-center gap-8 pt-3">
							<div className="flex items-center space-x-3">
								<div className="flex -space-x-2">
									{[
										...Array(
											4
										),
									].map(
										(
											_,
											i
										) => (
											<div
												key={
													i
												}
												className={`w-10 h-10 rounded-full border-3 border-white shadow-lg ${
													i ===
													0
														? "bg-emerald-500"
														: i ===
														  1
														? "bg-blue-500"
														: i ===
														  2
														? "bg-purple-500"
														: "bg-orange-500"
												}`}
											></div>
										)
									)}
								</div>
								<span className="text-gray-600 font-medium">
									Join
									thousands
									of
									families
								</span>
							</div>
						</div>
					</div>

					{/* Dashboard Preview */}
					<div className="relative">
						<div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
							<div className="flex items-center justify-between mb-8">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center">
										<span className="text-white text-2xl">
											👧
										</span>
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900">
											Emma's
											Progress
										</h3>
										<p className="text-gray-500">
											3
											years,
											2
											months
										</p>
									</div>
								</div>
								<div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
							</div>

							<div className="space-y-4">
								{developmentTabs.map(
									(
										tab,
										index
									) => (
										<div
											key={
												index
											}
											className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
												activeTab ===
												index
													? "bg-gradient-to-r from-gray-50 to-gray-100 shadow-md scale-105"
													: "bg-gray-50/50 hover:bg-gray-100/50"
											}`}
											onClick={() =>
												setActiveTab(
													index
												)
											}
										>
											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center space-x-3">
													<span className="text-2xl">
														{
															tab.icon
														}
													</span>
													<div>
														<h4 className="font-semibold text-gray-900 text-sm">
															{
																tab.title
															}
														</h4>
														<p className="text-xs text-gray-500">
															{
																tab.subtitle
															}
														</p>
													</div>
												</div>
												<span
													className={`text-sm font-bold text-${tab.color}-600`}
												>
													{
														tab.progress
													}

													%
												</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div
													className={`bg-gradient-to-r from-${tab.color}-400 to-${tab.color}-600 h-2 rounded-full transition-all duration-1000`}
													style={{
														width: `${tab.progress}%`,
													}}
												></div>
											</div>
										</div>
									)
								)}
							</div>

							<div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
								<div className="flex items-center space-x-2 mb-2">
									<span className="text-emerald-600">
										✨
									</span>
									<span className="text-sm font-semibold text-emerald-700">
										Latest
										Achievement
									</span>
								</div>
								<p className="text-sm text-emerald-600">
									Emma
									can
									now
									draw
									circles
									and
									speak
									in
									3-word
									sentences!
								</p>
							</div>
						</div>

						<div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl animate-bounce">
							📈
						</div>

						<div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl shadow-xl animate-pulse">
							🎯
						</div>

						<div className="absolute top-1/2 -left-6 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg animate-ping">
							💡
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
