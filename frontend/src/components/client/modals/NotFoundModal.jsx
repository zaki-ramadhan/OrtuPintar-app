import { useNavigate } from "react-router";

export default function NotFoundModal({ open, onClose, invalidUrl = "" }) {
    const navigate = useNavigate();

    if (!open) return null;

    const handleGoHome = () => {
        onClose();
        navigate("/home");
    };

    const handleGoBack = () => {
        onClose();
        navigate(-1);
    }; return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md p-6 md:p-8 relative animate-fadeIn border-t-4 border-red-500">
                <button
                    className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-100 to-orange-100 border border-red-200 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                        <svg
                            className="w-7 h-7 md:w-8 md:h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                        Page Not Found
                    </h2>

                    {/* Message */}
                    <p className="text-sm md:text-base text-gray-600 mb-2 leading-relaxed">
                        The page you are looking for could not be found.
                    </p>                    {invalidUrl && (
                        <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 md:mb-6 max-w-full">
                            <p className="text-xs text-red-600 mb-1">Accessed URL:</p>
                            <code className="text-xs md:text-sm font-mono text-red-800 break-all">
                                {invalidUrl}
                            </code>
                        </div>
                    )}                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full mt-3 md:mt-4">
                        <button
                            className="flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-xl bg-white border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200 font-semibold text-sm md:text-base"
                            onClick={handleGoBack}
                            type="button"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </span>
                        </button>
                        <button
                            className="flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm md:text-base"
                            onClick={handleGoHome}
                            type="button"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </span>
                        </button>
                    </div>                    {/* Help Text */}
                    <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                        If the problem persists, please contact our support team
                    </p>
                </div>
            </div>
        </div>
    );
}
