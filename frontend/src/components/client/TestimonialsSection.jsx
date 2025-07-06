export default function TestimonialsSection() {
	return (
		<section
			id="testimonials"
			className="py-24 bg-gradient-to-br from-slate-50 to-gray-100"
		>
			<div className="container mx-auto px-6 lg:px-12">
				<div className="text-center mb-16">
					<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
						Trusted
						by
						Parents
						Worldwide
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						See
						how
						OrtuPintar
						has
						helped
						families
						support
						their
						children's
						development
						journey.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							name: "Sarah Chen",
							role: "Mother of 3-year-old Emma",
							avatar: "👩‍💼",
							content: "OrtuPintar helped me understand my daughter's development better. The milestone tracking gave me confidence that Emma was progressing well, and the activities were perfect for her age.",
							rating: 5,
							color: "emerald",
							highlight: "Milestone tracking gave me confidence",
						},
						{
							name: "Michael Rodriguez",
							role: "Father of 2-year-old Alex",
							avatar: "👨‍💻",
							content: "As a first-time parent, I was worried about whether Alex was developing normally. OrtuPintar's expert guidance and milestone tracking put my mind at ease.",
							rating: 5,
							color: "blue",
							highlight: "Put my mind at ease as a first-time parent",
						},
						{
							name: "Aisha Patel",
							role: "Mother of 4-year-old Raj",
							avatar: "👩‍⚕️",
							content: "The learning activities are fantastic! Raj loves them and I can see how they're helping his cognitive development. The expert consultations were incredibly valuable.",
							rating: 5,
							color: "purple",
							highlight: "Expert consultations were incredibly valuable",
						},
					].map(
						(
							testimonial,
							index
						) => (
							<div
								key={
									index
								}
								className={`relative p-8 rounded-3xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
							>
								<div
									className={`absolute top-6 right-6 w-8 h-8 bg-${testimonial.color}-100 rounded-full flex items-center justify-center text-${testimonial.color}-600`}
								>
									<svg
										className="w-4 h-4"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>

								<div className="flex items-center mb-6">
									<div
										className={`w-14 h-14 bg-gradient-to-br from-${testimonial.color}-400 to-${testimonial.color}-600 rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg`}
									>
										{
											testimonial.avatar
										}
									</div>
									<div>
										<h4 className="font-bold text-gray-900">
											{
												testimonial.name
											}
										</h4>
										<p className="text-sm text-gray-600">
											{
												testimonial.role
											}
										</p>
									</div>
								</div>

								<p className="text-gray-700 leading-relaxed mb-4 italic">
									"
									{
										testimonial.content
									}

									"
								</p>

								<div
									className={`p-3 bg-${testimonial.color}-50 rounded-lg mb-4 border-l-4 border-${testimonial.color}-400`}
								>
									<p
										className={`text-sm font-medium text-${testimonial.color}-700`}
									>
										💡
										"
										{
											testimonial.highlight
										}

										"
									</p>
								</div>

								<div className="flex text-yellow-400">
									{[
										...Array(
											testimonial.rating
										),
									].map(
										(
											_,
											i
										) => (
											<svg
												key={
													i
												}
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
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
