import React from 'react';
import TeamRankings from '../components/rankings/TeamRankings';
import { ArrowLeft, Trophy } from 'lucide-react';

export const RankingsPage = ({ onBackToDashboard }) => {
  return (
    <div className="rankings-page-container">
      {/* Top Header Row with Back Button */}
      <div className="rankings-page-header-nav">
        <button
          type="button"
          id="btn-back-from-rankings"
          className="btn-back-hub"
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
        <div className="rankings-page-badge">
          <span className="live-pill-animated">
            <Trophy size={13} /> ICC OFFICIAL STANDINGS
          </span>
        </div>
      </div>

      {/* Main Rankings Content with Men/Women Switcher & Podium */}
      <TeamRankings />
    </div>
  );
};

export default RankingsPage;
