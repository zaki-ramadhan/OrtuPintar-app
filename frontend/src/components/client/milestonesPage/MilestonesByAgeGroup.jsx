import { useState, useMemo } from "react";

export default function MilestonesByAgeGroup({
  milestones = [],
  completedMilestones = [],
  currentChild,
  calculateAgeInYears,
  onStartMilestone,
}) {
  // Ensure completedMilestones is always an array
  const safeCompletedMilestones = Array.isArray(completedMilestones)
    ? completedMilestones
    : [];
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("current");
  const [expandedGroup, setExpandedGroup] = useState(null);

  // Calculate child's current age
  const childAge = currentChild
    ? calculateAgeInYears(currentChild.birthDate)
    : 0;

  // Group milestones by age range
  const milestonesByAge = useMemo(() => {
    // Get completed milestone IDs for quick lookup
    const completedMilestoneIds = new Set(
      safeCompletedMilestones.map((cm) => cm.activity_id || cm.id)
    );

    const groups = {};

    milestones.forEach((milestone) => {
      // Extract age range from age_group field (e.g., "2-3 years")
      let minAge = 0;
      let maxAge = 5;

      if (milestone.age_group) {
        const ageMatch = milestone.age_group.match(/(\d+)-(\d+)/);
        if (ageMatch) {
          minAge = parseInt(ageMatch[1]);
          maxAge = parseInt(ageMatch[2]);
        }
      }

      const key = `${minAge}-${maxAge}`;

      if (!groups[key]) {
        groups[key] = {
          ageRange: `${minAge}-${maxAge} years`,
          minAge,
          maxAge,
          milestones: [],
        };
      }

      groups[key].milestones.push({
        ...milestone,
        // Use the right field for title
        title:
          milestone.activityTitle ||
          milestone.activity_title ||
          milestone.title ||
          "Unknown Milestone",
        isCompleted: completedMilestoneIds.has(
          milestone.id || milestone.activity_id
        ),
        isAgeAppropriate: minAge <= childAge + 1 && maxAge >= childAge - 1,
      });
    });

    // Sort milestones within each group by completion status and title
    Object.values(groups).forEach((group) => {
      group.milestones.sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
          return a.isCompleted ? 1 : -1; // Incomplete first
        }
        return a.title.localeCompare(b.title);
      });
    });

    return groups;
  }, [milestones, safeCompletedMilestones, childAge]);

  // Filter groups based on selected age group
  const filteredGroups = useMemo(() => {
    const groups = Object.values(milestonesByAge);

    switch (selectedAgeGroup) {
      case "current":
        return groups.filter(
          (group) =>
            group.minAge <= childAge + 1 && group.maxAge >= childAge - 1
        );
      case "completed":
        return groups.filter((group) =>
          group.milestones.some((m) => m.isCompleted)
        );
      case "upcoming":
        return groups.filter((group) => group.minAge > childAge);
      case "all":
      default:
        return groups.sort((a, b) => a.minAge - b.minAge);
    }
  }, [milestonesByAge, selectedAgeGroup, childAge]);

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

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "⭐";
      case "Intermediate":
        return "⭐⭐";
      case "Advanced":
        return "⭐⭐⭐";
      default:
        return "⭐";
    }
  };

  const getAgeGroupIcon = (minAge, maxAge) => {
    if (maxAge <= 1) return "👶";
    if (maxAge <= 2) return "🧒";
    if (maxAge <= 4) return "👧";
    return "🧑";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-0">
          📊 Milestone Suggestions
        </h3>

        {/* Age Group Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm text-gray-600">Show:</span>
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 sm:px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current">Current Age ({childAge} years)</option>
            <option value="upcoming">Upcoming Ages</option>
            <option value="completed">With Completed</option>
            <option value="all">All Ages</option>
          </select>
        </div>
      </div>

      {/* Child Age Info */}
      {currentChild && (
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-200">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-xl sm:text-2xl flex-shrink-0">
              {getAgeGroupIcon(childAge, childAge)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-blue-900 text-sm sm:text-base truncate">
                {currentChild.name} is {childAge} years old
              </p>
              <p className="text-xs sm:text-sm text-blue-700 hidden sm:block">
                Showing milestones appropriate for their developmental stage
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Age Groups */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl mb-4">📊</div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No milestones found
          </h4>
          <p className="text-sm sm:text-base text-gray-600">
            Try adjusting the age group filter to see more milestones.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {filteredGroups.map((group, groupIndex) => {
            const completedCount = group.milestones.filter(
              (m) => m.isCompleted
            ).length;
            const totalCount = group.milestones.length;
            const progressPercent =
              totalCount > 0
                ? Math.round((completedCount / totalCount) * 100)
                : 0;
            const isExpanded = expandedGroup === groupIndex;
            const isCurrentAge =
              group.minAge <= childAge + 1 && group.maxAge >= childAge - 1;

            return (
              <div
                key={`${group.minAge}-${group.maxAge}`}
                className={`border rounded-xl transition-all duration-200 ${
                  isCurrentAge
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* Age Group Header */}
                <button
                  onClick={() =>
                    setExpandedGroup(isExpanded ? null : groupIndex)
                  }
                  className="w-full p-3 sm:p-4 text-left hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="text-xl sm:text-2xl flex-shrink-0">
                        {getAgeGroupIcon(group.minAge, group.maxAge)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base flex items-center flex-wrap gap-1">
                          <span className="truncate">{group.ageRange}</span>
                          {isCurrentAge && (
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">
                              Current
                            </span>
                          )}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {completedCount}/{totalCount} completed (
                          {progressPercent}%)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                      {/* Progress Bar */}
                      <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isCurrentAge ? "bg-blue-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      {/* Expand Icon */}
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
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
                    </div>
                  </div>
                </button>

                {/* Milestones List */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-2 sm:p-3 lg:p-4">
                    <div className="grid gap-2 sm:gap-3 lg:gap-4">
                      {group.milestones.map((milestone) => (
                        <MilestoneCard
                          key={milestone.id}
                          milestone={milestone}
                          onStartMilestone={onStartMilestone}
                          getCategoryColor={getCategoryColor}
                          getDifficultyIcon={getDifficultyIcon}
                          isCurrentAge={isCurrentAge}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Milestone Card Component
function MilestoneCard({
  milestone,
  onStartMilestone,
  getCategoryColor,
  getDifficultyIcon,
  isCurrentAge,
}) {
  return (
    <div
      className={`flex items-center justify-between p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border transition-all duration-200 hover:shadow-md group ${
        milestone.isCompleted
          ? "bg-emerald-50 border-emerald-200"
          : milestone.isAgeAppropriate
          ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
          : "bg-white border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-1 min-w-0">
        {/* Icon and Status */}
        <div className="relative flex-shrink-0">
          <div className="text-lg sm:text-xl lg:text-2xl group-hover:scale-110 transition-transform">
            {milestone.icon}
          </div>
          {milestone.isCompleted && (
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h5 className="font-semibold text-gray-900 truncate text-xs sm:text-sm lg:text-base">
            {milestone.title}
          </h5>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
            <span
              className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border ${getCategoryColor(
                milestone.category
              )}`}
            >
              {milestone.category}
            </span>
            <span className="text-xs text-gray-500">
              {getDifficultyIcon(milestone.difficulty)} {milestone.difficulty}
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">
              {milestone.duration}
            </span>
          </div>
          {milestone.description && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 hidden sm:block">
              {milestone.description}
            </p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="ml-1 sm:ml-2 lg:ml-4 flex-shrink-0">
        {milestone.isCompleted ? (
          <div className="flex items-center space-x-1 text-emerald-600">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium hidden lg:inline">
              Completed
            </span>
          </div>
        ) : (
          <button
            onClick={() => onStartMilestone(milestone)}
            className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-md sm:rounded-lg font-medium text-xs sm:text-sm transition-colors ${
              milestone.isAgeAppropriate || isCurrentAge
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span className="sm:hidden">
              {milestone.isAgeAppropriate || isCurrentAge ? "▶" : "⏳"}
            </span>
            <span className="hidden sm:inline">
              {milestone.isAgeAppropriate || isCurrentAge ? "Start" : "Later"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
