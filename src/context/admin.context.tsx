import React, { createContext, useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAdmin(!!session);
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        // Store admin session
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_email", email);
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
    setIsAdmin(false);
  };

  // Check for existing admin token on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const email = localStorage.getItem("admin_email");
    if (token && email) {
      // Verify token is still valid
      verifyAdminToken(token, email);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyAdminToken = async (token: string, email: string) => {
    try {
      // You can add additional token verification here
      // For now, we'll just check if the token exists
      if (token && email) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Token verification error:", error);
      logout();
    } finally {
      setIsLoading(false);
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
