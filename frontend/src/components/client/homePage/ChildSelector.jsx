export default function ChildSelector({
  children,
  activeChild,
  setActiveChild,
  onAddChild,
  calculateAge,
  progressList = [],
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
            <span className="mr-2">👶</span>
            Select Child to Track
          </h3>
          <span className="text-xs sm:text-sm text-gray-500 self-start sm:self-auto">
            {children.length} {children.length === 1 ? "child" : "children"}{" "}
            registered
          </span>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="block sm:hidden space-y-3">
          {children.map((child, index) => {
            // Ambil progress dari progressList jika ada, fallback ke 0
            const progress =
              typeof progressList[index] === "number"
                ? progressList[index]
                : Number(child.progress) || 0;

            return (
              <button
                key={child.id}
                onClick={() => setActiveChild(index)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                  activeChild === index
                    ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="text-3xl">
                      {child.photoUrl || (child.gender === "P" ? "👧" : "👦")}
                    </div>
                    {activeChild === index && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-gray-900 text-base">
                      {child.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {calculateAge(child.birthDate)}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">
                      {progress}%
                    </div>
                    <div className="text-xs text-gray-600">Progress</div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Mobile Add Child Button */}
          <button
            onClick={onAddChild}
            className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-400 bg-gray-50 hover:bg-emerald-50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-700">Add Child</h4>
                <p className="text-xs text-gray-500">Track another child</p>
              </div>
            </div>
          </button>
        </div>

        {/* Desktop: Horizontal Scroll */}
        <div className="hidden sm:block">
          <div className="flex space-x-4 overflow-x-auto p-4">
            {children.map((child, index) => {
              const progress =
                typeof progressList[index] === "number"
                  ? progressList[index]
                  : Number(child.progress) || 0;

              return (
                <button
                  key={child.id}
                  onClick={() => setActiveChild(index)}
                  className={`flex-shrink-0 p-4 lg:p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    activeChild === index
                      ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3 min-w-[160px] lg:min-w-[180px]">
                    <div className="relative">
                      <div className="text-3xl lg:text-4xl mb-2">
                        {child.photoUrl || (child.gender === "P" ? "👧" : "👦")}
                      </div>
                      {activeChild === index && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-2 h-2 lg:w-3 lg:h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <h4 className="font-bold text-gray-900 text-base lg:text-lg">
                        {child.name}
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-500 mb-3">
                        {calculateAge(child.birthDate)}
                      </p>

                      {/* Progress Ring */}
                      <div className="relative w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2">
                        <svg
                          className="w-12 h-12 lg:w-16 lg:h-16 transform -rotate-90"
                          viewBox="0 0 64 64"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 28 * (1 - progress / 100)
                            }`}
                            className="text-emerald-500 transition-all duration-1000"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs lg:text-sm font-bold text-emerald-600">
                            {progress}%
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600">Overall Progress</p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Desktop Add Child Button */}
            <button
              onClick={onAddChild}
              className="flex-shrink-0 p-4 lg:p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-emerald-400 bg-gray-50 hover:bg-emerald-50 transition-all duration-300 hover:scale-105 min-w-[160px] lg:min-w-[180px] group cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center space-y-3 h-full">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-200 transition-colors">
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-700 group-hover:text-emerald-700 text-sm lg:text-base">
                    Add Child
                  </h4>
                  <p className="text-xs text-gray-500">Track another child</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
