import { useState } from "react";
import { useNavigate } from "react-router";
import ActivityCard from "./ActivityCard";
import ActivityCardSkeleton from "./ActivityCardSkeleton";

export default function ActivityList({
  filteredActivities,
  activities,
  currentChild,
  formatDateTime,
}) {
  const navigate = useNavigate();
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
    ? filteredActivities
    : filteredActivities?.slice(0, visibleCount) || [];
  const hasMoreActivities = filteredActivities.length > visibleCount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          Activity History for {currentChild.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Showing {displayedActivities.length} of {filteredActivities.length}{" "}
          activities
        </p>
      </div>

      <div
        className={`divide-y divide-gray-200 ${
          showAll ? "max-h-96 overflow-y-auto" : ""
        }`}
      >
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No Activities Found
            </h4>
            <p className="text-gray-600 mb-4">
              {activities.length === 0
                ? "No activities have been logged for this child yet."
                : "No activities match your current filters."}
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
          <>
            {displayedActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                formatDateTime={formatDateTime}
              />
            ))}
          </>
        )}
      </div>

      {/* Load More / Show Less Button */}
      {filteredActivities && filteredActivities.length > 5 && (
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="w-full sm:w-auto px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2"
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
                    Load More Activities (
                    {filteredActivities.length - visibleCount} more)
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
