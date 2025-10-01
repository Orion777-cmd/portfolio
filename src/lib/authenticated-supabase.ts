import { supabase } from "./supabase";

// Function to get authenticated Supabase client with admin headers
export const getAuthenticatedSupabase = () => {
  const adminToken = localStorage.getItem("admin_token");
  const adminEmail = localStorage.getItem("admin_email");

  if (adminToken && adminEmail) {
    // Set headers for admin requests
    supabase.auth.setSession({
      access_token: adminToken,
      refresh_token: "",
    });

    // For custom headers, we'll need to use a different approach
    // since Supabase client doesn't directly support custom headers for RLS
    return supabase;
  }

  return supabase;
};

// Function to check if user is admin
export const isAdmin = (): boolean => {
  const adminToken = localStorage.getItem("admin_token");
  const adminEmail = localStorage.getItem("admin_email");
  return !!(adminToken && adminEmail);
};

// Function to create admin headers for requests
export const getAdminHeaders = () => {
  const adminToken = localStorage.getItem("admin_token");
  const adminEmail = localStorage.getItem("admin_email");

  if (adminToken && adminEmail) {
    return {
      "x-admin-token": adminToken,
      "x-admin-email": adminEmail,
    };
  }

  return {};
};
