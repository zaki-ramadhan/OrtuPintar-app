export default function ChildSelector ({ activeChild, setActiveChild, mockChildren }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <label className="text-sm font-medium text-gray-700">Child:</label>
            <select
                value={activeChild}
                onChange={(e) => setActiveChild(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            >
                {mockChildren.map((child, index) => (
                    <option key={child.id} value={index}>
                        {child.name} ({child.age})
                    </option>
                ))}
            </select>
        </div>
    )
}