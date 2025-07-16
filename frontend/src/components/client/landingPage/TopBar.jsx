import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function TopBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(
				window.scrollY >
					50
			);
		};
		window.addEventListener(
			"scroll",
			handleScroll
		);
		return () =>
			window.removeEventListener(
				"scroll",
				handleScroll
			);
	}, []);

	// Smooth scroll function
	const scrollToSection = (sectionId) => {
		const element =
			document.getElementById(
				sectionId
			);
		if (element) {
			element.scrollIntoView(
				{
					behavior: "smooth",
					block: "start",
				}
			);
		}
		setIsMenuOpen(false); // Close mobile menu
	};
	return (
		<header
			className={`fixed w-full top-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100"
					: "bg-white/90 backdrop-blur-sm"
			}`}
		>
			<div className="container mx-auto px-6 lg:px-12">
				<div className="flex items-center justify-between py-4">
					{/* Enhanced Logo */}
					<div className="flex items-center space-x-4 group">
						<div className="relative">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
								<span className="text-white font-bold text-xl">
									O
								</span>
							</div>
							<div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
						</div>
						<div>
							<span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
								OrtuPintar
							</span>
							<div className="text-xs text-gray-500 -mt-1">
								Smart
								Child
								Development
							</div>
						</div>
					</div>

					{/* Enhanced Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-1">
						{[
							{
								name: "Features",
								id: "features",
							},
							{
								name: "Development Areas",
								id: "development-areas",
							},
							{
								name: "Testimonials",
								id: "testimonials",
							},
							
						].map(
							(
								item,
								index
							) => (
								<button
									key={
										index
									}
									onClick={() =>
										scrollToSection(
											item.id
										)
									}
									className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-200 rounded-lg hover:bg-emerald-50"
								>
									{
										item.name
									}
								</button>
							)
						)}
					</nav>

					{/* Enhanced CTA Buttons */}
					<div className="hidden lg:flex items-center space-x-3">
						<Link
							to="/login"
							className="px-5 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors rounded-lg hover:bg-gray-50"
						>
							Sign
							In
						</Link>
						<Link
							to="/register"
							className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center space-x-2"
						>
							<span>
								Let's Get Started
							</span>
							<svg
								className="w-4 h-4"
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
					</div>

					{/* Mobile Menu Button */}
					<button
						className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
						onClick={() =>
							setIsMenuOpen(
								!isMenuOpen
							)
						}
					>
						<div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
							<div
								className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${
									isMenuOpen
										? "rotate-45 translate-y-2"
										: ""
								}`}
							></div>
							<div
								className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${
									isMenuOpen
										? "opacity-0"
										: ""
								}`}
							></div>
							<div
								className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${
									isMenuOpen
										? "-rotate-45 -translate-y-2"
										: ""
								}`}
							></div>
						</div>
					</button>
				</div>

				{/* Enhanced Mobile Menu */}
				{isMenuOpen && (
					<div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
						<nav className="px-6 py-6 space-y-4">
							{[
								{
									name: "Features",
									id: "features",
								},
								{
									name: "Development Areas",
									id: "development-areas",
								},
								{
									name: "Testimonials",
									id: "testimonials",
								},
								{
									name: "Pricing",
									id: "pricing",
								},
								{
									name: "Professional Support",
									id: "professional-support",
								},
							].map(
								(
									item,
									index
								) => (
									<button
										key={
											index
										}
										onClick={() =>
											scrollToSection(
												item.id
											)
										}
										className="block w-full text-left text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors"
									>
										{
											item.name
										}
									</button>
								)
							)}
							<div className="pt-4 space-y-3 border-t border-gray-100">
								<Link
									to="/login"
									className="block w-full text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors text-center"
								>
									Sign
									In
								</Link>
								<Link
									to="/register"
									className="block w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg text-center"
								>
									Start
									Free
									Trial
								</Link>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
