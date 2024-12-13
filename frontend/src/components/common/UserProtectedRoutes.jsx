import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProtectedRoutes = () => {

  const { isAuthenticated} = useSelector(state => state.adminStore);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login"/>
  );
};

export default UserProtectedRoutes;