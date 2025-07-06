import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [faqOpen, setFaqOpen] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const developmentTabs = [
        {
            title: "Physical Development",
            subtitle: "Motor Skills & Coordination",
            progress: 85,
            icon: "🏃‍♂️",
            color: "emerald"
        },
        {
            title: "Cognitive Development",
            subtitle: "Learning & Problem Solving",
            progress: 92,
            icon: "🧠",
            color: "blue"
        },
        {
            title: "Social-Emotional",
            subtitle: "Relationships & Emotions",
            progress: 78,
            icon: "❤️",
            color: "purple"
        },
        {
            title: "Language & Communication",
            subtitle: "Speaking & Understanding",
            progress: 88,
            icon: "💬",
            color: "orange"
        }
    ];

    // Smooth scroll function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false); // Close mobile menu
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Header */}
            <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
                    : 'bg-white/90 backdrop-blur-sm'
            }`}>
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between py-4">
                        {/* Enhanced Logo */}
                        <div className="flex items-center space-x-4 group">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                    <span className="text-white font-bold text-xl">O</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    OrtuPintar
                                </span>
                                <div className="text-xs text-gray-500 -mt-1">Smart Child Development</div>
                            </div>
                        </div>

                        {/* Enhanced Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {[
                                { name: 'Features', id: 'features' },
                                { name: 'Development Areas', id: 'development-areas' },
                                { name: 'Testimonials', id: 'testimonials' },
                                { name: 'Pricing', id: 'pricing' },
                                { name: 'Expert Support', id: 'expert-support' }
                            ].map((item, index) => (
                                <button 
                                    key={index}
                                    onClick={() => scrollToSection(item.id)}
                                    className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-200 rounded-lg hover:bg-emerald-50"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </nav>

                        {/* Enhanced CTA Buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <Link 
                                to="/login"
                                className="px-5 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors rounded-lg hover:bg-gray-50"
                            >
                                Sign In
                            </Link>
                            <Link 
                                to="/register"
                                className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                            >
                                <span>Start Free Trial</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                                <div className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                                <div className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                                <div className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                            </div>
                        </button>
                    </div>

                    {/* Enhanced Mobile Menu */}
                    {isMenuOpen && (
                        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
                            <nav className="px-6 py-6 space-y-4">
                                {[
                                    { name: 'Features', id: 'features' },
                                    { name: 'Development Areas', id: 'development-areas' },
                                    { name: 'Testimonials', id: 'testimonials' },
                                    { name: 'Pricing', id: 'pricing' },
                                    { name: 'Expert Support', id: 'expert-support' }
                                ].map((item, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => scrollToSection(item.id)}
                                        className="block w-full text-left text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                                <div className="pt-4 space-y-3 border-t border-gray-100">
                                    <Link 
                                        to="/login"
                                        className="block w-full text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors text-center"
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/register"
                                        className="block w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg text-center"
                                    >
                                        Start Free Trial
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
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
                                <span className="text-emerald-700 font-semibold text-sm">Trusted by 10,000+ parents worldwide</span>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                    Support Your Child's{" "}
                                    <span className="relative">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
                                            Development
                                        </span>
                                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
                                    </span>{" "}
                                    Journey
                                </h1>
                                
                                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                                    OrtuPintar helps you track milestones, get personalized guidance, and connect with experts 
                                    to ensure your child reaches their full potential during their crucial early years.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link 
                                    to="/register"
                                    className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                                >
                                    <span className="text-lg">Start Free Trial</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <button className="group bg-white/80 backdrop-blur text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Watch Demo</span>
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-8 pt-8">
                                <div className="flex items-center space-x-3">
                                    <div className="flex -space-x-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-10 h-10 rounded-full border-3 border-white shadow-lg ${
                                                    i === 0 ? 'bg-emerald-500' : 
                                                    i === 1 ? 'bg-blue-500' : 
                                                    i === 2 ? 'bg-purple-500' : 'bg-orange-500'
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                    <span className="text-gray-600 font-medium">Join thousands of families</span>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-gray-600 font-medium">4.9/5 rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="relative">
                            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                            <span className="text-white text-2xl">👧</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Emma's Progress</h3>
                                            <p className="text-gray-500">3 years, 2 months</p>
                                        </div>
                                    </div>
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                                </div>

                                <div className="space-y-4">
                                    {developmentTabs.map((tab, index) => (
                                        <div 
                                            key={index}
                                            className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                                                activeTab === index 
                                                    ? 'bg-gradient-to-r from-gray-50 to-gray-100 shadow-md scale-105' 
                                                    : 'bg-gray-50/50 hover:bg-gray-100/50'
                                            }`}
                                            onClick={() => setActiveTab(index)}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{tab.icon}</span>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 text-sm">{tab.title}</h4>
                                                        <p className="text-xs text-gray-500">{tab.subtitle}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-bold text-${tab.color}-600`}>
                                                    {tab.progress}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`bg-gradient-to-r from-${tab.color}-400 to-${tab.color}-600 h-2 rounded-full transition-all duration-1000`}
                                                    style={{ width: `${tab.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-emerald-600">✨</span>
                                        <span className="text-sm font-semibold text-emerald-700">Latest Achievement</span>
                                    </div>
                                    <p className="text-sm text-emerald-600">Emma can now draw circles and speak in 3-word sentences!</p>
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

            {/* Social Proof Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-8">
                        <p className="text-gray-500 font-medium">Trusted by leading organizations and pediatric experts</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
                        {[
                            { name: "Children's Hospital", logo: "🏥" },
                            { name: "Pediatric Society", logo: "👩‍⚕️" },
                            { name: "Early Learning Academy", logo: "🎓" },
                            { name: "Child Development Institute", logo: "🧠" },
                            { name: "Family Care Network", logo: "👨‍👩‍👧‍👦" },
                            { name: "Education Partners", logo: "📚" }
                        ].map((partner, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2 group hover:opacity-100 transition-opacity">
                                <div className="text-4xl group-hover:scale-110 transition-transform">{partner.logo}</div>
                                <span className="text-xs text-gray-400 font-medium text-center">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { number: "10k+", label: "Active Families", icon: "👨‍👩‍👧‍👦" },
                            { number: "50k+", label: "Milestones Tracked", icon: "📊" },
                            { number: "95%", label: "Satisfaction Rate", icon: "⭐" },
                            { number: "24/7", label: "Expert Support", icon: "🩺" }
                        ].map((stat, index) => (
                            <div key={index} className="space-y-3">
                                <div className="text-3xl">{stat.icon}</div>
                                <div className="text-4xl lg:text-5xl font-bold">{stat.number}</div>
                                <div className="text-emerald-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - ADD ID HERE */}
            <section id="features" className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Everything You Need to Support Your Child
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our comprehensive platform provides tools, insights, and expert guidance to help you navigate 
                            your child's developmental journey with confidence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "📊",
                                title: "Milestone Tracking",
                                description: "Monitor your child's development across key areas with age-appropriate milestones and personalized progress insights.",
                                color: "emerald",
                                features: ["Real-time tracking", "Age-appropriate milestones", "Progress analytics"]
                            },
                            {
                                icon: "📚",
                                title: "Learning Activities",
                                description: "Access curated activities and games designed by child development experts to support learning through play.",
                                color: "blue",
                                features: ["Expert-designed activities", "Age-based recommendations", "Interactive games"]
                            },
                            {
                                icon: "👩‍⚕️",
                                title: "Expert Guidance",
                                description: "Connect with pediatric specialists, child psychologists, and development experts for personalized advice.",
                                color: "purple",
                                features: ["24/7 consultations", "Licensed professionals", "Personalized advice"]
                            },
                            {
                                icon: "🧠",
                                title: "Smart Insights",
                                description: "Receive AI-powered insights and recommendations based on your child's unique development patterns.",
                                color: "orange",
                                features: ["AI-powered analysis", "Predictive insights", "Custom recommendations"]
                            },
                            {
                                icon: "👨‍👩‍👧‍👦",
                                title: "Family Connection",
                                description: "Share progress with family members and caregivers, creating a supportive network around your child's development.",
                                color: "rose",
                                features: ["Multi-user access", "Secure sharing", "Family dashboard"]
                            },
                            {
                                icon: "🔒",
                                title: "Secure & Private",
                                description: "Your child's data is protected with enterprise-grade security. Full privacy control with GDPR compliance.",
                                color: "indigo",
                                features: ["Enterprise security", "GDPR compliant", "Privacy controls"]
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                                <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                                
                                <div className="space-y-2">
                                    {feature.features.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 bg-${feature.color}-500 rounded-full`}></div>
                                            <span className="text-sm text-gray-600">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Development Areas Section - ADD ID HERE */}
            <section id="development-areas" className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Age-Appropriate Development Milestones
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Track your child's progress with scientifically-backed milestones for every age group.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                age: "0-12 months",
                                title: "Infant",
                                color: "pink",
                                milestones: [
                                    "First smile (2-3 months)",
                                    "Sitting without support (6-8 months)",
                                    "First words (9-12 months)",
                                    "Walking independently (12+ months)"
                                ],
                                icon: "👶"
                            },
                            {
                                age: "1-2 years",
                                title: "Toddler",
                                color: "blue",
                                milestones: [
                                    "Running and climbing",
                                    "2-word sentences", 
                                    "Following simple instructions",
                                    "Playing alongside other children"
                                ],
                                icon: "🧒"
                            },
                            {
                                age: "2-3 years",
                                title: "Preschooler",
                                color: "green",
                                milestones: [
                                    "Potty training",
                                    "3-4 word sentences",
                                    "Imaginative play",
                                    "Basic counting to 10"
                                ],
                                icon: "👧"
                            },
                            {
                                age: "3-5 years",
                                title: "School Ready",
                                color: "purple",
                                milestones: [
                                    "Writing their name",
                                    "Complex storytelling",
                                    "Understanding rules",
                                    "Independence in daily tasks"
                                ],
                                icon: "🎒"
                            }
                        ].map((stage, index) => (
                            <div key={index} className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-${stage.color}-400`}>
                                <div className="text-center mb-6">
                                    <div className="text-4xl mb-3">{stage.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900">{stage.title}</h3>
                                    <p className={`text-${stage.color}-600 font-semibold`}>{stage.age}</p>
                                </div>
                                
                                <div className="space-y-3">
                                    {stage.milestones.map((milestone, milestoneIndex) => (
                                        <div key={milestoneIndex} className="flex items-start space-x-3">
                                            <div className={`w-2 h-2 bg-${stage.color}-400 rounded-full mt-2 flex-shrink-0`}></div>
                                            <span className="text-sm text-gray-600 leading-relaxed">{milestone}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            How OrtuPintar Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Simple steps to start supporting your child's development journey today.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300"></div>
                        
                        {[
                            {
                                step: "01",
                                title: "Create Profile",
                                description: "Set up your child's profile with basic information, age, and current developmental stage to get personalized recommendations.",
                                icon: "👶",
                                color: "emerald"
                            },
                            {
                                step: "02", 
                                title: "Track Progress",
                                description: "Log milestones, activities, and observations. Our smart system analyzes patterns and provides insights into your child's development.",
                                icon: "📱",
                                color: "blue"
                            },
                            {
                                step: "03",
                                title: "Get Guidance",
                                description: "Receive personalized activities, expert advice, and milestone predictions to support your child's optimal development.",
                                icon: "🎯",
                                color: "purple"
                            }
                        ].map((step, index) => (
                            <div key={index} className="text-center relative">
                                <div className={`w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white font-bold text-2xl`}>
                                    {step.step}
                                </div>
                                
                                <div className="text-5xl mb-4">{step.icon}</div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                                
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-10 -right-6 text-gray-300">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section - ADD ID HERE */}
            <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Trusted by Parents Worldwide
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            See how OrtuPintar has helped families support their children's development journey.
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
                                highlight: "Milestone tracking gave me confidence"
                            },
                            {
                                name: "Michael Rodriguez", 
                                role: "Father of 2-year-old Alex",
                                avatar: "👨‍💻",
                                content: "As a first-time parent, I was worried about whether Alex was developing normally. OrtuPintar's expert guidance and milestone tracking put my mind at ease.",
                                rating: 5,
                                color: "blue",
                                highlight: "Put my mind at ease as a first-time parent"
                            },
                            {
                                name: "Aisha Patel",
                                role: "Mother of 4-year-old Raj", 
                                avatar: "👩‍⚕️",
                                content: "The learning activities are fantastic! Raj loves them and I can see how they're helping his cognitive development. The expert consultations were incredibly valuable.",
                                rating: 5,
                                color: "purple",
                                highlight: "Expert consultations were incredibly valuable"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className={`relative p-8 rounded-3xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className={`absolute top-6 right-6 w-8 h-8 bg-${testimonial.color}-100 rounded-full flex items-center justify-center text-${testimonial.color}-600`}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                    </svg>
                                </div>

                                <div className="flex items-center mb-6">
                                    <div className={`w-14 h-14 bg-gradient-to-br from-${testimonial.color}-400 to-${testimonial.color}-600 rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-700 leading-relaxed mb-4 italic">
                                    "{testimonial.content}"
                                </p>

                                <div className={`p-3 bg-${testimonial.color}-50 rounded-lg mb-4 border-l-4 border-${testimonial.color}-400`}>
                                    <p className={`text-sm font-medium text-${testimonial.color}-700`}>
                                        💡 "{testimonial.highlight}"
                                    </p>
                                </div>
                                
                                <div className="flex text-yellow-400">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section - ADD ID HERE */}
            <section id="pricing" className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Choose Your Plan
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Start free and upgrade as your family grows. All plans include expert support and unlimited tracking.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Starter",
                                price: "Free",
                                period: "forever",
                                description: "Perfect for new parents getting started",
                                features: [
                                    "Track 1 child",
                                    "Basic milestone tracking",
                                    "50+ activities",
                                    "Community support",
                                    "Mobile app access"
                                ],
                                cta: "Start Free",
                                popular: false,
                                color: "gray"
                            },
                            {
                                name: "Family",
                                price: "$9.99",
                                period: "/month",
                                description: "Ideal for growing families",
                                features: [
                                    "Track up to 3 children",
                                    "Advanced milestone tracking",
                                    "500+ activities & games",
                                    "Expert chat support",
                                    "Progress reports",
                                    "Family sharing",
                                    "Video consultations (2/month)"
                                ],
                                cta: "Try Free for 14 Days",
                                popular: true,
                                color: "emerald"
                            },
                            {
                                name: "Premium",
                                price: "$19.99",
                                period: "/month",
                                description: "Complete support for dedicated parents",
                                features: [
                                    "Unlimited children",
                                    "AI-powered insights",
                                    "1000+ premium activities",
                                    "24/7 expert support",
                                    "Detailed analytics",
                                    "Custom learning plans",
                                    "Unlimited consultations",
                                    "Priority customer support"
                                ],
                                cta: "Try Free for 14 Days",
                                popular: false,
                                color: "blue"
                            }
                        ].map((plan, index) => (
                            <div key={index} className={`relative rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                                plan.popular 
                                    ? 'bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-400 scale-105' 
                                    : 'bg-white border border-gray-200'
                            }`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                            🔥 Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                                    <div className="flex items-center justify-center mb-2">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-500 ml-1">{plan.period}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center space-x-3">
                                            <svg className={`w-5 h-5 text-${plan.color === 'gray' ? 'emerald' : plan.color}-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                                    plan.popular 
                                        ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}>
                                    {plan.cta}
                                </button>

                                {plan.price !== 'Free' && (
                                    <p className="text-center text-xs text-gray-500 mt-3">
                                        No commitment • Cancel anytime
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">All plans include our happiness guarantee</p>
                        <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
                            <span>✓ 14-day free trial</span>
                            <span>✓ No setup fees</span>
                            <span>✓ 30-day money back guarantee</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get answers to common questions about OrtuPintar and child development tracking.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {[
                            {
                                question: "What age ranges does OrtuPintar support?",
                                answer: "OrtuPintar supports children from birth to 5 years old. Our milestone tracking and activities are scientifically designed for each developmental stage, ensuring age-appropriate guidance throughout your child's early years."
                            },
                            {
                                question: "How does the milestone tracking work?",
                                answer: "Our milestone tracking uses evidence-based developmental markers from pediatric research. You simply log your observations, and our AI analyzes patterns to provide insights. If any concerns arise, we'll recommend consulting with our expert pediatricians."
                            },
                            {
                                question: "Are the experts real licensed professionals?",
                                answer: "Yes! All our experts are licensed pediatricians, child psychologists, speech therapists, and developmental specialists. They hold valid certifications and have years of experience in child development."
                            },
                            {
                                question: "Is my child's data secure and private?",
                                answer: "Absolutely. We use enterprise-grade encryption and are fully GDPR compliant. Your child's data is never shared with third parties, and you have complete control over who can access your family's information."
                            },
                            {
                                question: "Can I track multiple children on one account?",
                                answer: "Yes! Our Family and Premium plans allow you to track multiple children. Each child gets their own personalized dashboard and milestone tracking, while maintaining a unified family view."
                            },
                            {
                                question: "What if my child seems behind on milestones?",
                                answer: "Every child develops at their own pace. Our system accounts for normal variations. If we detect potential concerns, we'll connect you with appropriate specialists for personalized guidance and peace of mind."
                            },
                            {
                                question: "Do you offer a money-back guarantee?",
                                answer: "Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not completely satisfied, we'll refund your payment, no questions asked."
                            },
                            {
                                question: "How often are new activities added?",
                                answer: "We add new activities and games weekly, developed by our team of child development experts. Premium users get early access to new content and can request specific activity types."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    className="w-full text-left p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                                        <svg 
                                            className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${faqOpen === index ? 'rotate-180' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {faqOpen === index && (
                                        <div className="mt-4 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expert Support Section - ADD ID HERE */}
            <section id="expert-support" className="py-24 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Start Your Child's Development Journey Today
                        </h2>
                        <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto">
                            Join thousands of parents who trust OrtuPintar to support their child's crucial early years. 
                            Start your free trial today and see the difference expert guidance can make.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                            <Link 
                                to="/register"
                                className="group bg-white text-gray-900 px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                            >
                                <span>Start Free Trial</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <button className="border-2 border-white text-white px-12 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                                Schedule Demo
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-8 text-emerald-100">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>14-day free trial</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Cancel anytime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl">O</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-bold">OrtuPintar</span>
                                    <div className="text-xs text-gray-400">Smart Child Development</div>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Supporting families in nurturing their children's development through expert guidance, 
                                smart tracking, and personalized insights.
                            </p>
                            <div className="flex space-x-4">
                                {['twitter', 'facebook', 'linkedin', 'instagram'].map((social, index) => (
                                    <div key={index} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer group">
                                        <div className="w-5 h-5 bg-gray-500 group-hover:bg-emerald-400 transition-colors rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-6 text-emerald-300">Product</h4>
                            <ul className="space-y-4">
                                {['Features', 'Pricing', 'Mobile App', 'API Access', 'Security'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-6 text-blue-300">Resources</h4>
                            <ul className="space-y-4">
                                {['Blog', 'Help Center', 'Community', 'Webinars', 'Research'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-6 text-purple-300">Support</h4>
                            <ul className="space-y-4">
                                {['Contact Us', 'Live Chat', 'Phone Support', 'Status Page', 'Report Issue'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-12 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-400 text-center md:text-left">
                                &copy; 2025 OrtuPintar. All rights reserved. Made with ❤️ for families worldwide.
                            </p>
                            <div className="flex space-x-6">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                                    <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}