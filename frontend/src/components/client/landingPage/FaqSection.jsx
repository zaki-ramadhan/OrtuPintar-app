import { useState } from "react";

export default function FaqSection() {
	const [faqOpen, setFaqOpen] = useState(null);
	return (
		<section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="text-center mb-16">
					<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
						Frequently
						Asked
						Questions
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Get
						answers
						to
						common
						questions
						about
						OrtuPintar
						and
						child
						development
						tracking.
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					{[
						{
							question: "What age ranges does OrtuPintar support?",
							answer: "OrtuPintar supports children from birth to 5 years old. Our milestone tracking and activities are scientifically designed for each developmental stage, ensuring age-appropriate guidance throughout your child's early years.",
						},
						{
							question: "How does the milestone tracking work?",
							answer: "Our milestone tracking uses evidence-based developmental markers from pediatric research. You simply log your observations, and our AI analyzes patterns to provide insights. If any concerns arise, we'll recommend consulting with our professional pediatricians.",
						},
						{
							question: "Are the professionals real licensed specialists?",
							answer: "Yes! All our experts are licensed pediatricians, child psychologists, speech therapists, and developmental specialists. They hold valid certifications and have years of experience in child development.",
						},
						{
							question: "Is my child's data secure and private?",
							answer: "Absolutely. We use enterprise-grade encryption and are fully GDPR compliant. Your child's data is never shared with third parties, and you have complete control over who can access your family's information.",
						},
						{
							question: "Can I track multiple children on one account?",
							answer: "Yes! Our Family and Premium plans allow you to track multiple children. Each child gets their own personalized dashboard and milestone tracking, while maintaining a unified family view.",
						},
						{
							question: "What if my child seems behind on milestones?",
							answer: "Every child develops at their own pace. Our system accounts for normal variations. If we detect potential concerns, we'll connect you with appropriate specialists for personalized guidance and peace of mind.",
						},
						{
							question: "How often are new activities added?",
							answer: "We add new activities and games weekly, developed by our team of child development experts. Premium users get early access to new content and can request specific activity types.",
						},
					].map(
						(
							faq,
							index
						) => (
							<div
								key={
									index
								}
								className="mb-4"
							>
								<button
									className="w-full text-left p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
									onClick={() =>
										setFaqOpen(
											faqOpen ===
												index
												? null
												: index
										)
									}
								>
									<div className="flex justify-between items-center">
										<h3 className="text-lg font-semibold text-gray-900 pr-8">
											{
												faq.question
											}
										</h3>
										<svg
											className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
												faqOpen ===
												index
													? "rotate-180"
													: ""
											}`}
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
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</div>
									{faqOpen ===
										index && (
										<div className="mt-4 text-gray-600 leading-relaxed">
											{
												faq.answer
											}
										</div>
									)}
								</button>
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
}
