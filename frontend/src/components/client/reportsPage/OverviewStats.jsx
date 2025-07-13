import StatsCard from './StatsCard';

export default function OverviewStats({ mockReportData }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
            <StatsCard
                icon={
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                }
                value={mockReportData.overview.totalActivities}
                label="Total Activities"
                bgColor="bg-blue-100"
                textColor="text-blue-600"
            />
            <StatsCard
                icon={
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                value={mockReportData.overview.completedMilestones}
                label="Milestones"
                bgColor="bg-green-100"
                textColor="text-green-600"
            />
            <StatsCard
                icon={
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                value={`${mockReportData.overview.completionRate}%`}
                label="Completion Rate"
                bgColor="bg-purple-100"
                textColor="text-purple-600"
            />
            <StatsCard
                icon={
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                value={`${mockReportData.overview.totalTimeSpent}h`}
                label="Total Time"
                bgColor="bg-orange-100"
                textColor="text-orange-600"
            />
            <StatsCard
                icon={
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                }
                value={mockReportData.overview.activeStreak}
                label="Day Streak"
                bgColor="bg-emerald-100"
                textColor="text-emerald-600"
            />
            <StatsCard
                icon={
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                value="2h ago"
                label="Last Activity"
                bgColor="bg-gray-100"
                textColor="text-gray-600"
            />
        </div>
    )
}