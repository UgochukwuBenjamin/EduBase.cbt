import React from "react";
import { Navigate } from "react-router-dom";

// type can be "student" or "admin"
const ProtectedRoute = ({ children, type }) => {
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const admin = JSON.parse(localStorage.getItem("edubaseUser"));

  if (type === "student" && !student) {
    return <Navigate to="/student-login" replace />;
  }

  if (type === "admin" && !admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
