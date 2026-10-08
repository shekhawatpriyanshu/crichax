import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export const AuthCard = ({ activeTab, onTabChange, onAuthSuccess }) => {
  return (
    <div className="auth-card-container">
      <div className="auth-card-inner">
        {/* Tabs header */}
        <div className="auth-tabs-wrapper" role="tablist">
          <button
            id="tab-btn-login"
            type="button"
            role="tab"
            aria-selected={activeTab === 'login'}
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => onTabChange('login')}
          >
            Sign In
          </button>
          <button
            id="tab-btn-register"
            type="button"
            role="tab"
            aria-selected={activeTab === 'register'}
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => onTabChange('register')}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div className="auth-form-body">
          {activeTab === 'login' ? (
            <LoginForm
              onSwitchToRegister={() => onTabChange('register')}
              onSuccess={onAuthSuccess}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={() => onTabChange('login')}
              onSuccess={onAuthSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
