export default function ExportAndActions ({ mockReportData }) {
    return (
        <div className="mt-6 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6">
            <div className="text-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Export & Share Reports</h3>
                <p className="text-sm text-gray-600">Download or share your child's progress reports</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <button className="group bg-emerald-500 text-white px-4 md:px-6 py-3 rounded-xl hover:bg-emerald-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Export PDF</span>
                </button>

                <button className="group bg-blue-500 text-white px-4 md:px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share Report</span>
                </button>

                <button className="group bg-purple-500 text-white px-4 md:px-6 py-3 rounded-xl hover:bg-purple-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span>Download Data</span>
                </button>
            </div>

            <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-xl">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-emerald-800">
                            <strong>🎯 Achievement Unlocked:</strong> Your child has completed {mockReportData.overview.completedMilestones} milestones this month!
                            Keep up the great work with consistent daily activities.
                        </p>
                        <button className="text-emerald-600 hover:text-emerald-700 underline text-sm font-medium mt-1 transition-colors">
                            View Achievement History →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}