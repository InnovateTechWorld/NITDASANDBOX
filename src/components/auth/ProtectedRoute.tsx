import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // If still loading auth state, show nothing or a loading indicator
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // If role is specified and doesn't match, redirect to appropriate dashboard
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/business'} replace />;
  }

  // User is authenticated and has the correct role, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;