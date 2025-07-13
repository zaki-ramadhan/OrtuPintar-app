export default function MainContentGrid ({ mockReportData, formatDateRange, getProgressPercentage }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Weekly Progress Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Weekly Progress</h3>
                    <div className="text-sm text-gray-500">
                        {formatDateRange()}
                    </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                    {mockReportData.weeklyProgress.map((day, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-10 md:w-12 text-sm font-medium text-gray-600">{day.day}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2.5 md:h-3">
                                <div
                                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2.5 md:h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${getProgressPercentage(day.completed, day.total)}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-600 w-12 md:w-16 text-right">
                                {day.completed}/{day.total}
                            </div>
                            <div className="text-sm font-medium text-gray-900 w-10 md:w-12 text-right">
                                {getProgressPercentage(day.completed, day.total)}%
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Summary */}
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Weekly Completion Rate</span>
                        <span className="text-lg md:text-xl font-bold text-emerald-600">
                            {Math.round((mockReportData.weeklyProgress.reduce((acc, day) => acc + day.completed, 0) /
                                mockReportData.weeklyProgress.reduce((acc, day) => acc + day.total, 0)) * 100)}%
                        </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                        Great progress this week! Keep up the excellent work.
                    </div>
                </div>
            </div>

            {/* Category Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Development Categories</h3>

                <div className="space-y-4 md:space-y-5">
                    {mockReportData.categories.map((category, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                <span className="text-xs md:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                    {category.completed}/{category.total}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${category.color} transition-all duration-500`}
                                    style={{ width: `${getProgressPercentage(category.completed, category.total)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">
                                    {getProgressPercentage(category.completed, category.total)}% complete
                                </span>
                                <span className="text-xs font-medium text-gray-700">
                                    {category.total - category.completed} remaining
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}