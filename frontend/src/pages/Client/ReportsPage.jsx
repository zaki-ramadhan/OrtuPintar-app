/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ActivityDetailModal from "@/components/client/modals/ActivityDetailModal";
import HeaderClient from '@/components/client/HeaderClient';
import {
    PageHeader,
    ChildSelector,
    DateRangeAndReportType,
    CurrentPeriodDisplay,
    OverviewStats,
    StatsCard,
    MainContentGrid,
    MilestonesAndAchievements,
    RecentActivities,
    ExportAndActions
} from '@/components/client/reportsPage';

export default function ReportsPage() {
    const navigate = useNavigate();
    const [_user, setUser] = useState(null);
    const [activeChild, setActiveChild] = useState(0);
    const [dateRange, setDateRange] = useState("week"); // week, month, quarter, year
    const [reportType, setReportType] = useState("overview"); // overview, activities, milestones
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data for demonstration
    const mockChildren = [
        {
            id: 1,
            name: "Emma Johnson",
            age: "3 years, 6 months",
            avatar: "👧",
            totalActivities: 45,
            completedMilestones: 12,
            avgScore: 87
        },
        {
            id: 2,
            name: "Alex Johnson",
            age: "5 years, 2 months",
            avatar: "👦",
            totalActivities: 63,
            completedMilestones: 18,
            avgScore: 92
        }
    ]; const mockReportData = {
        overview: {
            totalActivities: 108,
            completedMilestones: 30,
            completionRate: 84,
            totalTimeSpent: 45,
            activeStreak: 7,
            lastActivity: "2 hours ago"
        },
        weeklyProgress: [
            { day: "Mon", completed: 8, total: 10 },
            { day: "Tue", completed: 12, total: 12 },
            { day: "Wed", completed: 7, total: 9 },
            { day: "Thu", completed: 10, total: 11 },
            { day: "Fri", completed: 9, total: 10 },
            { day: "Sat", completed: 6, total: 8 },
            { day: "Sun", completed: 5, total: 6 }
        ],
        categories: [
            { name: "Motor Skills", completed: 25, total: 30, color: "bg-blue-500" },
            { name: "Language", completed: 22, total: 28, color: "bg-green-500" },
            { name: "Cognitive", completed: 18, total: 25, color: "bg-purple-500" },
            { name: "Social", completed: 15, total: 20, color: "bg-orange-500" },
            { name: "Creative", completed: 12, total: 18, color: "bg-pink-500" }
        ], recentActivities: [
            {
                id: 1,
                child_id: 1,
                activity_id: 101,
                title: "Color Recognition Game",
                child: "Emma",
                category: "Cognitive",
                status: "completed",
                date: "Today",
                time: "2:30 PM",
                duration: "15 minutes",
                difficulty_level: "Beginner",
                learning_objectives: [
                    "Identify primary colors (red, blue, yellow)",
                    "Match colors with objects",
                    "Develop visual discrimination skills"
                ],
                materials_needed: [
                    "Color cards",
                    "Colored objects",
                    "Activity worksheet"
                ],
                started_at: "2024-12-20T14:15:00Z",
                completed_at: "2024-12-20T14:30:00Z",
                cancelled_at: null,
                created_at: "2024-12-20T14:00:00Z",
                updated_at: "2024-12-20T14:30:00Z",
                progress_notes: [
                    {
                        id: 1,
                        note: "Emma showed excellent progress in identifying primary colors. She was able to match all colors correctly.",
                        created_at: "2024-12-20T14:30:00Z",
                        created_by: "Teacher Sarah"
                    }
                ]
            },
            {
                id: 2,
                child_id: 2,
                activity_id: 102,
                title: "Building Blocks Challenge",
                child: "Alex",
                category: "Motor Skills",
                status: "completed",
                date: "Today",
                time: "10:15 AM",
                duration: "20 minutes",
                difficulty_level: "Intermediate",
                learning_objectives: [
                    "Develop fine motor skills",
                    "Improve hand-eye coordination",
                    "Practice spatial reasoning"
                ],
                materials_needed: [
                    "Building blocks set",
                    "Pattern cards",
                    "Timer"
                ],
                started_at: "2024-12-20T10:15:00Z",
                completed_at: "2024-12-20T10:35:00Z",
                cancelled_at: null,
                created_at: "2024-12-20T10:00:00Z",
                updated_at: "2024-12-20T10:35:00Z",
                progress_notes: [
                    {
                        id: 2,
                        note: "Alex completed the tower challenge successfully. Great improvement in stacking precision.",
                        created_at: "2024-12-20T10:35:00Z",
                        created_by: "Teacher Mike"
                    }
                ]
            }, {
                id: 3,
                child_id: 1,
                activity_id: 103,
                title: "Story Telling Session",
                child: "Emma",
                category: "Language",
                status: "in_progress",
                date: "Yesterday",
                time: "4:45 PM",
                duration: "25 minutes",
                difficulty_level: "Beginner",
                learning_objectives: [
                    "Develop vocabulary",
                    "Practice listening skills",
                    "Encourage verbal expression"
                ],
                materials_needed: [
                    "Picture books",
                    "Story cards",
                    "Audio recorder"
                ],
                started_at: null,
                completed_at: null,
                cancelled_at: null,
                created_at: "2024-12-19T16:30:00Z",
                updated_at: "2024-12-19T16:45:00Z",
                progress_notes: []
            }
        ]
    };

    useEffect(() => {
        document.title = "Reports - OrtuPintar";

        // Check authentication
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
            navigate("/login");
            return;
        }
        setUser(userData);
    }, []);

    const currentChild = mockChildren[activeChild]; const getProgressPercentage = (completed, total) => {
        return Math.round((completed / total) * 100);
    };

    const openModal = (activity) => {
        setSelectedActivity(activity);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedActivity(null);
    };

    const formatDateRange = () => {
        const now = new Date();
        switch (dateRange) {
            case "week": {
                const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                const weekEnd = new Date(now.setDate(weekStart.getDate() + 6));
                return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
            }
            case "month":
                return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            case "quarter": {
                const quarter = Math.floor(now.getMonth() / 3) + 1;
                return `Q${quarter} ${now.getFullYear()}`;
            }
            case "year":
                return now.getFullYear().toString();
            default:
                return "This Week";
        }
    }; return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <HeaderClient />

                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8">
                    {/* Page Header */}
                    <PageHeader />

                    {/* Controls */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6 mb-6">                        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                        {/* Child Selector */}
                        <ChildSelector
                            activeChild={activeChild}
                            setActiveChild={setActiveChild}
                            mockChildren={mockChildren}
                        />

                        {/* Date Range & Report Type */}
                        <DateRangeAndReportType
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            reportType={reportType}
                            setReportType={setReportType}
                        />
                    </div>

                        {/* Current Period Display */}
                        <CurrentPeriodDisplay
                            reportType={reportType}
                            currentChild={currentChild}
                            formatDateRange={formatDateRange}
                        />
                    </div>                    {/* Overview Stats */}
                    <OverviewStats mockReportData={mockReportData} />                    {/* Main Content Grid */}
                    <MainContentGrid
                        mockReportData={mockReportData}
                        formatDateRange={formatDateRange}
                        getProgressPercentage={getProgressPercentage}
                    />

                    {/* Milestones & Achievements */}
                    <MilestonesAndAchievements currentChild={currentChild} />

                    {/* Recent Activities */}
                    <RecentActivities
                        activities={mockReportData.recentActivities}
                        openModal={openModal}
                    />

                    {/* Export & Actions */}
                    <ExportAndActions mockReportData={mockReportData} />
                </div>            </div>

            {/* Activity Detail Modal */}
            <ActivityDetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                activity={selectedActivity}
            />
        </>
    );
}