import { useState, useEffect } from "react";
import ChildSelector from "@/components/client/ChildSelector";
import CurrentChildOverview from "@/components/client/CurrentChildOverview";
import QuickActions from "@/components/client/QuickActions";
import RecommendedActivities from "@/components/client/RecommendedActivities";
import RecentAcitivities from "@/components/client/RecentAcitivities";
import Notifications from "@/components/client/Notifications";
import UpcomingReminders from "@/components/client/UpcomingReminders";
import HeaderHomePage from "@/components/client/HeaderHomePage";
import ExpertSupport from "@/components/client/ExpertSupport";
import WeeklySummary from "@/components/client/WeeklySummary";
import AddChildModal from "@/components/client/AddChildModal";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function HomePage() {
	const [activeChild, setActiveChild] = useState(0);
	const [selectedTab, setSelectedTab] =
		useState("overview");
	const [currentDate, setCurrentDate] = useState(
		new Date()
	);
	const [notifications, setNotifications] = useState(
		[]
	);
	const [activities, setActivities] = useState([]);
	const [children, setChildren] = useState([]);
	const [showAddChildModal, setShowAddChildModal] =
		useState(false);
	const navigate = useNavigate();

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

		setActivities([
			{
				id: 1,
				title: "Color Recognition Game",
				duration: "15 min",
				difficulty: "Easy",
				category: "Cognitive",
				ageGroup: "3-4 years",
				icon: "🎨",
				description: "Help your child identify and match different colors",
			},
			{
				id: 2,
				title: "Building Blocks Challenge",
				duration: "20 min",
				difficulty: "Medium",
				category: "Motor Skills",
				ageGroup: "2-5 years",
				icon: "🧱",
				description: "Develop fine motor skills through creative building",
			},
			{
				id: 3,
				title: "Story Time Adventure",
				duration: "10 min",
				difficulty: "Easy",
				category: "Language",
				ageGroup: "1-4 years",
				icon: "📚",
				description: "Interactive storytelling to boost language development",
			},
			{
				id: 4,
				title: "Shape Sorting Fun",
				duration: "12 min",
				difficulty: "Easy",
				category: "Cognitive",
				ageGroup: "2-3 years",
				icon: "🔷",
				description: "Learn shapes while having fun sorting and matching",
			},
		]);

		setChildren([
			{
				id: 1,
				name: "Emma",
				age: "3 years, 2 months",
				avatar: "👧",
				nextMilestone: "Drawing circles",
				progress: 85,
				recentAchievement: "Learned to count to 10",
				developmentAreas: [
					{
						name: "Physical",
						progress: 90,
						color: "emerald",
					},
					{
						name: "Cognitive",
						progress: 85,
						color: "blue",
					},
					{
						name: "Social",
						progress: 78,
						color: "purple",
					},
					{
						name: "Language",
						progress: 92,
						color: "orange",
					},
				],
			},
			{
				id: 2,
				name: "Alex",
				age: "1 year, 8 months",
				avatar: "👶",
				nextMilestone: "First two-word sentences",
				progress: 70,
				recentAchievement: "Started walking independently",
				developmentAreas: [
					{
						name: "Physical",
						progress: 95,
						color: "emerald",
					},
					{
						name: "Cognitive",
						progress: 65,
						color: "blue",
					},
					{
						name: "Social",
						progress: 72,
						color: "purple",
					},
					{
						name: "Language",
						progress: 60,
						color: "orange",
					},
				],
			},
		]);
	}, []);

	// Handler functions (same as before)
	const handleAddChild = (newChildData) => {
		const newChild = {
			id:
				children.length +
				1,
			...newChildData,
			progress: 0,
			recentAchievement: "Just getting started!",
			developmentAreas: [
				{
					name: "Physical",
					progress: 0,
					color: "emerald",
				},
				{
					name: "Cognitive",
					progress: 0,
					color: "blue",
				},
				{
					name: "Social",
					progress: 0,
					color: "purple",
				},
				{
					name: "Language",
					progress: 0,
					color: "orange",
				},
			],
		};

		setChildren((prev) => [
			...prev,
			newChild,
		]);
		setShowAddChildModal(false);
		toast.success(
			`${newChildData.name} has been added successfully!`
		);
		setActiveChild(
			children.length
		);
	};

	const handleMarkAsRead = (notificationId) => {
		setNotifications((prev) =>
			prev.map(
				(
					notification
				) =>
					notification.id ===
					notificationId
						? {
								...notification,
								read: true,
						  }
						: notification
			)
		);
		toast.success(
			"Notification marked as read"
		);
	};

	const handleMarkAllAsRead = () => {
		setNotifications((prev) =>
			prev.map(
				(
					notification
				) => ({
					...notification,
					read: true,
				})
			)
		);
		toast.success(
			"All notifications marked as read"
		);
	};

	const unreadNotifications = notifications.filter(
		(notification) =>
			!notification.read
	);
	const currentChild = children[activeChild];

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
						{currentDate.getHours() <
						12
							? "Morning"
							: currentDate.getHours() <
							  17
							? "Afternoon"
							: "Evening"}

						,
						Sarah!
						👋
					</h2>
					<p className="text-sm sm:text-base text-gray-600">
						Let's
						check
						on
						your
						children's
						development
						progress
						today.
					</p>
				</div>

				{/* Child Selector */}
				<ChildSelector
					children={
						children
					}
					activeChild={
						activeChild
					}
					setActiveChild={
						setActiveChild
					}
					onAddChild={() =>
						setShowAddChildModal(
							true
						)
					}
				/>

				{/* Main Content Grid - Responsive Layout */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
					{/* Left Column - Main Dashboard */}
					<div className="xl:col-span-2 space-y-4 sm:space-y-6">
						{/* Current Child Overview */}
						{currentChild && (
							<CurrentChildOverview
								currentChild={
									currentChild
								}
							/>
						)}

						{/* Quick Actions Grid */}
						<QuickActions />

						{/* Recommended Activities */}
						<RecommendedActivities
							activities={
								activities
							}
							currentChild={
								currentChild
							}
						/>

						{/* Recent Activities */}
						<RecentAcitivities />
					</div>

					{/* Right Column - Sidebar */}
					<div className="space-y-4 sm:space-y-6">
						{/* Notifications */}
						<Notifications
							notifications={
								unreadNotifications
							}
							onMarkAsRead={
								handleMarkAsRead
							}
							onMarkAllAsRead={
								handleMarkAllAsRead
							}
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
							<div className="text-4xl sm:text-5xl mb-4">
								❓
							</div>
							<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
								Need
								Help
								Getting
								Started?
							</h3>
							<p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
								Our
								quick
								tutorial
								will
								guide
								you
								through
								tracking
								your
								child's
								first
								milestone.
							</p>
							<button className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto">
								Start
								Tutorial
							</button>
						</div>
					</div>

					{/* Expert Consultation Card */}
					<div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-200">
						<div className="text-center">
							<div className="text-4xl sm:text-5xl mb-4">
								👩‍⚕️
							</div>
							<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
								Talk
								to
								an
								Expert
							</h3>
							<p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
								Schedule
								a
								free
								consultation
								with
								our
								pediatric
								development
								specialists.
							</p>
							<button className="bg-emerald-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-emerald-600 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto">
								Book
								Consultation
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Add Child Modal */}
			{showAddChildModal && (
				<AddChildModal
					onClose={() =>
						setShowAddChildModal(
							false
						)
					}
					onAddChild={
						handleAddChild
					}
				/>
			)}
		</div>
	);
}
