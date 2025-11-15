import { Navigate, Outlet, useLocation } from "react-router-dom";
import useOwnerAuth from "./hooks/useOwnerAuth.js";

/**
 * OwnerRoute - Protected Route Component
 * 
 * Acts as a guard for owner portal routes.
 * - If user is authenticated: renders child routes via <Outlet />
 * - If user is not authenticated: redirects to /owner/login
 * - Preserves attempted path in state for redirect after login
 * 
 * @example
 * ```jsx
 * <Route path="/owner" element={<OwnerRoute />}>
 *   <Route path="dashboard" element={<Dashboard />} />
 * </Route>
 * ```
 */
const OwnerRoute = () => {
  const { isAuthenticated, isLoading } = useOwnerAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        aria-label="Loading authentication"
      >
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login with current location as state
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/owner/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // User is authenticated, render child routes
  return <Outlet />;
};

export default OwnerRoute;

