/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LogoutModal from "@/components/client/homePage/LogoutModal";
import AddChildModal from "@/components/client/homePage/AddChildModal";
import DeleteChildModal from "@/components/client/modals/DeleteChildModal";
import DeleteAccountModal from "@/components/client/modals/DeleteAccountModal";

export default function UserAccount() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_childrenLoading, setChildrenLoading] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [showEditChildModal, setShowEditChildModal] = useState(false);
  const [showDeleteChildModal, setShowDeleteChildModal] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [deletingChild, setDeletingChild] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "",
    location: "",
    joinDate: "January 2024",
    avatar: null,
  });

  const [children, setChildren] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    document.title = "My Account - OrtuPintar";
    fetchUserProfile();
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      setChildrenLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/children", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Children data:", data);

        // Transform data untuk include avatar dan lastAssessment
        const transformedChildren = data.children.map((child) => ({
          ...child,
          avatar: child.gender === "Female" ? "👧" : "�",
          lastAssessment: new Date().toISOString().split("T")[0], // Today's date
        }));

        setChildren(transformedChildren);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch children");
      }
    } catch (error) {
      console.error("Error fetching children:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setChildrenLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setProfileData((prev) => ({
          ...prev,
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          location: data.user.location || "",
          joinDate: data.user.joinDate || "",
          avatar: data.user.avatar || null,
        }));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent double submission

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      // Validasi client-side
      if (!profileData.name.trim() || !profileData.email.trim()) {
        toast.error("Name and email are required");
        return;
      }

      const updateData = {
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        phone: profileData.phone.trim(),
        location: profileData.location.trim(),
      };

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {        // Update localStorage with latest data
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        toast.success(data.message || "Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddChild = async (childData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      // Transform data format from AddChildModal to backend API format
      const transformedData = {
        name: childData.name,
        birthDate: childData.birthDate,
        gender: childData.gender === "male" ? "L" : "P", // Convert to database enum format
        photoUrl: childData.avatar || null, // Use avatar as photoUrl
      };

      console.log("🔍 Frontend sending data:", transformedData);

      const response = await fetch("http://localhost:5000/api/children", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Child added successfully!");
        setShowAddChildModal(false);
        fetchChildren(); // Refresh children list
      } else {
        toast.error(data.message || "Failed to add child");
      }
    } catch (error) {
      console.error("Error adding child:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const handleEditChild = (child) => {
    setEditingChild(child);
    setShowEditChildModal(true);
  };

  const handleUpdateChild = async (childData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      // Transform data format from AddChildModal to backend API format
      const transformedData = {
        name: childData.name,
        birthDate: childData.birthDate,
        gender: childData.gender === "male" ? "L" : "P",
        photoUrl: childData.avatar || null,
      };

      const response = await fetch(
        `http://localhost:5000/api/children/${editingChild.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Child updated successfully!");
        setShowEditChildModal(false);
        setEditingChild(null);
        fetchChildren(); // Refresh children list
      } else {
        toast.error(data.message || "Failed to update child");
      }
    } catch (error) {
      console.error("Error updating child:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const handleDeleteChild = async (childId, childName) => {
    setDeletingChild({ id: childId, name: childName });
    setShowDeleteChildModal(true);
  };

  const confirmDeleteChild = async () => {
    if (!deletingChild) return;

    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/children/${deletingChild.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Child removed successfully");
        setShowDeleteChildModal(false);
        setDeletingChild(null);
        fetchChildren(); // Refresh children list
      } else {
        toast.error(data.message || "Failed to remove child");
      }
    } catch (error) {
      console.error("Error deleting child:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteChildModal(false);
    setDeletingChild(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/delete-account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Clear all local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success(data.message || "Account deleted successfully");
        setShowDeleteAccountModal(false);

        // Redirect to landing page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (isChangingPassword) return; // Prevent double submission

    try {
      setIsChangingPassword(true);

      // Validasi client-side
      if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {
        toast.error("All password fields are required");
        return;
      }

      if (passwordData.newPassword.length < 8) {
        toast.error("New password must be at least 8 characters long");
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("New password and confirmation password do not match");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/users/change-password",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    return months < 0
      ? `${years - 1} years, ${12 + months} months`
      : `${years} years, ${months} months`;
  };

  return (
    <div className="min-h-screen bg-gray-50">      {/* Header */}
      <div className="bg-white shadow-sm border-b  border-gray-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1 md:py-4">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base">O</span>
                </div>
                <span className="text-lg md:text-xl font-bold text-gray-900 hidden sm:block">
                  OrtuPintar
                </span>
              </Link>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-1 md:space-x-4">              {/* Back to Home - Home icon only on mobile, full text with arrow on desktop */}
              <Link
                to="/home"
                className="text-gray-600 hover:text-gray-900 p-2 md:px-3 md:py-2 rounded-lg flex items-center space-x-1"
                title="Back to Home"
              >
                {/* Home icon only on mobile */}
                <span className="p-2.5 border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-100 transition-all">
                  <svg className="w-5 h-5 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>

                {/* Arrow + Text on desktop */}
                <svg className="w-4 h-4 md:w-5 md:h-5 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden lg:block">Back to Home</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-red-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base flex items-center gap-2"
              >
                <span className="">Logout</span>
                <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative mx-auto sm:mx-0">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl md:text-3xl font-bold">
                      {user?.name ? user.name.charAt(0) : "-"}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-50"
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div className="text-center sm:text-left md:ml-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {user?.name}
                </h1>
                <p className="text-gray-600 text-sm md:text-base">{user?.email}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Member since{" "}
                  {profileData.joinDate
                    ? new Date(profileData.joinDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="flex items-center space-x-6 md:space-x-4 bg-gray-50 md:bg-transparent rounded-lg p-3 md:p-0">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-emerald-600">
                    {children.length}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">Children</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">
                    {children.reduce((sum, child) => sum + child.milestones, 0)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">Milestones</div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6 md:mb-8">
          {/* Mobile Tab Navigation */}
          <div className="block sm:hidden">
            <nav className="flex overflow-x-auto scrollbar-hide">
              {[
                {
                  id: "profile",
                  name: "Profile",
                  icon: "👤",
                },
                {
                  id: "children",
                  name: "Children",
                  icon: "👶",
                },
                {
                  id: "security",
                  name: "Security",
                  icon: "🔒",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden sm:block">
            <nav className="flex space-x-8">
              {[
                {
                  id: "profile",
                  name: "Profile",
                  icon: "👤",
                },
                {
                  id: "children",
                  name: "Children",
                  icon: "👶",
                },
                {
                  id: "security",
                  name: "Security",
                  icon: "🔒",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Profile Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors w-full sm:w-auto text-sm md:text-base"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                    placeholder="Enter your location"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
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
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        )}        {activeTab === "children" && (
          <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Children</h2>
              <button
                onClick={() => setShowAddChildModal(true)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm md:text-base w-full sm:w-auto"
              >
                Add Child
              </button>
            </div>            {children.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="text-4xl md:text-6xl mb-4">👶</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  No Children Added Yet
                </h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base px-4">
                  Start tracking your child's development by adding them to your
                  account.
                </p>
                <button
                  onClick={() => setShowAddChildModal(true)}
                  className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors w-full sm:w-auto"
                >
                  Add Your First Child
                </button>
              </div>
            ) : (<div className="grid gap-4 md:gap-6">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
                >
                  {/* Mobile Layout */}
                  <div className="block md:hidden">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="text-3xl flex-shrink-0">
                        {child.photoUrl ||
                          (child.gender === "P" ? "👧" : "👦")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {child.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {calculateAge(child.birthDate)} old
                        </p>
                        <p className="text-xs text-gray-500">
                          Born: {new Date(child.birthDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-emerald-600">
                          {child.milestones}
                        </div>
                        <div className="text-xs text-gray-500">Milestones</div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-emerald-600 font-medium">
                          Last Assessment
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(child.lastAssessment).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditChild(child)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit Child"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteChild(child.id, child.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Remove Child"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">
                          {child.photoUrl ||
                            (child.gender === "P" ? "👧" : "👦")}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {child.name}
                          </h3>
                          <p className="text-gray-600">
                            {calculateAge(child.birthDate)} old
                          </p>
                          <p className="text-sm text-gray-500">
                            Born:{" "}
                            {new Date(child.birthDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-emerald-600 font-medium">
                            Last Assessment:{" "}
                            {new Date(
                              child.lastAssessment
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">
                            {child.milestones}
                          </div>
                          <div className="text-sm text-gray-500">
                            Milestones
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditChild(child)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit Child"
                          >
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteChild(child.id, child.name)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Remove Child"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}        {activeTab === "security" && (
          <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Security Settings
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Change Password
                </h3>
                <form
                  className="space-y-4 max-w-md"
                  onSubmit={handleChangePassword}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter your current password"
                      disabled={isChangingPassword}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter new password (min. 8 characters)"
                      disabled={isChangingPassword}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Confirm your new password"
                      disabled={isChangingPassword}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isChangingPassword ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
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
                        <span>Changing Password...</span>
                      </>
                    ) : (
                      <span>Update Password</span>
                    )}
                  </button>
                </form>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-red-600 mb-4">
                  Danger Zone
                </h3>
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-900 mb-2">
                      Delete Account
                    </h4>
                    <p className="text-sm text-red-700 mb-4">
                      This action cannot be undone. All your data will be
                      permanently deleted.
                    </p>                    <button
                      onClick={() => setShowDeleteAccountModal(true)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />

      {/* Add Child Modal */}
      {showAddChildModal && (
        <AddChildModal
          onClose={() => setShowAddChildModal(false)}
          onAddChild={handleAddChild}
        />
      )}

      {/* Edit Child Modal */}
      {showEditChildModal && editingChild && (
        <AddChildModal
          onClose={() => {
            setShowEditChildModal(false);
            setEditingChild(null);
          }}
          onAddChild={handleUpdateChild}
          initialData={{
            name: editingChild.name,
            birthDate: editingChild.birthDate,
            gender: editingChild.gender === "L" ? "male" : "female", // Convert from database enum to modal format
            avatar:
              editingChild.photoUrl ||
              (editingChild.gender === "P" ? "👧" : "👦"),
          }}
          isEditing={true}
        />
      )}      {/* Delete Child Modal */}
      {showDeleteChildModal && deletingChild && (
        <DeleteChildModal
          isOpen={showDeleteChildModal}
          onClose={handleCloseDeleteModal}
          onConfirm={confirmDeleteChild}
          childName={deletingChild.name}
          isLoading={isDeleting}
        />
      )}

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <DeleteAccountModal
          isOpen={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)}
          onConfirm={handleDeleteAccount}
          userName={user?.name || ""}
          isLoading={isDeletingAccount}
        />
      )}
    </div>
  );
}
