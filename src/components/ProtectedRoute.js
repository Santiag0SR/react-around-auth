import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, ...props }) => {
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
