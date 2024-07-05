/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.js

import { Navigate, useLocation } from "react-router-dom";
import { isTokenExpired } from "./auth";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const ProtectedRoute = ({ element: Component }) => {
  const { token } = useContext(UserContext);

  const location = useLocation();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return Component;
};

export default ProtectedRoute;
