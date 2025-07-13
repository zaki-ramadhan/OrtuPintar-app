export default function StatisticsOverview({ stats }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="text-2xl">📊</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Activities</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <span className="text-2xl">✅</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {stats.byStatus?.find(s => s.status === 'completed')?.count || 0}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <span className="text-2xl">🎯</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Milestones</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.milestones || 0}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="text-2xl">⏳</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {stats.byStatus?.find(s => s.status === 'in_progress')?.count || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
