import React, { useState, useEffect } from "react";
import axios from "axios";

function ContentManagementHeader({ openContentModal, stats, onRefresh }) {
	const [isExporting, setIsExporting] = useState(false);

	const handleExport = async () => {
		setIsExporting(true);
		try {
			// TODO: Implement export functionality
			setTimeout(() => setIsExporting(false), 1000);
		} catch (error) {
			console.error("Export error:", error);
			setIsExporting(false);
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
			<div>
				<h2 className="text-2xl font-bold text-gray-900">
					Activities Management
				</h2>
				<p className="text-gray-600">
					Manage educational activities and developmental content
				</p>
			</div>
			<div className="flex gap-3">
				<button 
					onClick={onRefresh}
					className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
				>
					<svg
						className="w-4 h-4 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					Refresh
				</button>
				<button 
					onClick={handleExport}
					disabled={isExporting}
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
				>
					<svg
						className="w-4 h-4 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						/>
					</svg>
					{isExporting ? "Exporting..." : "Export"}
				</button>
				<button
					onClick={() => openContentModal("add")}
					className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
				>
					<svg
						className="w-4 h-4 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
					Create Activity
				</button>
			</div>
		</div>
	);
}

function ContentStats({ stats, loading }) {
	if (loading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
				{[...Array(4)].map((_, index) => (
					<div key={index} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 animate-pulse">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
								<div className="h-8 bg-gray-200 rounded w-12"></div>
							</div>
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex-shrink-0 ml-4"></div>
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
			<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
				<div className="flex items-center justify-between">
					<div className="min-w-0 flex-1">
						<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
							Total Activities
						</p>
						<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
							{stats?.total || 0}
						</p>
					</div>
					<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
						<svg
							className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
				</div>
				<div className="mt-3 sm:mt-4">
					<span className="text-xs sm:text-sm text-green-600 font-medium">
						All activities
					</span>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
				<div className="flex items-center justify-between">
					<div className="min-w-0 flex-1">
						<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
							Published
						</p>
						<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
							{stats?.published || 0}
						</p>
					</div>
					<div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
						<svg
							className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</div>
				<div className="mt-3 sm:mt-4">
					<span className="text-xs sm:text-sm text-green-600 font-medium">
						{stats?.total ? Math.round((stats.published / stats.total) * 100) : 0}% published
					</span>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
				<div className="flex items-center justify-between">
					<div className="min-w-0 flex-1">
						<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
							Draft
						</p>
						<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">
							{stats?.draft || 0}
						</p>
					</div>
					<div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
						<svg
							className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							/>
						</svg>
					</div>
				</div>
				<div className="mt-3 sm:mt-4">
					<span className="text-xs sm:text-sm text-yellow-600 font-medium">
						In progress
					</span>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
				<div className="flex items-center justify-between">
					<div className="min-w-0 flex-1">
						<p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
							Milestones
						</p>
						<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">
							{stats?.milestones || 0}
						</p>
					</div>
					<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
						<svg
							className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
							/>
						</svg>
					</div>
				</div>
				<div className="mt-3 sm:mt-4">
					<span className="text-xs sm:text-sm text-purple-600 font-medium">
						Special activities
					</span>
				</div>
			</div>
		</div>
	);
}

function ContentFilters() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Search
						Content
					</label>
					<input
						type="text"
						placeholder="Search by title..."
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Content
						Type
					</label>
					<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
						<option value="all">
							All
							Types
						</option>
						<option value="article">
							Article
						</option>
						<option value="activity">
							Activity
						</option>
						<option value="milestone">
							Milestone
						</option>
						<option value="tip">
							Tip
						</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Status
					</label>
					<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
						<option value="all">
							All
							Status
						</option>
						<option value="published">
							Published
						</option>
						<option value="draft">
							Draft
						</option>
						<option value="review">
							Under
							Review
						</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Category
					</label>
					<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
						<option value="all">
							All
							Categories
						</option>
						<option value="development">
							Development
						</option>
						<option value="nutrition">
							Nutrition
						</option>
						<option value="health">
							Health
						</option>
						<option value="education">
							Education
						</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Date
						Range
					</label>
					<input
						type="date"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
					/>
				</div>
			</div>
		</div>
	);
}

function ContentList({ openContentModal, openConfirmModal }) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">
					Recent
					Content
				</h3>
			</div>
			<div className="divide-y divide-gray-200">
				{[
					{
						id: 1,
						title: "Understanding Child Development Milestones",
						type: "article",
						category: "development",
						status: "published",
						author: "Dr. Sarah Johnson",
						publishDate: "2025-01-05",
						views: "1.2K",
						featured: true,
					},
					{
						id: 2,
						title: "Fun Learning Activities for Toddlers",
						type: "activity",
						category: "education",
						status: "draft",
						author: "Mike Chen",
						publishDate: "2025-01-04",
						views: "856",
						featured: false,
					},
					{
						id: 3,
						title: "Healthy Nutrition Tips for Growing Kids",
						type: "tip",
						category: "nutrition",
						status: "published",
						author: "Emma Wilson",
						publishDate: "2025-01-03",
						views: "2.1K",
						featured: true,
					},
				].map(
					(
						content
					) => (
						<div
							key={
								content.id
							}
							className="p-6 hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-center justify-between">
								<div className="flex-1 min-w-0">
									<div className="flex items-center space-x-3 mb-2">
										<h4 className="text-lg font-medium text-gray-900 truncate">
											{
												content.title
											}
										</h4>
										{content.featured && (
											<span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
												Featured
											</span>
										)}
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												content.status ===
												"published"
													? "bg-green-100 text-green-800"
													: content.status ===
													  "draft"
													? "bg-yellow-100 text-yellow-800"
													: "bg-blue-100 text-blue-800"
											}`}
										>
											{
												content.status
											}
										</span>
									</div>
									<div className="flex items-center space-x-4 text-sm text-gray-500">
										<span className="capitalize">
											{
												content.type
											}
										</span>
										<span>
											•
										</span>
										<span className="capitalize">
											{
												content.category
											}
										</span>
										<span>
											•
										</span>
										<span>
											By{" "}
											{
												content.author
											}
										</span>
										<span>
											•
										</span>
										<span>
											{
												content.publishDate
											}
										</span>
										<span>
											•
										</span>
										<span>
											{
												content.views
											}{" "}
											views
										</span>
									</div>
								</div>
								<div className="flex items-center space-x-2 ml-4">
									<button
										onClick={() =>
											openContentModal(
												"view",
												content
											)
										}
										className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
									>
										<svg
											className="w-4 h-4 mr-1"
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
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
										View
									</button>
									<button
										onClick={() =>
											openContentModal(
												"edit",
												content
											)
										}
										className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
									>
										<svg
											className="w-4 h-4 mr-1"
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
										Edit
									</button>
									<button
										onClick={() =>
											openConfirmModal(
												"delete",
												content
											)
										}
										className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
									>
										<svg
											className="w-4 h-4 mr-1"
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
									</button>
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default function ContentManagementTab({
	openContentModal,
	openConfirmModal,
}) {
	return (
		<div className="space-y-6">
			{/* Content Management Header */}
			<ContentManagementHeader
				openContentModal={
					openContentModal
				}
			/>

			{/* Content Stats */}
			<ContentStats />

			{/* Content Filters */}
			<ContentFilters />

			{/* Content List */}
			<ContentList
				openContentModal={
					openContentModal
				}
				openConfirmModal={
					openConfirmModal
				}
			/>
		</div>
	);
}
