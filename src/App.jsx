import { useState } from 'react';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import Calculator from './components/Calculator';
import Converter from './components/Converter';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

function AppContent() {
  const [activeTab, setActiveTab] = useState('calculator');
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = () => {
    instance.logout();
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  const account = accounts[0];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      {/* Header with user info and logout */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <h1 style={{ margin: 0 }}>Math & Conversion Tools</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Welcome, {account?.name || account?.username}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <button
          onClick={() => setActiveTab('calculator')}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'calculator' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'calculator' ? 'white' : 'black'
          }}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('converter')}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'converter' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'converter' ? 'white' : 'black'
          }}
        >
          Unit Converter
        </button>
      </div>

      {/* Content */}
      {activeTab === 'calculator' ? <Calculator /> : <Converter />}
    </div>
  );
}

function App() {
  return (
    <ProtectedRoute>
      <AppContent />
    </ProtectedRoute>
  );
}

export default App;