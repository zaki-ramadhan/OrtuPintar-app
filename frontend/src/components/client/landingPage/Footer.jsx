import { Link } from "react-router";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-16">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="grid md:grid-cols-4 gap-12">
					<div className="space-y-6">
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
								<span className="text-white font-bold text-xl">
									O
								</span>
							</div>
							<div>
								<span className="text-2xl font-bold">
									OrtuPintar
								</span>
								<div className="text-xs text-gray-400">
									Smart
									Child
									Development
								</div>
							</div>
						</div>
						<p className="text-gray-400 leading-relaxed">
							Supporting
							families
							in
							nurturing
							their
							children's
							development
							through
							smart
							guidance,
							intelligent
							tracking,
							and
							personalized
							insights.
						</p>
						<div className="flex space-x-4">
							{[
								{
									name: "instagram",
									url: "https://instagram.com/ortupintar",
									icon: (
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
										</svg>
									),
								},
								{
									name: "github",
									url: "https://github.com/zaki-ramadhan/OrtuPintar-app",
									icon: (
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
										</svg>
									),
								},
								{
									name: "gmail",
									url: "mailto:support@ortupintar.com",
									icon: (
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
										</svg>
									),
								},
								{
									name: "whatsapp",
									url: "https://wa.me/6281234567890",
									icon: (
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" />
										</svg>
									),
								},
							].map((social, index) => (
								<a
									key={index}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer group"
								>
									<div className="text-gray-500 group-hover:text-emerald-400 transition-colors">
										{social.icon}
									</div>
								</a>
							))}
						</div>
					</div>

					<div>
						<h4 className="text-xl font-bold mb-6 text-emerald-300">
							Quick Links
						</h4>
						<ul className="space-y-4">
							{[
								{ name: "Home", path: "/home" },
								{ name: "Milestones", path: "/milestones" },
								{ name: "Log Activity", path: "/log-activity" },
								{ name: "Reports", path: "/reports" },
								{ name: "Login", path: "/login" },
							].map(
								(
									item,
									index
								) => (
									<li
										key={
											index
										}
									>
										<Link
											to={item.path}
											className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
										>
											{
												item.name
											}
										</Link>
									</li>
								)
							)}
						</ul>
					</div>

					<div>
						<h4 className="text-xl font-bold mb-6 text-blue-300">
							Contact Info
						</h4>
						<div className="space-y-4">
							<div className="text-gray-400">
								<p>📧 support@ortupintar.com</p>
							</div>
							<div className="text-gray-400">
								<p>📱 +62 812-3456-7890</p>
							</div>
							<div className="text-gray-400">
								<p>📍 Jakarta, Indonesia</p>
							</div>
							<div className="text-gray-400">
								<p>🕒 Mon-Fri: 9AM-6PM</p>
							</div>
						</div>
					</div>

					<div>
						<h4 className="text-xl font-bold mb-6 text-purple-300">
							Get Started
						</h4>
						<div className="space-y-4">
							<p className="text-gray-400 text-sm">
								Join OrtuPintar today and start tracking your child's development journey
							</p>
							<div className="flex flex-col space-y-3">
								<Link 
									to="/register"
									className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold text-center"
								>
									Create Account
								</Link>
								<p className="text-xs text-gray-500 text-center">
									Already have an account? 
									<Link 
										to="/login" 
										className="text-emerald-400 hover:text-emerald-300 ml-1"
									>
										Sign In
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-700 mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-gray-400 text-center md:text-left">
							&copy;
							2025
							OrtuPintar.
							All
							rights
							reserved.
							Made
							with
							❤️
							for
							families
							worldwide.
						</p>
						<div className="flex space-x-6">
							{[
								"Privacy Policy",
								"Terms of Service",
								"Cookie Policy",
							].map(
								(
									item,
									index
								) => (
									<a
										key={
											index
										}
										href="#"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										{
											item
										}
									</a>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
