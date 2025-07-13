export default function CurrentChildOverview({ currentChild, onStartMilestone, onViewAllAchievements }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{currentChild.avatar}</div>
          <div className="space-y-1">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
              {currentChild.name}
              's Progress
            </h3>
            <p className="text-gray-500">{currentChild.age}</p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-2xl font-bold text-emerald-600">
            {currentChild.progress}%
          </div>
          <p className="text-sm text-gray-500">Overall Progress</p>
        </div>
      </div>

      {/* Development Areas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {currentChild?.developmentAreas?.map((area, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
            <div className={`text-2xl mb-2 text-${area.color}-600`}>
              {area.name === "Physical"
                ? "🏃‍♂️"
                : area.name === "Cognitive"
                  ? "🧠"
                  : area.name === "Social"
                    ? "❤️"
                    : "💬"}
            </div>
            <h4 className="font-medium text-gray-900 text-sm">{area.name}</h4>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 bg-${area.color}-500 rounded-full transition-all duration-1000`}
                  style={{
                    width: `${area.progress}%`,
                  }}
                ></div>
              </div>
              <span
                className={`text-xs font-medium text-${area.color}-600 mt-1 block`}
              >
                {area.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>      {/* Next Milestone & Recent Achievement */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600">🎯</span>
            <h4 className="font-semibold text-blue-900">Next Milestone</h4>
          </div>          {currentChild.nextMilestone ? (
            <div>
              <p className="text-blue-700 font-medium">
                {currentChild.nextMilestone.name || currentChild.nextMilestone.title}
              </p>
              <p className="text-blue-600 text-sm mt-1">
                {currentChild.nextMilestone.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-blue-600">
                  <span className="mr-1">📅</span>
                  Age: {currentChild.nextMilestone.age_group_min}-{currentChild.nextMilestone.age_group_max} years
                </div>
                {onStartMilestone && (
                  <button
                    onClick={() => onStartMilestone(currentChild.nextMilestone)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-600 transition-colors"
                  >
                    Start Now
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-blue-700 text-sm">
              🎉 All milestones completed for this age group!
            </p>
          )}
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-emerald-600">🎉</span>
            <h4 className="font-semibold text-emerald-900">
              Recent Achievement
            </h4>
          </div>          {currentChild.recentAchievement ? (
            <div>
              <p className="text-emerald-700 font-medium">
                {currentChild.recentAchievement.name}
              </p>
              <p className="text-emerald-600 text-sm mt-1">
                {currentChild.recentAchievement.milestone?.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-emerald-600">
                  <span className="mr-1">🏆</span>
                  Completed: {new Date(currentChild.recentAchievement.date).toLocaleDateString()}
                </div>
                {onViewAllAchievements && (
                  <button
                    onClick={onViewAllAchievements}
                    className="bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-emerald-600 transition-colors"
                  >
                    View All
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-emerald-700 text-sm">
              🌟 Complete your first milestone to see achievements here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
