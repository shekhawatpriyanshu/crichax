import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon, BarChart3, Tv, LayoutGrid, TrendingUp, Trophy, Calendar, Newspaper } from 'lucide-react';

export const Navbar = ({ currentView, onViewChange }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div
          className="navbar-brand"
          onClick={() => onViewChange && onViewChange(isAuthenticated ? 'hub' : 'login')}
          title="Go to Home"
        >
          <div className="brand-icon-wrapper">
            <span className="cricket-ball-glyph">🏏</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">CRI<span className="gradient-text">CHAX</span></span>
            <span className="brand-tagline">Cricket Analytics</span>
          </div>
        </div>

        {/* Center Navigation Links (When authenticated) */}
        {isAuthenticated && (
          <nav className="navbar-nav-links" aria-label="Main Navigation">
            <button
              type="button"
              id="nav-btn-dashboard"
              className={`nav-link-btn ${currentView === 'hub' ? 'active' : ''}`}
              onClick={() => onViewChange && onViewChange('hub')}
            >
              <LayoutGrid size={15} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              id="nav-btn-live-scores"
              className={`nav-link-btn nav-live-highlight ${currentView === 'matches' ? 'active' : ''}`}
              onClick={() => onViewChange && onViewChange('matches')}
            >
              <span className="nav-live-dot"></span>
              <BarChart3 size={15} />
              <span>Live Cricket Score</span>
            </button>

            <button
              type="button"
              id="nav-btn-stream"
              className={`nav-link-btn ${currentView === 'stream' ? 'active' : ''}`}
              onClick={() => onViewChange && onViewChange('stream')}
            >
              <Tv size={15} />
              <span>Live Stream</span>
            </button>

            <button
              type="button"
              id="nav-btn-analytics"
              className={`nav-link-btn ${currentView === 'analytics' ? 'active' : ''}`}
              onClick={() => onViewChange && onViewChange('analytics')}
            >
              <TrendingUp size={15} />
              <span>Player Analytics</span>
            </button>

            <button
              type="button"
              id="nav-btn-rankings"
              className={`nav-link-btn ${currentView === 'rankings' ? 'active' : ''}`}
              onClick={() => onViewChange && onViewChange('rankings')}
            >
              <Trophy size={15} />
              <span>ICC Rankings</span>
            </button>

            <button
              type="button"
              id="nav-btn-schedule"
              className={`nav-link-btn ${currentView === 'schedule' ? 'active' : ''}`}
              onClick={() => onViewChange && onViewChange('schedule')}
            >
              <Calendar size={15} />
              <span>Schedule</span>
            </button>

            <button
              type="button"
              id="nav-btn-news"
              className={`nav-link-btn ${currentView === 'news' ? 'active' : ''}`}
              onClick={() => onViewChange && onViewChange('news')}
            >
              <Newspaper size={15} />
              <span>News & Videos</span>
            </button>
          </nav>
        )}

        {/* User Navigation / Quick Actions (Only when logged in) */}
        {isAuthenticated && (
          <div className="navbar-actions">
            <div className="user-profile-menu">
              <div className="user-badge">
                <div className="user-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={16} />}
                </div>
                <div className="user-info-text">
                  <span className="user-name">{user?.name}</span>
                  <span className="user-role-tag">{user?.role || 'user'}</span>
                </div>
              </div>
              <button
                id="btn-navbar-logout"
                type="button"
                className="btn-logout-compact"
                onClick={logout}
                title="Log Out"
              >
                <LogOut size={16} />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
