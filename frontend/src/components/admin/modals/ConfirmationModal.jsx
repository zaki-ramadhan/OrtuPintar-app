import AdminModal from "./AdminModal";

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Action",
	message = "Are you sure you want to proceed?",
	confirmText = "Confirm",
	cancelText = "Cancel",
	type = "warning",
	loading = false,
}) {
	const handleConfirm = async () => {
		await onConfirm();
		onClose();
	};

	const typeStyles = {
		danger: {
			icon: (
				<svg
					className="w-6 h-6 text-red-600"
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
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
					/>
				</svg>
			),
			confirmBg: "bg-red-600 hover:bg-red-700",
			border: "border-red-200",
		},
		warning: {
			icon: (
				<svg
					className="w-6 h-6 text-yellow-600"
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
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
					/>
				</svg>
			),
			confirmBg: "bg-yellow-600 hover:bg-yellow-700",
			border: "border-yellow-200",
		},
		info: {
			icon: (
				<svg
					className="w-6 h-6 text-blue-600"
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
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
			confirmBg: "bg-blue-600 hover:bg-blue-700",
			border: "border-blue-200",
		},
	};

	const currentStyle =
		typeStyles[type] ||
		typeStyles.warning;

	return (
		<AdminModal
			isOpen={
				isOpen
			}
			onClose={
				onClose
			}
			title={
				title
			}
			size="sm"
		>
			<div className="text-center">
				{/* Icon */}
				<div
					className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-${
						type ===
						"danger"
							? "red"
							: type ===
							  "info"
							? "blue"
							: "yellow"
					}-100 mb-4`}
				>
					{
						currentStyle.icon
					}
				</div>

				{/* Message */}
				<p className="text-gray-600 mb-6">
					{
						message
					}
				</p>

				{/* Buttons */}
				<div className="flex flex-col sm:flex-row gap-3">
					<button
						onClick={
							onClose
						}
						disabled={
							loading
						}
						className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
					>
						{
							cancelText
						}
					</button>
					<button
						onClick={
							handleConfirm
						}
						disabled={
							loading
						}
						className={`flex-1 px-4 py-2 text-white ${currentStyle.confirmBg} rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center`}
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
								Processing...
							</>
						) : (
							confirmText
						)}
					</button>
				</div>
			</div>
		</AdminModal>
	);
}
