import { useNavigate } from "react-router";
import ActivityCard from "./ActivityCard";

export default function ActivityList({
    filteredActivities,
    activities,
    currentChild,
    formatDateTime
}) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Activity History for {currentChild.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                    Showing {filteredActivities.length} of {activities.length} activities
                </p>
            </div>

            <div className="divide-y divide-gray-200">
                {filteredActivities.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            No Activities Found
                        </h4>
                        <p className="text-gray-600 mb-4">
                            {activities.length === 0
                                ? "No activities have been logged for this child yet."
                                : "No activities match your current filters."
                            }
                        </p>
                        {activities.length === 0 && (
                            <button
                                onClick={() => navigate("/home")}
                                className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                            >
                                Start Logging Activities
                            </button>
                        )}
                    </div>
                ) : (
                    filteredActivities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            formatDateTime={formatDateTime}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
