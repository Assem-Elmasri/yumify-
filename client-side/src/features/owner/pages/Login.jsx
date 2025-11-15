import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useOwnerAuth from "../hooks/useOwnerAuth.js";

// Primary accent color: #FF7A18
const PRIMARY_COLOR = "#FF7A18";

/**
 * Owner Login Page
 * Simple login form with client validation and loading state
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useOwnerAuth();

  // Form state
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/owner/dashboard";

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear general error message
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  /**
   * Validate form inputs
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Identifier is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrorMessage("");
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Call login function from auth context
      // This will save token to localStorage via the provider
      await login({
        identifier: formData.identifier.trim(),
        password: formData.password,
      });

      // Login successful - navigate to previous location or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);

      // Set error message
      const message =
        error.message || "Login failed. Please check your credentials.";
      setErrorMessage(message);

      // Optionally clear password field on error
      // setFormData(prev => ({ ...prev, password: '' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: PRIMARY_COLOR }}
          >
            Yumify
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Owner Portal
          </h2>
          <p className="text-gray-600">Sign in to manage your restaurant</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Error Toast */}
            {errorMessage && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3"
                role="alert"
                aria-live="assertive"
              >
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Identifier Input */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.identifier
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-${PRIMARY_COLOR} focus:border-${PRIMARY_COLOR}"
                }`}
                style={
                  !errors.identifier
                    ? {
                        "--tw-ring-color": PRIMARY_COLOR,
                      }
                    : {}
                }
                placeholder="Enter your email or username"
                aria-invalid={errors.identifier ? "true" : "false"}
                aria-describedby={
                  errors.identifier ? "identifier-error" : undefined
                }
                disabled={isLoading}
              />
              {errors.identifier && (
                <p
                  id="identifier-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-${PRIMARY_COLOR} focus:border-${PRIMARY_COLOR}"
                }`}
                style={
                  !errors.password
                    ? {
                        "--tw-ring-color": PRIMARY_COLOR,
                      }
                    : {}
                }
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                disabled={isLoading}
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: PRIMARY_COLOR }}
              aria-label="Sign in to owner portal"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Demo Credentials Hint */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                <span className="font-medium">Demo credentials:</span> Any
                identifier and password will work
              </p>
            </div>
          </form>

          {/* Back to Main App Link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Go back to main app"
            >
              ← Back to main app
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
