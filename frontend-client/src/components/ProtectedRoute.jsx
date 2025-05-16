import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";
import toast from "./Toast"

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();  // Just call your custom hook directly



  const isAuthenticated = !!token;

    useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to access this page');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
