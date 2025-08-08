import { useState } from "react";

export default function RecentActivities({ activities, openModal }) {
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 items initially
  const [showAll, setShowAll] = useState(false);

  const handleLoadMore = () => {
    if (showAll) {
      setVisibleCount(5);
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  const displayedActivities = showAll
    ? activities
    : activities?.slice(0, visibleCount) || [];
  const hasMoreActivities = activities.length > visibleCount;
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-0">
          Recent Activities
        </h3>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors flex items-center space-x-1">
          <span>View All Activities</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`space-y-3 md:space-y-4 ${
          showAll ? "max-h-96 overflow-y-auto pr-2" : ""
        }`}
      >
        {displayedActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <div className="flex-1 space-y-1 sm:space-y-0">
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {activity.child}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {activity.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {activity.date} at {activity.time}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-3 sm:mt-0">
              <div className="text-right">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : activity.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : activity.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {activity.status === "completed"
                    ? "Completed"
                    : activity.status === "in_progress"
                    ? "In Progress"
                    : activity.status === "cancelled"
                    ? "Cancelled"
                    : "Pending"}
                </div>
              </div>

              <button
                onClick={() => openModal(activity)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More / Show Less Button */}
      {activities && activities.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            className="w-full sm:w-auto px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2 mx-auto"
          >
            {showAll ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span>Show Less</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span>
                  Load More Activities ({activities.length - visibleCount} more)
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
