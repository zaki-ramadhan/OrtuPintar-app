import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import HeaderClient from "@/components/client/HeaderClient";
import MilestoneOverview from "@/components/client/milestonesPage/MilestoneOverview";
import CompletedMilestones from "@/components/client/milestonesPage/CompletedMilestones";
import MilestonesByAgeGroup from "@/components/client/milestonesPage/MilestonesByAgeGroup";
import MilestoneDetailModal from "@/components/client/milestonesPage/MilestoneDetailModal";

const API_URL = import.meta.env.VITE_API_URL;

export default function MilestonesPage() {
    const navigate = useNavigate();
    const [children, setChildren] = useState([]);
    const [activeChild, setActiveChild] = useState(0);
    const [activities, setActivities] = useState([]);
    const [milestones, setMilestones] = useState([]);
    const [completedMilestones, setCompletedMilestones] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);    // Function to fetch initial data
    const fetchInitialData = async () => {
        const token = localStorage.getItem("token");
        try {
            // Fetch children
            const childrenResponse = await axios.get(`${API_URL}/children`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setChildren(childrenResponse.data.children || []);

            // Fetch activities
            const activitiesResponse = await axios.get(`${API_URL}/activities`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setActivities(activitiesResponse.data.activities || []);

            setLoading(false);
        } catch (err) {
            console.error("Error fetching initial data:", err);
            toast.error("Failed to load data");
            setLoading(false);
        }
    };

    // Function to fetch milestone data for current child
    const fetchMilestoneData = useCallback(async () => {
        if (!children[activeChild]) return;

        const currentChild = children[activeChild];
        const token = localStorage.getItem("token");

        try {
            // Fetch completed milestones for current child
            const milestonesResponse = await axios.get(
                `${API_URL}/milestones/child/${currentChild.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setCompletedMilestones(milestonesResponse.data.milestones || []);

            // Filter milestone activities and categorize by age group
            const milestoneActivities = activities.filter((a) => a.isMilestone);
            setMilestones(milestoneActivities);
        } catch (err) {
            console.error("Error fetching milestone data:", err);
            toast.error("Failed to load milestone data");
        }
    }, [children, activeChild, activities]);

    // Fetch data on component mount
    useEffect(() => {
        document.title = "Milestones - OrtuPintar";

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
            fetchMilestoneData();
        }
    }, [activeChild, children, fetchMilestoneData]);

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
            return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""
                }`;
        }
    };

    const calculateAgeInYears = (birthDateString) => {
        const today = new Date();
        const birthDate = new Date(birthDateString);
        let years = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            years--;
        }
        return years;
    };

    const openMilestoneModal = (milestone) => {
        setSelectedMilestone(milestone);
        setIsModalOpen(true);
    };

    const closeMilestoneModal = () => {
        setSelectedMilestone(null);
        setIsModalOpen(false);
    };

    const handleStartMilestone = async (milestone) => {
        if (!children[activeChild]) return;

        const currentChild = children[activeChild];
        const token = localStorage.getItem("token");

        try {
            await axios.post(
                `${API_URL}/activities/start`,
                {
                    childId: currentChild.id,
                    activityId: milestone.id,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Milestone activity started!");
            closeMilestoneModal();
        } catch (err) {
            console.error("Error starting milestone:", err);
            toast.error(err.response?.data?.message || "Failed to start milestone");
        }
    };

    const currentChild = children[activeChild] || null;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <HeaderClient />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading milestones...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderClient />

            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        🎯 Developmental Milestones
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        Track your child's developmental progress and celebrate their
                        achievements
                    </p>
                </div>                {/* Child Selector */}
                {children.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Select Child
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {children.map((child, index) => (
                                <button
                                    key={child.id}
                                    onClick={() => setActiveChild(index)}
                                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 w-full min-w-0 ${activeChild === index
                                        ? "border-emerald-400 bg-emerald-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                        }`}
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center text-2xl">
                                            {child.photoUrl || (child.gender === "P" ? "👧" : "👦")}
                                        </div>
                                    </div>
                                    <div className="text-left min-w-0 flex-1">
                                        <p className="font-medium text-gray-900 truncate">{child.name}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {calculateAge(child.birthDate)}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {currentChild && (
                    <>
                        {/* Milestone Overview */}
                        <MilestoneOverview
                            currentChild={currentChild}
                            milestones={milestones}
                            completedMilestones={completedMilestones}
                            calculateAge={calculateAge}
                        />                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                            {/* Left Column - Completed Milestones */}
                            <div className="lg:col-span-1 order-2 lg:order-1">
                                <CompletedMilestones
                                    completedMilestones={completedMilestones}
                                    activities={activities}
                                    onViewDetails={openMilestoneModal}
                                />
                            </div>

                            {/* Right Column - Milestones by Age Group */}
                            <div className="lg:col-span-2 order-1 lg:order-2">
                                <MilestonesByAgeGroup
                                    milestones={milestones}
                                    completedMilestones={completedMilestones}
                                    currentChild={currentChild}
                                    calculateAgeInYears={calculateAgeInYears}
                                    onStartMilestone={openMilestoneModal}
                                />
                            </div>
                        </div>
                    </>
                )}

                {children.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👶</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No Children Added
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Add a child to start tracking their developmental milestones
                        </p>
                        <button
                            onClick={() => navigate("/home")}
                            className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>

            {/* Milestone Detail Modal */}
            {isModalOpen && selectedMilestone && (
                <MilestoneDetailModal
                    milestone={selectedMilestone}
                    currentChild={currentChild}
                    isCompleted={completedMilestones.some(
                        (cm) => cm.activity_id === selectedMilestone.id
                    )}
                    onClose={closeMilestoneModal}
                    onStartMilestone={handleStartMilestone}
                />
            )}
        </div>
    );
}
