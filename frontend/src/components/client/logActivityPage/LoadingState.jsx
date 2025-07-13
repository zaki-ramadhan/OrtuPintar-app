import HeaderClient from "@/components/client/HeaderClient";

export default function LoadingState() {
    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderClient />
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading log activities...</p>
                </div>
            </div>
        </div>
    );
}
