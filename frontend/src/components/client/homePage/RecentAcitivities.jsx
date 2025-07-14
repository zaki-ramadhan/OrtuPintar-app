import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function RecentAcitivities() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true); // Function untuk mendapatkan warna category dengan background dan border yang lebih menarik
  const getCategoryColor = (category) => {
    const colors = {
      "motor skills": "text-blue-800 bg-blue-100 border-blue-300",
      cognitive: "text-purple-800 bg-purple-100 border-purple-300",
      language: "text-emerald-800 bg-emerald-100 border-emerald-300",
      social: "text-pink-800 bg-pink-100 border-pink-300",
      creative: "text-orange-800 bg-orange-100 border-orange-300",
      physical: "text-red-800 bg-red-100 border-red-300",
    };

    // Normalize category name to lowercase for matching
    const normalizedCategory = category?.toLowerCase().trim();
    console.log(
      "Category received:",
      category,
      "Normalized:",
      normalizedCategory,
      "Color mapping:",
      colors[normalizedCategory]
    );

    return (
      colors[normalizedCategory] ||
      "text-indigo-800 bg-indigo-100 border-indigo-300"
    );
  }; // Function untuk mendapatkan icon category
  const getCategoryIcon = (category) => {
    const icons = {
      "motor skills": "🤹",
      cognitive: "🧠",
      language: "💬",
      social: "👥",
      creative: "🎨",
      physical: "💪",
    };

    // Normalize category name to lowercase for matching
    const normalizedCategory = category?.toLowerCase().trim();
    return icons[normalizedCategory] || "📚";
  };

  useEffect(() => {
    const fetchRecentActivities = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/activities/recent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Recent activities response:", response.data);
        setRecentActivities(response.data.activities || []);
      } catch (err) {
        console.error("Error fetching recent activities:", err);
        setRecentActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Recent Activities
        </h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Recent Activities
      </h3>

      {recentActivities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-500">No completed activities yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Start completing activities to see them here
          </p>
        </div>
      ) : (
        <div className="max-h-[40rem] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {recentActivities.map((item, index) => {
            const categoryColor = getCategoryColor(item.category);
            const categoryIcon = getCategoryIcon(item.category);

            return (
              <div
                key={item.id || index}
                className="p-3 sm:p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {/* Mobile Layout - Stacked */}
                <div className="sm:hidden">
                  {/* Top Row: Icon + Title */}
                  <div className="flex items-start space-x-3 md:mb-2">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          Boolean(item.isMilestone)
                            ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300"
                            : "bg-slate-100"
                        }`}
                      >
                        {Boolean(item.isMilestone) ? "🏆" : categoryIcon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                        {item.activity}
                      </h4>
                    </div>
                  </div>

                  {/* Second Row: Child + Time */}
                  <div className="flex items-center space-x-2 mb-2 -mt-2 md:-mt-0 pl-11">
                    <span className="text-xs text-gray-500">{item.child}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>

                  {/* Third Row: Badges */}
                  <div className="flex items-center justify-between pl-11">
                    <div className="flex items-center space-x-3">
                      {Boolean(item.isMilestone) && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm">
                          <span className="mr-1">🏆</span>
                          Milestone
                        </span>
                      )}
                      {item.category && (
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${categoryColor}`}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full"
                      title="Completed"
                    ></div>
                  </div>
                </div>

                {/* Desktop Layout - Horizontal */}
                <div className="hidden sm:flex items-center space-x-4">
                  {/* Activity Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        Boolean(item.isMilestone)
                          ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300"
                          : "bg-slate-100"
                      }`}
                    >
                      {Boolean(item.isMilestone) ? "🏆" : categoryIcon}
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {item.activity}
                      </h4>
                      {Boolean(item.isMilestone) && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm flex-shrink-0">
                          <span className="mr-1">🏆</span>
                          Milestone
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {item.child}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>

                  {/* Category Badge and Status - Right side */}
                  <div className="flex items-center space-x-3">
                    {item.category && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${categoryColor}`}
                      >
                        {item.category}
                      </span>
                    )}

                    {/* Status indicator */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                        title="Completed"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
