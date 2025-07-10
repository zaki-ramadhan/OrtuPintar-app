import LeftSide from "@/components/client/auth/register/LeftSide";
import RightSide from "@/components/client/auth/register/RightSide";
import { useEffect } from "react";

export default function RegisterPage() {
	useEffect(() => {
		document.title =
			"Register - OrtuPintar";
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
			</div>

			<div className="relative z-10 min-h-screen flex justify-start items-start">
				{/* Left Side - Branding */}
				<LeftSide />

				{/* Right Side - Registration Form */}
				<RightSide />
			</div>
		</div>
	);
}
