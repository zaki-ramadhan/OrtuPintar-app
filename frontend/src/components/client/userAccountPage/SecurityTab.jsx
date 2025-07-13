export default function SecurityTab({
    passwordData,
    setPasswordData,
    isChangingPassword,
    onChangePassword,
    setShowDeleteAccountModal
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                Security Settings
            </h2>

            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Change Password
                    </h3>
                    <form
                        className="space-y-4 max-w-md"
                        onSubmit={onChangePassword}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                    setPasswordData((prev) => ({
                                        ...prev,
                                        currentPassword: e.target.value,
                                    }))
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="Enter your current password"
                                disabled={isChangingPassword}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData((prev) => ({
                                        ...prev,
                                        newPassword: e.target.value,
                                    }))
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="Enter new password (min. 8 characters)"
                                disabled={isChangingPassword}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                    setPasswordData((prev) => ({
                                        ...prev,
                                        confirmPassword: e.target.value,
                                    }))
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="Confirm your new password"
                                disabled={isChangingPassword}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isChangingPassword}
                            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {isChangingPassword ? (
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
                                    <span>Changing Password...</span>
                                </>
                            ) : (
                                <span>Update Password</span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">
                        Danger Zone
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                            <h4 className="font-medium text-red-900 mb-2">
                                Delete Account
                            </h4>
                            <p className="text-sm text-red-700 mb-4">
                                This action cannot be undone. All your data will be
                                permanently deleted.
                            </p>
                            <button
                                onClick={() => setShowDeleteAccountModal(true)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
