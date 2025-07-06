import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function HomePage() {
    const [activeChild, setActiveChild] = useState(0);
    const [selectedTab, setSelectedTab] = useState('overview');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [notifications, setNotifications] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Simulate data loading
        setNotifications([
            { id: 1, type: 'milestone', message: 'Emma is ready for new cognitive activities!', time: '2 hours ago' },
            { id: 2, type: 'reminder', message: 'Time for Alex\'s weekly assessment', time: '1 day ago' },
            { id: 3, type: 'achievement', message: 'Congratulations! Emma completed her drawing milestone', time: '3 days ago' }
        ]);

        setActivities([
            { id: 1, title: 'Color Recognition Game', duration: '15 min', difficulty: 'Easy', category: 'Cognitive' },
            { id: 2, title: 'Building Blocks Challenge', duration: '20 min', difficulty: 'Medium', category: 'Motor Skills' },
            { id: 3, title: 'Story Time Adventure', duration: '10 min', difficulty: 'Easy', category: 'Language' }
        ]);
    }, []);

    // Mock data for children
    const children = [
        {
            id: 1,
            name: 'Emma',
            age: '3 years, 2 months',
            avatar: '👧',
            nextMilestone: 'Drawing circles',
            progress: 85,
            recentAchievement: 'Learned to count to 10',
            developmentAreas: [
                { name: 'Physical', progress: 90, color: 'emerald' },
                { name: 'Cognitive', progress: 85, color: 'blue' },
                { name: 'Social', progress: 78, color: 'purple' },
                { name: 'Language', progress: 92, color: 'orange' }
            ]
        },
        {
            id: 2,
            name: 'Alex',
            age: '1 year, 8 months',
            avatar: '👶',
            nextMilestone: 'First two-word sentences',
            progress: 70,
            recentAchievement: 'Started walking independently',
            developmentAreas: [
                { name: 'Physical', progress: 95, color: 'emerald' },
                { name: 'Cognitive', progress: 65, color: 'blue' },
                { name: 'Social', progress: 72, color: 'purple' },
                { name: 'Language', progress: 60, color: 'orange' }
            ]
        }
    ];

    const currentChild = children[activeChild];

    const quickActions = [
        { name: 'Log Activity', icon: '📝', color: 'emerald', path: '/log-activity' },
        { name: 'Track Milestone', icon: '🎯', color: 'blue', path: '/milestones' },
        { name: 'Start Assessment', icon: '📊', color: 'purple', path: '/assessment' },
        { name: 'Chat with Expert', icon: '👩‍⚕️', color: 'rose', path: '/expert-chat' },
        { name: 'View Reports', icon: '📈', color: 'indigo', path: '/reports' },
        { name: 'Learning Activities', icon: '🎮', color: 'yellow', path: '/activities' }
    ];

    const upcomingReminders = [
        { title: 'Doctor Appointment', date: 'Tomorrow, 10:00 AM', type: 'medical' },
        { title: 'Weekly Assessment', date: 'Friday, 2:00 PM', type: 'assessment' },
        { title: 'Vaccination Due', date: 'Next Week', type: 'medical' }
    ];

    const recentActivities = [
        { activity: 'Completed puzzle game', child: 'Emma', time: '30 minutes ago', score: 95 },
        { activity: 'Practiced walking', child: 'Alex', time: '2 hours ago', score: 88 },
        { activity: 'Story reading session', child: 'Emma', time: '1 day ago', score: 100 }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">OrtuPintar</h1>
                                <p className="text-xs text-gray-500">Smart Child Development</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2">
                                <span className="text-sm">📝</span>
                                <span>Quick Log</span>
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                                <span className="text-sm">👩‍⚕️</span>
                                <span>Ask Expert</span>
                            </button>
                        </div>

                        {/* Profile */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                                    <span className="text-sm">🔔</span>
                                </button>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">👩</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Good {currentDate.getHours() < 12 ? 'Morning' : currentDate.getHours() < 17 ? 'Afternoon' : 'Evening'}, Sarah! 👋
                    </h2>
                    <p className="text-gray-600">Let's check on your children's development progress today.</p>
                </div>

                {/* Child Selector */}
                <div className="mb-8">
                    <div className="flex space-x-4 overflow-x-auto p-2">
                        {children.map((child, index) => (
                            <button
                                key={child.id}
                                onClick={() => setActiveChild(index)}
                                className={`flex-shrink-0 p-4 rounded-2xl border-2 transition-all duration-300 ${
                                    activeChild === index
                                        ? 'border-emerald-400 bg-emerald-50 shadow-lg scale-105'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center space-x-3 min-w-[200px]">
                                    <div className="text-3xl">{child.avatar}</div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">{child.name}</h3>
                                        <p className="text-sm text-gray-500">{child.age}</p>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <div className="w-16 h-1 bg-gray-200 rounded-full">
                                                <div 
                                                    className="h-1 bg-emerald-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${child.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-emerald-600 font-medium">{child.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Dashboard */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Current Child Overview */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{currentChild.avatar}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{currentChild.name}'s Progress</h3>
                                        <p className="text-gray-500">{currentChild.age}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-emerald-600">{currentChild.progress}%</div>
                                    <p className="text-sm text-gray-500">Overall Progress</p>
                                </div>
                            </div>

                            {/* Development Areas */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {currentChild.developmentAreas.map((area, index) => (
                                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                                        <div className={`text-2xl mb-2 text-${area.color}-600`}>
                                            {area.name === 'Physical' ? '🏃‍♂️' : 
                                             area.name === 'Cognitive' ? '🧠' :
                                             area.name === 'Social' ? '❤️' : '💬'}
                                        </div>
                                        <h4 className="font-medium text-gray-900 text-sm">{area.name}</h4>
                                        <div className="mt-2">
                                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                                <div 
                                                    className={`h-2 bg-${area.color}-500 rounded-full transition-all duration-1000`}
                                                    style={{ width: `${area.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className={`text-xs font-medium text-${area.color}-600 mt-1 block`}>
                                                {area.progress}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Next Milestone & Recent Achievement */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-blue-600">🎯</span>
                                        <h4 className="font-semibold text-blue-900">Next Milestone</h4>
                                    </div>
                                    <p className="text-blue-700">{currentChild.nextMilestone}</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-emerald-600">🎉</span>
                                        <h4 className="font-semibold text-emerald-900">Recent Achievement</h4>
                                    </div>
                                    <p className="text-emerald-700">{currentChild.recentAchievement}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {quickActions.map((action, index) => (
                                    <Link
                                        key={index}
                                        to={action.path}
                                        className={`p-4 rounded-xl border-2 border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 hover:border-${action.color}-300 transition-all duration-200 hover:scale-105 group`}
                                    >
                                        <div className="text-center">
                                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                                {action.icon}
                                            </div>
                                            <span className={`text-sm font-medium text-${action.color}-800`}>
                                                {action.name}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Activities */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">Recommended Activities</h3>
                                <Link to="/activities" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                                    View All →
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {activities.map((activity, index) => (
                                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                    <span>⏱️ {activity.duration}</span>
                                                    <span>📊 {activity.difficulty}</span>
                                                    <span>🎯 {activity.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                                            Start
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h3>
                            <div className="space-y-4">
                                {recentActivities.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{item.activity}</h4>
                                                <p className="text-sm text-gray-500">{item.child} • {item.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-emerald-600">{item.score}%</div>
                                            <p className="text-xs text-gray-500">Score</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Notifications */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {notifications.length}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <div className="text-lg">
                                                {notification.type === 'milestone' ? '🎯' :
                                                 notification.type === 'reminder' ? '⏰' : '🎉'}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Reminders */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Reminders</h3>
                            <div className="space-y-3">
                                {upcomingReminders.map((reminder, index) => (
                                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-lg">
                                                {reminder.type === 'medical' ? '🏥' : '📊'}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">{reminder.title}</h4>
                                                <p className="text-xs text-gray-500">{reminder.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Expert Support */}
                        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200 p-6">
                            <div className="text-center">
                                <div className="text-4xl mb-3">👩‍⚕️</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Need Expert Advice?</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Connect with our pediatric specialists for personalized guidance.
                                </p>
                                <button className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors">
                                    Chat with Expert
                                </button>
                            </div>
                        </div>

                        {/* Weekly Summary */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">This Week's Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Activities Completed</span>
                                    <span className="font-bold text-emerald-600">12</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Milestones Achieved</span>
                                    <span className="font-bold text-blue-600">3</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Expert Consultations</span>
                                    <span className="font-bold text-purple-600">1</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Progress Score</span>
                                    <span className="font-bold text-orange-600">A+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
