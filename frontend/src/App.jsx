import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import Loader from './components/common/Loader';

import './styles/variables.css';
import './styles/index.css';
import './styles/navbar.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/cricket.css';
import './styles/matches.css';
import './styles/analytics.css';
import './styles/rankings.css';
import './styles/schedule.css';
import './styles/news.css';

const MainApp = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  // View states for authenticated user: 'hub' | 'matches' | 'stream' | 'analytics' | 'rankings' | 'schedule' | 'news'
  const [activeView, setActiveView] = useState('hub');

  if (isLoading) {
    return <Loader label="Connecting to CriChax..." fullScreen />;
  }

  return (
    <div className="app-container">
      <Navbar
        currentView={isAuthenticated ? activeView : activeTab}
        onViewChange={(newView) => {
          if (newView === 'login' || newView === 'register') {
            setActiveTab(newView);
          } else if (newView === 'dashboard' || newView === 'hub') {
            setActiveView('hub');
          } else if (newView === 'matches' || newView === 'stream' || newView === 'analytics' || newView === 'rankings' || newView === 'schedule' || newView === 'news') {
            setActiveView(newView);
          }
        }}
      />

      <main className="main-content">
        {isAuthenticated ? (
          <DashboardPage
            currentView={activeView}
            onViewChange={setActiveView}
          />
        ) : (
          <AuthPage
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            onAuthSuccess={() => {
              setActiveView('hub');
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
