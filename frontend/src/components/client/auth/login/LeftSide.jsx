import { Link } from "react-router";

export default function LeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-white/80 backdrop-blur-xl flex-col justify-between p-12 relative">
      {/* Header with Logo */}
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              OrtuPintar
            </span>
            <div className="text-xs text-gray-500 -mt-1">
              Smart Child Development
            </div>
          </div>
        </Link>

        <Link
          to="/"
          className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center space-x-2"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to website</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Track Your Child's{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
                Development
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
            </span>{" "}
            Journey
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Join thousands of parents who trust OrtuPintar to support their
            child's crucial early years with expert guidance and smart tracking.
          </p>
        </div>

        {/* Features Preview */}
        <div className="space-y-4">
          {[
            {
              icon: "📊",
              text: "AI-powered milestone tracking",
            },
            {
              icon: "🎯",
              text: "Personalized activity recommendations",
            },
            {
              icon: "👨‍👩‍👧‍👦",
              text: "Family progress sharing",
            },
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-gray-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">10k+</div>
          <div className="text-sm text-gray-500">Active Families</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">50k+</div>
          <div className="text-sm text-gray-500">Milestones Tracked</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">95%</div>
          <div className="text-sm text-gray-500">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
}
