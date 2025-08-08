export default function MilestoneOverview({
  currentChild,
  milestones = [],
  completedMilestones = [],
  calculateAge,
}) {
  // Ensure completedMilestones is always an array
  const safeCompletedMilestones = Array.isArray(completedMilestones)
    ? completedMilestones
    : [];

  // Calculate statistics
  const totalMilestones = milestones.length;
  const totalCompleted = safeCompletedMilestones.length;
  const completionRate =
    totalMilestones > 0
      ? Math.round((totalCompleted / totalMilestones) * 100)
      : 0;

  // Calculate age-appropriate milestones
  const calculateAgeInYears = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let years = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return years;
  };

  const childAgeInYears = currentChild
    ? calculateAgeInYears(currentChild.birthDate)
    : 0;

  // Age-appropriate milestones (within 1 year range)
  const ageAppropriateMilestones = milestones.filter((milestone) => {
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

    return minAge <= childAgeInYears + 1 && maxAge >= childAgeInYears - 1;
  });

  const completedAgeAppropriate = safeCompletedMilestones.filter(
    (completed) => {
      const milestone = milestones.find(
        (m) => m.id === (completed.activity_id || completed.id)
      );
      if (!milestone) return false;

      // Extract age range from age_group field
      let minAge = 0;
      let maxAge = 5;

      if (milestone.age_group) {
        const ageMatch = milestone.age_group.match(/(\d+)-(\d+)/);
        if (ageMatch) {
          minAge = parseInt(ageMatch[1]);
          maxAge = parseInt(ageMatch[2]);
        }
      }

      return minAge <= childAgeInYears + 1 && maxAge >= childAgeInYears - 1;
    }
  );

  const ageAppropriateRate =
    ageAppropriateMilestones.length > 0
      ? Math.round(
          (completedAgeAppropriate.length / ageAppropriateMilestones.length) *
            100
        )
      : 0;

  // Recent milestones (last 3) - use backend data directly
  const recentMilestones = safeCompletedMilestones
    .sort(
      (a, b) =>
        new Date(b.achievedAt || b.achieved_at) -
        new Date(a.achievedAt || a.achieved_at)
    )
    .slice(0, 3)
    .map((completed) => {
      return {
        ...completed,
        title:
          completed.activityTitle ||
          completed.activity_title ||
          completed.title ||
          "Unknown Milestone",
        icon: completed.icon || "🎯",
        category: completed.category || "General",
      };
    });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {currentChild?.name}'s Milestone Progress
          </h3>
          <p className="text-sm text-gray-600">
            Age: {currentChild ? calculateAge(currentChild.birthDate) : "N/A"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-2xl">
            {currentChild?.photoUrl ||
              (currentChild?.gender === "P" ? "👧" : "👦")}
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Completed */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {totalCompleted}
            </div>
            <div className="text-sm text-emerald-700 font-medium">
              Completed
            </div>
          </div>
        </div>

        {/* Age Appropriate Progress */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {ageAppropriateRate}%
            </div>
            <div className="text-sm text-blue-700 font-medium">
              Age Progress
            </div>
          </div>
        </div>

        {/* Total Available */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {totalMilestones}
            </div>
            <div className="text-sm text-purple-700 font-medium">
              Total Available
            </div>
          </div>
        </div>

        {/* Overall Rate */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {completionRate}%
            </div>
            <div className="text-sm text-orange-700 font-medium">
              Overall Rate
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Age-Appropriate Progress
          </span>
          <span className="text-sm text-gray-600">
            {completedAgeAppropriate.length} of{" "}
            {ageAppropriateMilestones.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${ageAppropriateRate}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentMilestones.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            🏆 Recent Achievements
          </h4>
          <div className="space-y-3">
            {recentMilestones.map((milestone, index) => (
              <div
                key={milestone.id || index}
                className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200"
              >
                <div className="text-2xl">{milestone.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-emerald-900">
                    {milestone.title}
                  </p>
                  <p className="text-sm text-emerald-700">
                    {milestone.category} •{" "}
                    {new Date(
                      milestone.achievedAt || milestone.achieved_at
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-emerald-600">
                  <svg
                    className="w-5 h-5"
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No achievements message */}
      {recentMilestones.length === 0 && (
        <div className="text-center py-6">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-gray-600 font-medium">
            No milestones achieved yet
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Start tracking activities to celebrate your child's achievements!
          </p>
        </div>
      )}
    </div>
  );
}
