import { Link } from "react-router";

export default function QuickActions() {
  const quickActions = [
    {
      name: "Log Activity",
      icon: "📝",
      color: "emerald",
      path: "/log-activity",
    },
    {
      name: "Track Milestone",
      icon: "🎯",
      color: "blue",
      path: "/milestones",
    },
    {
      name: "View Reports",
      icon: "📈",
      color: "yellow",
      path: "/reports",
    },
  ];

  return (
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
  );
}
