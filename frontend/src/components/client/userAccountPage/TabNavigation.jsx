export default function TabNavigation({ activeTab, setActiveTab }) {
    const tabs = [
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
    ];

    return (
        <div className="border-b border-gray-200 mb-6 md:mb-8">
            {/* Mobile Tab Navigation */}
            <div className="block sm:hidden">
                <nav className="flex overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
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
                    {tabs.map((tab) => (
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
    );
}
