import { useEffect } from "react";
import {
	TopBar,
	HeroSection,
	SocialProofSection,
	StatsSection,
	FeaturesSection,
	DevelopmentSection,
	HowItWorksSection,
	TestimonialsSection,
	PricingSection,
	FaqSection,
	ProfessionalSupportSection,
	Footer
} from "@/components/client/landingPage";

export default function LandingPage() {
	useEffect(() => {
		document.title =
			"OrtuPintar - Smart Parenting Platform";
	}, []);

	return (
		<div className="min-h-screen bg-white">
			{/* Enhanced Header */}
			<TopBar />

			{/* Hero Section */}
			<HeroSection />

			{/* Social Proof Section */}
			<SocialProofSection />

			{/* Stats Section */}
			<StatsSection />

			{/* Features Section - ADD ID HERE */}
			<FeaturesSection />

			{/* Development Areas Section - ADD ID HERE */}
			<DevelopmentSection />

			{/* How It Works Section */}
			<HowItWorksSection />

			{/* Testimonials Section - ADD ID HERE */}
			<TestimonialsSection />

			{/* Pricing Section - ADD ID HERE */}
			{/* <PricingSection /> */}

			{/* FAQ Section */}
			<FaqSection />

			{/* Expert Support Section - ADD ID HERE */}
			{/* <ProfessionalSupportSection /> */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
