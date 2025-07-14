export default function MainContentGrid({
  reportData,
  formatDateRange,
  getProgressPercentage,
  currentChild,
  activities,
}) {
  console.log("📊 MainContentGrid rendering with real data:", {
    reportData,
    currentChild: currentChild?.name,
  });

  // Calculate real weekly progress from child's activities
  const calculateWeeklyProgress = () => {
    if (!currentChild || !activities || activities.length === 0) {
      console.log("⚠️ No data for weekly progress calculation");
      return [
        { day: "Mon", completed: 0, total: 0 },
        { day: "Tue", completed: 0, total: 0 },
        { day: "Wed", completed: 0, total: 0 },
        { day: "Thu", completed: 0, total: 0 },
        { day: "Fri", completed: 0, total: 0 },
        { day: "Sat", completed: 0, total: 0 },
        { day: "Sun", completed: 0, total: 0 },
      ];
    }

    // Filter activities for current child
    const childActivities = activities.filter(
      (activity) => activity.child_id === currentChild.id
    );
    console.log(`📈 Activities for ${currentChild.name}:`, childActivities);

    // Get this week's date range
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start from Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyData = weekDays.map((day, index) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + index);
      const dayString = dayDate.toISOString().split("T")[0];

      // Count activities for this day
      const dayActivities = childActivities.filter((activity) => {
        if (!activity.created_at) return false;
        const activityDate = new Date(activity.created_at)
          .toISOString()
          .split("T")[0];
        return activityDate === dayString;
      });

      const completed = dayActivities.filter(
        (activity) => activity.status === "completed"
      ).length;
      const total = dayActivities.length;

      return {
        day: day === "Sun" ? "Sun" : day,
        completed,
        total: total > 0 ? total : completed > 0 ? completed : 1, // Ensure at least 1 if there are completed
      };
    });

    console.log("📅 Weekly progress calculated:", weeklyData);
    return weeklyData;
  };

  // Calculate real category progress from child's activities
  const calculateCategoryProgress = () => {
    if (!currentChild || !activities || activities.length === 0) {
      console.log("⚠️ No data for category progress calculation");
      return [
        { name: "Motor Skills", completed: 0, total: 0, color: "bg-blue-500" },
        { name: "Language", completed: 0, total: 0, color: "bg-green-500" },
        { name: "Cognitive", completed: 0, total: 0, color: "bg-purple-500" },
        { name: "Social", completed: 0, total: 0, color: "bg-orange-500" },
        { name: "Creative", completed: 0, total: 0, color: "bg-pink-500" },
      ];
    }

    // Filter activities for current child
    const childActivities = activities.filter(
      (activity) => activity.child_id === currentChild.id
    );

    // Group by actual category field from database (not by title keywords)
    const categories = {
      "Motor Skills": { completed: 0, total: 0, color: "bg-blue-500" },
      Language: { completed: 0, total: 0, color: "bg-green-500" },
      Cognitive: { completed: 0, total: 0, color: "bg-purple-500" },
      Social: { completed: 0, total: 0, color: "bg-orange-500" },
      Creative: { completed: 0, total: 0, color: "bg-pink-500" },
    };

    childActivities.forEach((activity) => {
      // Use the actual category field from database
      const dbCategory = activity.category?.toLowerCase() || "";
      let displayCategory = "Creative"; // default

      // Map database categories to display categories
      if (dbCategory.includes("motor") || dbCategory === "motor skills") {
        displayCategory = "Motor Skills";
      } else if (dbCategory.includes("language") || dbCategory === "language") {
        displayCategory = "Language";
      } else if (
        dbCategory.includes("cognitive") ||
        dbCategory === "cognitive"
      ) {
        displayCategory = "Cognitive";
      } else if (dbCategory.includes("social") || dbCategory === "social") {
        displayCategory = "Social";
      } else if (dbCategory.includes("creative") || dbCategory === "creative") {
        displayCategory = "Creative";
      }

      console.log(
        `🎯 Activity "${activity.title}" - DB Category: "${activity.category}" -> Display: "${displayCategory}"`
      );

      categories[displayCategory].total++;
      if (activity.status === "completed") {
        categories[displayCategory].completed++;
      }
    });

    const categoryArray = Object.entries(categories).map(([name, data]) => ({
      name,
      ...data,
    }));

    console.log(
      "🎯 Category progress calculated from real DB categories:",
      categoryArray
    );
    return categoryArray;
  };

  const weeklyProgress = calculateWeeklyProgress();
  const categoryProgress = calculateCategoryProgress();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Weekly Progress Chart */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            Weekly Progress
          </h3>
          <div className="text-sm text-gray-500">{formatDateRange()}</div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 md:w-12 text-sm font-medium text-gray-600">
                {day.day}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 md:h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2.5 md:h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${getProgressPercentage(
                      day.completed,
                      day.total
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 w-12 md:w-16 text-right">
                {day.completed}/{day.total}
              </div>
              <div className="text-sm font-medium text-gray-900 w-10 md:w-12 text-right">
                {getProgressPercentage(day.completed, day.total)}%
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Weekly Completion Rate
            </span>
            <span className="text-lg md:text-xl font-bold text-emerald-600">
              {weeklyProgress.reduce((acc, day) => acc + day.total, 0) > 0
                ? Math.round(
                    (weeklyProgress.reduce(
                      (acc, day) => acc + day.completed,
                      0
                    ) /
                      weeklyProgress.reduce((acc, day) => acc + day.total, 0)) *
                      100
                  )
                : 0}
              %
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            {currentChild
              ? `${currentChild.name}'s progress this week`
              : "Weekly progress overview"}
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
          Development Categories
        </h3>

        <div className="space-y-4 md:space-y-5">
          {categoryProgress.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
                <span className="text-xs md:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {category.completed}/{category.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${category.color} transition-all duration-500`}
                  style={{
                    width: `${
                      category.total > 0
                        ? getProgressPercentage(
                            category.completed,
                            category.total
                          )
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {category.total > 0
                    ? getProgressPercentage(category.completed, category.total)
                    : 0}
                  % complete
                </span>
                <span className="text-xs font-medium text-gray-700">
                  {category.total - category.completed} remaining
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
