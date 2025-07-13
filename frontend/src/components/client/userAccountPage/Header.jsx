import { Link } from "react-router";

export default function Header({ setShowLogoutModal }) {
    return (
        <div className="bg-white shadow-sm border-b  border-gray-300">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-1 md:py-4">
                    {/* Logo Section */}
                    <div className="flex items-center">                        <Link to="/" className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm md:text-base">O</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg md:text-xl font-bold text-gray-900">OrtuPintar</h1>
                            <p className="text-xs text-gray-500">Smart Child Development</p>
                        </div>
                    </Link>
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex items-center space-x-1 md:space-x-4">              {/* Back to Home - Home icon only on mobile, full text with arrow on desktop */}
                        <Link
                            to="/home"
                            className="text-gray-500 hover:text-gray-900 p-2 md:px-3 md:py-2 rounded-lg flex items-center space-x-1"
                            title="Back to Home"
                        >
                            {/* Home icon only on mobile */}
                            <span className="lg:hidden p-2.5 border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-100 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </span>

                            {/* Arrow + Text on desktop */}
                            <svg className="w-4 h-4 md:w-5 md:h-5 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="hidden lg:block text-sm font-medium">Back to Home</span>
                        </Link>

                        {/* Logout Button */}
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="bg-red-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center gap-2"
                        >
                            <span className="">Logout</span>
                            <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
