import { useNavigate } from "react-router";

export default function EmptyState() {
    const navigate = useNavigate();

    return (
        <div className="text-center py-12">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Children Added
            </h3>
            <p className="text-gray-600 mb-6">
                Add a child to start logging their developmental activities
            </p>
            <button
                onClick={() => navigate("/home")}
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
                Go to Dashboard
            </button>
        </div>
    );
}
