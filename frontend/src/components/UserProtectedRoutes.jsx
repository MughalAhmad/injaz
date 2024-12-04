import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProtectedRoutes = () => {

  const location = useLocation();
  const { isAuthenticated } = useSelector(state => state.Store);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default UserProtectedRoutes;