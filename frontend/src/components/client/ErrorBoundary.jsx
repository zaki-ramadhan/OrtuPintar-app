import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    } render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Header with Logo */}
                    <div className="absolute top-6 left-6 z-20">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                OrtuPintar
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
                        <div className="max-w-2xl mx-auto text-center">
                            {/* Error Icon */}
                            <div className="relative mb-12">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-red-400 via-pink-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 mx-auto">
                                    <svg
                                        className="w-16 h-16 md:w-20 md:h-20 text-white"
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

                            {/* Text Content */}
                            <div className="space-y-6 mb-12">                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Something Went Wrong
                            </h1>
                                <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                                    We encountered an unexpected error. Please reload the page or try again later.
                                </p>
                                {import.meta.env.DEV && this.state.error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left max-w-lg mx-auto">
                                        <p className="text-sm font-semibold text-red-800 mb-2">Error Details (Development):</p>
                                        <code className="text-xs text-red-700 block overflow-auto">
                                            {this.state.error.toString()}
                                        </code>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />                                    </svg>
                                    Back
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />                                    </svg>
                                    Reload Page
                                </button>
                            </div>                            {/* Help Text */}
                            <div className="mt-12 text-sm text-gray-500">
                                <p>If the problem persists, please contact our support team.</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-20 right-20 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute bottom-32 left-16 w-6 h-6 bg-orange-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
