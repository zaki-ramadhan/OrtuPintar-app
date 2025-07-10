import React from "react";

export default function LogoutModal({ open, onClose, onLogout }) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-xs p-6 relative animate-fadeIn border-t-8 border-red-500">
				<button
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
					onClick={
						onClose
					}
					aria-label="Close"
					type="button"
				>
					&times;
				</button>
				<div className="flex flex-col items-center text-center">
					<div className="bg-red-100 border-2 border-red-400 rounded-full w-14 h-14 flex items-center justify-center mb-3 shadow">
						<svg
							className="w-7 h-7 text-red-500"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
							/>
						</svg>
					</div>
					<h2 className="text-xl font-semibold text-red-600 mb-1 tracking-tight">
						Logout
					</h2>
					<p className="text-gray-700 mb-4 text-sm leading-relaxed">
						Are
						you
						sure
						you
						want
						to{" "}
						<span className="text-red-600 font-bold">
							logout
						</span>

						?
					</p>
					<div className="flex gap-2 w-full mt-1">
						<button
							className="flex-1 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-semibold border border-gray-200"
							onClick={
								onClose
							}
							type="button"
						>
							Cancel
						</button>
						<button
							className="flex-1 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-semibold shadow border border-red-500"
							onClick={
								onLogout
							}
							type="button"
						>
							<span className="inline-flex items-center gap-1 justify-center">
								<svg
									className="w-4 h-4 mr-1 -ml-1"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
									/>
								</svg>
								Logout
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
