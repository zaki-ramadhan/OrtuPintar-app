import { useNavigate } from "react-router";
import ActivityCard from "./ActivityCard";
import ActivityCardSkeleton from "./ActivityCardSkeleton";

export default function ActivityList({
  filteredActivities,
  activities,
  currentChild,
  formatDateTime,
  totalActivities,
  onLoadMore,
  loadingMore,
  hasMore,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {" "}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          Activity History for {currentChild.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Showing {filteredActivities.length} of{" "}
          {totalActivities || activities.length} activities
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
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                formatDateTime={formatDateTime}
              />
            ))}

            {/* Show skeleton cards when loading more */}
            {loadingMore && (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <ActivityCardSkeleton key={`skeleton-${index}`} />
                ))}
              </>
            )}
          </>
        )}
      </div>
      {/* Load More Button */}
      {filteredActivities.length > 0 && hasMore && !loadingMore && (
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-center">
            <button
              onClick={onLoadMore}
              className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              <span className="mr-2">📖</span>
              Load More Activities
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">
            Showing {activities.length} of {totalActivities} total activities
          </p>
        </div>
      )}
      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-center">
            <div className="inline-flex items-center px-6 py-3 text-emerald-600 font-medium">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading More Activities...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
