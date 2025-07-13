export default function MilestonesAndAchievements ({ currentChild })  {
    return (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Milestones & Achievements</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {currentChild?.name}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Completed Milestones */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-green-700 flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Recently Completed</span>
                    </h4>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-green-900">Recognize 10 Colors</p>
                                <p className="text-sm text-green-700">Completed 3 days ago</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-green-900">Count to 20</p>
                                <p className="text-sm text-green-700">Completed 1 week ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* In Progress Milestones */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-blue-700 flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>In Progress</span>
                    </h4>

                    <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-blue-900">Write First Name</p>
                                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">In Progress</span>
                            </div>
                            <p className="text-xs text-blue-700">Keep practicing letter formation with guided activities.</p>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-blue-900">Social Play with Peers</p>
                                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">In Progress</span>
                            </div>
                            <p className="text-xs text-blue-700">Continue with sharing and turn-taking activities.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Milestone Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">6</div>
                        <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">8</div>
                        <div className="text-sm text-gray-600">Upcoming</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">67%</div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                </div>
            </div>
        </div>
    )
}