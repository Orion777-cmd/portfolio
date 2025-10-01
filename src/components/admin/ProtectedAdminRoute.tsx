import React from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../../context/admin.context";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
}) => {
  const { isAdmin, isLoading } = useAdmin();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login (AdminLogin component will be shown)
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the admin panel
  return <>{children}</>;
};

export default ProtectedAdminRoute;
