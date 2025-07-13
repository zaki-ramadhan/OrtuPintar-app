export default function ChildrenTab({
    children,
    setShowAddChildModal,
    onEditChild,
    onDeleteChild,
    calculateAge
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Children</h2>
                <button
                    onClick={() => setShowAddChildModal(true)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm md:text-base w-full sm:w-auto"
                >
                    Add Child
                </button>
            </div>

            {children.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                    <div className="text-4xl md:text-6xl mb-4">👶</div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        No Children Added Yet
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base px-4">
                        Start tracking your child's development by adding them to your
                        account.
                    </p>
                    <button
                        onClick={() => setShowAddChildModal(true)}
                        className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors w-full sm:w-auto"
                    >
                        Add Your First Child
                    </button>
                </div>
            ) : (
                <div className="grid gap-4 md:gap-6">
                    {children.map((child) => (
                        <div
                            key={child.id}
                            className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
                        >
                            {/* Mobile Layout */}
                            <div className="block md:hidden">
                                <div className="flex items-start space-x-3 mb-4">
                                    <div className="text-3xl flex-shrink-0">
                                        {child.photoUrl ||
                                            (child.gender === "P" ? "👧" : "👦")}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                                            {child.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {calculateAge(child.birthDate)} old
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Born: {new Date(child.birthDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-emerald-600">
                                            {child.milestones}
                                        </div>
                                        <div className="text-xs text-gray-500">Milestones</div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-emerald-600 font-medium">
                                            Last Assessment
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(child.lastAssessment).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => onEditChild(child)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        title="Edit Child"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDeleteChild(child.id, child.name)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        title="Remove Child"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Desktop Layout */}
                            <div className="hidden md:block">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-4xl">
                                            {child.photoUrl ||
                                                (child.gender === "P" ? "👧" : "👦")}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {child.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                {calculateAge(child.birthDate)} old
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Born:{" "}
                                                {new Date(child.birthDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-emerald-600 font-medium">
                                                Last Assessment:{" "}
                                                {new Date(
                                                    child.lastAssessment
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-emerald-600">
                                                {child.milestones}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Milestones
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => onEditChild(child)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                title="Edit Child"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDeleteChild(child.id, child.name)
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                title="Remove Child"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
