import { useRef } from "react";

export default function ProfileHeader({
    user,
    profileData,
    children,
    onAvatarChange
}) {
    const fileInputRef = useRef(null);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-8 mb-6 md:mb-8">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative mx-auto sm:mx-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                            {profileData.avatar ? (
                                <img
                                    src={profileData.avatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-2xl md:text-3xl font-bold">
                                    {user?.name ? user.name.charAt(0) : "-"}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-50"
                        >
                            <svg
                                className="w-3 h-3 md:w-4 md:h-4 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={onAvatarChange}
                            className="hidden"
                        />
                    </div>
                    <div className="text-center sm:text-left md:ml-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {user?.name}
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">{user?.email}</p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Member since{" "}
                            {profileData.joinDate
                                ? new Date(profileData.joinDate).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end">
                    <div className="flex items-center space-x-6 md:space-x-4 bg-gray-50 md:bg-transparent rounded-lg p-3 md:p-0">
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-emerald-600">
                                {children.length}
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">Children</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-blue-600">
                                {children.reduce((sum, child) => sum + child.milestones, 0)}
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">Milestones</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
