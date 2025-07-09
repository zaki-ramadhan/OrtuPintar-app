import { useState, useEffect } from "react";
import AdminModal from "./AdminModal";
import toast from "react-hot-toast";

export default function ContentManagementModal({
	isOpen,
	onClose,
	content = null,
	mode = "view", // "view", "edit", "add"
	onSave,
	onDelete,
}) {
	const [formData, setFormData] = useState({
		title: "",
		type: "article",
		category: "development",
		status: "draft",
		description: "",
		content: "",
		ageRange: "0-12",
		tags: [],
		author: "",
		publishDate: "",
		featured: false,
		difficulty: "beginner",
	});

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [tagInput, setTagInput] = useState("");

	useEffect(() => {
		if (content && isOpen) {
			setFormData(
				{
					title:
						content.title ||
						"",
					type:
						content.type ||
						"article",
					category:
						content.category ||
						"development",
					status:
						content.status ||
						"draft",
					description:
						content.description ||
						"",
					content:
						content.content ||
						"",
					ageRange:
						content.ageRange ||
						"0-12",
					tags:
						content.tags ||
						[],
					author:
						content.author ||
						"",
					publishDate:
						content.publishDate ||
						"",
					featured:
						content.featured ||
						false,
					difficulty:
						content.difficulty ||
						"beginner",
				}
			);
		} else if (
			mode ===
				"add" &&
			isOpen
		) {
			setFormData(
				{
					title: "",
					type: "article",
					category: "development",
					status: "draft",
					description: "",
					content: "",
					ageRange: "0-12",
					tags: [],
					author: "",
					publishDate: new Date()
						.toISOString()
						.split(
							"T"
						)[0],
					featured: false,
					difficulty: "beginner",
				}
			);
		}
		setErrors({});
		setTagInput("");
	}, [content, isOpen, mode]);

	const validateForm = () => {
		const newErrors = {};

		if (
			!formData.title.trim()
		) {
			newErrors.title =
				"Title is required";
		}

		if (
			!formData.description.trim()
		) {
			newErrors.description =
				"Description is required";
		}

		if (
			!formData.content.trim()
		) {
			newErrors.content =
				"Content is required";
		}

		if (
			!formData.author.trim()
		) {
			newErrors.author =
				"Author is required";
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
				`Content ${
					mode ===
					"add"
						? "created"
						: "updated"
				} successfully`
			);
			onClose();
		} catch (error) {
			console.error(
				"Error saving content:",
				error
			);
			toast.error(
				"Failed to save content"
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
				content.id
			);
			toast.success(
				"Content deleted successfully"
			);
			onClose();
		} catch (error) {
			console.error(
				"Error deleting content:",
				error
			);
			toast.error(
				"Failed to delete content"
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

	const handleAddTag = () => {
		if (
			tagInput.trim() &&
			!formData.tags.includes(
				tagInput.trim()
			)
		) {
			setFormData(
				(
					prev
				) => ({
					...prev,
					tags: [
						...prev.tags,
						tagInput.trim(),
					],
				})
			);
			setTagInput(
				""
			);
		}
	};

	const handleRemoveTag = (tagToRemove) => {
		setFormData((prev) => ({
			...prev,
			tags: prev.tags.filter(
				(
					tag
				) =>
					tag !==
					tagToRemove
			),
		}));
	};

	const getModalTitle = () => {
		switch (mode) {
			case "add":
				return "Create New Content";
			case "edit":
				return "Edit Content";
			default:
				return "Content Details";
		}
	};

	const contentTypes = [
		{
			value: "article",
			label: "Article",
		},
		{
			value: "activity",
			label: "Activity",
		},
		{
			value: "milestone",
			label: "Milestone",
		},
		{
			value: "tip",
			label: "Parenting Tip",
		},
		{
			value: "guide",
			label: "Guide",
		},
	];

	const categories = [
		{
			value: "development",
			label: "Child Development",
		},
		{
			value: "nutrition",
			label: "Nutrition",
		},
		{
			value: "health",
			label: "Health & Safety",
		},
		{
			value: "education",
			label: "Education",
		},
		{
			value: "activities",
			label: "Activities",
		},
		{
			value: "behavior",
			label: "Behavior",
		},
	];

	const ageRanges = [
		{
			value: "0-6",
			label: "0-6 months",
		},
		{
			value: "6-12",
			label: "6-12 months",
		},
		{
			value: "1-2",
			label: "1-2 years",
		},
		{
			value: "2-4",
			label: "2-4 years",
		},
		{
			value: "4-6",
			label: "4-6 years",
		},
		{
			value: "6-12",
			label: "6-12 years",
		},
		{
			value: "0-12",
			label: "All ages",
		},
	];

	const difficulties = [
		{
			value: "beginner",
			label: "Beginner",
		},
		{
			value: "intermediate",
			label: "Intermediate",
		},
		{
			value: "advanced",
			label: "Advanced",
		},
	];

	const statuses = [
		{
			value: "draft",
			label: "Draft",
		},
		{
			value: "review",
			label: "Under Review",
		},
		{
			value: "published",
			label: "Published",
		},
		{
			value: "archived",
			label: "Archived",
		},
	];

	const isReadOnly = mode === "view";

	return (
		<AdminModal
			isOpen={
				isOpen
			}
			onClose={
				onClose
			}
			title={getModalTitle()}
			size="xl"
		>
			<div className="space-y-6">
				{/* Content Header */}
				<div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
					<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
						<svg
							className="w-6 h-6 text-white"
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
					<div className="flex-1">
						<h4 className="text-lg font-semibold text-gray-900">
							{formData.title ||
								"New Content"}
						</h4>
						<p className="text-gray-600">
							{
								formData.type
							}{" "}
							•{" "}
							{
								formData.category
							}
						</p>
						{mode ===
							"view" && (
							<div className="flex items-center space-x-4 mt-2">
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${
										formData.status ===
										"published"
											? "bg-green-100 text-green-800"
											: formData.status ===
											  "review"
											? "bg-yellow-100 text-yellow-800"
											: formData.status ===
											  "draft"
											? "bg-gray-100 text-gray-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{
										formData.status
									}
								</span>
								{formData.featured && (
									<span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
										Featured
									</span>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Form Fields */}
				<div className="space-y-4">
					{/* Title and Type */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Title
								*
							</label>
							<input
								type="text"
								value={
									formData.title
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"title",
										e
											.target
											.value
									)
								}
								readOnly={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									errors.title
										? "border-red-500"
										: "border-gray-300"
								} ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								}`}
								placeholder="Enter content title"
							/>
							{errors.title && (
								<p className="text-red-500 text-sm mt-1">
									{
										errors.title
									}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Content
								Type
							</label>
							<select
								value={
									formData.type
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"type",
										e
											.target
											.value
									)
								}
								disabled={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								} border-gray-300`}
							>
								{contentTypes.map(
									(
										type
									) => (
										<option
											key={
												type.value
											}
											value={
												type.value
											}
										>
											{
												type.label
											}
										</option>
									)
								)}
							</select>
						</div>
					</div>

					{/* Category and Age Range */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Category
							</label>
							<select
								value={
									formData.category
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"category",
										e
											.target
											.value
									)
								}
								disabled={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								} border-gray-300`}
							>
								{categories.map(
									(
										category
									) => (
										<option
											key={
												category.value
											}
											value={
												category.value
											}
										>
											{
												category.label
											}
										</option>
									)
								)}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Age
								Range
							</label>
							<select
								value={
									formData.ageRange
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"ageRange",
										e
											.target
											.value
									)
								}
								disabled={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								} border-gray-300`}
							>
								{ageRanges.map(
									(
										range
									) => (
										<option
											key={
												range.value
											}
											value={
												range.value
											}
										>
											{
												range.label
											}
										</option>
									)
								)}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Difficulty
							</label>
							<select
								value={
									formData.difficulty
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"difficulty",
										e
											.target
											.value
									)
								}
								disabled={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								} border-gray-300`}
							>
								{difficulties.map(
									(
										difficulty
									) => (
										<option
											key={
												difficulty.value
											}
											value={
												difficulty.value
											}
										>
											{
												difficulty.label
											}
										</option>
									)
								)}
							</select>
						</div>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Description
							*
						</label>
						<textarea
							value={
								formData.description
							}
							onChange={(
								e
							) =>
								handleInputChange(
									"description",
									e
										.target
										.value
								)
							}
							readOnly={
								isReadOnly
							}
							rows={
								3
							}
							className={`w-full px-3 py-2 border rounded-lg transition-colors ${
								errors.description
									? "border-red-500"
									: "border-gray-300"
							} ${
								isReadOnly
									? "bg-gray-50 cursor-not-allowed"
									: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
							}`}
							placeholder="Enter content description"
						/>
						{errors.description && (
							<p className="text-red-500 text-sm mt-1">
								{
									errors.description
								}
							</p>
						)}
					</div>

					{/* Content */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Content
							*
						</label>
						<textarea
							value={
								formData.content
							}
							onChange={(
								e
							) =>
								handleInputChange(
									"content",
									e
										.target
										.value
								)
							}
							readOnly={
								isReadOnly
							}
							rows={
								8
							}
							className={`w-full px-3 py-2 border rounded-lg transition-colors ${
								errors.content
									? "border-red-500"
									: "border-gray-300"
							} ${
								isReadOnly
									? "bg-gray-50 cursor-not-allowed"
									: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
							}`}
							placeholder="Enter content body"
						/>
						{errors.content && (
							<p className="text-red-500 text-sm mt-1">
								{
									errors.content
								}
							</p>
						)}
					</div>

					{/* Tags */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Tags
						</label>
						{!isReadOnly && (
							<div className="flex mb-2">
								<input
									type="text"
									value={
										tagInput
									}
									onChange={(
										e
									) =>
										setTagInput(
											e
												.target
												.value
										)
									}
									onKeyPress={(
										e
									) =>
										e.key ===
											"Enter" &&
										(e.preventDefault(),
										handleAddTag())
									}
									className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
									placeholder="Add a tag"
								/>
								<button
									type="button"
									onClick={
										handleAddTag
									}
									className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors"
								>
									Add
								</button>
							</div>
						)}
						<div className="flex flex-wrap gap-2">
							{formData.tags.map(
								(
									tag,
									index
								) => (
									<span
										key={
											index
										}
										className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
									>
										{
											tag
										}
										{!isReadOnly && (
											<button
												onClick={() =>
													handleRemoveTag(
														tag
													)
												}
												className="ml-2 text-purple-600 hover:text-purple-800"
											>
												<svg
													className="w-4 h-4"
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
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										)}
									</span>
								)
							)}
						</div>
					</div>

					{/* Author, Status, and Settings */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Author
								*
							</label>
							<input
								type="text"
								value={
									formData.author
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"author",
										e
											.target
											.value
									)
								}
								readOnly={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									errors.author
										? "border-red-500"
										: "border-gray-300"
								} ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								}`}
								placeholder="Enter author name"
							/>
							{errors.author && (
								<p className="text-red-500 text-sm mt-1">
									{
										errors.author
									}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Status
							</label>
							<select
								value={
									formData.status
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"status",
										e
											.target
											.value
									)
								}
								disabled={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								} border-gray-300`}
							>
								{statuses.map(
									(
										status
									) => (
										<option
											key={
												status.value
											}
											value={
												status.value
											}
										>
											{
												status.label
											}
										</option>
									)
								)}
							</select>
						</div>
					</div>

					{/* Publish Date and Featured */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Publish
								Date
							</label>
							<input
								type="date"
								value={
									formData.publishDate
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"publishDate",
										e
											.target
											.value
									)
								}
								readOnly={
									isReadOnly
								}
								className={`w-full px-3 py-2 border rounded-lg transition-colors ${
									isReadOnly
										? "bg-gray-50 cursor-not-allowed"
										: "focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								} border-gray-300`}
							/>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								id="featured"
								checked={
									formData.featured
								}
								onChange={(
									e
								) =>
									handleInputChange(
										"featured",
										e
											.target
											.checked
									)
								}
								disabled={
									isReadOnly
								}
								className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
							/>
							<label
								htmlFor="featured"
								className="ml-2 text-sm font-medium text-gray-700"
							>
								Featured
								Content
							</label>
						</div>
					</div>
				</div>

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
										? "Create Content"
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
