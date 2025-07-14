export default function ActivityCard({ activity, formatDateTime }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Physical: "text-emerald-700 bg-emerald-100 border-emerald-200",
      Cognitive: "text-blue-700 bg-blue-100 border-blue-200",
      Social: "text-orange-700 bg-orange-100 border-orange-200",
      Language: "text-purple-700 bg-purple-100 border-purple-200",
      Emotional: "text-pink-700 bg-pink-100 border-pink-200",
      Creative: "text-yellow-700 bg-yellow-100 border-yellow-200",
      General: "text-gray-700 bg-gray-100 border-gray-200",
    };
    return colors[category] || colors["General"];
  };

  return (
    <div
      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
      data-activity-card
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              {activity.icon || "📝"}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center flex-wrap gap-2">
                {activity.title}
                {Boolean(activity.isMilestone) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm">
                    <span className="mr-1">🏆</span>
                    Milestone
                  </span>
                )}
              </h4>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  activity.status
                )}`}
              >
                {activity.status.charAt(0).toUpperCase() +
                  activity.status.slice(1).replace("_", " ")}
              </span>
            </div>

            {activity.description && (
              <p className="text-gray-600 text-sm mb-3">
                {activity.description}
              </p>
            )}

            <div className="space-y-3 mb-3">
              {/* Category Badge */}
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(
                    activity.category
                  )} shadow-sm`}
                >
                  <span>
                    {activity.category === "Physical"
                      ? "🏃‍♂️"
                      : activity.category === "Cognitive"
                      ? "🧠"
                      : activity.category === "Social"
                      ? "👥"
                      : activity.category === "Language"
                      ? "💬"
                      : activity.category === "Emotional"
                      ? "❤️"
                      : activity.category === "Creative"
                      ? "🎨"
                      : "📋"}
                  </span>
                  <span>{activity.category}</span>
                </span>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="flex items-center space-x-2 bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100 w-full sm:w-auto">
                    <span className="text-blue-500">📅</span>
                    <span className="text-blue-700 font-medium">Started:</span>
                    <span className="text-blue-600 text-xs sm:text-sm">
                      {formatDateTime(activity.started_at)}
                    </span>
                  </div>
                </div>

                {activity.completed_at && (
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 w-full sm:w-auto">
                      <span className="text-emerald-500">✅</span>
                      <span className="text-emerald-700 font-medium">
                        Completed:
                      </span>
                      <span className="text-emerald-600 text-xs sm:text-sm">
                        {formatDateTime(activity.completed_at)}
                      </span>
                    </div>
                  </div>
                )}

                {activity.duration && (
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 bg-orange-50 px-2 py-1.5 rounded-lg border border-orange-100 w-full sm:w-auto">
                      <span className="text-orange-500">⏱️</span>
                      <span className="text-orange-700 font-medium">
                        Duration:
                      </span>
                      <span className="text-orange-600 text-xs sm:text-sm">
                        {activity.duration} minutes
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {activity.progress_notes && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="text-blue-500 text-lg">📝</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-blue-800 mb-2">
                      Progress Notes
                    </h5>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      {activity.progress_notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
