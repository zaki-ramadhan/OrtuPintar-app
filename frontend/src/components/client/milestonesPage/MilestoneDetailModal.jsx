export default function MilestoneDetailModal({
  milestone,
  currentChild,
  isCompleted,
  onClose,
  onStartMilestone,
}) {
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{milestone.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {milestone.title}
              </h3>
              <p className="text-sm text-gray-600">For {currentChild?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          {isCompleted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-emerald-800">
                  Milestone Completed!
                </span>
              </div>
              <p className="text-sm text-emerald-700 mt-1">
                Congratulations! This milestone has been achieved.
              </p>
            </div>
          )}

          {/* Description */}
          {milestone.description && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm border ${getCategoryColor(
                  milestone.category
                )}`}
              >
                {milestone.category}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Difficulty</h4>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                  milestone.difficulty
                )}`}
              >
                {milestone.difficulty}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
              <p className="text-gray-700">{milestone.duration}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Age Range</h4>
              <p className="text-gray-700">
                {milestone.age_group_min && milestone.age_group_max
                  ? `${milestone.age_group_min}-${milestone.age_group_max} years`
                  : milestone.age_group || "All ages"}
              </p>
            </div>
          </div>

          {/* Age Group Info */}
          {milestone.age_group && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Age Group</h4>
              <p className="text-gray-700">{milestone.age_group}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {!isCompleted && (
            <button
              onClick={() => {
                onStartMilestone(milestone);
                onClose();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Start Tracking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
