export default function SocialProofSection() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
				<div className="container mx-auto px-6 lg:px-12">
					<div className="text-center mb-8">
						<p className="text-gray-500 font-medium">
							Trusted
							by
							leading
							organizations
							and
							pediatric
							professionals
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
						{[
							{
								name: "Children's Hospital",
								logo: "🏥",
							},
							{
								name: "Pediatric Society",
								logo: "👩‍⚕️",
							},
							{
								name: "Early Learning Academy",
								logo: "🎓",
							},
							{
								name: "Child Development Institute",
								logo: "🧠",
							},
							{
								name: "Family Care Network",
								logo: "👨‍👩‍👧‍👦",
							},
							{
								name: "Education Partners",
								logo: "📚",
							},
						].map(
							(
								partner,
								index
							) => (
								<div
									key={
										index
									}
									className="flex flex-col items-center space-y-2 group hover:opacity-100 transition-opacity"
								>
									<div className="text-4xl group-hover:scale-110 transition-transform">
										{
											partner.logo
										}
									</div>
									<span className="text-xs text-gray-400 font-medium text-center">
										{
											partner.name
										}
									</span>
								</div>
							)
						)}
					</div>
				</div>
			</section>
    )
};
