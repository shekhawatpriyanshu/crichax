import React from 'react';
import CricketSchedule from '../components/schedule/CricketSchedule';
import { ArrowLeft, Calendar } from 'lucide-react';

export const SchedulePage = ({ onBackToDashboard }) => {
  return (
    <div className="schedule-page-container">
      {/* Top Header Row with Back Button */}
      <div className="schedule-page-header-nav">
        <button
          type="button"
          id="btn-back-from-schedule"
          className="btn-back-hub"
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
        <div className="schedule-page-badge">
          <span className="live-pill-animated">
            <Calendar size={13} /> OFFICIAL FIXTURES
          </span>
        </div>
      </div>

      {/* Main Schedule Content */}
      <CricketSchedule />
    </div>
  );
};

export default SchedulePage;
