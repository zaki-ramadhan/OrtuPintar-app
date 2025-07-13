import { useState } from 'react';

export default function ActivityDetailModal({ isOpen, onClose, activity }) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!isOpen || !activity) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'cognitive':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
            case 'motor skills':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            case 'language':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                );
            case 'social':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                );
            case 'creative':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
        }
    };

    // Mock data detail berdasarkan struktur database
    const activityDetail = {
        id: activity.id,
        child_id: 1,
        activity_id: 23,
        status: activity.status,
        started_at: "2025-07-13 14:30:00",
        completed_at: activity.status === 'completed' ? "2025-07-13 15:15:00" : null,
        cancelled_at: null,
        progress_notes: activity.status === 'completed'
            ? "Excellent performance! Child showed great interest and completed all tasks successfully."
            : "Activity scheduled and ready to begin.",
        created_at: "2025-07-13 09:00:00",
        updated_at: "2025-07-13 15:15:00",
        // Data tambahan untuk UI
        title: activity.title,
        category: activity.category,
        child: activity.child,
        date: activity.date,
        time: activity.time,
        duration: activity.status === 'completed' ? "45 minutes" : "Not started",
        difficulty_level: "Beginner",
        learning_objectives: [
            "Improve cognitive recognition skills",
            "Enhance problem-solving abilities",
            "Develop attention to detail"
        ],
        materials_needed: [
            "Colored blocks or cards",
            "Activity worksheet",
            "Timer (optional)"
        ]
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "Not set";
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                {getCategoryIcon(activityDetail.category)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{activityDetail.title}</h2>
                                <p className="text-sm text-gray-600">{activityDetail.child} • {activityDetail.category}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(activityDetail.status)}`}>
                                {activityDetail.status.charAt(0).toUpperCase() + activityDetail.status.slice(1)}
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex space-x-1">
                        {[
                            { id: 'overview', label: 'Overview', icon: '📊' },
                            { id: 'timeline', label: 'Timeline', icon: '⏱️' },
                            { id: 'notes', label: 'Notes', icon: '📝' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                                        : 'text-gray-600 hover:bg-white hover:text-gray-900'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                        <span>📋</span>
                                        <span>Activity Details</span>
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-600">Activity ID:</span>
                                            <span className="text-sm text-gray-900">#{activityDetail.activity_id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-600">Child ID:</span>
                                            <span className="text-sm text-gray-900">#{activityDetail.child_id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-600">Difficulty:</span>
                                            <span className="text-sm text-gray-900">{activityDetail.difficulty_level}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-600">Duration:</span>
                                            <span className="text-sm text-gray-900">{activityDetail.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                        <span>🎯</span>
                                        <span>Learning Objectives</span>
                                    </h3>
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <ul className="space-y-2">
                                            {activityDetail.learning_objectives.map((objective, index) => (
                                                <li key={index} className="flex items-start space-x-2 text-sm text-blue-900">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span>{objective}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Materials Needed */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                                    <span>🧰</span>
                                    <span>Materials Needed</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {activityDetail.materials_needed.map((material, index) => (
                                        <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-sm font-medium text-green-900">{material}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                <span>⏰</span>
                                <span>Activity Timeline</span>
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                        {activityDetail.started_at && (
                                            <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h4 className="font-medium text-gray-900">Activity Created</h4>
                                        <p className="text-sm text-gray-600">{formatDateTime(activityDetail.created_at)}</p>
                                        <p className="text-xs text-gray-500 mt-1">Initial activity setup completed</p>
                                    </div>
                                </div>

                                {activityDetail.started_at && (
                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            {activityDetail.completed_at && (
                                                <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <h4 className="font-medium text-gray-900">Activity Started</h4>
                                            <p className="text-sm text-gray-600">{formatDateTime(activityDetail.started_at)}</p>
                                            <p className="text-xs text-gray-500 mt-1">Child began the activity</p>
                                        </div>
                                    </div>
                                )}

                                {activityDetail.completed_at && (
                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <h4 className="font-medium text-gray-900">Activity Completed</h4>
                                            <p className="text-sm text-gray-600">{formatDateTime(activityDetail.completed_at)}</p>
                                            <p className="text-xs text-gray-500 mt-1">Successfully finished all tasks</p>
                                        </div>
                                    </div>
                                )}

                                {activityDetail.cancelled_at && (
                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <h4 className="font-medium text-gray-900">Activity Cancelled</h4>
                                            <p className="text-sm text-gray-600">{formatDateTime(activityDetail.cancelled_at)}</p>
                                            <p className="text-xs text-gray-500 mt-1">Activity was cancelled</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Database Timestamps */}
                            <div className="bg-gray-50 rounded-lg p-4 mt-6">
                                <h4 className="font-medium text-gray-900 mb-3">Database Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Created:</span>
                                        <span className="ml-2 text-gray-900">{formatDateTime(activityDetail.created_at)}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Last Updated:</span>
                                        <span className="ml-2 text-gray-900">{formatDateTime(activityDetail.updated_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                <span>📝</span>
                                <span>Progress Notes</span>
                            </h3>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-amber-900 mb-2">Activity Notes</h4>
                                        <p className="text-sm text-amber-800 leading-relaxed">
                                            {activityDetail.progress_notes}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Add Notes Section (untuk future feature) */}
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">Add Additional Notes</h4>
                                <p className="text-gray-600 mb-4">Record observations, feedback, or recommendations for this activity.</p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                    Add Note
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                        Activity #{activityDetail.id} • Last updated {formatDateTime(activityDetail.updated_at)}
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                        >
                            Close
                        </button>
                        {activityDetail.status === 'pending' && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                Start Activity
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
