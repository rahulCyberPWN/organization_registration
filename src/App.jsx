import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import AuthPage from './components/AuthPage.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import AgreementManagement from './components/AgreementManagement.jsx';
import AgreementForm from './components/AgreementForm.jsx';

function AppContent() {
  const { isAuthenticated, isLoading, hasCompletedProfile } = useAuth();
  const [currentView, setCurrentView] = React.useState('dashboard');
  const [editingAgreement, setEditingAgreement] = React.useState(null);

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

  const handleNavigateToAgreements = () => {
    setCurrentView('agreements');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setEditingAgreement(null);
  };

  const handleEditAgreement = (agreement) => {
    setEditingAgreement(agreement);
    setCurrentView('form');
  };

  const handleCreateAgreement = () => {
    setEditingAgreement(null);
    setCurrentView('form');
  };

  const handleSaveAgreement = (agreementData) => {
    console.log('Agreement saved:', agreementData);
    // Here you would typically save to your backend
    setCurrentView('agreements');
    setEditingAgreement(null);
  };

  // Render different views based on current state
  switch (currentView) {
    case 'agreements':
      return (
        <AgreementManagement
          onBack={handleBackToDashboard}
          onEditAgreement={handleEditAgreement}
          onCreateAgreement={handleCreateAgreement}
        />
      );
    case 'form':
      return (
        <AgreementForm
          onBack={() => setCurrentView('agreements')}
          onSave={handleSaveAgreement}
          editingAgreement={editingAgreement}
        />
      );
    default:
      return <Dashboard onNavigateToAgreements={handleNavigateToAgreements} />;
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;