export default function ProfileTab({
    profileData,
    setProfileData,
    isEditing,
    setIsEditing,
    isLoading,
    onProfileUpdate
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Profile Information
                </h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors w-full sm:w-auto text-sm md:text-base"
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <form onSubmit={onProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) =>
                                setProfileData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                                setProfileData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) =>
                                setProfileData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) =>
                                setProfileData((prev) => ({
                                    ...prev,
                                    location: e.target.value,
                                }))
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                            placeholder="Enter your location"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
