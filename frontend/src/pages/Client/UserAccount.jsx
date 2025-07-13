/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LogoutModal from "@/components/client/homePage/LogoutModal";
import AddChildModal from "@/components/client/homePage/AddChildModal";
import DeleteChildModal from "@/components/client/modals/DeleteChildModal";
import DeleteAccountModal from "@/components/client/modals/DeleteAccountModal";
import {
  Header,
  ProfileHeader,
  TabNavigation,
  ProfileTab,
  ChildrenTab,
  SecurityTab
} from "@/components/client/userAccountPage";

export default function UserAccount() {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header setShowLogoutModal={setShowLogoutModal} />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Profile Header */}
        <ProfileHeader
          user={user}
          profileData={profileData}
          children={children}
          onAvatarChange={handleAvatarChange}
        />

        {/* Navigation Tabs */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content */}
        {activeTab === "profile" && (
          <ProfileTab
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isLoading={isLoading}
            onProfileUpdate={handleProfileUpdate}
          />
        )}

        {activeTab === "children" && (
          <ChildrenTab
            children={children}
            setShowAddChildModal={setShowAddChildModal}
            onEditChild={handleEditChild}
            onDeleteChild={handleDeleteChild}
            calculateAge={calculateAge}
          />
        )}        {activeTab === "security" && (
          <SecurityTab
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            isChangingPassword={isChangingPassword}
            onChangePassword={handleChangePassword}
            setShowDeleteAccountModal={setShowDeleteAccountModal}
          />
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
      )}

      {/* Delete Child Modal */}
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
