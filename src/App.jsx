import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import AuthPage from './components/AuthPage.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import ConsentManagement from './components/ConsentManagement.jsx';

function AppContent() {
  const { isAuthenticated, isLoading, hasCompletedProfile } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (!hasCompletedProfile) {
    return <RegistrationForm />;
  }

  // Show consent management dashboard
  return <ConsentManagement />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;