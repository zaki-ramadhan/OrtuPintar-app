import { useState, useEffect } from "react";
import AdminModal from "./AdminModal";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ActivityModal({
  isOpen,
  onClose,
  activity = null,
  mode = "view", // "view", "edit", "add"
  onSave,
  onDelete,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "easy",
    duration: "15-30 minutes",
    age_group: "0-6 months",
    age_group_min: 0,
    age_group_max: 6,
    icon: "🎯",
    isMilestone: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Fetch categories and difficulties from backend
  const fetchOptions = async () => {
    setLoadingOptions(true);
    try {
      const token = getAuthToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [categoriesRes, difficultiesRes] = await Promise.all([
        axios.get(`${API_URL}/admin/activities/categories`, {
          headers,
        }),
        axios.get(`${API_URL}/admin/activities/difficulties`, {
          headers,
        }),
      ]);

      if (categoriesRes.data.success) {
        setCategories(categoriesRes.data.data);
      }
      if (difficultiesRes.data.success) {
        setDifficulties(difficultiesRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      toast.error("Failed to load form options");
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  useEffect(() => {
    if (activity && isOpen) {
      setFormData({
        title: activity.title || "",
        description: activity.description || "",
        category: activity.category || "",
        difficulty: activity.difficulty || "easy",
        duration: activity.duration || "15-30 minutes",
        age_group: activity.age_group || "1-2 tahun",
        age_group_min: activity.age_group_min || 12,
        age_group_max: activity.age_group_max || 24,
        icon: activity.icon || "🎯",
        isMilestone: Boolean(activity.isMilestone),
      });
    } else if (mode === "add" && isOpen) {
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "easy",
        duration: "15-30 minutes",
        age_group: "0-6 months",
        age_group_min: 0,
        age_group_max: 6,
        icon: "🎯",
        isMilestone: false,
      });
    }
    setErrors({});
  }, [activity, isOpen, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.age_group_min >= formData.age_group_max) {
      newErrors.age_group_min = "Minimum age must be less than maximum age";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(formData);
      toast.success(
        `Activity ${mode === "add" ? "created" : "updated"} successfully`
      );
      onClose();
    } catch (error) {
      console.error("Error saving activity:", error);
      toast.error("Failed to save activity");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(activity.id);
      toast.success("Activity deleted successfully");
      onClose();
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case "add":
        return "Create New Activity";
      case "edit":
        return "Edit Activity";
      default:
        return "Activity Details";
    }
  };

  const isReadOnly = mode === "view";

  const ageRanges = [
    { value: "0-6 months", min: 0, max: 6, label: "0-6 months" },
    { value: "6-12 months", min: 6, max: 12, label: "6-12 months" },
    { value: "1-2 years", min: 12, max: 24, label: "1-2 years" },
    { value: "2-3 years", min: 24, max: 36, label: "2-3 years" },
    { value: "3-4 years", min: 36, max: 48, label: "3-4 years" },
    { value: "4-5 years", min: 48, max: 60, label: "4-5 years" },
    { value: "5-6 years", min: 60, max: 72, label: "5-6 years" },
  ];

  const durations = [
    "5-10 minutes",
    "10-15 minutes",
    "15-30 minutes",
    "30-45 minutes",
    "45-60 minutes",
    "1+ hours",
  ];

  const icons = [
    "🎯",
    "🎨",
    "🧩",
    "📚",
    "🎵",
    "⚽",
    "🔬",
    "🎭",
    "🎪",
    "🎈",
    "🧸",
    "🚂",
    "🏗️",
    "🎲",
    "🎮",
    "🌟",
  ];

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size="xl"
    >
      <div className="space-y-6">
        {/* Activity Header */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-xl">
            {formData.icon}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">
              {formData.title || "New Activity"}
            </h4>
            <p className="text-gray-600">
              {formData.category && categories.length > 0
                ? formData.category
                : "Select category"}{" "}
              • {formData.difficulty}
            </p>
            {mode === "view" && (
              <div className="flex items-center space-x-4 mt-2">
                {formData.isMilestone && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                    ⭐ Milestone
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  Duration: {formData.duration}
                </span>
              </div>
            )}
          </div>
        </div>

        {loadingOptions ? (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Title and Icon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  readOnly={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                  placeholder="Enter activity title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => handleInputChange("icon", e.target.value)}
                  disabled={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  } border-gray-300`}
                >
                  {icons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                readOnly={isReadOnly}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } ${
                  isReadOnly
                    ? "bg-gray-50 cursor-not-allowed"
                    : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                }`}
                placeholder="Describe the activity and its benefits"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category and Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  disabled={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    handleInputChange("difficulty", e.target.value)
                  }
                  disabled={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  } border-gray-300`}
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration and Age Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  disabled={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  } border-gray-300`}
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group
                </label>
                <select
                  value={formData.age_group}
                  onChange={(e) => {
                    const selectedRange = ageRanges.find(
                      (range) => range.value === e.target.value
                    );
                    if (selectedRange) {
                      handleInputChange("age_group", e.target.value);
                      handleInputChange("age_group_min", selectedRange.min);
                      handleInputChange("age_group_max", selectedRange.max);
                    }
                  }}
                  disabled={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  } border-gray-300`}
                >
                  {ageRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Age Range Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Age (months)
                </label>
                <input
                  type="number"
                  value={formData.age_group_min}
                  onChange={(e) =>
                    handleInputChange(
                      "age_group_min",
                      parseInt(e.target.value) || 0
                    )
                  }
                  readOnly={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    errors.age_group_min ? "border-red-500" : "border-gray-300"
                  } ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                  min="0"
                  max="72"
                />
                {errors.age_group_min && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age_group_min}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Age (months)
                </label>
                <input
                  type="number"
                  value={formData.age_group_max}
                  onChange={(e) =>
                    handleInputChange(
                      "age_group_max",
                      parseInt(e.target.value) || 0
                    )
                  }
                  readOnly={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isReadOnly
                      ? "bg-gray-50 cursor-not-allowed"
                      : "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  } border-gray-300`}
                  min="0"
                  max="72"
                />
              </div>
            </div>

            {/* Milestone Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isMilestone"
                checked={formData.isMilestone}
                onChange={(e) =>
                  handleInputChange("isMilestone", e.target.checked)
                }
                disabled={isReadOnly}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label
                htmlFor="isMilestone"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Mark as Milestone Activity
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {mode === "view" ? "Close" : "Cancel"}
          </button>

          {mode === "edit" && onDelete && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </>
              )}
            </button>
          )}

          {(mode === "edit" || mode === "add") && (
            <button
              onClick={handleSave}
              disabled={loading || loadingOptions}
              className="flex-1 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {mode === "add" ? "Create Activity" : "Save Changes"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </AdminModal>
  );
}
