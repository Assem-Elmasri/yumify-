import { useOwnerAuthContext } from "../context/OwnerAuthProvider.jsx";

/**
 * Custom hook to access owner authentication state and methods
 * 
 * @returns {Object} Auth context value containing:
 *   - owner: Current owner object or null
 *   - token: Current authentication token or null
 *   - isAuthenticated: Boolean indicating if owner is logged in
 *   - isLoading: Boolean indicating if auth is being initialized
 *   - login: Function to login (credentials) => Promise<owner>
 *   - logout: Function to logout () => Promise<void>
 * 
 * @throws {Error} If used outside OwnerAuthProvider
 * 
 * @example
 * ```jsx
 * function MyComponent() {
 *   const { owner, isAuthenticated, login, logout } = useOwnerAuth();
 *   
 *   if (!isAuthenticated) {
 *     return <LoginForm onLogin={login} />;
 *   }
 *   
 *   return <div>Welcome, {owner.name}!</div>;
 * }
 * ```
 */
const useOwnerAuth = () => {
  try {
    return useOwnerAuthContext();
  } catch (error) {
    // Provide a more helpful error message
    throw new Error(
      `useOwnerAuth must be used within an OwnerAuthProvider. ` +
        `Make sure to wrap your component tree with <OwnerAuthProvider>. ` +
        `Original error: ${error.message}`
    );
  }
};

export default useOwnerAuth;

