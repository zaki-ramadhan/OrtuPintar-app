import { useState, useEffect } from "react";
import AdminModal from "./AdminModal";
import toast from "react-hot-toast";

export default function UserManagementModal({
	isOpen,
	onClose,
	user = null,
	mode = "view", // "view", "edit", "add"
	onSave,
	onDelete,
}) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		status: "active",
		role: "user",
		children: 0,
		joinDate: "",
		lastActivity: "",
	});

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (user && isOpen) {
			setFormData(
				{
					name:
						user.name ||
						"",
					email:
						user.email ||
						"",
					phone:
						user.phone ||
						"",
					status:
						user.status ||
						"active",
					role:
						user.role ||
						"user",
					children:
						user.children ||
						0,
					joinDate:
						user.joinDate ||
						"",
					lastActivity:
						user.lastActivity ||
						"",
				}
			);
		} else if (
			mode ===
				"add" &&
			isOpen
		) {
			setFormData(
				{
					name: "",
					email: "",
					phone: "",
					status: "active",
					role: "user",
					children: 0,
					joinDate: new Date()
						.toISOString()
						.split(
							"T"
						)[0],
					lastActivity: new Date().toISOString(),
				}
			);
		}
		setErrors({});
	}, [user, isOpen, mode]);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name =
				"Name is required";
		}

		if (
			!formData.email.trim()
		) {
			newErrors.email =
				"Email is required";
		} else if (
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
				formData.email
			)
		) {
			newErrors.email =
				"Invalid email format";
		}

		if (
			!formData.phone.trim()
		) {
			newErrors.phone =
				"Phone number is required";
		}

		setErrors(newErrors);
		return (
			Object.keys(
				newErrors
			)
				.length ===
			0
		);
	};

	const handleSave = async () => {
		if (!validateForm()) return;

		setLoading(true);
		try {
			await onSave(
				formData
			);
			toast.success(
				`User ${
					mode ===
					"add"
						? "added"
						: "updated"
				} successfully`
			);
			onClose();
		} catch (error) {
			console.error(
				"Error saving user:",
				error
			);
			toast.error(
				"Failed to save user"
			);
		} finally {
			setLoading(
				false
			);
		}
	};

	const handleDelete = async () => {
		setLoading(true);
		try {
			await onDelete(
				user.id
			);
			toast.success(
				"User deleted successfully"
			);
			onClose();
		} catch (error) {
			console.error(
				"Error deleting user:",
				error
			);
			toast.error(
				"Failed to delete user"
			);
		} finally {
			setLoading(
				false
			);
		}
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
		if (errors[field]) {
			setErrors(
				(
					prev
				) => ({
					...prev,
					[field]: "",
				})
			);
		}
	};

	const getModalTitle = () => {
		switch (mode) {
			case "add":
				return "Add New User";
			case "edit":
				return "Edit User";
			default:
				return "User Details";
		}
	};

	const renderField = (
		label,
		field,
		type = "text",
		options = null
	) => {
		const isReadOnly =
			mode ===
			"view";

		return (
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					{
						label
					}
				</label>
				{type ===
					"select" &&
				options ? (
					<select
						value={
							formData[
								field
							]
						}
						onChange={(
							e
						) =>
							handleInputChange(
								field,
								e
									.target
									.value
							)
						}
						disabled={
							isReadOnly
						}
						className={`w-full px-3 py-2 border rounded-lg transition-colors ${
							errors[
								field
							]
								? "border-red-500"
								: "border-gray-300"
						} ${
							isReadOnly
								? "bg-gray-50 cursor-not-allowed"
								: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
						}`}
					>
						{options.map(
							(
								option
							) => (
								<option
									key={
										option.value
									}
									value={
										option.value
									}
								>
									{
										option.label
									}
								</option>
							)
						)}
					</select>
				) : (
					<input
						type={
							type
						}
						value={
							formData[
								field
							]
						}
						onChange={(
							e
						) =>
							handleInputChange(
								field,
								e
									.target
									.value
							)
						}
						readOnly={
							isReadOnly
						}
						className={`w-full px-3 py-2 border rounded-lg transition-colors ${
							errors[
								field
							]
								? "border-red-500"
								: "border-gray-300"
						} ${
							isReadOnly
								? "bg-gray-50 cursor-not-allowed"
								: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
						}`}
					/>
				)}
				{errors[
					field
				] && (
					<p className="text-red-500 text-sm mt-1">
						{
							errors[
								field
							]
						}
					</p>
				)}
			</div>
		);
	};

	return (
		<AdminModal
			isOpen={
				isOpen
			}
			onClose={
				onClose
			}
			title={getModalTitle()}
			size="lg"
		>
			<div className="space-y-6">
				{/* User Avatar & Basic Info */}
				<div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
					<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
						<span className="text-white text-xl font-bold">
							{formData.name
								? formData.name
										.charAt(
											0
										)
										.toUpperCase()
								: "U"}
						</span>
					</div>
					<div className="flex-1">
						<h4 className="text-lg font-semibold text-gray-900">
							{formData.name ||
								"New User"}
						</h4>
						<p className="text-gray-600">
							{
								formData.email
							}
						</p>
						{mode ===
							"view" && (
							<div className="flex items-center space-x-4 mt-2">
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${
										formData.status ===
										"active"
											? "bg-green-100 text-green-800"
											: formData.status ===
											  "pending"
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{
										formData.status
									}
								</span>
								<span className="text-sm text-gray-500">
									{
										formData.children
									}{" "}
									children
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Form Fields */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{renderField(
						"Full Name",
						"name"
					)}
					{renderField(
						"Email Address",
						"email",
						"email"
					)}
					{renderField(
						"Phone Number",
						"phone",
						"tel"
					)}
					{renderField(
						"Status",
						"status",
						"select",
						[
							{
								value: "active",
								label: "Active",
							},
							{
								value: "pending",
								label: "Pending",
							},
							{
								value: "inactive",
								label: "Inactive",
							},
							{
								value: "suspended",
								label: "Suspended",
							},
						]
					)}
					{renderField(
						"Role",
						"role",
						"select",
						[
							{
								value: "user",
								label: "User",
							},
							{
								value: "premium",
								label: "Premium User",
							},
							{
								value: "moderator",
								label: "Moderator",
							},
						]
					)}
					{renderField(
						"Number of Children",
						"children",
						"number"
					)}
				</div>

				{mode ===
					"view" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{renderField(
							"Join Date",
							"joinDate",
							"date"
						)}
						{renderField(
							"Last Activity",
							"lastActivity",
							"datetime-local"
						)}
					</div>
				)}

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
					<button
						onClick={
							onClose
						}
						disabled={
							loading
						}
						className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
					>
						{mode ===
						"view"
							? "Close"
							: "Cancel"}
					</button>

					{mode ===
						"edit" &&
						onDelete && (
							<button
								onClick={
									handleDelete
								}
								disabled={
									loading
								}
								className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
							>
								{loading ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
											/>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											/>
										</svg>
										Deleting...
									</>
								) : (
									<>
										<svg
											className="w-4 h-4 mr-2"
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
										Delete
									</>
								)}
							</button>
						)}

					{(mode ===
						"edit" ||
						mode ===
							"add") && (
						<button
							onClick={
								handleSave
							}
							disabled={
								loading
							}
							className="flex-1 px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
						>
							{loading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Saving...
								</>
							) : (
								<>
									<svg
										className="w-4 h-4 mr-2"
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
											d="M5 13l4 4L19 7"
										/>
									</svg>
									{mode ===
									"add"
										? "Add User"
										: "Save Changes"}
								</>
							)}
						</button>
					)}
				</div>
			</div>
		</AdminModal>
	);
}
