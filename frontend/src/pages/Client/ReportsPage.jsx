/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ActivityDetailModal from "@/components/client/modals/ActivityDetailModal";
import HeaderClient from "@/components/client/HeaderClient";
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
  const [loading, setLoading] = useState(true);
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
  }, []);

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

          return {
            id: child.id,
            name: child.name,
            age: calculateAge(child.birthDate || child.birth_date), // Handle both formats
            avatar:
              child.gender === "P" || child.gender === "female" ? "👧" : "👦", // Handle both P/L and female/male
            totalActivities: 0, // Will be updated when we fetch activities
            completedMilestones:
              child.milestones || child.milestones_completed || 0, // Handle both formats
            avgScore: 0, // Will be calculated from activities
          };
        });

        setChildren(transformedChildren);
        console.log("✅ Children state updated:", transformedChildren);
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

  const currentChild = children[activeChild] || children[0];
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
              <DateRangeAndReportType
                dateRange={dateRange}
                setDateRange={setDateRange}
                reportType={reportType}
                setReportType={setReportType}
              />
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
              <OverviewStats mockReportData={mockReportData} />

              {/* Main Content Grid */}
              <MainContentGrid
                mockReportData={mockReportData}
                formatDateRange={formatDateRange}
                getProgressPercentage={getProgressPercentage}
              />

              {/* Milestones & Achievements */}
              <MilestonesAndAchievements currentChild={currentChild} />

              {/* Recent Activities */}
              <RecentActivities
                activities={mockReportData.recentActivities}
                openModal={openModal}
              />

              {/* Export & Actions */}
              <ExportAndActions mockReportData={mockReportData} />
            </>
          )}
        </div>{" "}
      </div>

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        activity={selectedActivity}
      />
    </>
  );
}
