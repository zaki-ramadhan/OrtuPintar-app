import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ActivityModal from "../../modals/ActivityModal";
import ConfirmationModal from "../../modals/ConfirmationModal";

const API_URL = import.meta.env.VITE_API_URL;

function ContentManagementHeader({ openContentModal, stats, onRefresh }) {
  const [isExporting, setIsExporting] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("No admin token found");
      }

      console.log("📤 Starting activities CSV export...");

      const response = await axios.get(`${API_URL}/admin/activities/export`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "activities.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log("✅ Activities CSV export completed");
    } catch (error) {
      console.error("Export CSV error:", error);
      alert("Failed to export activities to CSV");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("No admin token found");
      }

      console.log("📄 Starting activities PDF export...");

      const response = await axios.get(
        `${API_URL}/admin/activities/export-pdf`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000, // 30 second timeout for PDF generation
        }
      );

      console.log("✅ PDF response received, size:", response.data.size);

      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `activities-report-${new Date().toISOString().split("T")[0]}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log("📄 Activities PDF export completed successfully");
    } catch (error) {
      console.error("Export PDF error:", error);
      alert("Failed to export activities to PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const handleMigrateAgeGroup = async () => {
    setIsMigrating(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${API_URL}/admin/activities/migrate-age-group`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert(
          `Migration completed! Updated ${response.data.data.totalUpdated} activities.`
        );
        onRefresh(); // Refresh the activities list
      }
    } catch (error) {
      console.error("Migration error:", error);
      alert("Migration failed. Please try again.");
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Activities Management
        </h2>
        <p className="text-gray-600">
          Manage educational activities and developmental content
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onRefresh}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
        <button
          onClick={handleMigrateAgeGroup}
          disabled={isMigrating}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          {isMigrating ? "Migrating..." : "Fix Age Format"}
        </button>
        <div className="relative">
          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            {isExporting ? "Exporting..." : "Export CSV"}
          </button>
        </div>
        <div className="relative">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            {isExporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
        <button
          onClick={() => openContentModal("add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
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
          Create Activity
        </button>
      </div>
    </div>
  );
}

function ContentStats({ stats, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex-shrink-0 ml-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
              Total Activities
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {stats?.total || 0}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <span className="text-xs sm:text-sm text-green-600 font-medium">
            All activities
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
              Published
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
              {stats?.published || 0}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
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
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <span className="text-xs sm:text-sm text-green-600 font-medium">
            {stats?.total
              ? Math.round((stats.published / stats.total) * 100)
              : 0}
            % published
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
              Draft
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">
              {stats?.draft || 0}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <span className="text-xs sm:text-sm text-yellow-600 font-medium">
            In progress
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
              Milestones
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">
              {stats?.milestones || 0}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <span className="text-xs sm:text-sm text-purple-600 font-medium">
            Special activities
          </span>
        </div>
      </div>
    </div>
  );
}

function ContentFilters({
  filters,
  onFilterChange,
  onSearch,
  categories = [],
}) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Activities
          </label>
          <input
            type="text"
            placeholder="Search by title, description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={filters.search || ""}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Activities</option>
            <option value="milestone">Milestones Only</option>
            <option value="regular">Regular Activities</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={filters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={filters.sortBy || "id"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <option value="id">Newest First</option>
            <option value="title">Title A-Z</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ContentList({
  activities,
  loading,
  openContentModal,
  openConfirmModal,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex gap-2 ml-4">
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
        </div>
        <div className="p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No activities found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new activity.
          </p>
          <div className="mt-6">
            <button
              onClick={() => openContentModal("add")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              Create Activity
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Activities ({activities.length})
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900 truncate">
                    {activity.icon} {activity.title}
                  </h4>
                  {activity.isMilestone === 1 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Milestone
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {activity.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                      activity.difficulty
                    )}`}
                  >
                    {activity.difficulty}
                  </span>
                  <span className="capitalize">{activity.category}</span>
                  <span>•</span>
                  <span>{activity.duration}</span>
                  <span>•</span>
                  <span>{activity.age_group}</span>
                  {activity.usage_count !== undefined && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">
                        Used by {activity.usage_count} children
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => openContentModal("view", activity)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center px-3 py-1 rounded border border-blue-200 hover:bg-blue-50"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View
                </button>
                <button
                  onClick={() => openContentModal("edit", activity)}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center px-3 py-1 rounded border border-green-200 hover:bg-green-50"
                >
                  <svg
                    className="w-4 h-4 mr-1"
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
                  Edit
                </button>
                <button
                  onClick={() => openConfirmModal("delete", activity)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center px-3 py-1 rounded border border-red-200 hover:bg-red-50"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-xl">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function ContentManagementTab({
  openContentModal,
  openConfirmModal,
}) {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sortBy: "id",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Modal states
  const [activityModal, setActivityModal] = useState({
    isOpen: false,
    mode: "view",
    activity: null,
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: "",
    activity: null,
  });

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${API_URL}/admin/activities/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCategories(response.data.data);
        console.log("📋 Categories loaded:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch activities from API
  const fetchActivities = useCallback(
    async (currentPagination = pagination, currentFilters = filters) => {
      setLoading(true);
      try {
        const token = getAuthToken();
        const params = new URLSearchParams({
          page: currentPagination.page,
          limit: currentPagination.limit,
          search: currentFilters.search,
          category: currentFilters.category,
          status: currentFilters.status,
          sortBy: currentFilters.sortBy,
        });

        console.log("🔍 Fetching activities with params:", {
          page: currentPagination.page,
          limit: currentPagination.limit,
          search: currentFilters.search,
          category: currentFilters.category,
          status: currentFilters.status,
          sortBy: currentFilters.sortBy,
        });

        const response = await axios.get(
          `${API_URL}/admin/activities?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log(
            "✅ Activities fetched:",
            response.data.data.length,
            "items"
          );
          setActivities(response.data.data);
          setPagination((prev) => ({
            ...prev,
            total: response.data.total,
            totalPages: response.data.totalPages,
          }));
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }
      } finally {
        setLoading(false);
      }
    },
    []
  ); // Remove dependencies to prevent stale closures

  // Fetch activity statistics
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/admin/activities/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle refresh
  const handleRefresh = () => {
    console.log("🔄 Manual refresh triggered");
    fetchActivities(pagination, filters);
    fetchStats();
  };

  // Modal handlers
  const openActivityModal = (mode, activity = null) => {
    setActivityModal({
      isOpen: true,
      mode,
      activity,
    });
  };

  const closeActivityModal = () => {
    setActivityModal({
      isOpen: false,
      mode: "view",
      activity: null,
    });
  };

  const openActivityConfirmModal = (type, activity) => {
    setConfirmModal({
      isOpen: true,
      type,
      activity,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      type: "",
      activity: null,
    });
  };

  // Handle activity save (create/update)
  const handleActivitySave = async (formData) => {
    try {
      const token = getAuthToken();
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      console.log("💾 Saving activity:", activityModal.mode, formData);

      if (activityModal.mode === "add") {
        // Create new activity
        const response = await axios.post(
          `${API_URL}/admin/activities`,
          formData,
          { headers }
        );
        console.log("✅ Activity created:", response.data);
      } else if (activityModal.mode === "edit") {
        // Update existing activity
        const response = await axios.put(
          `${API_URL}/admin/activities/${activityModal.activity.id}`,
          formData,
          { headers }
        );
        console.log("✅ Activity updated:", response.data);
      }

      // Close modal first
      closeActivityModal();

      // Then refresh data with current state - use functional updates
      console.log("🔄 Refreshing data after save...");
      await Promise.all([
        fetchActivities(), // This will use current pagination/filters from state
        fetchStats(),
      ]);

      console.log("✅ Data refreshed successfully");
    } catch (error) {
      console.error("Error saving activity:", error);
      throw error;
    }
  };

  // Handle activity delete
  const handleActivityDelete = async (activityId) => {
    try {
      const token = getAuthToken();
      console.log("🗑️ Deleting activity:", activityId);

      await axios.delete(`${API_URL}/admin/activities/${activityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Activity deleted, refreshing data...");

      // Refresh data with current state
      await Promise.all([fetchActivities(), fetchStats()]);

      console.log("✅ Data refreshed after delete");
    } catch (error) {
      console.error("Error deleting activity:", error);
      throw error;
    }
  };

  // Handle confirm modal actions
  const handleConfirmAction = async () => {
    if (confirmModal.type === "delete") {
      await handleActivityDelete(confirmModal.activity.id);
      closeConfirmModal();
    }
  };

  // Load data on component mount and filter changes
  useEffect(() => {
    console.log("🔄 UseEffect triggered - fetching activities");
    console.log("Current pagination:", pagination);
    console.log("Current filters:", filters);
    fetchActivities(pagination, filters);
  }, [
    pagination.page,
    filters.search,
    filters.category,
    filters.status,
    filters.sortBy,
    fetchActivities,
  ]);

  // Separate useEffect for initial data
  useEffect(() => {
    console.log("🔄 Component mounted - fetching initial data");
    fetchStats();
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Content Management Header */}
      <ContentManagementHeader
        openContentModal={openActivityModal}
        stats={stats}
        onRefresh={handleRefresh}
      />

      {/* Content Stats */}
      <ContentStats stats={stats} loading={statsLoading} />

      {/* Content Filters */}
      <ContentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        categories={categories}
      />

      {/* Content List */}
      <ContentList
        activities={activities}
        loading={loading}
        openContentModal={openActivityModal}
        openConfirmModal={openActivityConfirmModal}
      />

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Activity Modal */}
      <ActivityModal
        isOpen={activityModal.isOpen}
        onClose={closeActivityModal}
        activity={activityModal.activity}
        mode={activityModal.mode}
        onSave={handleActivitySave}
        onDelete={handleActivityDelete}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmAction}
        title="Delete Activity"
        message={`Are you sure you want to delete "${confirmModal.activity?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
