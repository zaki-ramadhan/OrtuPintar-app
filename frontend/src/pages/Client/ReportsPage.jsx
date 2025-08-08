/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ActivityDetailModal from "@/components/client/modals/ActivityDetailModal";
import HeaderClient from "@/components/client/HeaderClient";
import { triggerMilestoneRefresh } from "@/utils/milestoneUtils";
import {
  PageHeader,
  ChildSelector,
  DateRangeAndReportType,
  CurrentPeriodDisplay,
  OverviewStats,
  StatsCard,
  MainContentGrid,
  MilestonesAndAchievements,
  RecentActivities,
  ExportAndActions,
} from "@/components/client/reportsPage";

export default function ReportsPage() {
  const navigate = useNavigate();
  const [_user, setUser] = useState(null);
  const [children, setChildren] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [activeChild, setActiveChild] = useState(0);
  const [dateRange, setDateRange] = useState("week"); // week, month, quarter, year
  const [reportType, setReportType] = useState("overview"); // overview, activities, milestones
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Mock data for demonstration and fallback
  const mockChildren = [
    {
      id: 1,
      name: "Emma Johnson",
      age: "3 years, 6 months",
      avatar: "👧",
      totalActivities: 45,
      completedMilestones: 12,
      avgScore: 87,
    },
    {
      id: 2,
      name: "Alex Johnson",
      age: "5 years, 2 months",
      avatar: "👦",
      totalActivities: 63,
      completedMilestones: 18,
      avgScore: 92,
    },
  ];
  const mockReportData = {
    overview: {
      totalActivities: 108,
      completedMilestones: 30,
      completionRate: 84,
      totalTimeSpent: 45,
      activeStreak: 7,
      lastActivity: "2 hours ago",
    },
    weeklyProgress: [
      { day: "Mon", completed: 8, total: 10 },
      { day: "Tue", completed: 12, total: 12 },
      { day: "Wed", completed: 7, total: 9 },
      { day: "Thu", completed: 10, total: 11 },
      { day: "Fri", completed: 9, total: 10 },
      { day: "Sat", completed: 6, total: 8 },
      { day: "Sun", completed: 5, total: 6 },
    ],
    categories: [
      { name: "Motor Skills", completed: 25, total: 30, color: "bg-blue-500" },
      { name: "Language", completed: 22, total: 28, color: "bg-green-500" },
      { name: "Cognitive", completed: 18, total: 25, color: "bg-purple-500" },
      { name: "Social", completed: 15, total: 20, color: "bg-orange-500" },
      { name: "Creative", completed: 12, total: 18, color: "bg-pink-500" },
    ],
    recentActivities: [
      {
        id: 1,
        child_id: 1,
        activity_id: 101,
        title: "Color Recognition Game",
        child: "Emma",
        category: "Cognitive",
        status: "completed",
        date: "Today",
        time: "2:30 PM",
        duration: "15 minutes",
        difficulty_level: "Beginner",
        learning_objectives: [
          "Identify primary colors (red, blue, yellow)",
          "Match colors with objects",
          "Develop visual discrimination skills",
        ],
        materials_needed: [
          "Color cards",
          "Colored objects",
          "Activity worksheet",
        ],
        started_at: "2024-12-20T14:15:00Z",
        completed_at: "2024-12-20T14:30:00Z",
        cancelled_at: null,
        created_at: "2024-12-20T14:00:00Z",
        updated_at: "2024-12-20T14:30:00Z",
        progress_notes: [
          {
            id: 1,
            note: "Emma showed excellent progress in identifying primary colors. She was able to match all colors correctly.",
            created_at: "2024-12-20T14:30:00Z",
            created_by: "Teacher Sarah",
          },
        ],
      },
      {
        id: 2,
        child_id: 2,
        activity_id: 102,
        title: "Building Blocks Challenge",
        child: "Alex",
        category: "Motor Skills",
        status: "completed",
        date: "Today",
        time: "10:15 AM",
        duration: "20 minutes",
        difficulty_level: "Intermediate",
        learning_objectives: [
          "Develop fine motor skills",
          "Improve hand-eye coordination",
          "Practice spatial reasoning",
        ],
        materials_needed: ["Building blocks set", "Pattern cards", "Timer"],
        started_at: "2024-12-20T10:15:00Z",
        completed_at: "2024-12-20T10:35:00Z",
        cancelled_at: null,
        created_at: "2024-12-20T10:00:00Z",
        updated_at: "2024-12-20T10:35:00Z",
        progress_notes: [
          {
            id: 2,
            note: "Alex completed the tower challenge successfully. Great improvement in stacking precision.",
            created_at: "2024-12-20T10:35:00Z",
            created_by: "Teacher Mike",
          },
        ],
      },
      {
        id: 3,
        child_id: 1,
        activity_id: 103,
        title: "Story Telling Session",
        child: "Emma",
        category: "Language",
        status: "in_progress",
        date: "Yesterday",
        time: "4:45 PM",
        duration: "25 minutes",
        difficulty_level: "Beginner",
        learning_objectives: [
          "Develop vocabulary",
          "Practice listening skills",
          "Encourage verbal expression",
        ],
        materials_needed: ["Picture books", "Story cards", "Audio recorder"],
        started_at: null,
        completed_at: null,
        cancelled_at: null,
        created_at: "2024-12-19T16:30:00Z",
        updated_at: "2024-12-19T16:45:00Z",
        progress_notes: [],
      },
    ],
  };

  useEffect(() => {
    console.log("🔄 ReportsPage useEffect triggered");
    document.title = "Reports - OrtuPintar";

    // Check authentication
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log("👤 User data from localStorage:", userData);
    console.log(
      "🔑 Token from localStorage:",
      token ? "Token exists" : "No token"
    );

    if (!userData || !token) {
      console.log("❌ No auth data found, redirecting to login");
      navigate("/login");
      return;
    }

    console.log("✅ Auth data found, setting user and fetching children");
    setUser(userData);
    fetchChildren(token);

    // Listen for milestone refresh events
    const handleMilestoneRefresh = () => {
      console.log("📢 Reports page received milestone refresh event");
      if (token) {
        fetchChildren(token);
      }
    };

    // Listen for activities refresh events
    const handleActivitiesRefresh = () => {
      console.log("📢 Reports page received activities refresh event");
      if (token) {
        fetchActivities(token);
      }
    };

    window.addEventListener("milestones_refresh", handleMilestoneRefresh);
    window.addEventListener("activities_refresh", handleActivitiesRefresh);

    return () => {
      window.removeEventListener("milestones_refresh", handleMilestoneRefresh);
      window.removeEventListener("activities_refresh", handleActivitiesRefresh);
    };
  }, []);

  // Function to fetch activities data for all children
  const fetchActivities = async (token) => {
    try {
      console.log("🎯 Fetching activities data...");
      setActivitiesLoading(true);

      const response = await axios.get(`${API_URL}/log-activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Activities data fetched:", response.data);

      if (response.data.activities && Array.isArray(response.data.activities)) {
        setActivities(response.data.activities);
        console.log("✅ Activities state updated:", response.data.activities);
        console.log(`📊 Total activities: ${response.data.activities.length}`);

        // Log activity status breakdown (including cancelled for debugging)
        const completed = response.data.activities.filter(
          (a) => a.status === "completed"
        ).length;
        const cancelled = response.data.activities.filter(
          (a) => a.status === "cancelled"
        ).length;
        const inProgress = response.data.activities.filter(
          (a) => a.status === "in_progress"
        ).length;
        const pending = response.data.activities.filter(
          (a) => a.status === "pending"
        ).length;

        console.log(
          `📈 Activity breakdown - Completed: ${completed}, Cancelled: ${cancelled}, In Progress: ${inProgress}, Pending: ${pending}`
        );
      } else {
        console.log("⚠️ No activities in response or invalid format");
        setActivities([]);
      }
    } catch (error) {
      console.error("❌ Error fetching activities:", error);
      setActivities([]);
    } finally {
      setActivitiesLoading(false);
    }
  };

  // Function to fetch children data
  const fetchChildren = async (token) => {
    try {
      console.log("🔍 Fetching children data...");
      console.log("🔑 Using token:", token ? "Token exists" : "No token");
      console.log("🌐 API URL:", API_URL);
      setLoading(true);

      const response = await axios.get(`${API_URL}/children`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Children data fetched:", response.data);
      console.log("📊 Response status:", response.status);

      // Handle different response formats
      const childrenData = response.data.children || response.data || [];

      if (childrenData && childrenData.length > 0) {
        console.log("🔍 Processing children data:", childrenData);

        // Transform data to match our component structure
        const transformedChildren = childrenData.map((child, index) => {
          console.log(`📝 Processing child ${index + 1}:`, child);

          // Log all possible milestone fields
          console.log(`🎯 Milestone fields for ${child.name}:`, {
            milestones: child.milestones,
            milestones_completed: child.milestones_completed,
            completedMilestones: child.completedMilestones,
          });

          const transformedChild = {
            id: child.id,
            name: child.name,
            age: calculateAge(child.birthDate || child.birth_date), // Handle both formats
            avatar:
              child.gender === "P" || child.gender === "female" ? "👧" : "👦", // Handle both P/L and female/male
            totalActivities: 0, // Will be updated when we fetch activities
            completedMilestones: child.milestones || 0, // Use the correct 'milestones' field from backend
            avgScore: 0, // Will be calculated from activities
          };

          console.log(`✅ Transformed child ${child.name}:`, transformedChild);
          return transformedChild;
        });

        setChildren(transformedChildren);
        console.log("✅ Children state updated:", transformedChildren);

        // Fetch activities after children are loaded
        const token = localStorage.getItem("token");
        if (token) {
          fetchActivities(token);
        }
      } else {
        console.log("⚠️ No children found in response");
        console.log("📝 Full response:", response.data);
        setChildren([]);
      }
    } catch (error) {
      console.error("❌ Error fetching children:", error);
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error.response?.status === 401) {
        console.log("🔐 Token expired or invalid, redirecting to login");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("❌ Failed to fetch children data, using fallback");
        // Use mock data as fallback for development
        console.log("🔄 Loading fallback mock data...");
        setChildren(mockChildren);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate age from birth_date
  const calculateAge = (birthDate) => {
    if (!birthDate) return "Unknown age";

    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMs = today - birth;
    const years = Math.floor(ageInMs / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor(
      (ageInMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000)
    );

    if (years > 0) {
      return `${years} years${months > 0 ? `, ${months} months` : ""}`;
    } else {
      return `${months} months`;
    }
  };

  // Helper function to calculate real day streak based on consecutive days
  const calculateRealDayStreak = (childActivities) => {
    console.log("🔥 Calculating real day streak...");

    if (!childActivities || childActivities.length === 0) {
      console.log("⚠️ No activities for streak calculation");
      return 0;
    }

    // Get only completed activities with valid completion dates (exclude cancelled)
    const completedActivities = childActivities.filter(
      (activity) =>
        activity.status === "completed" &&
        activity.completed_at &&
        activity.status !== "cancelled"
    );

    if (completedActivities.length === 0) {
      console.log("⚠️ No completed activities for streak calculation");
      return 0;
    }

    // Group activities by date (YYYY-MM-DD format)
    const activitiesByDate = {};
    completedActivities.forEach((activity) => {
      const completedDate = new Date(activity.completed_at);
      const dateKey = completedDate.toISOString().split("T")[0]; // YYYY-MM-DD format

      if (!activitiesByDate[dateKey]) {
        activitiesByDate[dateKey] = [];
      }
      activitiesByDate[dateKey].push(activity);
    });

    console.log("📅 Activities grouped by date:", activitiesByDate);

    // Get unique dates and sort them in descending order (newest first)
    const uniqueDates = Object.keys(activitiesByDate).sort(
      (a, b) => new Date(b) - new Date(a)
    );
    console.log("📊 Unique activity dates (sorted):", uniqueDates);

    if (uniqueDates.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    console.log("🗓️ Today's date:", todayString);

    // Start checking from today backwards
    let checkDate = new Date(today);
    let foundToday = false;

    // Check if there's activity today
    if (activitiesByDate[todayString]) {
      foundToday = true;
      streak = 1;
      console.log("✅ Found activity today, streak starts at 1");
    } else {
      // Check if there's activity yesterday (grace period of 1 day)
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split("T")[0];

      if (activitiesByDate[yesterdayString]) {
        foundToday = true;
        streak = 1;
        checkDate = yesterday;
        console.log(
          "✅ Found activity yesterday (grace period), streak starts at 1"
        );
      } else {
        console.log("❌ No recent activity (today or yesterday), streak is 0");
        return 0;
      }
    }

    // Count consecutive days backwards
    for (let i = 1; i < uniqueDates.length; i++) {
      // Move to previous day
      checkDate.setDate(checkDate.getDate() - 1);
      const expectedDateString = checkDate.toISOString().split("T")[0];

      console.log(`🔍 Checking for activity on: ${expectedDateString}`);

      if (activitiesByDate[expectedDateString]) {
        streak++;
        console.log(
          `✅ Found activity on ${expectedDateString}, streak now: ${streak}`
        );
      } else {
        console.log(`❌ No activity on ${expectedDateString}, breaking streak`);
        break;
      }
    }

    console.log(`🔥 Final day streak: ${streak} days`);
    return streak;
  };

  const currentChild = children[activeChild] || children[0];

  // Calculate real stats based on selected child and their activities
  const calculateRealStats = (selectedChild = null) => {
    console.log("🧮 Calculating real stats for selected child...");
    console.log("� Selected child:", selectedChild);
    console.log("🎯 All activities data:", activities);

    if (!selectedChild) {
      console.log("⚠️ No child selected");
      return {
        totalActivities: 0,
        completedMilestones: 0,
        completionRate: 0,
        totalTimeSpent: 0,
        activeStreak: 0,
        lastActivity: "No activity yet",
      };
    }

    // Filter activities for the selected child only and exclude cancelled activities
    const childActivities = activities.filter(
      (activity) =>
        activity.child_id === selectedChild.id &&
        activity.status !== "cancelled"
    );
    console.log(
      `🔍 Active (non-cancelled) activities for ${selectedChild.name}:`,
      childActivities
    );

    // Calculate stats from this child's activities only
    const totalActivities = childActivities.length || 0;
    const completedActivities =
      childActivities.filter((activity) => activity.status === "completed")
        .length || 0;

    // Get milestones for this specific child
    const completedMilestones = selectedChild.completedMilestones || 0;
    console.log(
      `📈 Child ${selectedChild.name} milestones:`,
      completedMilestones
    );

    // Calculate completion rate based on this child's activities
    const completionRate =
      totalActivities > 0
        ? Math.round((completedActivities / totalActivities) * 100)
        : 0;

    // Calculate total time spent for this child's completed activities
    let totalTimeSpent = 0;
    if (childActivities.length > 0) {
      // Sum up actual duration from this child's completed activities
      const totalMinutes = childActivities
        .filter((a) => a.status === "completed" && a.duration)
        .reduce((sum, activity) => sum + (activity.duration || 30), 0);
      totalTimeSpent = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal place
    }

    // Calculate active streak based on consecutive days with completed activities
    let activeStreak = 0;
    if (childActivities.length > 0 && completedActivities > 0) {
      activeStreak = calculateRealDayStreak(childActivities);
    }

    // Get last activity time for this child (exclude cancelled activities)
    let lastActivity = "No activity yet";
    if (childActivities.length > 0) {
      // Sort this child's non-cancelled activities by updated_at and get the most recent
      const sortedActivities = [...childActivities].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
      const latestActivity = sortedActivities[0];
      if (latestActivity && latestActivity.updated_at) {
        const lastDate = new Date(latestActivity.updated_at);
        const now = new Date();
        const hoursDiff = Math.floor((now - lastDate) / (1000 * 60 * 60));

        if (hoursDiff < 1) {
          lastActivity = "Just now";
        } else if (hoursDiff < 24) {
          lastActivity = `${hoursDiff}h ago`;
        } else {
          const daysDiff = Math.floor(hoursDiff / 24);
          lastActivity = `${daysDiff}d ago`;
        }
      }
    }

    const calculatedStats = {
      totalActivities,
      completedMilestones,
      completionRate,
      totalTimeSpent,
      activeStreak,
      lastActivity,
    };

    console.log(
      `📊 Calculated stats for ${selectedChild.name}:`,
      calculatedStats
    );
    console.log(
      `📈 Child activities breakdown - Total: ${totalActivities}, Completed: ${completedActivities}, Milestones: ${completedMilestones}`
    );
    return calculatedStats;
  };

  const realStats = calculateRealStats(currentChild);

  // Helper function to format date and time from timestamp
  const formatActivityDateTime = (activity) => {
    // Use completed_at if available, otherwise use updated_at or started_at
    const timestamp =
      activity.completed_at || activity.updated_at || activity.started_at;

    if (!timestamp) {
      return { date: "Unknown date", time: "Unknown time" };
    }

    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Format date
    let formattedDate;
    if (date.toDateString() === today.toDateString()) {
      formattedDate = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      formattedDate = "Yesterday";
    } else {
      formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    // Format time
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return { date: formattedDate, time: formattedTime };
  };

  // Filter activities for Recent Activities (exclude cancelled)
  const filteredActivitiesForDisplay =
    activities.length > 0
      ? activities
          .filter((activity) => {
            // Filter out cancelled activities and only show for current child
            const isCurrentChild = currentChild
              ? activity.child_id === currentChild.id
              : true;
            const isNotCancelled = activity.status !== "cancelled";
            console.log(
              `🔍 Activity ${activity.id}: child_match=${isCurrentChild}, not_cancelled=${isNotCancelled}, status=${activity.status}`
            );
            return isCurrentChild && isNotCancelled;
          })
          .map((activity) => {
            // Transform activity data to include formatted date and time
            const { date, time } = formatActivityDateTime(activity);

            return {
              ...activity,
              date,
              time,
              // Map the child name (we need to get this from children array)
              child: currentChild
                ? currentChild.name
                : activity.child_name || "Unknown",
              // Ensure title exists
              title:
                activity.title ||
                activity.activityTitle ||
                activity.activity_title ||
                "Unknown Activity",
            };
          })
          .sort((a, b) => {
            // Sort by updated_at in descending order (most recent first)
            return new Date(b.updated_at) - new Date(a.updated_at);
          })
      : mockReportData.recentActivities;

  console.log(
    "📊 Filtered activities for display (no cancelled):",
    filteredActivitiesForDisplay
  );

  console.log(
    "📅 Sample activity date/time for verification:",
    filteredActivitiesForDisplay.length > 0
      ? {
          id: filteredActivitiesForDisplay[0].id,
          title: filteredActivitiesForDisplay[0].title,
          date: filteredActivitiesForDisplay[0].date,
          time: filteredActivitiesForDisplay[0].time,
          child: filteredActivitiesForDisplay[0].child,
          status: filteredActivitiesForDisplay[0].status,
        }
      : "No activities to display"
  );

  // Combine real stats with mock structure for other data
  const dynamicReportData = {
    overview: realStats,
    weeklyProgress: mockReportData.weeklyProgress, // Keep mock for now
    categories: mockReportData.categories, // Keep mock for now
    recentActivities: filteredActivitiesForDisplay,
  };
  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  const handleNoteUpdated = () => {
    console.log("📝 Note updated, refreshing data...");
    const token = localStorage.getItem("token");
    if (token) {
      fetchActivities(token);
      fetchChildren(token);
    }
  };

  const formatDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case "week": {
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(now.setDate(weekStart.getDate() + 6));
        return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
      }
      case "month":
        return now.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
      case "quarter": {
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `Q${quarter} ${now.getFullYear()}`;
      }
      case "year":
        return now.getFullYear().toString();
      default:
        return "This Week";
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <HeaderClient />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8">
          {/* Page Header */}
          <PageHeader />

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 mb-6">
            {" "}
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
              {/* Child Selector */}
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Loading children...</span>
                </div>
              ) : children.length > 0 ? (
                <ChildSelector
                  activeChild={activeChild}
                  setActiveChild={setActiveChild}
                  mockChildren={children}
                />
              ) : (
                <div className="text-gray-500">No children found</div>
              )}

              {/* Date Range & Report Type */}
              <div className="flex items-center space-x-4">
                <DateRangeAndReportType
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  reportType={reportType}
                  setReportType={setReportType}
                />
              </div>
            </div>
            {/* Current Period Display */}
            <CurrentPeriodDisplay
              reportType={reportType}
              currentChild={currentChild}
              formatDateRange={formatDateRange}
            />
          </div>

          {/* Main Content - Show loading or content */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading reports data...</p>
              </div>
            </div>
          ) : children.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">👶</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Children Added Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Add your first child to start tracking their development and
                activities.
              </p>
              <button
                onClick={() => navigate("/home")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Go to Home to Add Child
              </button>
            </div>
          ) : (
            <>
              {/* Overview Stats */}
              <OverviewStats
                reportData={dynamicReportData}
                children={children}
                currentChild={currentChild}
              />

              {/* Main Content Grid */}
              <MainContentGrid
                reportData={dynamicReportData}
                formatDateRange={formatDateRange}
                getProgressPercentage={getProgressPercentage}
                currentChild={currentChild}
                activities={activities}
              />

              {/* Milestones & Achievements */}
              <MilestonesAndAchievements
                currentChild={currentChild}
                openModal={openModal}
              />

              {/* Recent Activities */}
              <RecentActivities
                activities={dynamicReportData.recentActivities}
                openModal={openModal}
              />

              {/* Export & Actions */}
              <ExportAndActions
                mockReportData={dynamicReportData}
                currentChild={currentChild}
              />
            </>
          )}
        </div>{" "}
      </div>

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        activity={selectedActivity}
        onNoteUpdated={handleNoteUpdated}
      />
    </>
  );
}
