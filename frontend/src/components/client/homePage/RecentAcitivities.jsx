import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function RecentAcitivities() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function untuk menentukan achievement badge
  const getAchievementBadge = (item) => {
    if (item.isMilestone) {
      return { icon: "🏆", label: "Milestone" };
    }

    // Untuk non-milestone, gunakan icon category
    return {
      icon: getCategoryIcon(item.category),
      label: item.category || "Activity",
    };
  };

  // Function untuk mendapatkan warna category
  const getCategoryColor = (category) => {
    const colors = {
      "Motor Skills": "text-blue-600",
      Cognitive: "text-purple-600",
      Language: "text-green-600",
      Social: "text-pink-600",
      Creative: "text-orange-600",
      Physical: "text-red-600",
    };
    return colors[category] || "text-gray-600";
  };

  // Function untuk mendapatkan icon category
  const getCategoryIcon = (category) => {
    const icons = {
      "Motor Skills": "🤹", // Juggling - motor skills
      Cognitive: "🧠", // Brain - cognitive
      Language: "💬", // Speech bubble - language
      Social: "👥", // People - social
      Creative: "🎨", // Art palette - creative
      Physical: "💪", // Muscle - physical
    };
    return icons[category] || "📚"; // Default book icon
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
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activities
        </h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-8 bg-gray-300 rounded-full w-8 mb-1 ml-auto"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
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
        <div className="space-y-4">
          {recentActivities.map((item, index) => {
            const badge = getAchievementBadge(item);
            const categoryColor = getCategoryColor(item.category);

            return (
              <div
                key={item.id || index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.isMilestone ? "bg-yellow-500" : "bg-emerald-500"
                    }`}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {item.activity}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.child} • {item.time}
                      {item.isMilestone && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          🏆 Milestone
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  {/* Achievement Badge with Category Icon */}
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-2xl" title={badge.label}>
                      {badge.icon}
                    </span>
                  </div>
                  {/* Category Label */}
                  <p className={`text-xs font-medium ${categoryColor}`}>
                    {item.category || "Activity"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
