import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "./localStorage";

// ProtectedRoute component using Outlet
const ProtectedRoute = () => {
  const [value] = useLocalStorage();

  console.log("value", value);

  return value?._id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
