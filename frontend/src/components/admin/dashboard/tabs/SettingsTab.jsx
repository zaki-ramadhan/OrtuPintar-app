function SystemConfiguration() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-center mb-4">
				<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
					<svg
						className="w-4 h-4 text-blue-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={
								2
							}
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-gray-900">
					System
					Configuration
				</h3>
			</div>
			<div className="space-y-4">
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Site
						Name
					</span>
					<span className="text-sm font-medium text-gray-900">
						OrtuPintar
					</span>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Version
					</span>
					<span className="text-sm font-medium text-green-600">
						v2.1.0
					</span>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Environment
					</span>
					<span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
						Production
					</span>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Maintenance
						Mode
					</span>
					<button className="w-10 h-5 bg-gray-300 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
			</div>
		</div>
	);
}

function UserManagementSettings() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-center mb-4">
				<div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
					<svg
						className="w-4 h-4 text-purple-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={
								2
							}
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-gray-900">
					User
					Management
				</h3>
			</div>
			<div className="space-y-4">
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						User
						Registration
					</span>
					<button className="w-10 h-5 bg-green-500 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Email
						Verification
					</span>
					<button className="w-10 h-5 bg-green-500 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Auto-approve
						Users
					</span>
					<button className="w-10 h-5 bg-gray-300 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Session
						Timeout
					</span>
					<span className="text-sm font-medium text-gray-900">
						24
						hours
					</span>
				</div>
			</div>
		</div>
	);
}

function ContentManagementSettings() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-center mb-4">
				<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
					<svg
						className="w-4 h-4 text-emerald-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={
								2
							}
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-gray-900">
					Content
					Management
				</h3>
			</div>
			<div className="space-y-4">
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Content
						Moderation
					</span>
					<button className="w-10 h-5 bg-green-500 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Auto-publish
					</span>
					<button className="w-10 h-5 bg-gray-300 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Max
						File
						Size
					</span>
					<span className="text-sm font-medium text-gray-900">
						10
						MB
					</span>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Allowed
						Formats
					</span>
					<span className="text-sm font-medium text-gray-900">
						JPG,
						PNG,
						PDF
					</span>
				</div>
			</div>
		</div>
	);
}

function NotificationSettings() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-center mb-4">
				<div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
					<svg
						className="w-4 h-4 text-orange-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={
								2
							}
							d="M15 17h5l-5 5v-5zM4 19h4.5a2.5 2.5 0 002.5-2.5V6a2 2 0 012-2h2a2 2 0 012 2v10.5a2.5 2.5 0 002.5 2.5H21"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-gray-900">
					Notifications
				</h3>
			</div>
			<div className="space-y-4">
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Email
						Notifications
					</span>
					<button className="w-10 h-5 bg-green-500 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Push
						Notifications
					</span>
					<button className="w-10 h-5 bg-green-500 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						SMS
						Notifications
					</span>
					<button className="w-10 h-5 bg-gray-300 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
				<div className="flex justify-between items-center py-2">
					<span className="text-sm text-gray-700">
						Admin
						Alerts
					</span>
					<button className="w-10 h-5 bg-green-500 rounded-full relative">
						<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
					</button>
				</div>
			</div>
		</div>
	);
}

function SecuritySettings() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-center mb-6">
				<div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
					<svg
						className="w-4 h-4 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={
								2
							}
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-gray-900">
					Security
					Settings
				</h3>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="space-y-4">
					<h4 className="font-medium text-gray-900">
						Password
						Policy
					</h4>
					<div className="space-y-2">
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								Min
								Length
							</span>
							<span className="text-sm font-medium text-gray-900">
								8
								characters
							</span>
						</div>
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								Require
								Numbers
							</span>
							<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
								<svg
									className="w-2 h-2 text-white"
									fill="currentColor"
									viewBox="0 0 8 8"
								>
									<path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
								</svg>
							</div>
						</div>
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								Require
								Symbols
							</span>
							<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
								<svg
									className="w-2 h-2 text-white"
									fill="currentColor"
									viewBox="0 0 8 8"
								>
									<path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<h4 className="font-medium text-gray-900">
						Two-Factor
						Auth
					</h4>
					<div className="space-y-2">
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								Enable
								2FA
							</span>
							<button className="w-10 h-5 bg-gray-300 rounded-full relative">
								<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
							</button>
						</div>
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								SMS
								Backup
							</span>
							<button className="w-10 h-5 bg-gray-300 rounded-full relative">
								<div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
							</button>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<h4 className="font-medium text-gray-900">
						Data
						Backup
					</h4>
					<div className="space-y-2">
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								Auto
								Backup
							</span>
							<button className="w-10 h-5 bg-green-500 rounded-full relative">
								<div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
							</button>
						</div>
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								Frequency
							</span>
							<span className="text-sm font-medium text-gray-900">
								Daily
							</span>
						</div>
						<div className="flex justify-between items-center py-1">
							<span className="text-sm text-gray-700">
								Last
								Backup
							</span>
							<span className="text-sm font-medium text-green-600">
								2
								hours
								ago
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function SystemActions() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				System
				Actions
			</h3>
			<div className="flex flex-wrap gap-4">
				<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
					Clear
					Cache
				</button>
				<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
					Generate
					Backup
				</button>
				<button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
					System
					Health
					Check
				</button>
				<button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
					Update
					System
				</button>
				<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
					Reset
					Analytics
				</button>
			</div>
		</div>
	);
}

export default function SettingsTab() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						System
						Settings
					</h2>
					<p className="text-gray-600">
						Configure
						system
						preferences
						and
						security
						settings
					</p>
				</div>
			</div>

			{/* Settings Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* System Configuration */}
				<SystemConfiguration />

				{/* User Management Settings */}
				<UserManagementSettings />

				{/* Content Management Settings */}
				<ContentManagementSettings />

				{/* Notification Settings */}
				<NotificationSettings />
			</div>

			{/* Security Settings */}
			<SecuritySettings />

			{/* System Actions */}
			<SystemActions />
		</div>
	);
}
