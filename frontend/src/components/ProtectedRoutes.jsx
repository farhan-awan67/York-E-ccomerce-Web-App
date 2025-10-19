import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { token } = useContext(ShopContext);

  //   if no token dont show pages
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoutes;
