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
      <div className="flex  justify-center min-h-screen">
        <span className="loading loading-ball loading-xs"></span>
<span className="loading loading-ball loading-sm"></span>
<span className="loading loading-ball loading-md"></span>
<span className="loading loading-ball loading-lg"></span>
<span className="loading loading-ball loading-xl"></span>
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
