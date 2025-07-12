import React from "react";

export default function RecommendedActivities({
  activities,
  currentChild,
  onStartActivity,
}) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "cognitive":
        return "bg-blue-100 text-blue-800";
      case "motor skills":
        return "bg-emerald-100 text-emerald-800";
      case "language":
        return "bg-purple-100 text-purple-800";
      case "social":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Recommended Activities
        </h3>
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl mb-4">🎯</div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
            No Activities Available
          </h4>
          <p className="text-sm sm:text-base text-gray-500 mb-4 px-4">
            We're preparing personalized activities for {currentChild?.name}.
          </p>
          <button className="bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-600 text-sm sm:text-base">
            Get Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            Recommended Activities
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Perfect for {currentChild?.name} ({currentChild?.age})
          </p>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
        <div className="space-y-3 sm:space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              {/* Mobile */}
              <div className="block sm:hidden">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-1 mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      activity.category
                    )}`}
                  >
                    {activity.category}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      activity.difficulty
                    )}`}
                  >
                    {activity.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center">
                    ⏱ {activity.duration} min
                  </div>
                  <div className="flex items-center">
                    🧒 {activity.ageGroup}
                  </div>
                </div>

                <button
                  className="w-full bg-emerald-50 text-emerald-700 py-2 px-3 rounded-lg hover:bg-emerald-500 transition-colors text-xs font-medium hover:text-white"
                  onClick={() => onStartActivity && onStartActivity(activity)}
                >
                  Start Activity
                </button>
              </div>

              {/* Desktop */}
              <div className="hidden sm:block">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center flex-wrap gap-2 mt-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          activity.category
                        )}`}
                      >
                        {activity.category}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          activity.difficulty
                        )}`}
                      >
                        {activity.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">
                        ⏱ {activity.duration} min
                      </span>
                      <span className="text-xs text-gray-500">
                        🧒 {activity.ageGroup}
                      </span>
                    </div>

                    <div className="mt-4">
                      <button
                        className="w-full bg-emerald-50 text-emerald-700 py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors text-sm font-medium hover:text-white cursor-pointer"
                        onClick={() =>
                          onStartActivity && onStartActivity(activity)
                        }
                      >
                        Start Activity
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
