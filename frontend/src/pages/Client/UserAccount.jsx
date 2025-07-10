import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LogoutModal from "@/components/client/homePage/LogoutModal";

export default function UserAccount() {
	const navigate = useNavigate();
	const fileInputRef = useRef(null);

	const [activeTab, setActiveTab] = useState("profile");
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: "Sarah Johnson",
		email: "sarah.johnson@email.com",
		phone: "+1 (555) 123-4567",
		location: "New York, USA",
		joinDate: "January 2024",
		avatar: null,
		bio: "Mother of two wonderful children. Passionate about child development and education.",
		emergencyContact: {
			name: "John Johnson",
			phone: "+1 (555) 987-6543",
			relationship: "Spouse",
		},
	});

	const [children, setChildren] = useState([
		{
			id: 1,
			name: "Emma Johnson",
			birthDate: "2020-03-15",
			gender: "Female",
			avatar: "👧",
			milestones: 15,
			lastAssessment: "2024-12-01",
		},
		{
			id: 2,
			name: "Alex Johnson",
			birthDate: "2022-07-20",
			gender: "Male",
			avatar: "👶",
			milestones: 8,
			lastAssessment: "2024-11-28",
		},
	]);

	const [preferences, setPreferences] = useState({
		notifications: {
			email: true,
			push: true,
			sms: false,
			reminders: true,
		},
		privacy: {
			profileVisible: false,
			shareProgress: true,
			dataCollection: true,
		},
		language: "en",
		timezone: "America/New_York",
	});

	const [user, setUser] = useState(null);
	const [showLogoutModal, setShowLogoutModal] =
		useState(false);

	useEffect(() => {
		const userData = JSON.parse(
			localStorage.getItem(
				"user"
			)
		);
		setUser(userData);
		if (userData) {
			setProfileData(
				(
					prev
				) => ({
					...prev,
					name:
						userData.name ||
						prev.name,
					email:
						userData.email ||
						prev.email,
					phone:
						userData.phone ||
						prev.phone,
					location:
						userData.location ||
						prev.location,
					joinDate:
						userData.joinDate ||
						prev.joinDate,
					avatar:
						userData.avatar ||
						prev.avatar,
					bio:
						userData.bio ||
						prev.bio,
					emergencyContact:
						userData.emergencyContact ||
						prev.emergencyContact,
				})
			);
		}
	}, []);

	const handleProfileUpdate = (e) => {
		e.preventDefault();
		toast.success(
			"Profile updated successfully!"
		);
		setIsEditing(false);
	};

	const handleAvatarChange = (e) => {
		const file =
			e
				.target
				.files[0];
		if (file) {
			const reader =
				new FileReader();
			reader.onload =
				(
					e
				) => {
					setProfileData(
						(
							prev
						) => ({
							...prev,
							avatar: e
								.target
								.result,
						})
					);
				};
			reader.readAsDataURL(
				file
			);
		}
	};

	const handleDeleteChild = (childId) => {
		if (
			window.confirm(
				"Are you sure you want to remove this child?"
			)
		) {
			setChildren(
				(
					prev
				) =>
					prev.filter(
						(
							child
						) =>
							child.id !==
							childId
					)
			);
			toast.success(
				"Child removed successfully"
			);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem(
			"token"
		);
		localStorage.removeItem(
			"user"
		);
		toast.success(
			"Logged out successfully"
		);
		navigate("/login");
	};

	const calculateAge = (birthDate) => {
		const today = new Date();
		const birth = new Date(
			birthDate
		);
		const years =
			today.getFullYear() -
			birth.getFullYear();
		const months =
			today.getMonth() -
			birth.getMonth();
		return months < 0
			? `${
					years -
					1
			  } years, ${
					12 +
					months
			  } months`
			: `${years} years, ${months} months`;
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div className="flex items-center space-x-4">
							<Link
								to="/"
								className="flex items-center space-x-3"
							>
								<div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
									<span className="text-white font-bold">
										O
									</span>
								</div>
								<span className="text-xl font-bold text-gray-900">
									OrtuPintar
								</span>
							</Link>
						</div>
						<div className="flex items-center space-x-4">
							<Link
								to="/home"
								className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg"
							>
								←
								Back
								to
								Home
							</Link>
							<button
								onClick={() =>
									setShowLogoutModal(
										true
									)
								}
								className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Profile Header */}
				<div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div className="flex items-center space-x-6">
							<div className="relative">
								<div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
									{profileData.avatar ? (
										<img
											src={
												profileData.avatar
											}
											alt="Profile"
											className="w-full h-full object-cover"
										/>
									) : (
										<span className="text-white text-3xl font-bold">
											{user?.name
												? user.name.charAt(
														0
												  )
												: "-"}
										</span>
									)}
								</div>
								<button
									onClick={() =>
										fileInputRef.current?.click()
									}
									className="absolute bottom-0 right-0 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-50"
								>
									<svg
										className="w-4 h-4 text-gray-600"
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
											d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={
												2
											}
											d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</button>
								<input
									ref={
										fileInputRef
									}
									type="file"
									accept="image/*"
									onChange={
										handleAvatarChange
									}
									className="hidden"
								/>
							</div>
							<div>
								<h1 className="text-3xl font-bold text-gray-900">
									{
										user?.name
									}
								</h1>
								<p className="text-gray-600">
									{
										user?.email
									}
								</p>
								<p className="text-sm text-gray-500 mt-1">
									Member
									since{" "}
									{profileData.joinDate
										? new Date(
												profileData.joinDate
										  ).toLocaleDateString()
										: "-"}
								</p>
							</div>
						</div>
						<div className="mt-6 md:mt-0">
							<div className="flex items-center space-x-4">
								<div className="text-center">
									<div className="text-2xl font-bold text-emerald-600">
										{
											children.length
										}
									</div>
									<div className="text-sm text-gray-500">
										Children
									</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-blue-600">
										{children.reduce(
											(
												sum,
												child
											) =>
												sum +
												child.milestones,
											0
										)}
									</div>
									<div className="text-sm text-gray-500">
										Milestones
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="border-b border-gray-200 mb-8">
					<nav className="flex space-x-8">
						{[
							{
								id: "profile",
								name: "Profile",
								icon: "👤",
							},
							{
								id: "children",
								name: "Children",
								icon: "👶",
							},
							{
								id: "preferences",
								name: "Preferences",
								icon: "⚙️",
							},
							{
								id: "security",
								name: "Security",
								icon: "🔒",
							},
						].map(
							(
								tab
							) => (
								<button
									key={
										tab.id
									}
									onClick={() =>
										setActiveTab(
											tab.id
										)
									}
									className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
										activeTab ===
										tab.id
											? "border-emerald-500 text-emerald-600"
											: "border-transparent text-gray-500 hover:text-gray-700"
									}`}
								>
									<span>
										{
											tab.icon
										}
									</span>
									<span>
										{
											tab.name
										}
									</span>
								</button>
							)
						)}
					</nav>
				</div>

				{/* Tab Content */}
				{activeTab ===
					"profile" && (
					<div className="bg-white rounded-2xl shadow-sm border p-8">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-900">
								Profile
								Information
							</h2>
							<button
								onClick={() =>
									setIsEditing(
										!isEditing
									)
								}
								className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
							>
								{isEditing
									? "Cancel"
									: "Edit Profile"}
							</button>
						</div>

						<form
							onSubmit={
								handleProfileUpdate
							}
							className="space-y-6"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Full
										Name
									</label>
									<input
										type="text"
										value={
											profileData.name
										}
										onChange={(
											e
										) =>
											setProfileData(
												(
													prev
												) => ({
													...prev,
													name: e
														.target
														.value,
												})
											)
										}
										disabled={
											!isEditing
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email
										Address
									</label>
									<input
										type="email"
										value={
											profileData.email
										}
										onChange={(
											e
										) =>
											setProfileData(
												(
													prev
												) => ({
													...prev,
													email: e
														.target
														.value,
												})
											)
										}
										disabled={
											!isEditing
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone
										Number
									</label>
									<input
										type="tel"
										value={
											profileData.phone
										}
										onChange={(
											e
										) =>
											setProfileData(
												(
													prev
												) => ({
													...prev,
													phone: e
														.target
														.value,
												})
											)
										}
										disabled={
											!isEditing
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Location
									</label>
									<input
										type="text"
										value={
											profileData.location
										}
										onChange={(
											e
										) =>
											setProfileData(
												(
													prev
												) => ({
													...prev,
													location: e
														.target
														.value,
												})
											)
										}
										disabled={
											!isEditing
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Bio
								</label>
								<textarea
									value={
										profileData.bio
									}
									onChange={(
										e
									) =>
										setProfileData(
											(
												prev
											) => ({
												...prev,
												bio: e
													.target
													.value,
											})
										)
									}
									disabled={
										!isEditing
									}
									rows={
										4
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
								/>
							</div>

							<div className="border-t pt-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Emergency
									Contact
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Name
										</label>
										<input
											type="text"
											value={
												profileData
													.emergencyContact
													.name
											}
											onChange={(
												e
											) =>
												setProfileData(
													(
														prev
													) => ({
														...prev,
														emergencyContact: {
															...prev.emergencyContact,
															name: e
																.target
																.value,
														},
													})
												)
											}
											disabled={
												!isEditing
											}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Phone
										</label>
										<input
											type="tel"
											value={
												profileData
													.emergencyContact
													.phone
											}
											onChange={(
												e
											) =>
												setProfileData(
													(
														prev
													) => ({
														...prev,
														emergencyContact: {
															...prev.emergencyContact,
															phone: e
																.target
																.value,
														},
													})
												)
											}
											disabled={
												!isEditing
											}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Relationship
										</label>
										<input
											type="text"
											value={
												profileData
													.emergencyContact
													.relationship
											}
											onChange={(
												e
											) =>
												setProfileData(
													(
														prev
													) => ({
														...prev,
														emergencyContact: {
															...prev.emergencyContact,
															relationship: e
																.target
																.value,
														},
													})
												)
											}
											disabled={
												!isEditing
											}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
										/>
									</div>
								</div>
							</div>

							{isEditing && (
								<div className="flex justify-end space-x-4">
									<button
										type="button"
										onClick={() =>
											setIsEditing(
												false
											)
										}
										className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
									>
										Save
										Changes
									</button>
								</div>
							)}
						</form>
					</div>
				)}

				{activeTab ===
					"children" && (
					<div className="bg-white rounded-2xl shadow-sm border p-8">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-900">
								My
								Children
							</h2>
							<button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
								Add
								Child
							</button>
						</div>

						<div className="grid gap-6">
							{children.map(
								(
									child
								) => (
									<div
										key={
											child.id
										}
										className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4">
												<div className="text-4xl">
													{
														child.avatar
													}
												</div>
												<div>
													<h3 className="text-xl font-semibold text-gray-900">
														{
															child.name
														}
													</h3>
													<p className="text-gray-600">
														{calculateAge(
															child.birthDate
														)}{" "}
														old
													</p>
													<p className="text-sm text-gray-500">
														Born:{" "}
														{new Date(
															child.birthDate
														).toLocaleDateString()}
													</p>
												</div>
											</div>
											<div className="flex items-center space-x-4">
												<div className="text-center">
													<div className="text-2xl font-bold text-emerald-600">
														{
															child.milestones
														}
													</div>
													<div className="text-sm text-gray-500">
														Milestones
													</div>
												</div>
												<div className="flex space-x-2">
													<button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
														<svg
															className="w-5 h-5"
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
																d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
															/>
														</svg>
													</button>
													<button
														onClick={() =>
															handleDeleteChild(
																child.id
															)
														}
														className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
																strokeWidth={
																	2
																}
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				)}

				{activeTab ===
					"preferences" && (
					<div className="bg-white rounded-2xl shadow-sm border p-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Preferences
						</h2>

						<div className="space-y-8">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Notifications
								</h3>
								<div className="space-y-4">
									{Object.entries(
										preferences.notifications
									).map(
										([
											key,
											value,
										]) => (
											<div
												key={
													key
												}
												className="flex items-center justify-between"
											>
												<span className="text-gray-700 capitalize">
													{key.replace(
														/([A-Z])/g,
														" $1"
													)}
												</span>
												<label className="relative inline-flex items-center cursor-pointer">
													<input
														type="checkbox"
														checked={
															value
														}
														onChange={(
															e
														) =>
															setPreferences(
																(
																	prev
																) => ({
																	...prev,
																	notifications: {
																		...prev.notifications,
																		[key]: e
																			.target
																			.checked,
																	},
																})
															)
														}
														className="sr-only peer"
													/>
													<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
												</label>
											</div>
										)
									)}
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Privacy
								</h3>
								<div className="space-y-4">
									{Object.entries(
										preferences.privacy
									).map(
										([
											key,
											value,
										]) => (
											<div
												key={
													key
												}
												className="flex items-center justify-between"
											>
												<span className="text-gray-700 capitalize">
													{key.replace(
														/([A-Z])/g,
														" $1"
													)}
												</span>
												<label className="relative inline-flex items-center cursor-pointer">
													<input
														type="checkbox"
														checked={
															value
														}
														onChange={(
															e
														) =>
															setPreferences(
																(
																	prev
																) => ({
																	...prev,
																	privacy: {
																		...prev.privacy,
																		[key]: e
																			.target
																			.checked,
																	},
																})
															)
														}
														className="sr-only peer"
													/>
													<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
												</label>
											</div>
										)
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Language
									</label>
									<select
										value={
											preferences.language
										}
										onChange={(
											e
										) =>
											setPreferences(
												(
													prev
												) => ({
													...prev,
													language: e
														.target
														.value,
												})
											)
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
									>
										<option value="en">
											English
										</option>
										<option value="id">
											Bahasa
											Indonesia
										</option>
										<option value="es">
											Español
										</option>
										<option value="fr">
											Français
										</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Timezone
									</label>
									<select
										value={
											preferences.timezone
										}
										onChange={(
											e
										) =>
											setPreferences(
												(
													prev
												) => ({
													...prev,
													timezone: e
														.target
														.value,
												})
											)
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
									>
										<option value="America/New_York">
											Eastern
											Time
										</option>
										<option value="America/Chicago">
											Central
											Time
										</option>
										<option value="America/Denver">
											Mountain
											Time
										</option>
										<option value="America/Los_Angeles">
											Pacific
											Time
										</option>
										<option value="Asia/Jakarta">
											Jakarta
											Time
										</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				)}

				{activeTab ===
					"security" && (
					<div className="bg-white rounded-2xl shadow-sm border p-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Security
							Settings
						</h2>

						<div className="space-y-8">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Change
									Password
								</h3>
								<form className="space-y-4 max-w-md">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Current
											Password
										</label>
										<input
											type="password"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											New
											Password
										</label>
										<input
											type="password"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Confirm
											New
											Password
										</label>
										<input
											type="password"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
										/>
									</div>
									<button
										type="submit"
										className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600"
									>
										Update
										Password
									</button>
								</form>
							</div>

							<div className="border-t pt-8">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Two-Factor
									Authentication
								</h3>
								<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
									<div>
										<p className="font-medium text-gray-900">
											SMS
											Authentication
										</p>
										<p className="text-sm text-gray-500">
											Receive
											codes
											via
											SMS
										</p>
									</div>
									<button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600">
										Enable
									</button>
								</div>
							</div>

							<div className="border-t pt-8">
								<h3 className="text-lg font-semibold text-red-600 mb-4">
									Danger
									Zone
								</h3>
								<div className="space-y-4">
									<div className="p-4 border border-red-200 rounded-lg bg-red-50">
										<h4 className="font-medium text-red-900 mb-2">
											Delete
											Account
										</h4>
										<p className="text-sm text-red-700 mb-4">
											This
											action
											cannot
											be
											undone.
											All
											your
											data
											will
											be
											permanently
											deleted.
										</p>
										<button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
											Delete
											Account
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<LogoutModal
				open={
					showLogoutModal
				}
				onClose={() =>
					setShowLogoutModal(
						false
					)
				}
				onLogout={
					handleLogout
				}
			/>
		</div>
	);
}
