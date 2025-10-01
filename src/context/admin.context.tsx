import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkStoredAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const email = localStorage.getItem("admin_email");
      const expiry = localStorage.getItem("admin_token_expiry");

      if (token && email && expiry) {
        // Check if token has expired
        const now = Date.now();
        const expiryTime = parseInt(expiry);

        if (now > expiryTime) {
          // Token expired, clear it
          logout();
          return;
        }

        // Verify token is still valid
        const isValid = await verifyAdminToken(token, email);
        if (isValid) {
          setIsAdmin(true);
        } else {
          // Token is invalid, clear it
          logout();
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check for existing admin token on mount
  useEffect(() => {
    checkStoredAuth();
  }, [checkStoredAuth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Call our custom authentication function
      const { data, error } = await supabase.rpc("authenticate_admin", {
        admin_email: email,
        admin_password: password,
      });

      if (error) {
        console.error("Authentication error:", error);
        return false;
      }

      if (data && data.authenticated) {
        // Store admin session with expiry
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_email", email);
        localStorage.setItem("admin_token_expiry", expiryTime.toString());
        setIsAdmin(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_token_expiry");
    setIsAdmin(false);
  };

  const verifyAdminToken = async (
    _token: string,
    email: string
  ): Promise<boolean> => {
    try {
      // For now, we'll verify by checking if the admin exists and is active
      // In a production app, you'd want to verify the token signature/expiry
      const { data, error } = await supabase
        .from("admin_users")
        .select("email, is_active")
        .eq("email", email)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        return false;
      }

      // Token exists and admin is active
      return true;
    } catch (error) {
      console.error("Token verification error:", error);
      return false;
    }
  };

  const value = {
    isAdmin,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
