import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import NotFoundModal from "@/components/client/modals/NotFoundModal";

export default function NotFoundPage() {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Set page title for not found page
        document.title = "Page Not Found - OrtuPintar";

        // Show modal after a brief delay for better UX
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleGoHome = () => {
        navigate("/home");
    };

    const handleGoBack = () => {
        navigate(-1);
    }; return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-red-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-orange-200/25 to-yellow-200/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-red-100/15 to-pink-100/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>            {/* Header with Logo */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm md:text-lg">O</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        OrtuPintar
                    </span>
                </div>
            </div>            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6 pt-16 md:pt-0">
                <div className="max-w-2xl mx-auto text-center w-full">
                    {/* Error Code with Modern Design */}
                    <div className="relative mb-8 md:mb-12">
                        <div className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[16rem] font-bold text-red-100 leading-none select-none">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <svg
                                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>                    {/* Text Content */}
                    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 px-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                            Page Not Found
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                            The page you are looking for could not be found. The URL might be mistyped or the page has been moved.
                        </p>
                        {location.pathname && (
                            <div className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 max-w-full">
                                <span className="font-mono text-xs sm:text-sm truncate">{location.pathname}</span>
                            </div>
                        )}
                    </div>                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-xs sm:max-w-md mx-auto px-4">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center justify-center px-4 py-3 md:px-6 md:py-3 bg-white border-2 border-red-200 text-red-700 font-semibold rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
                        >
                            <svg
                                className="w-4 h-4 md:w-5 md:h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <span className="text-sm md:text-base">Kembali</span>
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="flex items-center justify-center px-4 py-3 md:px-6 md:py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
                        >
                            <svg
                                className="w-4 h-4 md:w-5 md:h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />                            </svg>
                            <span className="text-sm md:text-base">Go Home</span>
                        </button>
                    </div>                    {/* Help Text */}
                    <div className="mt-8 md:mt-12 text-xs md:text-sm text-gray-500 px-4">
                        <p>Need help? Contact our support team or return to the main page.</p>
                    </div>
                </div>
            </div>

            {/* Floating Decorative Elements - Hidden on mobile for better performance */}
            <div className="hidden md:block absolute top-20 right-20 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-60"></div>
            <div className="hidden md:block absolute bottom-32 left-16 w-4 h-4 bg-orange-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="hidden md:block absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>

            {/* NotFound Modal */}
            <NotFoundModal
                open={showModal}
                onClose={() => setShowModal(false)}
                invalidUrl={location.pathname}
            />
        </div>
    );
}
