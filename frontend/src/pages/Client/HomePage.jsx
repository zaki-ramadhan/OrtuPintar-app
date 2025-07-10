/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import ChildSelector from "@/components/client/homePage/ChildSelector";
import CurrentChildOverview from "@/components/client/homePage/CurrentChildOverview";
import QuickActions from "@/components/client/homePage/QuickActions";
import RecommendedActivities from "@/components/client/homePage/RecommendedActivities";
import RecentAcitivities from "@/components/client/homePage/RecentAcitivities";
import Notifications from "@/components/client/homePage/Notifications";
import UpcomingReminders from "@/components/client/homePage/UpcomingReminders";
import HeaderHomePage from "@/components/client/homePage/HeaderHomePage";
import ExpertSupport from "@/components/client/homePage/ExpertSupport";
import WeeklySummary from "@/components/client/homePage/WeeklySummary";
import AddChildModal from "@/components/client/homePage/AddChildModal";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [activeChild, setActiveChild] = useState(0);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [children, setChildren] = useState([]);
  const [showAddChildModal, setShowAddChildModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/children`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Children API response:", response.data);

        setChildren(response.data.children || []); // ← fallback kalau undefined
      } catch (err) {
        console.error("Error fetching children:", err);
        setChildren([]); // fallback biar gak undefined
      }
    };

    fetchChildren();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem("token"); // Kalau endpoint butuh Auth
      try {
        const response = await axios.get(`${API_URL}/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Activities API response:", response.data);
        setActivities(response.data.activities || []);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setActivities([]);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    // Initialize data (same as before)
    setNotifications([
      {
        id: 1,
        type: "milestone",
        message: "Emma is ready for new cognitive activities!",
        time: "2 hours ago",
        actionable: true,
        read: false,
      },
      {
        id: 2,
        type: "reminder",
        message: "Time for Alex's weekly assessment",
        time: "1 day ago",
        actionable: true,
        read: false,
      },
      {
        id: 3,
        type: "achievement",
        message: "Congratulations! Emma completed her drawing milestone",
        time: "3 days ago",
        actionable: false,
        read: false,
      },
      {
        id: 4,
        type: "alert",
        message: "Vaccination reminder for Alex next week",
        time: "5 days ago",
        actionable: true,
        read: false,
      },
    ]);
  }, []);

  const handleAddChild = async (childData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/children`,
        {
          name: childData.name,
          birthDate: childData.birthDate,
          gender: childData.gender === "male" ? "L" : "P",
          photoUrl: childData.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newChild = response.data.child;

      // Update state children
      setChildren((prev) => [...prev, newChild]);

      // Show toast success
      toast.success("Child added successfully!");

      // Tutup modal
      setShowAddChildModal(false);
    } catch (err) {
      console.error("Add child error:", err);
      toast.error(err.response?.data?.message || "Failed to add child.");
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
    toast.success("Notification marked as read");
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
    toast.success("All notifications marked as read");
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );
  //   const currentChild = children[activeChild];

  function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else if (months === 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else {
      return `${years} year${years > 1 ? "s" : ""}, ${months} month${
        months > 1 ? "s" : ""
      }`;
    }
  }

  function calculateAgeInYears(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let years = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return years;
  }

  const currentChild = children[activeChild] || null;

  const childAgeInYears = currentChild?.birthDate
    ? calculateAgeInYears(currentChild.birthDate)
    : null;

  const filteredActivities = activities.filter((activity) => {
    if (!childAgeInYears) return false;
    return (
      childAgeInYears >= activity.age_group_min &&
      childAgeInYears <= activity.age_group_max
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderHomePage />

      {/* Main Container - Responsive padding */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section - Responsive */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Good{" "}
            {currentDate.getHours() < 12
              ? "Morning"
              : currentDate.getHours() < 17
              ? "Afternoon"
              : "Evening"}
            , Sarah! 👋
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Let's check on your children's development progress today.
          </p>
        </div>

        {/* Child Selector */}
        <ChildSelector
          children={children}
          activeChild={activeChild}
          setActiveChild={setActiveChild}
          onAddChild={() => setShowAddChildModal(true)}
          calculateAge={calculateAge}
        />

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Main Dashboard */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Current Child Overview */}
            {currentChild && (
              <CurrentChildOverview currentChild={currentChild} />
            )}

            {/* Quick Actions Grid */}
            <QuickActions />

            {/* Recommended Activities */}
            <RecommendedActivities
              activities={filteredActivities}
              currentChild={{
                ...currentChild,
                age: calculateAge(currentChild?.birthDate),
              }}
            />

            {/* Recent Activities */}
            <RecentAcitivities />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notifications */}
            <Notifications
              notifications={unreadNotifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />

            {/* Upcoming Reminders */}
            <UpcomingReminders />

            {/* Expert Support */}
            <ExpertSupport />

            {/* Weekly Summary */}
            <WeeklySummary />
          </div>
        </div>

        {/* Bottom Section - Responsive Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Quick Help Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-200">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4">❓</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Our quick tutorial will guide you through tracking your child's
                first milestone.
              </p>
              <button className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto">
                Start Tutorial
              </button>
            </div>
          </div>

          {/* Expert Consultation Card */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-200">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4">👩‍⚕️</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Talk to an Expert
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Schedule a free consultation with our pediatric development
                specialists.
              </p>
              <button className="bg-emerald-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-emerald-600 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Child Modal */}
      {showAddChildModal && (
        <AddChildModal
          onClose={() => setShowAddChildModal(false)}
          onAddChild={handleAddChild}
        />
      )}
    </div>
  );
}
