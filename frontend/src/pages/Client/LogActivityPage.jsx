import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import HeaderClient from "@/components/client/HeaderClient";
import {
  ActivityList,
  ChildSelector,
  EmptyState,
  FilterAndSearch,
  LoadingState,
  PageHeader,
  StatisticsOverview,
} from "@/components/client/logActivityPage";

const API_URL = import.meta.env.VITE_API_URL;

export default function LogActivityPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [activeChild, setActiveChild] = useState(0);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch initial data
  const fetchInitialData = async () => {
    const token = localStorage.getItem("token");
    try {
      // Fetch children
      const childrenResponse = await axios.get(`${API_URL}/children`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChildren(childrenResponse.data.children || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching initial data:", err);
      toast.error("Failed to load data");
      setLoading(false);
    }
  };

  // Function to fetch log activities for current child
  const fetchLogActivities = useCallback(async () => {
    if (!children[activeChild]) return;

    const currentChild = children[activeChild];
    const token = localStorage.getItem("token");

    setLoading(true);

    try {
      // Fetch all log activities for current child
      const activitiesResponse = await axios.get(
        `${API_URL}/log-activities/child/${currentChild.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const allActivities = activitiesResponse.data.activities || [];
      setActivities(allActivities);

      // Fetch statistics for current child
      const statsResponse = await axios.get(
        `${API_URL}/log-activities/stats/${currentChild.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStats(statsResponse.data.stats || {});
    } catch (err) {
      console.error("Error fetching log activities:", err);
      toast.error("Failed to load log activities");
    } finally {
      setLoading(false);
    }
  }, [children, activeChild]);

  // Function to reset and fetch data when child changes
  const resetAndFetch = useCallback(() => {
    setActivities([]);
    fetchLogActivities();
  }, [fetchLogActivities]);

  // Fetch data on component mount
  useEffect(() => {
    document.title = "Log Activity - OrtuPintar";

    // Check authentication
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    }

    fetchInitialData();
  }, [navigate]);

  // Fetch data when active child changes
  useEffect(() => {
    if (children.length > 0 && children[activeChild]) {
      resetAndFetch();
    }
  }, [activeChild, children, resetAndFetch]);

  const calculateAge = (birthDateString) => {
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
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Not available";
    const date = new Date(dateTimeString);
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }; // Filter activities based on search term, status, and category (exclude pending activities)
  const filteredActivities = activities.filter((activity) => {
    // Exclude pending activities
    if (activity.status === "pending") return false;

    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || activity.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || activity.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get unique categories for filter
  const uniqueCategories = [
    ...new Set(activities.map((activity) => activity.category)),
  ];

  const currentChild = children[activeChild] || null;

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderClient />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <PageHeader />

        <ChildSelector
          children={children}
          activeChild={activeChild}
          setActiveChild={setActiveChild}
          calculateAge={calculateAge}
        />

        {currentChild ? (
          <>
            <StatisticsOverview stats={stats} />

            <FilterAndSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              uniqueCategories={uniqueCategories}
            />

            <ActivityList
              filteredActivities={filteredActivities}
              activities={activities}
              currentChild={currentChild}
              formatDateTime={formatDateTime}
            />
          </>
        ) : children.length === 0 ? (
          <EmptyState />
        ) : null}
      </div>
    </div>
  );
}
