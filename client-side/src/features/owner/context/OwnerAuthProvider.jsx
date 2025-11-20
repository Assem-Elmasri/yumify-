import { createContext, useContext, useState, useEffect } from "react";
import ownerApi from "../../../api/client.js";

// Create Owner Auth Context
const OwnerAuthContext = createContext(null);

/**
 * OwnerAuthProvider Component
 * Provides authentication state and methods to child components
 */
export const OwnerAuthProvider = ({ children }) => {
  const [owner, setOwner] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = !!owner && !!token;

  /**
   * Initialize authentication on mount
   * Read token from localStorage and verify with backend
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("owner_token");

        if (storedToken) {
          // Set token first to make API calls
          setToken(storedToken);

          // Verify token by fetching owner data
          try {
            const response = await ownerApi.me();
            setOwner(response.owner);
            // Token is valid, owner data loaded
          } catch (error) {
            // Token is invalid or expired
            console.error("Token verification failed:", error);
            localStorage.removeItem("owner_token");
            setToken(null);
            setOwner(null);
          }
        } else {
          // No token found, just set loading to false
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("owner_token");
        setToken(null);
        setOwner(null);
      } finally {
        // Always set loading to false even if no token
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function
   * @param {Object} credentials - { identifier, password }
   * @returns {Promise<Object>} Owner data
   */
  const login = async (credentials) => {
    try {
      const response = await ownerApi.login(credentials);

      // Store token in localStorage
      // TODO: implement refresh tokens, secure storage, and HTTP-only cookie strategy in backend
      localStorage.setItem("owner_token", response.token);

      // Update state
      setToken(response.token);
      setOwner(response.owner);

      return response.owner;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  /**
   * Logout function
   * Clears authentication state and localStorage
   */
  const logout = async () => {
    try {
      // Call logout API (even if it fails, we still want to clear local state)
      await ownerApi.logout();
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with logout even if API call fails
    } finally {
      // Clear localStorage
      // TODO: implement refresh tokens, secure storage, and HTTP-only cookie strategy in backend
      localStorage.removeItem("owner_token");

      // Clear state
      setToken(null);
      setOwner(null);
    }
  };

  // Context value
  const value = {
    owner,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <OwnerAuthContext.Provider value={value}>
      {children}
    </OwnerAuthContext.Provider>
  );
};

/**
 * Hook to access owner authentication context
 * @returns {Object} Auth context value
 * @throws {Error} If used outside OwnerAuthProvider
 */
export const useOwnerAuthContext = () => {
  const context = useContext(OwnerAuthContext);

  if (!context) {
    throw new Error(
      "useOwnerAuthContext must be used within an OwnerAuthProvider"
    );
  }

  return context;
};

export default OwnerAuthProvider;

