// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout components
import AdminLayout from './layouts/AdminLayout';
import BusinessLayout from './layouts/BusinessLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import ApplicationReview from './pages/admin/ApplicationReview';
import ApplicationDetail from './pages/admin/ApplicationDetail';
import ProgressReports from './pages/admin/ProgressReports';
import GuidelinesEditor from './pages/admin/GuidelinesEditor';

// Business pages
import BusinessDashboard from './pages/business/Dashboard';
import ApplicationForm from './pages/business/ApplicationForm';
import TestCases from './pages/business/TestCases';
import ProgressUpload from './pages/business/ProgressUpload';
import ComplianceChatbot from './pages/business/ComplianceChatbot';
import Guidelines from './pages/business/Guidelines';

// Protected route component
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages';

function App() {
  // const [loading, setLoading] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
          <Route path="/" element={<LandingPage />} />

            {/* Auth routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="applications" element={<ApplicationReview />} />
              <Route path="applications/:id" element={<ApplicationDetail />} />
              <Route path="progress-reports" element={<ProgressReports />} />
              <Route path="guidelines" element={<GuidelinesEditor />} />
            </Route>

            {/* Business routes */}
            <Route
              path="/business"
              element={
                <ProtectedRoute role="business">
                  <BusinessLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BusinessDashboard />} />
              <Route path="apply" element={<ApplicationForm />} />
              <Route path="test-cases" element={<TestCases />} />
              <Route path="progress" element={<ProgressUpload />} />
              <Route path="chatbot" element={<ComplianceChatbot />} />
              <Route path="guidelines" element={<Guidelines />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;