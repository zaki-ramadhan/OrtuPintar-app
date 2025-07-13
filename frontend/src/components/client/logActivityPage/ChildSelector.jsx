export default function ChildSelector({ children, activeChild, setActiveChild, calculateAge }) {
    if (children.length === 0) return null;

    return (
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
    );
}
