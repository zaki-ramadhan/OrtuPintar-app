import { useState, useEffect } from "react";
import axios from "axios";

export default function MilestonesAndAchievements({ currentChild, openModal }) {
  const [milestones, setMilestones] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch milestones when current child changes
  useEffect(() => {
    if (currentChild && currentChild.id) {
      console.log(
        `🏗️ Child changed, fetching milestones for: ${currentChild.name} (ID: ${
          currentChild.id
        }) - Debug: ${Date.now()} - FORCE REFRESH`
      );
      fetchMilestones(currentChild.id);
    }
  }, [currentChild]);

  // Refresh milestones every 5 seconds to catch new completions (reduced from 10s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentChild && currentChild.id) {
        console.log(`🔄 Auto-refresh milestones for child ${currentChild.id}`);
        fetchMilestones(currentChild.id);
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [currentChild]);

  // Listen for storage events to refresh when activities are completed
  useEffect(() => {
    const handleStorageChange = (e) => {
      console.log(
        "📦 Storage change detected:",
        e.key,
        e.newValue,
        "currentChild:",
        currentChild
      );
      if (e.key === "milestones_refresh" && currentChild && currentChild.id) {
        console.log(
          "✅ Storage conditions met, triggering fetchMilestones for child:",
          currentChild.id
        );
        fetchMilestones(currentChild.id);
      } else if (e.key === "milestones_refresh") {
        console.log(
          "❌ Cannot refresh milestones via storage - no current child selected"
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events
    const handleCustomRefresh = (event) => {
      console.log(
        "📢 Custom milestone refresh event received:",
        event,
        "currentChild:",
        currentChild
      );
      if (currentChild && currentChild.id) {
        console.log(
          "✅ Conditions met, triggering fetchMilestones for child:",
          currentChild.id
        );
        fetchMilestones(currentChild.id);
      } else {
        console.log("❌ Cannot refresh milestones - no current child selected");
      }
    };

    window.addEventListener("milestones_refresh", handleCustomRefresh);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("milestones_refresh", handleCustomRefresh);
    };
  }, [currentChild]);

  const fetchMilestones = async (childId) => {
    try {
      setLoading(true);
      console.log(`🏆 Fetching milestones for child ID: ${childId}`);

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/milestones/child/${childId}?_=${Date.now()}`, // Force new request
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache", // Prevent caching
          },
        }
      );

      console.log("✅ Milestones data received:", response.data);

      // Parse response structure from backend
      if (response.data && response.data.milestones) {
        setMilestones(response.data.milestones);
      } else if (
        response.data &&
        (response.data.completed ||
          response.data.inProgress ||
          response.data.potential)
      ) {
        setMilestones(response.data);
      } else {
        setMilestones(response.data);
      }
    } catch (error) {
      console.error("❌ Error fetching milestones:", error);
      setMilestones(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30)
      return `${Math.floor(diffInDays / 7)} week${
        Math.floor(diffInDays / 7) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffInDays / 30)} month${
      Math.floor(diffInDays / 30) > 1 ? "s" : ""
    } ago`;
  };

  const completedMilestones = milestones?.completed || [];
  const inProgressMilestones = milestones?.inProgress || [];

  // Transform milestone data to ensure field compatibility
  const transformedCompletedMilestones = completedMilestones.map(
    (milestone) => ({
      ...milestone,
      // Ensure both field formats exist
      activityTitle:
        milestone.activityTitle ||
        milestone.activity_title ||
        milestone.title ||
        "Unknown Activity",
      achievedAt:
        milestone.achievedAt || milestone.achieved_at || milestone.completed_at,
      title: milestone.title || milestone.activity_title || "Unknown Activity",
    })
  );

  const transformedInProgressMilestones = inProgressMilestones.map(
    (milestone) => ({
      ...milestone,
      // Ensure both field formats exist
      activityTitle:
        milestone.activityTitle ||
        milestone.activity_title ||
        milestone.title ||
        "Unknown Activity",
      title: milestone.title || milestone.activity_title || "Unknown Activity",
    })
  );

  // Calculate stats after transformations are complete
  const stats = milestones?.statistics || {
    completed: transformedCompletedMilestones?.length || 0,
    inProgress: transformedInProgressMilestones?.length || 0,
    upcoming: milestones?.potential?.length || 0,
    completionRate: 0,
  };

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900">
          Milestones & Achievements
        </h3>
        <div className="flex items-center space-x-2">
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          )}
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {currentChild?.name || "No child selected"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Completed Milestones */}
        <div className="space-y-4">
          <h4 className="font-semibold text-green-700 flex items-center space-x-2">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Recently Completed</span>
          </h4>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {transformedCompletedMilestones.length > 0 ? (
              transformedCompletedMilestones.map((milestone, index) => {
                const displayTitle =
                  milestone.activityTitle ||
                  milestone.activity_title ||
                  milestone.title ||
                  "Unknown Activity";

                return (
                  <div
                    key={milestone.id || index}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-green-900">
                          {displayTitle}
                        </p>
                        <p className="text-sm text-green-700">
                          Completed{" "}
                          {formatDate(
                            milestone.achievedAt ||
                              milestone.achieved_at ||
                              milestone.completed_at
                          )}
                        </p>
                      </div>
                    </div>
                    {openModal && (
                      <button
                        onClick={() =>
                          openModal({
                            id: milestone.id || `milestone-${index}`,
                            title: displayTitle,
                            category: milestone.category || "Milestone",
                            child: currentChild?.name || "Unknown",
                            status: "completed",
                            date:
                              milestone.achievedAt ||
                              milestone.achieved_at ||
                              milestone.completed_at ||
                              new Date().toISOString(),
                            time: "00:00",
                            milestoneData: milestone,
                          })
                        }
                        className="text-green-600 hover:text-green-700 text-xs font-medium px-2 py-1 rounded border border-green-300 hover:bg-green-100 transition-colors"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">
                    No completed milestones yet
                  </p>
                  <p className="text-sm text-gray-500">
                    Keep working on activities to earn milestones!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* In Progress Milestones */}
        <div className="space-y-4">
          <h4 className="font-semibold text-blue-700 flex items-center space-x-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>In Progress</span>
          </h4>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {transformedInProgressMilestones.length > 0 ? (
              transformedInProgressMilestones.map((milestone, index) => {
                const displayTitle =
                  milestone.activityTitle ||
                  milestone.activity_title ||
                  milestone.title ||
                  "Unknown Activity";

                return (
                  <div
                    key={milestone.id || index}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-blue-900">
                        {displayTitle}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                          In Progress
                        </span>
                        {openModal && (
                          <button
                            onClick={() =>
                              openModal({
                                id:
                                  milestone.id || `milestone-progress-${index}`,
                                title: displayTitle,
                                category: milestone.category || "Milestone",
                                child: currentChild?.name || "Unknown",
                                status: "in_progress",
                                date:
                                  milestone.started_at ||
                                  new Date().toISOString(),
                                time: "00:00",
                                milestoneData: milestone,
                              })
                            }
                            className="text-blue-600 hover:text-blue-700 text-xs font-medium px-2 py-1 rounded border border-blue-300 hover:bg-blue-100 transition-colors"
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-blue-700">
                      {milestone.description ||
                        "Continue with this activity to achieve the milestone."}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-700">
                    No activities in progress
                  </p>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    Ready to start
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Start new activities to begin working towards milestones.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Milestone Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.completionRate}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
