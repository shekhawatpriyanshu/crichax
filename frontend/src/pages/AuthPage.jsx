import React from 'react';
import AuthCard from '../components/auth/AuthCard';

export const AuthPage = ({ activeTab, onTabChange, onAuthSuccess }) => {
  return (
    <div className="auth-page-wrapper">
      <AuthCard
        activeTab={activeTab}
        onTabChange={onTabChange}
        onAuthSuccess={onAuthSuccess}
      />
    </div>
  );
};

export default AuthPage;
