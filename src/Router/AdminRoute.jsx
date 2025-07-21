import React from "react";
import { Navigate, useLocation } from "react-router";
import useUserRole from "../Hooks/useUserRole";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { isAdmin, loading } = useUserRole(user?.email);
  const location = useLocation();

  if (loading) {
 
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600">
        Loading...
      </div>
    );
  }

  if (!user) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {

    return <Navigate to="/dashboard/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
