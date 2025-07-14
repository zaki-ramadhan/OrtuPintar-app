import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function RightSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Test toast on component mount for debugging
  useEffect(() => {
    console.log("🎯 RightSide component mounted, testing toast...");
    // Uncomment this line to test if toast is working
    // toast.success("Toast system is working!");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Form submitted");

    if (!email || !password) {
      console.log("❌ Validation failed: Missing fields");
      toast.error("Please fill in all fields", {
        style: {
          zIndex: 999999,
          position: "fixed",
        },
      });
      return;
    }

    if (!email.includes("@")) {
      console.log("❌ Validation failed: Invalid email");
      toast.error("Please enter a valid email address", {
        style: {
          zIndex: 999999,
          position: "fixed",
        },
      });
      return;
    }

    console.log("✅ Validation passed, attempting login...");
    setLoading(true);

    try {
      console.log("🔐 Attempting user login with:", { email });

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { user, token, message } = response.data;
      console.log("🔍 Login response:", {
        status: response.status,
        data: response.data,
      });

      console.log("✅ Login successful");

      // Simpan user & token
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      console.log("✅ Data saved to localStorage");
      console.log("✅ Login Token:", token);

      // Show success toast immediately with high z-index
      toast.success(message || "Login successful! Welcome back!", {
        style: {
          zIndex: 999999,
          position: "fixed",
          background: "#F0FDF4",
          border: "2px solid #10B981",
          color: "#065F46",
        },
      });

      // Navigate after a short delay
      setTimeout(() => {
        console.log("🔄 Navigating to home...");
        navigate("/home");
      }, 1500);
    } catch (error) {
      console.error("❌ Login error:", error);

      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data?.message || "Login failed. Please try again.";
        console.log("❌ Login failed:", errorMessage);
        toast.error(errorMessage, {
          style: {
            zIndex: 999999,
            position: "fixed",
            background: "#FEF2F2",
            border: "2px solid #EF4444",
            color: "#991B1B",
          },
        });
      } else if (error.request) {
        // Network error
        console.error("❌ Network error:", error.request);
        toast.error(
          "Network error. Please check your connection and try again.",
          {
            style: {
              zIndex: 999999,
              position: "fixed",
              background: "#FEF2F2",
              border: "2px solid #EF4444",
              color: "#991B1B",
            },
          }
        );
      } else {
        // Other error
        console.error("❌ Unexpected error:", error.message);
        toast.error("Something went wrong. Please try again.", {
          style: {
            zIndex: 999999,
            position: "fixed",
            background: "#FEF2F2",
            border: "2px solid #EF4444",
            color: "#991B1B",
          },
        });
      }
    } finally {
      // Reset loading state after delay
      setTimeout(() => {
        console.log("🔄 Resetting loading state");
        setLoading(false);
      }, 1800);
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
                <span className="text-white font-bold">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                OrtuPintar
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
            {/* Debug toast button - remove this in production */}
            {/* 
            <button 
              type="button" 
              onClick={() => {
                console.log("🧪 Testing toast...");
                toast.success("Test toast success!");
                toast.error("Test toast error!");
              }}
              className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Test Toast
            </button>
            */}
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
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
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>

              <button
                type="button"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <button
              type="button"
              className="flex items-center justify-center space-x-2 w-full py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium">Google</span>
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
                <span>Secure & Private</span>
              </div>
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
                <span>GDPR Compliant</span>
              </div>
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
                <span>Trusted by 10k+ families</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
