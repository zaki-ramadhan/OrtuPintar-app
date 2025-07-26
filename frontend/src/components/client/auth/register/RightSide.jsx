import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function RightSide() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] =
		useState(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Password strength checker
	const checkPasswordStrength = (password) => {
		const requirements = {
			length:
				password.length >=
				8,
			uppercase: /[A-Z]/.test(
				password
			),
			lowercase: /[a-z]/.test(
				password
			),
			number: /\d/.test(
				password
			),
		};

		const metRequirements =
			Object.values(
				requirements
			).filter(
				Boolean
			).length;

		let strength = "weak";
		let color = "text-red-500";
		let bgColor = "bg-red-500";
		let progress = 25;

		if (metRequirements === 4) {
			strength =
				"strong";
			color =
				"text-green-500";
			bgColor =
				"bg-green-500";
			progress = 100;
		} else if (
			metRequirements ===
			3
		) {
			strength =
				"good";
			color =
				"text-yellow-500";
			bgColor =
				"bg-yellow-500";
			progress = 75;
		} else if (
			metRequirements ===
			2
		) {
			strength =
				"fair";
			color =
				"text-orange-500";
			bgColor =
				"bg-orange-500";
			progress = 50;
		}

		return {
			strength,
			color,
			bgColor,
			progress,
			requirements,
			score: metRequirements,
		};
	};

	const passwordStrength = checkPasswordStrength(
		formData.password
	);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e
				.target
				.name]:
				e
					.target
					.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check password strength
		if (
			passwordStrength.score <
			4
		) {
			toast.error(
				"Please create a stronger password with all requirements!"
			);
			return;
		}

		if (
			formData.password !==
			formData.confirmPassword
		) {
			toast.error(
				"Passwords do not match!"
			);
			return;
		}

		setIsLoading(true);

		try {
			const response =
				await axios.post(
					`${API_URL}/auth/register`,
					{
						name: formData.fullName,
						email: formData.email,
						password: formData.password,
					}
				);

			const {
				token,
				user,
			} =
				response.data;

			localStorage.setItem(
				"token",
				token
			);
			localStorage.setItem(
				"user",
				JSON.stringify(
					user
				)
			);

			toast.success(
				"Registration successful! Please wait..."
			);
			setTimeout(
				() => {
					navigate(
						"/login"
					);
				},
				1800
			);
		} catch (err) {
			console.error(
				"Register error:",
				err
			);
			toast.error(
				err
					.response
					?.data
					?.message ||
					"Registration failed."
			);
		} finally {
			setTimeout(
				() =>
					setIsLoading(
						false
					),
				2000
			);
		}
	};

	return (
		<div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
			<div className="w-full max-w-md">
				<div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
					{/* Mobile Logo */}
					<div className="lg:hidden flex items-center justify-center mb-8">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
								<span className="text-white font-bold">
									O
								</span>
							</div>
							<span className="text-xl font-bold text-gray-900">
								OrtuPintar
							</span>
						</div>
					</div>

					{/* Form Header */}
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Create
							Your
							Account
						</h2>
						<p className="text-gray-600">
							Already
							have
							an
							account?{" "}
							<Link
								to="/login"
								className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
							>
								Sign
								in
							</Link>
						</p>
					</div>

					{/* Registration Form */}
					<form
						className="space-y-6"
						onSubmit={
							handleSubmit
						}
					>
						{/* Name Fields */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Full
								Name
								*
							</label>
							<input
								type="text"
								name="fullName"
								value={
									formData.fullName
								}
								onChange={
									handleChange
								}
								placeholder="Enter Full name"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50"
								required
							/>
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email
								Address
								*
							</label>
							<input
								type="email"
								name="email"
								value={
									formData.email
								}
								onChange={
									handleChange
								}
								placeholder="Enter your email"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50"
								required
							/>
						</div>

						{/* Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Password
								*
							</label>
							<div className="relative">
								<input
									type={
										showPassword
											? "text"
											: "password"
									}
									name="password"
									value={
										formData.password
									}
									onChange={
										handleChange
									}
									placeholder="Create a strong password"
									className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50"
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(
											!showPassword
										)
									}
									className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showPassword ? (
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
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M3 3l18 18"
											/>
										</svg>
									) : (
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
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									)}
								</button>
							</div>

							{/* Password Strength Indicator */}
							{formData.password && (
								<div className="mt-3 space-y-2">
									{/* Progress Bar */}
									<div className="flex items-center space-x-2">
										<div className="flex-1 bg-gray-200 rounded-full h-2">
											<div
												className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.bgColor}`}
												style={{
													width: `${passwordStrength.progress}%`,
												}}
											></div>
										</div>
										<span
											className={`text-xs font-medium ${passwordStrength.color} capitalize`}
										>
											{
												passwordStrength.strength
											}
										</span>
									</div>

									{/* Requirements Checklist */}
									<div className="space-y-1">
										<div className="grid grid-cols-2 gap-1">
											<div
												className={`flex items-center space-x-1 text-xs ${
													passwordStrength
														.requirements
														.length
														? "text-green-600"
														: "text-gray-400"
												}`}
											>
												<svg
													className="w-3 h-3"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													{passwordStrength
														.requirements
														.length ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M5 13l4 4L19 7"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M6 18L18 6M6 6l12 12"
														/>
													)}
												</svg>
												<span>
													8+
													characters
												</span>
											</div>

											<div
												className={`flex items-center space-x-1 text-xs ${
													passwordStrength
														.requirements
														.uppercase
														? "text-green-600"
														: "text-gray-400"
												}`}
											>
												<svg
													className="w-3 h-3"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													{passwordStrength
														.requirements
														.uppercase ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M5 13l4 4L19 7"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M6 18L18 6M6 6l12 12"
														/>
													)}
												</svg>
												<span>
													Uppercase
												</span>
											</div>

											<div
												className={`flex items-center space-x-1 text-xs ${
													passwordStrength
														.requirements
														.lowercase
														? "text-green-600"
														: "text-gray-400"
												}`}
											>
												<svg
													className="w-3 h-3"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													{passwordStrength
														.requirements
														.lowercase ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M5 13l4 4L19 7"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M6 18L18 6M6 6l12 12"
														/>
													)}
												</svg>
												<span>
													Lowercase
												</span>
											</div>

											<div
												className={`flex items-center space-x-1 text-xs ${
													passwordStrength
														.requirements
														.number
														? "text-green-600"
														: "text-gray-400"
												}`}
											>
												<svg
													className="w-3 h-3"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													{passwordStrength
														.requirements
														.number ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M5 13l4 4L19 7"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={
																2
															}
															d="M6 18L18 6M6 6l12 12"
														/>
													)}
												</svg>
												<span>
													Number
												</span>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Confirm Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Confirm
								Password
								*
							</label>
							<div className="relative">
								<input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									name="confirmPassword"
									value={
										formData.confirmPassword
									}
									onChange={
										handleChange
									}
									placeholder="Confirm your password"
									className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-200 bg-white/50 ${
										formData.confirmPassword &&
										formData.password !==
											formData.confirmPassword
											? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
											: formData.confirmPassword &&
											  formData.password ===
													formData.confirmPassword
											? "border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
											: "border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
									}`}
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
									className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showConfirmPassword ? (
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
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M3 3l18 18"
											/>
										</svg>
									) : (
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
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={
													2
												}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									)}
								</button>
							</div>

							{/* Password Match Indicator */}
							{formData.confirmPassword && (
								<div className="mt-2">
									{formData.password ===
									formData.confirmPassword ? (
										<div className="flex items-center space-x-1 text-xs text-green-600">
											<svg
												className="w-3 h-3"
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
											<span>
												Passwords
												match
											</span>
										</div>
									) : (
										<div className="flex items-center space-x-1 text-xs text-red-600">
											<svg
												className="w-3 h-3"
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
											<span>
												Passwords
												do
												not
												match
											</span>
										</div>
									)}
								</div>
							)}
						</div>

						{/* Terms and Newsletter */}
						<div className="space-y-3">
							<label className="flex items-start space-x-3">
								<input
									type="checkbox"
									className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5"
									required
								/>
								<span className="text-sm text-gray-600">
									I
									agree
									to
									OrtuPintar's{" "}
									<a
										href="#"
										className="text-emerald-600 hover:text-emerald-700 font-medium"
									>
										Terms
										of
										Service
									</a>{" "}
									and{" "}
									<a
										href="#"
										className="text-emerald-600 hover:text-emerald-700 font-medium"
									>
										Privacy
										Policy
									</a>
								</span>
							</label>

							<label className="flex items-start space-x-3">
								<input
									type="checkbox"
									className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5"
								/>
								<span className="text-sm text-gray-600">
									I'd
									like
									to
									receive
									parenting
									tips
									and
									product
									updates
									via
									email
								</span>
							</label>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={
								isLoading ||
								passwordStrength.score <
									4 ||
								formData.password !==
									formData.confirmPassword
							}
							className={`w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg 
    flex items-center justify-center space-x-2
    transition-all duration-300
    ${
		isLoading ||
		passwordStrength.score <
			4 ||
		formData.password !==
			formData.confirmPassword
			? "opacity-50 cursor-not-allowed"
			: "hover:shadow-xl hover:scale-105"
    }
  `}
						>
							{isLoading ? (
								<span>
									Registering...
								</span>
							) : (
								<>
									<span>
										Create
										Account
									</span>
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
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								</>
							)}
						</button>
					</form>

					{/* Trust Indicators */}
					<div className="mt-8 text-center">
						<div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
							<div className="flex items-center space-x-1">
								<svg
									className="w-3 h-3 text-green-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>
									256-bit
									SSL
									Encryption
								</span>
							</div>
							<div className="flex items-center space-x-1">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
