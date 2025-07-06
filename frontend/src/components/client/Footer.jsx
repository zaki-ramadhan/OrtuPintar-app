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
							expert
							guidance,
							smart
							tracking,
							and
							personalized
							insights.
						</p>
						<div className="flex space-x-4">
							{[
								"twitter",
								"facebook",
								"linkedin",
								"instagram",
							].map(
								(
									social,
									index
								) => (
									<div
										key={
											index
										}
										className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer group"
									>
										<div className="w-5 h-5 bg-gray-500 group-hover:bg-emerald-400 transition-colors rounded"></div>
									</div>
								)
							)}
						</div>
					</div>

					<div>
						<h4 className="text-xl font-bold mb-6 text-emerald-300">
							Product
						</h4>
						<ul className="space-y-4">
							{[
								"Features",
								"Pricing",
								"Mobile App",
								"API Access",
								"Security",
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
										<a
											href="#"
											className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
										>
											{
												item
											}
										</a>
									</li>
								)
							)}
						</ul>
					</div>

					<div>
						<h4 className="text-xl font-bold mb-6 text-blue-300">
							Resources
						</h4>
						<ul className="space-y-4">
							{[
								"Blog",
								"Help Center",
								"Community",
								"Webinars",
								"Research",
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
										<a
											href="#"
											className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
										>
											{
												item
											}
										</a>
									</li>
								)
							)}
						</ul>
					</div>

					<div>
						<h4 className="text-xl font-bold mb-6 text-purple-300">
							Support
						</h4>
						<ul className="space-y-4">
							{[
								"Contact Us",
								"Live Chat",
								"Phone Support",
								"Status Page",
								"Report Issue",
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
										<a
											href="#"
											className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
										>
											{
												item
											}
										</a>
									</li>
								)
							)}
						</ul>
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
