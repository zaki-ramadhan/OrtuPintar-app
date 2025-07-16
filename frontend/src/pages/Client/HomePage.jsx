/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import ChildSelector from "@/components/client/homePage/ChildSelector";
import CurrentChildOverview from "@/components/client/homePage/CurrentChildOverview";
import QuickActions from "@/components/client/homePage/QuickActions";
import RecommendedActivities from "@/components/client/homePage/RecommendedActivities";
import RecentAcitivities from "@/components/client/homePage/RecentAcitivities";
import Notifications from "@/components/client/homePage/Notifications";
import UpcomingReminders from "@/components/client/homePage/UpcomingReminders";
import ExpertSupport from "@/components/client/homePage/ExpertSupport";
import WeeklySummary from "@/components/client/homePage/WeeklySummary";
import AddChildModal from "@/components/client/homePage/AddChildModal";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import HeaderClient from "@/components/client/HeaderClient";
import { triggerMilestoneRefresh } from "@/utils/milestoneUtils";

const API_URL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [activeChild, setActiveChild] = useState(0);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [children, setChildren] = useState([]);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [user, setUser] = useState(null);
  const [allChildReminders, setAllChildReminders] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // to trigger refresh RecentActivities
  const [weeklyRefreshKey, setWeeklyRefreshKey] = useState(0); // to trigger refresh WeeklySummary
  const [hideCompletedReminders, setHideCompletedReminders] = useState(false); // for client-side filtering

  const navigate = useNavigate();

  // Function to scroll to RecommendedActivities
  const scrollToRecommendedActivities = () => {
    const element = document.querySelector(
      '[data-component="recommended-activities"]'
    );
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    const fetchChildren = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/children`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Children API response:", response.data);

        setChildren(response.data.children || []); // ← fallback kalau undefined
      } catch (err) {
        console.error("Error fetching children:", err);
        setChildren([]); // fallback biar gak undefined
      }
    };
    fetchChildren();
  }, []); // Effect untuk mengambil progress semua anak setelah data children tersedia
  useEffect(() => {
    if (children.length > 0) {
      const fetchProgress = async () => {
        const token = localStorage.getItem("token");
        try {
          // Update progress untuk setiap anak dengan state update yang aman
          const progressPromises = children.map(async (child) => {
            try {
              // Ambil reminders untuk anak ini hari ini
              const today = new Date().toISOString().split("T")[0];
              const remindersResponse = await axios.get(
                `${API_URL}/activities/reminders/${child.id}?date=${today}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const childReminders = remindersResponse.data.reminders || [];
              const completedCount = childReminders.filter(
                (rem) => rem.completed
              ).length;
              const progressPercentage =
                childReminders.length > 0
                  ? Math.round((completedCount / childReminders.length) * 100)
                  : 0;

              return {
                childId: child.id,
                progress: progressPercentage,
              };
            } catch (err) {
              console.error(
                `Error fetching progress for child ${child.id}:`,
                err
              );
              return {
                childId: child.id,
                progress: Number(child.progress) || 0,
              };
            }
          });

          const progressResults = await Promise.all(progressPromises);

          // Update children state hanya sekali dengan semua progress baru
          setChildren((prevChildren) =>
            prevChildren.map((child) => {
              const progressData = progressResults.find(
                (p) => p.childId === child.id
              );
              return {
                ...child,
                progress: progressData
                  ? progressData.progress
                  : Number(child.progress) || 0,
              };
            })
          );
        } catch (err) {
          console.error("Error fetching all children progress:", err);
        }
      };

      fetchProgress();
    }
  }, [children.length]); // Hanya trigger saat jumlah children berubah, bukan saat children object berubah

  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/activities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Activities API response:", response.data);
        setActivities(response.data.activities || []);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setActivities([]);
      }
    };

    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Notifications API response:", response.data);
        setNotifications(response.data.notifications || []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setNotifications([]);
      }
    };

    fetchActivities();
    fetchNotifications();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  useEffect(() => {
    document.title = "Dashboard - OrtuPintar";
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

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    } catch (err) {
      console.error("Mark as read error:", err);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/notifications/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
      toast.success("All notifications marked as read");
    } catch (err) {
      console.error("Mark all as read error:", err);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleClearNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/notifications/clear-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications([]);
      toast.success("All notifications cleared");
    } catch (err) {
      console.error("Clear notifications error:", err);
      toast.error("Failed to clear notifications");
    }
  };

  const handleStartActivity = async (activity) => {
    if (!currentChild) return;

    console.log("🚀 Starting activity:", activity);
    console.log("👶 Current child:", currentChild);

    try {
      const token = localStorage.getItem("token");
      const requestData = {
        childId: currentChild.id,
        activityId: activity.id,
      };

      console.log("📤 Sending request:", requestData);

      const startResponse = await axios.post(
        `${API_URL}/activities/start`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Start activity response:", startResponse.data); // Fetch updated reminders with explicit childId
      console.log("🔄 Fetching updated reminders...");
      await fetchUpcomingReminders(currentChild.id);

      toast.success("Activity added to reminders!");
    } catch (err) {
      console.error("❌ Start activity error:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to start activity");
      }
    }
  };

  const handleViewAllAchievements = () => {
    navigate("/log-activity");
  };
  const handleCompleteReminder = async (reminder) => {
    console.log("🎯 handleCompleteReminder CALLED! Reminder:", reminder);
    console.log("🎯 Current time:", new Date().toISOString());
    try {
      const token = localStorage.getItem("token");
      console.log("📤 Sending complete activity request to backend...");
      const response = await axios.put(
        `${API_URL}/activities/complete`,
        {
          childId: reminder.childId,
          activityId: reminder.activityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Activity completion response:", response.data);

      // Fetch updated data
      await fetchUpcomingReminders(reminder.childId);
      await fetchNotifications();
      await fetchChildProgress();

      // Trigger refresh for RecentActivities and WeeklySummary
      setRefreshKey((prev) => prev + 1);
      setWeeklyRefreshKey((prev) => prev + 1);

      // Trigger milestone refresh for Reports page
      console.log("🔄 About to call triggerMilestoneRefresh()...");
      triggerMilestoneRefresh();
      console.log("🏆 Triggered milestone refresh after activity completion");
      console.log("✅ handleCompleteReminder completed successfully!");

      // Don't reset hideCompletedReminders here to maintain user's choice
      // The newly completed activity will be handled by the filtering logic

      toast.success("Activity completed!");
    } catch (err) {
      console.error("Complete activity error:", err);
      toast.error("Failed to complete activity");
    }
  };
  // Handler: Batalkan activity dari upcomingReminders
  const handleCancelReminder = async (reminder) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/activities/cancel`,
        {
          childId: reminder.childId,
          activityId: reminder.activityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Fetch updated reminders
      await fetchUpcomingReminders(reminder.childId);
      toast.success("Activity cancelled!");
    } catch (err) {
      console.error("Cancel activity error:", err);
      toast.error("Failed to cancel activity");
    }
  }; // Handler: Clear all completed reminders (client-side only)
  const handleClearCompletedReminders = () => {
    const completedCount = upcomingReminders.filter((r) => r.completed).length;
    setHideCompletedReminders(true);
    toast.success(
      `${completedCount} completed reminder${
        completedCount > 1 ? "s" : ""
      } cleared from view!`
    );
  };

  // Handler: Show all reminders again
  const handleShowAllReminders = () => {
    setHideCompletedReminders(false);
    toast.success("All reminders are now visible!");
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
      return `${years} years`;
    } else {
      return `${years} years, ${months} month${months > 1 ? "s" : ""}`;
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
  // Helper functions to fetch data
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("🔔 Fetching notifications for user:", userData);

    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      console.log("📬 Notifications API response:", response.data);
      console.log("📦 Notifications data:", response.data.notifications);

      setNotifications(response.data.notifications || []);
    } catch (err) {
      console.error("❌ Error fetching notifications:", err);
      console.error("❌ Error response:", err.response?.data);
    }
  };

  const fetchUpcomingReminders = async (childId = null) => {
    const targetChildId = childId || currentChild?.id;
    console.log("🔍 fetchUpcomingReminders called with:", {
      childId,
      currentChildId: currentChild?.id,
      targetChildId,
    });

    if (!targetChildId) {
      console.log("❌ No target child ID, returning early");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const url = `${API_URL}/activities/reminders/${targetChildId}?_=${Date.now()}`;
      console.log("📞 Calling API:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      console.log("✅ Upcoming reminders API response:", response.data);
      console.log("🎯 Target child ID:", targetChildId);
      console.log("📦 Reminders data:", response.data.reminders);
      console.log("📊 Status:", response.status);

      setUpcomingReminders(response.data.reminders || []);
    } catch (err) {
      console.error("❌ Error fetching reminders:", err);
      console.error("❌ Error response:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);
    }
  };
  const fetchChildProgress = async () => {
    if (!currentChild?.id) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/activities/progress/${currentChild.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update progress data yang diperlukan
      console.log("Progress data:", response.data.progress);
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

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
  // Filter reminders untuk anak & hari ini
  const today = new Date().toISOString().split("T")[0];
  console.log("Today date:", today);
  console.log("Current child ID:", currentChild?.id);
  console.log("All upcoming reminders:", upcomingReminders);
  // Since backend already filters based on child and today's date,
  // we directly use upcomingReminders as childRemindersToday
  // Apply client-side filtering to hide completed reminders if requested
  const childRemindersToday = hideCompletedReminders
    ? upcomingReminders.filter((reminder) => !reminder.completed)
    : upcomingReminders;

  const completedCount = childRemindersToday.filter(
    (rem) => rem.completed
  ).length;
  const progressToday =
    childRemindersToday.length > 0
      ? Math.round((completedCount / childRemindersToday.length) * 100)
      : 0;

  // Filter activities yang belum ada di keranjang hari ini
  const activityIdsInReminders = childRemindersToday.map(
    (rem) => rem.activityId
  );
  const availableActivities = filteredActivities.filter(
    (act) => !activityIdsInReminders.includes(act.id)
  );
  // Hitung progress harian untuk semua anak
  const progressList = children.map((child) => {
    // Jika ini anak yang aktif, gunakan progressToday yang sudah dihitung
    if (child.id === currentChild?.id) {
      return progressToday;
    }

    // Untuk anak lain, hitung progress berdasarkan data yang tersimpan atau default
    // Kita bisa menggunakan data progress yang tersimpan di child object
    // atau melakukan perhitungan sederhana berdasarkan data yang ada
    if (child.progress !== undefined && child.progress !== null) {
      return Number(child.progress) || 0;
    }

    // Fallback: return 0 jika tidak ada data
    return 0;
  }); // Ambil semua milestone activity yang sesuai dengan usia anak
  const milestoneActivities = activities.filter((a) => {
    if (!a.isMilestone || !childAgeInYears) return false;
    return (
      childAgeInYears >= a.age_group_min && childAgeInYears <= a.age_group_max
    );
  });

  // Fetch all reminders for current child (not just today)
  useEffect(() => {
    const fetchAllReminders = async () => {
      if (!currentChild?.id) return;

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API_URL}/log-activities/child/${currentChild.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllChildReminders(response.data.activities || []);
      } catch (err) {
        console.error("Error fetching all reminders:", err);
        setAllChildReminders([]);
      }
    };

    fetchAllReminders();
  }, [currentChild?.id]);
  // Cari milestone yang sudah pernah dikerjakan (in_progress atau completed)
  const workedMilestoneIds = new Set(
    allChildReminders
      .filter(
        (reminder) =>
          milestoneActivities.some(
            (milestone) => milestone.id === reminder.activityId
          ) &&
          (reminder.status === "in_progress" || reminder.status === "completed")
      )
      .map((reminder) => reminder.activityId)
  );

  // Tambahkan milestone yang sudah ada di upcoming reminders hari ini ke daftar yang sudah dikerjakan
  const todayMilestoneIds = new Set(
    childRemindersToday
      .filter((reminder) =>
        milestoneActivities.some(
          (milestone) => milestone.id === reminder.activityId
        )
      )
      .map((reminder) => reminder.activityId)
  );

  // Gabungkan milestone yang sudah dikerjakan dan yang ada di upcoming reminders hari ini
  const unavailableMilestoneIds = new Set([
    ...workedMilestoneIds,
    ...todayMilestoneIds,
  ]);

  // Next milestones: milestone yang belum pernah dikerjakan dan tidak ada di upcoming reminders hari ini
  const nextMilestones = milestoneActivities.filter(
    (milestone) => !unavailableMilestoneIds.has(milestone.id)
  );

  // Recent achievements: milestone yang sudah completed, urut terbaru
  const recentAchievements = allChildReminders
    .filter(
      (reminder) =>
        reminder.status === "completed" &&
        milestoneActivities.some(
          (milestone) => milestone.id === reminder.activityId
        )
    )
    .map((reminder) => {
      const milestone = milestoneActivities.find(
        (m) => m.id === reminder.activityId
      );
      return {
        name: milestone?.name || milestone?.title || "-",
        date: reminder.completed_at || reminder.updated_at,
        milestone: milestone,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  // Effect untuk fetch reminders ketika child berubah
  useEffect(() => {
    console.log("🔄 useEffect triggered - currentChild?.id:", currentChild?.id);
    if (currentChild?.id) {
      console.log("✅ Calling fetchUpcomingReminders and fetchChildProgress");
      fetchUpcomingReminders();
      fetchChildProgress();
      // Reset hiding completed reminders when child changes
      setHideCompletedReminders(false);
    } else {
      console.log("❌ No currentChild.id, skipping fetch");
    }
  }, [currentChild?.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderClient />

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
            ,{user?.name ? ` ${user.name}` : "-"}
            👋
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
          progressList={progressList}
        />

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Main Dashboard */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {" "}
            {/* Current Child Overview */}
            {currentChild && (
              <CurrentChildOverview
                currentChild={{
                  ...currentChild,
                  avatar: currentChild.avatar || currentChild.photoUrl || "🧒",
                  age: currentChild.birthDate
                    ? calculateAge(currentChild.birthDate)
                    : "-",
                  progress: progressToday,
                  nextMilestone:
                    nextMilestones.length > 0 ? nextMilestones[0] : null,
                  recentAchievement:
                    recentAchievements.length > 0
                      ? recentAchievements[0]
                      : null,
                }}
                onStartMilestone={handleStartActivity}
                onViewAllAchievements={handleViewAllAchievements}
              />
            )}
            {/* Quick Actions Grid */}
            <QuickActions />
            {/* Recommended Activities */}
            <div data-component="recommended-activities">
              <RecommendedActivities
                activities={availableActivities}
                currentChild={{
                  ...currentChild,
                  age: calculateAge(currentChild?.birthDate),
                }}
                onStartActivity={handleStartActivity}
              />
            </div>{" "}
            {filteredActivities.length === 0 && childAgeInYears === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4 mt-2 text-center">
                Currently there are no activity suggestions for children under 1
                years old. Please consult with experts or check baby development
                milestones.
              </div>
            )}
            {/* Recent Activities */}
            <RecentAcitivities key={refreshKey} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notifications */}
            <Notifications
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearNotifications}
            />{" "}
            {/* Upcoming Reminders */}
            <UpcomingReminders
              reminders={childRemindersToday}
              onComplete={handleCompleteReminder}
              onCancel={handleCancelReminder}
              onClearCompleted={handleClearCompletedReminders}
              hideCompletedReminders={hideCompletedReminders}
              allReminders={upcomingReminders}
              onShowAll={handleShowAllReminders}
            />
            {/* Expert Support */}
            {/* <ExpertSupport /> */}
            {/* Weekly Summary */}
            <WeeklySummary
              key={weeklyRefreshKey}
              reminders={upcomingReminders}
              notifications={notifications}
            />
          </div>
        </div>

        {/* Bottom Section - Responsive Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Get Started Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-200">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4">⚡</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Get Started
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Jump into activities and start tracking your child's
                developmental milestones today.
              </p>
              <button
                onClick={scrollToRecommendedActivities}
                className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto"
              >
                Start Activities
              </button>
            </div>
          </div>{" "}
          {/* View Reports Card */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-200">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4">📊</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                View Reports
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Monitor your child's progress with detailed reports and
                developmental insights.
              </p>
              <Link
                to="/reports"
                className="inline-block bg-purple-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-purple-600 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto"
              >
                View Reports
              </Link>
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
