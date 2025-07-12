import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function WeeklySummary({ reminders = [], notifications = [] }) {
  const [weeklyData, setWeeklyData] = useState({
    thisWeek: { activities: 0, milestones: 0 },
    lastWeek: { activities: 0, milestones: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklySummary = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API_URL}/activities/weekly-summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Weekly summary response:", response.data);
        setWeeklyData(response.data.summary);
      } catch (err) {
        console.error("Error fetching weekly summary:", err);
        // Fallback ke data kosong jika error
        setWeeklyData({
          thisWeek: { activities: 0, milestones: 0 },
          lastWeek: { activities: 0, milestones: 0 },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklySummary();
  }, []);

  // Helper untuk trend indicator
  const getTrendIndicator = (current, previous) => {
    if (current > previous) return { icon: "📈", color: "text-green-500" };
    if (current < previous) return { icon: "📉", color: "text-red-500" };
    return { icon: "➡️", color: "text-gray-500" };
  };

  // Helper untuk progress message
  const getProgressMessage = () => {
    const thisWeekTotal =
      weeklyData.thisWeek.activities + weeklyData.thisWeek.milestones;
    const lastWeekTotal =
      weeklyData.lastWeek.activities + weeklyData.lastWeek.milestones;

    if (thisWeekTotal > lastWeekTotal) {
      return {
        message: "🎉 Great improvement!",
        color: "text-green-700",
        bg: "bg-green-50",
      };
    } else if (thisWeekTotal === lastWeekTotal && thisWeekTotal > 0) {
      return {
        message: "✨ Steady progress!",
        color: "text-blue-700",
        bg: "bg-blue-50",
      };
    } else if (thisWeekTotal > 0) {
      return {
        message: "💪 Keep it up!",
        color: "text-orange-700",
        bg: "bg-orange-50",
      };
    }
    return {
      message: "🌟 Start your journey!",
      color: "text-purple-700",
      bg: "bg-purple-50",
    };
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Summary</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-6 bg-gray-300 rounded w-8"></div>
                  <div className="h-4 bg-gray-300 rounded w-6"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-gray-300 rounded w-16"></div>
                <div className="h-3 bg-gray-300 rounded w-4"></div>
              </div>
              {i === 1 && <div className="border-t border-gray-100 mt-4"></div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const activitiesTrend = getTrendIndicator(
    weeklyData.thisWeek.activities,
    weeklyData.lastWeek.activities
  );
  const milestonesTrend = getTrendIndicator(
    weeklyData.thisWeek.milestones,
    weeklyData.lastWeek.milestones
  );
  const progressInfo = getProgressMessage();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Weekly Summary</h3>
        <div className="text-xs text-gray-500">This vs Last Week</div>
      </div>

      <div className="space-y-5">
        {/* Activities Comparison */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-sm font-medium text-gray-700">
                Activities Completed
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-emerald-600">
                {weeklyData.thisWeek.activities}
              </span>
              <span className={`text-lg ${activitiesTrend.color}`}>
                {activitiesTrend.icon}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Previous week</span>
            <span className="text-gray-600 font-medium">
              {weeklyData.lastWeek.activities}
            </span>
          </div>
        </div>

        {/* Milestones Comparison */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium text-gray-700">
                Milestones Achieved
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">
                {weeklyData.thisWeek.milestones}
              </span>
              <span className={`text-lg ${milestonesTrend.color}`}>
                {milestonesTrend.icon}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Previous week</span>
            <span className="text-gray-600 font-medium">
              {weeklyData.lastWeek.milestones}
            </span>
          </div>
        </div>

        {/* Overall Progress Message */}
        <div
          className={`${progressInfo.bg} rounded-xl p-4 border border-gray-100`}
        >
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Weekly Progress</p>
            <p className={`text-sm font-semibold ${progressInfo.color}`}>
              {progressInfo.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
