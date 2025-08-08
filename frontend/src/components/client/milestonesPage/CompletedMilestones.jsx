import { useState } from "react";

export default function CompletedMilestones({
  completedMilestones = [],
  milestones = [], // Changed from activities to milestones
  onViewDetails,
}) {
  // Ensure completedMilestones is always an array
  const safeCompletedMilestones = Array.isArray(completedMilestones)
    ? completedMilestones
    : [];
  const [sortBy, setSortBy] = useState("recent"); // recent, category, alphabetical

  // Backend now provides complete milestone data, no need to map with activities
  const milestonesWithDetails = safeCompletedMilestones.map((completed) => {
    return {
      ...completed,
      // Use fields from backend milestone data
      title:
        completed.activityTitle ||
        completed.activity_title ||
        completed.title ||
        "Unknown Milestone",
      description: completed.description || "",
      category: completed.category || "General",
      icon: completed.icon || "🎯",
      difficulty: completed.difficulty || "Beginner",
      duration: completed.duration || 0,
      age_group: completed.age_group || "All Ages",
    };
  });

  // Sort milestones based on selected criteria
  const sortedMilestones = [...milestonesWithDetails].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return (
          new Date(b.achievedAt || b.achieved_at) -
          new Date(a.achievedAt || a.achieved_at)
        );
      case "category":
        return a.category.localeCompare(b.category);
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Group by category for category view
  const milestonesByCategory = sortedMilestones.reduce((acc, milestone) => {
    const category = milestone.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(milestone);
    return acc;
  }, {});

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Physical: "text-emerald-600 bg-emerald-50 border-emerald-200",
      Cognitive: "text-blue-600 bg-blue-50 border-blue-200",
      Social: "text-orange-600 bg-orange-50 border-orange-200",
      Language: "text-purple-600 bg-purple-50 border-purple-200",
      Emotional: "text-pink-600 bg-pink-50 border-pink-200",
      Creative: "text-yellow-600 bg-yellow-50 border-yellow-200",
      General: "text-gray-600 bg-gray-50 border-gray-200",
    };
    return colors[category] || colors["General"];
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "text-green-600 bg-green-100",
      Intermediate: "text-yellow-600 bg-yellow-100",
      Advanced: "text-red-600 bg-red-100",
    };
    return colors[difficulty] || colors["Beginner"];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-0">
          🏆 Completed Milestones ({completedMilestones.length})
        </h3>

        {/* Sort Options */}
        {completedMilestones.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="recent">Recent</option>
              <option value="category">Category</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        )}
      </div>

      {/* Milestones List */}
      {sortedMilestones.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl mb-4">🎯</div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No milestones completed yet
          </h4>
          <p className="text-sm sm:text-base text-gray-600">
            Start tracking activities to celebrate achievements!
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {sortBy === "category"
            ? // Group by category view
              Object.entries(milestonesByCategory).map(
                ([category, milestones]) => (
                  <div key={category} className="mb-4 sm:mb-6">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                          getCategoryColor(category).split(" ")[1]
                        }`}
                      ></span>
                      {category} ({milestones.length})
                    </h4>
                    <div className="space-y-2 sm:space-y-3 pl-5">
                      {milestones.map((milestone, index) => (
                        <MilestoneCard
                          key={milestone.id || index}
                          milestone={milestone}
                          onViewDetails={onViewDetails}
                          formatTimeAgo={formatTimeAgo}
                          getCategoryColor={getCategoryColor}
                          getDifficultyColor={getDifficultyColor}
                        />
                      ))}
                    </div>
                  </div>
                )
              )
            : // Regular list view
              sortedMilestones.map((milestone, index) => (
                <MilestoneCard
                  key={milestone.id || index}
                  milestone={milestone}
                  onViewDetails={onViewDetails}
                  formatTimeAgo={formatTimeAgo}
                  getCategoryColor={getCategoryColor}
                  getDifficultyColor={getDifficultyColor}
                />
              ))}
        </div>
      )}
    </div>
  );
}

// Milestone Card Component
function MilestoneCard({
  milestone,
  onViewDetails,
  formatTimeAgo,
  getCategoryColor,
  getDifficultyColor,
}) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
      <div className="flex items-center space-x-4 flex-1">
        {/* Icon */}
        <div className="text-3xl group-hover:scale-110 transition-transform">
          {milestone.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">
            {milestone.title}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(
                milestone.category
              )}`}
            >
              {milestone.category}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                milestone.difficulty
              )}`}
            >
              {milestone.difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {formatTimeAgo(milestone.achievedAt || milestone.achieved_at)} •{" "}
            {milestone.duration ? `${milestone.duration} mins` : "N/A"}
          </p>
          {milestone.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {milestone.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 ml-4">
        {/* Achievement Badge */}
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(milestone)}
          className="text-emerald-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
          title="View details"
        >
          <svg
            className="w-5 h-5"
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
    </div>
  );
}
