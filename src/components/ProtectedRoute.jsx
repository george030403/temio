import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/demo/login" replace />;
  }

  // Si el usuario no tiene el rol permitido, redirigir a su dashboard correspondiente
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    if (user.role === 'boss') {
      return <Navigate to="/demo/boss" replace />;
    }
    return <Navigate to="/demo/employee" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
