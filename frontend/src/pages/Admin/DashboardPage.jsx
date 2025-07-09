import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
	dashboardData,
	getStatusColor,
	getActivityIcon,
	analyticsData,
} from "@/utils/admin";

import {
	ConfirmationModal,
	UserManagementModal,
	ContentManagementModal,
} from "@/components/admin/modals";

import { DashboardHeader, LoadingCircle } from "@/components/admin/dashboard";

import {
	NavigationTabs,
	OverviewTab,
	UserManagementTab,
	SettingsTab,
	ContentManagementTab,
	ReportsTab,
} from "@/components/admin/dashboard/tabs";

import useModalHandlers from "@/utils/admin/modalHandlers";

export default function DashboardPage() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [logoutModal, setLogoutModal] = useState(false);
	const [activeTab, setActiveTab] =
		useState("overview");

	const {
		confirmModal,
		userModal,
		contentModal,
		openUserModal,
		closeUserModal,
		openConfirmModal,
		closeConfirmModal,
		openContentModal,
		closeContentModal,
	} = useModalHandlers();

	const navigate = useNavigate();

	useEffect(() => {
		// Check if admin is logged in
		const adminData =
			localStorage.getItem(
				"admin"
			);
		// if (!adminData) {
		// 	navigate(
		// 		"/back/login"
		// 	);
		// 	return;
		// }

		setUser(
			JSON.parse(
				adminData
			)
		);
		setLoading(false);
	}, [navigate]);

	const confirmLogout = () => {
		localStorage.removeItem(
			"admin"
		);
		localStorage.removeItem(
			"adminToken"
		);
		toast.success(
			"Logged out successfully"
		);
		navigate("/back/login");
		setLogoutModal(false);
	};

	// CRUD operations
	const handleUserSave = async (userData) => {
		console.log(
			"Saving user:",
			userData
		);
		// Implement API call here
		toast.success(
			"User saved successfully"
		);
	};

	const handleUserDelete = async (userId) => {
		console.log(
			"Deleting user:",
			userId
		);
		// Implement API call here
		toast.success(
			"User deleted successfully"
		);
	};

	const handleContentSave = async (contentData) => {
		console.log(
			"Saving content:",
			contentData
		);
		// Implement API call here
		toast.success(
			"Content saved successfully"
		);
	};

	const handleContentDelete = async (contentId) => {
		console.log(
			"Deleting content:",
			contentId
		);
		// Implement API call here
		toast.success(
			"Content deleted successfully"
		);
	};

	if (loading) {
		return <LoadingCircle />;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<DashboardHeader
				setLogoutModal={
					setLogoutModal
				}
				user={
					user
				}
			/>
			{/* Navigation Tabs */}
			<NavigationTabs
				activeTab={
					activeTab
				}
				setActiveTab={
					setActiveTab
				}
			/>
			{/* Main Content */}
			<main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
				{activeTab ===
					"overview" && (
					<OverviewTab
						dashboardData={
							dashboardData
						}
						getStatusColor={
							getStatusColor
						}
						getActivityIcon={
							getActivityIcon
						}
					/>
				)}
				{/* User Management Tab */}
				{activeTab ===
					"users" && (
					<UserManagementTab
						dashboardData={
							dashboardData
						}
						getStatusColor={
							getStatusColor
						}
						openUserModal={
							openUserModal
						}
						openConfirmModal={
							openConfirmModal
						}
					/>
				)}{" "}
				{/* Content Management Tab */}
				{activeTab ===
					"content" && (
					<ContentManagementTab
						openContentModal={
							openContentModal
						}
						openConfirmModal={
							openConfirmModal
						}
					/>
				)}{" "}
				{/* Reports Tab */}
				{activeTab ===
					"reports" && (
					<ReportsTab
						analyticsData={
							analyticsData
						}
					/>
				)}{" "}
				{/* Settings Tab */}
				{activeTab ===
					"settings" && (
					<SettingsTab />
				)}
				{/* Other tabs fallback */}
				{![
					"overview",
					"users",
					"content",
					"reports",
					"settings",
				].includes(
					activeTab
				) && (
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
						<h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
							{activeTab
								.charAt(
									0
								)
								.toUpperCase() +
								activeTab.slice(
									1
								)}{" "}
							Section
						</h3>
						<p className="text-sm sm:text-base text-gray-500">
							This
							section
							is
							under
							development.
						</p>
					</div>
				)}
			</main>
			{/* Modals */}
			<ConfirmationModal
				isOpen={
					confirmModal.isOpen
				}
				onClose={
					closeConfirmModal
				}
				onConfirm={async () => {
					if (
						confirmModal.type ===
							"suspend" &&
						confirmModal.data
					) {
						await handleUserDelete(
							confirmModal
								.data
								.id
						);
					}
				}}
				title={
					confirmModal.type ===
					"suspend"
						? "Suspend User"
						: confirmModal.type ===
						  "delete"
						? "Delete User"
						: "Confirm Action"
				}
				message={
					confirmModal.type ===
					"suspend"
						? `Are you sure you want to suspend ${confirmModal.data?.name}? This action can be reversed later.`
						: confirmModal.type ===
						  "delete"
						? `Are you sure you want to permanently delete ${confirmModal.data?.name}? This action cannot be undone.`
						: "Are you sure you want to proceed?"
				}
				type={
					confirmModal.type ===
					"delete"
						? "danger"
						: "warning"
				}
				confirmText={
					confirmModal.type ===
					"suspend"
						? "Suspend User"
						: confirmModal.type ===
						  "delete"
						? "Delete User"
						: "Confirm"
				}
			/>
			<UserManagementModal
				isOpen={
					userModal.isOpen
				}
				onClose={
					closeUserModal
				}
				user={
					userModal.user
				}
				mode={
					userModal.mode
				}
				onSave={
					handleUserSave
				}
				onDelete={
					handleUserDelete
				}
			/>{" "}
			<ContentManagementModal
				isOpen={
					contentModal.isOpen
				}
				onClose={
					closeContentModal
				}
				content={
					contentModal.content
				}
				mode={
					contentModal.mode
				}
				onSave={
					handleContentSave
				}
				onDelete={
					handleContentDelete
				}
			/>
			{/* Logout Confirmation Modal */}
			<ConfirmationModal
				isOpen={
					logoutModal
				}
				onClose={() =>
					setLogoutModal(
						false
					)
				}
				onConfirm={
					confirmLogout
				}
				title="Confirm Logout"
				message="Are you sure you want to logout? You will need to login again to access the admin panel."
				confirmLabel="Logout"
				confirmColor="bg-red-600 hover:bg-red-700"
			/>
		</div>
	);
}
