import { useState, useEffect } from "react";

export default function AddChildModal({
  onClose,
  onAddChild,
  initialData = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    avatar: "",
    nextMilestone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial data when editing
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name || "",
        birthDate: initialData.birthDate || "",
        gender: initialData.gender || "",
        avatar: initialData.avatar || "",
        nextMilestone: initialData.nextMilestone || "",
      });
    }
  }, [isEditing, initialData]);

  const avatarOptions = [
    {
      emoji: "👶",
      label: "Baby",
    },
    {
      emoji: "👧",
      label: "Girl",
    },
    {
      emoji: "👦",
      label: "Boy",
    },
    {
      emoji: "🧒",
      label: "Child",
    },
    {
      emoji: "👧🏻",
      label: "Girl Light",
    },
    {
      emoji: "👦🏻",
      label: "Boy Light",
    },
    {
      emoji: "👧🏽",
      label: "Girl Medium",
    },
    {
      emoji: "👦🏽",
      label: "Boy Medium",
    },
    {
      emoji: "👧🏿",
      label: "Girl Dark",
    },
    {
      emoji: "👦🏿",
      label: "Boy Dark",
    },
  ];

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years === 0) {
      return months <= 1 ? `${months} month` : `${months} months`;
    } else if (months === 0) {
      return years === 1 ? `${years} year` : `${years} years`;
    } else {
      return `${years} ${years === 1 ? "year" : "years"}, ${months} ${months === 1 ? "month" : "months"
        }`;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your child's name";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Please select your child's birth date";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const maxAge = new Date();
      maxAge.setFullYear(today.getFullYear() - 18); // Max 18 years old

      if (birthDate > today) {
        newErrors.birthDate = "Birth date cannot be in the future";
      } else if (birthDate < maxAge) {
        newErrors.birthDate = "Child must be under 18 years old";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your child's gender";
    }

    if (!formData.avatar) {
      newErrors.avatar = "Please choose an avatar for your child";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddChild({
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender, // 'male' atau 'female'
        avatar: formData.avatar,
      });
      // ✅ No alert here
      // ✅ No onClose here
      // HomePage will handle toast, update state & close modal
    } catch (error) {
      console.error("Error adding child:", error);
      // Toast error juga sebaiknya di HomePage biar konsisten
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAvatarSelect = (avatar) => {
    setFormData((prev) => ({
      ...prev,
      avatar,
    }));
    if (errors.avatar) {
      setErrors((prev) => ({
        ...prev,
        avatar: "",
      }));
    }
  };

  // Avatar filtering by gender
  const getFilteredAvatars = () => {
    if (!formData.gender) return avatarOptions;
    if (formData.gender === "male") {
      return avatarOptions.filter(
        (a) =>
          a.label.includes("Boy") || a.label === "Child" || a.label === "Baby"
      );
    }
    if (formData.gender === "female") {
      return avatarOptions.filter(
        (a) =>
          a.label.includes("Girl") || a.label === "Child" || a.label === "Baby"
      );
    }
    return avatarOptions;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isEditing ? "Edit Child" : "Add New Child"}
                </h2>
                <p className="text-emerald-100 text-sm">
                  {isEditing
                    ? "Update your child's information"
                    : "Let's start tracking your child's development journey"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              <svg
                className="w-6 h-6"
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-colors ${step === 1
                        ? "bg-emerald-500"
                        : step === 2 && formData.name
                          ? "bg-emerald-500"
                          : step === 3 && formData.birthDate
                            ? "bg-emerald-500"
                            : step === 4 && formData.avatar
                              ? "bg-emerald-500"
                              : "bg-gray-200"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">👶</span>
                What's your child's name? *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-emerald-500"
                  }`}
                placeholder="Enter your child's beautiful name"
                autoComplete="off"
                disabled={isSubmitting}
              />
              {errors.name && (
                <div className="flex items-center space-x-2 text-red-600">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{errors.name}</span>
                </div>
              )}
            </div>

            {/* Birth Date Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">🎂</span>
                When was your child born? *
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${errors.birthDate
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-emerald-500"
                  }`}
                disabled={isSubmitting}
              />
              {errors.birthDate && (
                <div className="flex items-center space-x-2 text-red-600">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{errors.birthDate}</span>
                </div>
              )}
              {formData.birthDate && !errors.birthDate && (
                <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg">
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
                  <span className="text-sm font-medium">
                    Your child is {calculateAge(formData.birthDate)} old
                  </span>
                </div>
              )}
            </div>

            {/* Gender Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">⚤</span>
                What's your child's gender? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["male", "female"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        gender,
                      }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all font-medium ${formData.gender === gender
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    disabled={isSubmitting}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl">
                        {gender === "male" ? "👦" : "👧"}
                      </span>
                      <span className="capitalize">{gender}</span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.gender && (
                <div className="flex items-center space-x-2 text-red-600">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{errors.gender}</span>
                </div>
              )}
            </div>

            {/* Avatar Selection */}
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">🎭</span>
                Choose your child's avatar *
              </label>
              <div className="grid grid-cols-5 gap-3">
                {getFilteredAvatars().map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAvatarSelect(option.emoji)}
                    className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${formData.avatar === option.emoji
                        ? "border-emerald-400 bg-emerald-50 scale-105"
                        : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    disabled={isSubmitting}
                    title={option.label}
                  >
                    <div className="text-3xl">{option.emoji}</div>
                    {formData.avatar === option.emoji && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
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
                    )}
                  </button>
                ))}
              </div>
              {errors.avatar && (
                <div className="flex items-center space-x-2 text-red-600">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{errors.avatar}</span>
                </div>
              )}
            </div>

            {/* Next Milestone (Optional) */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">🎯</span>
                What are you hoping to work on? (Optional)
              </label>
              <input
                type="text"
                name="nextMilestone"
                value={formData.nextMilestone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="e.g., Learning to walk, First words, Potty training"
                autoComplete="off"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                This helps us recommend the best activities for your child
              </p>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium cursor-pointer"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>
                    {isEditing ? "Updating Child..." : "Adding Child..."}
                  </span>
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
                  <span>{isEditing ? "Update Child" : "Add Child"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
