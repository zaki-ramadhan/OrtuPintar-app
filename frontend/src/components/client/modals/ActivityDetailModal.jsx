import { useState } from "react";
import axios from "axios";

export default function ActivityDetailModal({
  isOpen,
  onClose,
  activity,
  onNoteUpdated,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  if (!isOpen || !activity) {
    // Reset states when modal is closed
    if (!isOpen && (newNote || noteSuccess)) {
      setNewNote("");
      setNoteSuccess(false);
    }
    return null;
  }

  // Detect if this is milestone data or regular activity data
  const isMilestone = activity.milestoneData !== undefined;
  const milestoneInfo = activity.milestoneData || {};

  const getStatusColor = (status, isMilestone = false) => {
    if (isMilestone) {
      switch (status) {
        case "completed":
          return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case "pending":
          return "bg-orange-100 text-orange-800 border-orange-200";
        case "in_progress":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "cancelled":
          return "bg-red-100 text-red-800 border-red-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    } else {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-800 border-green-200";
        case "pending":
          return "bg-orange-100 text-orange-800 border-orange-200";
        case "in_progress":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "cancelled":
          return "bg-red-100 text-red-800 border-red-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "cognitive":
        return (
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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        );
      case "motor skills":
        return (
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "language":
        return (
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        );
      case "social":
        return (
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "creative":
        return (
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
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4"
            />
          </svg>
        );
      default:
        return (
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
    }
  };

  // Helper function to calculate duration
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "Not available";
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMinutes = Math.round((end - start) / (1000 * 60));
    return `${diffInMinutes} minutes`;
  };

  // Real activity detail based on actual data from RecentActivities
  const activityDetail = {
    // Basic IDs and data
    id: activity.id,
    child_id: activity.child_id || milestoneInfo.child_id || 1,
    activity_id: activity.activity_id || activity.id,
    status: activity.status,

    // Timestamps - use real data from activity
    started_at:
      activity.started_at || (isMilestone ? milestoneInfo.started_at : null),
    completed_at:
      activity.completed_at ||
      (isMilestone
        ? milestoneInfo.completed_at || milestoneInfo.achieved_at
        : null),
    cancelled_at: activity.cancelled_at,
    created_at:
      activity.created_at ||
      (isMilestone ? milestoneInfo.created_at : new Date().toISOString()),
    updated_at:
      activity.updated_at ||
      (isMilestone ? milestoneInfo.updated_at : new Date().toISOString()),

    // Progress notes - use real data
    progress_notes:
      activity.progress_notes || (isMilestone ? milestoneInfo.notes : null),

    // Activity information
    title: activity.title,
    category: isMilestone ? "Milestone Achievement" : activity.category,
    child: activity.child,
    date: activity.date,
    time: activity.time,
    duration:
      activity.duration ||
      (activity.started_at && activity.completed_at
        ? calculateDuration(activity.started_at, activity.completed_at)
        : isMilestone
        ? "Milestone tracking"
        : "Not started"),
    difficulty_level:
      activity.difficulty_level || (isMilestone ? "Milestone" : "Beginner"),

    // Learning objectives - use real data or defaults
    learning_objectives:
      activity.learning_objectives ||
      (isMilestone
        ? [
            "Achievement of developmental milestone",
            "Recognition of learning progress",
            "Validation of skill development",
          ]
        : [
            "Engage in structured learning activity",
            "Develop targeted skills based on activity type",
            "Practice focused attention and concentration",
          ]),

    // Materials - use real data or defaults
    materials_needed:
      activity.materials_needed ||
      (isMilestone
        ? [
            "Completed prerequisite activities",
            "Progress tracking documentation",
            "Achievement recognition materials",
          ]
        : [
            "Activity-specific materials",
            "Comfortable learning environment",
            "Adult supervision if needed",
          ]),

    // Milestone specific data
    milestoneDetails: isMilestone
      ? {
          milestoneType: milestoneInfo.milestone_type || "Learning Achievement",
          requirements:
            milestoneInfo.requirements ||
            "Complete related learning activities",
          achievementCriteria:
            milestoneInfo.achievement_criteria ||
            "Successfully demonstrate required skills",
          skillsValidated: milestoneInfo.skills_validated || [
            "Problem solving",
            "Critical thinking",
            "Task completion",
          ],
        }
      : null,
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmitNote = async () => {
    if (!newNote.trim()) {
      alert("Please enter a note before submitting.");
      return;
    }

    try {
      setIsSubmittingNote(true);
      const token = localStorage.getItem("token");

      console.log("🔍 Debug info for saving note:");
      console.log("isMilestone:", isMilestone);
      console.log("activity:", activity);
      console.log("milestoneInfo:", milestoneInfo);
      console.log("newNote:", newNote);

      if (isMilestone) {
        // Update milestone notes
        const milestoneId = milestoneInfo.id || activity.id;
        console.log("📝 Saving milestone note for ID:", milestoneId);

        const response = await axios.put(
          `${API_URL}/milestones/${milestoneId}`,
          { notes: newNote },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Milestone note response:", response.data);
      } else {
        // Update activity progress notes
        const activityId = activity.id;
        const endpoint = `${API_URL}/log-activities/${activityId}/notes`;
        console.log("📝 Saving activity note for ID:", activityId);
        console.log("📝 Using endpoint:", endpoint);
        console.log("📝 Request payload:", { notes: newNote });

        const response = await axios.put(
          endpoint,
          { notes: newNote },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Activity note response:", response.data);
      }

      setNoteSuccess(true);
      setNewNote("");

      // Call callback to refresh data if provided
      if (onNoteUpdated) {
        onNoteUpdated();
      }

      // Trigger refresh for milestones and activities
      if (isMilestone) {
        // Trigger milestone refresh
        window.dispatchEvent(new CustomEvent("milestones_refresh"));
        localStorage.setItem("milestones_refresh", Date.now().toString());
      } else {
        // Trigger activities refresh (for reports page)
        window.dispatchEvent(new CustomEvent("activities_refresh"));
      }

      // Hide success message after 3 seconds
      setTimeout(() => {
        setNoteSuccess(false);
      }, 3000);

      console.log(
        `✅ ${isMilestone ? "Milestone" : "Activity"} note saved successfully`
      );
    } catch (error) {
      console.error("Error saving note:", error);
      alert(
        `Failed to save note: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsSubmittingNote(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-2 md:p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${
            isMilestone
              ? "from-yellow-50 to-orange-50"
              : "from-blue-50 to-indigo-50"
          } px-4 md:px-6 py-3 md:py-4 border-b border-gray-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
              <div
                className={`p-2 bg-white rounded-lg shadow-sm flex-shrink-0 ${
                  isMilestone ? "border-2 border-yellow-300" : ""
                }`}
              >
                {isMilestone ? (
                  <span className="text-xl md:text-2xl">🏆</span>
                ) : (
                  getCategoryIcon(activityDetail.category)
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 flex flex-col md:flex-row md:items-center md:space-x-2 truncate">
                  <span className="truncate">{activityDetail.title}</span>
                  {isMilestone && (
                    <span className="text-xs md:text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-300 mt-1 md:mt-0 self-start md:self-auto flex-shrink-0">
                      Milestone
                    </span>
                  )}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  {activityDetail.child} • {activityDetail.category}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <span
                className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(
                  activityDetail.status,
                  isMilestone
                )}`}
              >
                <span className="hidden sm:inline">
                  {activityDetail.status.charAt(0).toUpperCase() +
                    activityDetail.status.slice(1)}
                </span>
                <span className="sm:hidden">
                  {activityDetail.status === "completed"
                    ? "✓"
                    : activityDetail.status === "in_progress"
                    ? "⏳"
                    : activityDetail.status === "pending"
                    ? "⏸️"
                    : "•"}
                </span>
              </span>
              <button
                onClick={onClose}
                className="p-1 md:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-500"
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
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 md:px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div
            className="flex space-x-1 md:space-x-2 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "timeline", label: "Timeline", icon: "⏱️" },
              { id: "notes", label: "Notes", icon: "📝" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 md:space-x-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }`}
              >
                <span className="text-base md:text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="p-4 md:p-6 overflow-y-auto"
          style={{ maxHeight: "calc(95vh - 200px)" }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{isMilestone ? "🏆" : "📋"}</span>
                    <span>
                      {isMilestone ? "Milestone Details" : "Activity Details"}
                    </span>
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Record ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        #{activityDetail.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        {isMilestone ? "Milestone" : "Activity"} ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        #{activityDetail.activity_id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Child ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        #{activityDetail.child_id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        {isMilestone ? "Type" : "Difficulty"}:
                      </span>
                      <span className="text-sm text-gray-900">
                        {activityDetail.difficulty_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Duration:
                      </span>
                      <span className="text-sm text-gray-900">
                        {activityDetail.duration}
                      </span>
                    </div>
                    {isMilestone && activityDetail.milestoneDetails && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">
                            Milestone Type:
                          </span>
                          <span className="text-sm text-gray-900">
                            {activityDetail.milestoneDetails.milestoneType}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <span className="text-sm font-medium text-gray-600">
                            Requirements:
                          </span>
                          <p className="text-sm text-gray-900 mt-1">
                            {activityDetail.milestoneDetails.requirements}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{isMilestone ? "🎯" : "🎯"}</span>
                    <span>
                      {isMilestone
                        ? "Achievement Objectives"
                        : "Learning Objectives"}
                    </span>
                  </h3>
                  <div
                    className={`${
                      isMilestone ? "bg-yellow-50" : "bg-blue-50"
                    } rounded-lg p-4`}
                  >
                    <ul className="space-y-2">
                      {activityDetail.learning_objectives.map(
                        (objective, index) => (
                          <li
                            key={index}
                            className={`flex items-start space-x-2 text-sm ${
                              isMilestone ? "text-yellow-900" : "text-blue-900"
                            }`}
                          >
                            <span
                              className={`${
                                isMilestone
                                  ? "text-yellow-500"
                                  : "text-blue-500"
                              } mt-1`}
                            >
                              •
                            </span>
                            <span>{objective}</span>
                          </li>
                        )
                      )}
                    </ul>
                    {isMilestone &&
                      activityDetail.milestoneDetails.skillsValidated && (
                        <div className="mt-3 pt-3 border-t border-yellow-200">
                          <p className="text-xs font-medium text-yellow-800 mb-2">
                            Skills Validated:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {activityDetail.milestoneDetails.skillsValidated.map(
                              (skill, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Materials/Resources Needed */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <span>{isMilestone ? "📚" : "🧰"}</span>
                  <span>
                    {isMilestone
                      ? "Achievement Components"
                      : "Materials Needed"}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activityDetail.materials_needed.map((material, index) => (
                    <div
                      key={index}
                      className={`${
                        isMilestone
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-green-50 border-green-200"
                      } border rounded-lg p-3`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 ${
                            isMilestone ? "bg-yellow-500" : "bg-green-500"
                          } rounded-full`}
                        ></div>
                        <span
                          className={`text-sm font-medium ${
                            isMilestone ? "text-yellow-900" : "text-green-900"
                          }`}
                        >
                          {material}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <span>{isMilestone ? "🏆" : "⏰"}</span>
                <span>
                  {isMilestone ? "Milestone Timeline" : "Activity Timeline"}
                </span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 ${
                        isMilestone ? "bg-yellow-100" : "bg-blue-100"
                      } rounded-full flex items-center justify-center`}
                    >
                      {isMilestone ? (
                        <span className="text-lg">🏆</span>
                      ) : (
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      )}
                    </div>
                    {(activityDetail.started_at ||
                      (isMilestone && milestoneInfo.started_at)) && (
                      <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="font-medium text-gray-900">
                      {isMilestone
                        ? "Milestone Identified"
                        : "Activity Created"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formatDateTime(activityDetail.created_at)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isMilestone
                        ? `Milestone "${activityDetail.title}" was identified as a development goal for ${activityDetail.child}`
                        : `Activity "${activityDetail.title}" was scheduled for ${activityDetail.child}`}
                    </p>
                    {isMilestone && milestoneInfo.milestone_type && (
                      <div className="mt-2">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-300">
                          {milestoneInfo.milestone_type}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {(activityDetail.started_at ||
                  (isMilestone && milestoneInfo.started_at)) && (
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 ${
                          isMilestone ? "bg-orange-100" : "bg-yellow-100"
                        } rounded-full flex items-center justify-center`}
                      >
                        {isMilestone ? (
                          <span className="text-lg">🎯</span>
                        ) : (
                          <svg
                            className="w-5 h-5 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                      {activityDetail.completed_at && (
                        <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="font-medium text-gray-900">
                        {isMilestone
                          ? "Working Towards Milestone"
                          : "Activity Started"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(activityDetail.started_at)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {isMilestone
                          ? `${activityDetail.child} began working on activities that lead to this milestone achievement`
                          : `${activityDetail.child} started working on this activity`}
                      </p>
                      {isMilestone && milestoneInfo.requirements && (
                        <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-xs text-orange-800">
                            <strong>Requirements:</strong>{" "}
                            {milestoneInfo.requirements}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activityDetail.completed_at && (
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 ${
                          isMilestone
                            ? "bg-green-100 border-2 border-yellow-300"
                            : "bg-green-100"
                        } rounded-full flex items-center justify-center relative`}
                      >
                        <svg
                          className="w-5 h-5 text-green-600"
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
                        {isMilestone && (
                          <div className="absolute -top-1 -right-1">
                            <span className="text-xs">🏆</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="font-medium text-gray-900">
                        {isMilestone
                          ? "🎉 Milestone Achieved!"
                          : "Activity Completed"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(activityDetail.completed_at)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {isMilestone
                          ? "Congratulations! Developmental milestone successfully achieved"
                          : "Successfully finished all tasks"}
                      </p>
                      {isMilestone && (
                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-xs text-yellow-800">
                            <strong>Achievement:</strong> This milestone
                            represents significant progress in your child's
                            development!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activityDetail.cancelled_at && (
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-red-600"
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
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="font-medium text-gray-900">
                        {isMilestone
                          ? "Milestone Tracking Stopped"
                          : "Activity Cancelled"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(activityDetail.cancelled_at)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {isMilestone
                          ? "Milestone tracking was discontinued"
                          : "Activity was cancelled"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Database Timestamps */}
              <div
                className={`${
                  isMilestone
                    ? "bg-yellow-50 border border-yellow-200"
                    : "bg-gray-50"
                } rounded-lg p-4 mt-6`}
              >
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <span>{isMilestone ? "🏆" : "💾"}</span>
                  <span>
                    {isMilestone
                      ? "Milestone Information"
                      : "Database Information"}
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {formatDateTime(activityDetail.created_at)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      Last Updated:
                    </span>
                    <span className="ml-2 text-gray-900">
                      {formatDateTime(activityDetail.updated_at)}
                    </span>
                  </div>
                  {isMilestone && (
                    <>
                      <div className="col-span-2 pt-2 border-t border-yellow-200">
                        <span className="font-medium text-gray-600">
                          Milestone Status:
                        </span>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            activityDetail.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {activityDetail.status === "completed"
                            ? "Achieved"
                            : "In Progress"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <span>{isMilestone ? "🏆" : "📝"}</span>
                <span>
                  {isMilestone ? "Achievement Notes" : "Progress Notes"}
                </span>
              </h3>

              <div
                className={`${
                  isMilestone
                    ? "bg-yellow-50 border border-yellow-200"
                    : "bg-amber-50 border border-amber-200"
                } rounded-lg p-4`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 ${
                      isMilestone ? "bg-yellow-100" : "bg-amber-100"
                    } rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        isMilestone ? "text-yellow-600" : "text-amber-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-medium ${
                        isMilestone ? "text-yellow-900" : "text-amber-900"
                      } mb-2`}
                    >
                      {isMilestone
                        ? "Milestone Achievement Notes"
                        : "Activity Notes"}
                    </h4>
                    <p
                      className={`text-sm ${
                        isMilestone ? "text-yellow-800" : "text-amber-800"
                      } leading-relaxed`}
                    >
                      {isMilestone
                        ? milestoneInfo.notes ||
                          "No notes added yet for this milestone."
                        : activityDetail.progress_notes ||
                          "No notes added yet for this activity."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Add Notes Section */}
              <div
                className={`border-2 border-dashed ${
                  isMilestone ? "border-yellow-200" : "border-gray-200"
                } rounded-lg p-6`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <svg
                    className={`w-8 h-8 ${
                      isMilestone ? "text-yellow-400" : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900">
                    {isMilestone
                      ? "Add Achievement Notes"
                      : "Add Additional Notes"}
                  </h4>
                </div>

                <p className="text-gray-600 mb-4">
                  {isMilestone
                    ? "Record celebration moments, family reactions, or additional observations about this milestone achievement."
                    : "Record observations, feedback, or recommendations for this activity."}
                </p>

                {/* Note Input */}
                <div className="space-y-3">
                  <textarea
                    value={newNote}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 500) {
                        setNewNote(value);
                      }
                    }}
                    placeholder={
                      isMilestone
                        ? "Share how this milestone was achieved, family celebrations, or future goals..."
                        : "Add your observations about the child's performance, areas for improvement, or recommendations..."
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    disabled={isSubmittingNote}
                    maxLength={500}
                  />

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {newNote.length}/500 characters
                    </div>

                    <div className="flex items-center space-x-2">
                      {noteSuccess && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <svg
                            className="w-4 h-4"
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
                          <span className="text-sm">Note saved!</span>
                        </div>
                      )}

                      <button
                        onClick={handleSubmitNote}
                        disabled={isSubmittingNote || !newNote.trim()}
                        className={`px-4 py-2 ${
                          isMilestone
                            ? "bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-300"
                            : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                        } text-white rounded-lg transition-colors text-sm font-medium disabled:cursor-not-allowed flex items-center space-x-2`}
                      >
                        {isSubmittingNote ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <span>Add Note</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
