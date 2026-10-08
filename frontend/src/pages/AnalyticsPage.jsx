import React from 'react';
import PlayerAnalytics from '../components/analytics/PlayerAnalytics';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const AnalyticsPage = ({ onBackToDashboard }) => {
  return (
    <div className="analytics-page-container">
      {/* Top Header Row with Back Button */}
      <div className="analytics-page-header-nav">
        <button
          type="button"
          id="btn-back-from-analytics"
          className="btn-back-hub"
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
        <div className="analytics-header-badge">
          <span className="analytics-pill">
            <Sparkles size={13} /> CRICKET INTELLIGENCE HUB
          </span>
        </div>
      </div>

      {/* Main Analytics Content with Search Box & Player Stats */}
      <PlayerAnalytics />
    </div>
  );
};

export default AnalyticsPage;
