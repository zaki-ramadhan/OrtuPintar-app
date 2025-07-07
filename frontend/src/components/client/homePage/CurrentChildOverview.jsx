export default function CurrentChildOverview({ currentChild }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{currentChild.avatar}</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {currentChild.name}
              's Progress
            </h3>
            <p className="text-gray-500">{currentChild.age}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-600">
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
      </div>

      {/* Next Milestone & Recent Achievement */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600">🎯</span>
            <h4 className="font-semibold text-blue-900">Next Milestone</h4>
          </div>
          <p className="text-blue-700">{currentChild.nextMilestone}</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-emerald-600">🎉</span>
            <h4 className="font-semibold text-emerald-900">
              Recent Achievement
            </h4>
          </div>
          <p className="text-emerald-700">{currentChild.recentAchievement}</p>
        </div>
      </div>
    </div>
  );
}
