import TopBar from "@/components/client/TopBar";
import HeroSection from "@/components/client/HeroSection";
import SocialProofSection from '@/components/client/SocialProofSection';
import StatsSection from '@/components/client/StatsSection';
import FeaturesSection from '@/components/client/FeaturesSection';
import DevelopmentSection from '@/components/client/DevelopmentSection';
import HowItWorksSection from '@/components/client/HowItWorksSection';
import TestimonialsSection from '@/components/client/TestimonialsSection';
import PricingSection from '@/components/client/PricingSection';
import FaqSection from '@/components/client/FaqSection';
import ExpertSupportSection from '@/components/client/ExpertSupportSection';
import Footer from '@/components/client/Footer';

export default function LandingPage() {

	return (
		<div className="min-h-screen bg-white">
			{/* Enhanced Header */}
			<TopBar />

			{/* Hero Section */}
			<HeroSection />

			{/* Social Proof Section */}
			<SocialProofSection/>

			{/* Stats Section */}
			<StatsSection/>

			{/* Features Section - ADD ID HERE */}
			<FeaturesSection/>

			{/* Development Areas Section - ADD ID HERE */}
			<DevelopmentSection/>

			{/* How It Works Section */}
			<HowItWorksSection/>

			{/* Testimonials Section - ADD ID HERE */}
			<TestimonialsSection/>

			{/* Pricing Section - ADD ID HERE */}
			<PricingSection/>

			{/* FAQ Section */}
			<FaqSection/>

			{/* Expert Support Section - ADD ID HERE */}
			<ExpertSupportSection/>

			{/* Footer */}
			<Footer/>
		</div>
	);
}
