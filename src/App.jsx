import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import DemoLogin from './pages/DemoLogin';
import ForgotPassword from './pages/ForgotPassword';
import EmployeeDashboard from './pages/EmployeeDashboard';
import BossDashboard from './pages/BossDashboard';
import { Toaster } from '@/components/ui/toaster';

// Componente de error boundary para debugging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error en la aplicación</h1>
            <p className="text-gray-600">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Componente para redirigir según el rol después del login
const DashboardRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/demo/login" replace />;
  }
  
  // Redirigir según el rol
  if (user.role === 'boss') {
    return <Navigate to="/demo/boss" replace />;
  }
  return <Navigate to="/demo/employee" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Demo Routes */}
          <Route path="/demo/login" element={<DemoLogin />} />
          <Route path="/demo/forgot-password" element={<ForgotPassword />} />
          
          {/* Redirección automática según rol */}
          <Route path="/demo/dashboard" element={<DashboardRedirect />} />
          
          {/* Dashboard Empleado - Solo para rol employee */}
          <Route
            path="/demo/employee"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Dashboard Jefe - Solo para rol boss */}
          <Route
            path="/demo/boss"
            element={
              <ProtectedRoute allowedRoles={['boss']}>
                <BossDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default AppWithErrorBoundary;