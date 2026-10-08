import React from 'react';
import { useAuth } from '../context/AuthContext';
import LiveStreaming from '../components/cricket/LiveStreaming';
import MatchesPage from './MatchesPage';
import AnalyticsPage from './AnalyticsPage';
import RankingsPage from './RankingsPage';
import SchedulePage from './SchedulePage';
import NewsVideosPage from './NewsVideosPage';
import {
  Tv,
  BarChart3,
  ChevronRight,
  Radio,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Search,
  Trophy,
  Crown,
  Calendar,
  Newspaper,
  Film
} from 'lucide-react';

export const DashboardPage = ({ currentView = 'hub', onViewChange }) => {
  const { user } = useAuth();

  // 1. If user clicked into Matches Page, render ONLY MatchesPage (Dedicated View)
  if (currentView === 'matches') {
    return <MatchesPage onBackToDashboard={() => onViewChange && onViewChange('hub')} />;
  }

  // 2. If user clicked into Live Stream, render ONLY LiveStreaming (Dedicated View)
  if (currentView === 'stream') {
    return (
      <div className="stream-dedicated-page">
        <div className="stream-page-header-nav">
          <button
            type="button"
            id="btn-back-from-stream"
            className="btn-back-hub"
            onClick={() => onViewChange && onViewChange('hub')}
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
          <div className="stream-header-badge">
            <span className="live-pill-animated">
              <span className="live-dot-pulse"></span> LIVE BROADCAST
            </span>
          </div>
        </div>
        <LiveStreaming />
      </div>
    );
  }

  // 3. If user clicked into Player Analytics, render ONLY AnalyticsPage (Dedicated View)
  if (currentView === 'analytics') {
    return <AnalyticsPage onBackToDashboard={() => onViewChange && onViewChange('hub')} />;
  }

  // 4. If user clicked into ICC Team Rankings, render ONLY RankingsPage (Dedicated View)
  if (currentView === 'rankings') {
    return <RankingsPage onBackToDashboard={() => onViewChange && onViewChange('hub')} />;
  }

  // 5. If user clicked into Cricket Schedule, render ONLY SchedulePage (Dedicated View)
  if (currentView === 'schedule') {
    return <SchedulePage onBackToDashboard={() => onViewChange && onViewChange('hub')} />;
  }

  // 6. If user clicked into News & Videos, render ONLY NewsVideosPage (Dedicated View)
  if (currentView === 'news') {
    return <NewsVideosPage onBackToDashboard={() => onViewChange && onViewChange('hub')} />;
  }

  // Otherwise, render Dashboard Hub with ONLY the 6 option cards
  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-strip">
        <div className="welcome-text-meta">
          <span className="welcome-pill">
            <Sparkles size={14} /> LIVE CRICKET HUB
          </span>
          <h2 className="welcome-heading">Welcome back, {user?.name || 'Cricket Fan'}!</h2>
          <p className="welcome-sub">
            Choose an option below to stream matches, track live scores, analyze players, view ICC rankings, check schedule, or watch highlights & news.
          </p>
        </div>
      </div>

      {/* Multiple Options Hub Selector: 6 Primary Options */}
      <div className="cricket-options-hub">
        {/* Option 1: Live Streaming Match */}
        <div
          id="option-live-stream"
          className="option-choice-card"
          onClick={() => onViewChange && onViewChange('stream')}
        >
          <div className="option-card-icon-box stream-icon">
            <Tv size={26} />
          </div>
          <div className="option-card-body">
            <div className="option-title-row">
              <h3 className="option-title">1. Live Streaming Match</h3>
              <span className="option-badge-live">HD BROADCAST</span>
            </div>
            <p className="option-desc">
              Watch ongoing international matches in ultra-low latency HD, switch cameras & join fan chat.
            </p>
          </div>
          <ChevronRight size={22} className="option-card-arrow" />
        </div>

        {/* Option 2: Live Match Score */}
        <div
          id="option-live-score"
          className="option-choice-card"
          onClick={() => onViewChange && onViewChange('matches')}
        >
          <div className="option-card-icon-box score-icon">
            <BarChart3 size={26} />
          </div>
          <div className="option-card-body">
            <div className="option-title-row">
              <h3 className="option-title">2. Live Cricket Score</h3>
              <span className="option-badge-score">
                <Radio size={11} className="inline-dot-pulse" /> WORLDWIDE LIVE
              </span>
            </div>
            <p className="option-desc">
              View worldwide fixtures, real-time ball tracking, run-rates, upcoming matches, and scorecards.
            </p>
          </div>
          <ChevronRight size={22} className="option-card-arrow" />
        </div>

        {/* Option 3: Player Analytics */}
        <div
          id="option-player-analytics"
          className="option-choice-card"
          onClick={() => onViewChange && onViewChange('analytics')}
        >
          <div className="option-card-icon-box analytics-icon">
            <TrendingUp size={26} />
          </div>
          <div className="option-card-body">
            <div className="option-title-row">
              <h3 className="option-title">3. Player Analytics</h3>
              <span className="option-badge-analytics">
                <Search size={11} /> SEARCH & STATS
              </span>
            </div>
            <p className="option-desc">
              Search any cricketer by name to view complete career statistics, records, ICC rankings, and form.
            </p>
          </div>
          <ChevronRight size={22} className="option-card-arrow" />
        </div>

        {/* Option 4: ICC Team Rankings (Men & Women) */}
        <div
          id="option-team-rankings"
          className="option-choice-card"
          onClick={() => onViewChange && onViewChange('rankings')}
        >
          <div className="option-card-icon-box rankings-icon">
            <Trophy size={26} />
          </div>
          <div className="option-card-body">
            <div className="option-title-row">
              <h3 className="option-title">4. ICC Team Rankings</h3>
              <span className="option-badge-rankings">
                <Crown size={11} /> MEN & WOMEN
              </span>
            </div>
            <p className="option-desc">
              Official ICC rankings for Men's and Women's teams, podium champions & points across Test, ODI, and T20I.
            </p>
          </div>
          <ChevronRight size={22} className="option-card-arrow" />
        </div>

        {/* Option 5: Cricket Schedule & Fixtures */}
        <div
          id="option-cricket-schedule"
          className="option-choice-card"
          onClick={() => onViewChange && onViewChange('schedule')}
        >
          <div className="option-card-icon-box schedule-icon">
            <Calendar size={26} />
          </div>
          <div className="option-card-body">
            <div className="option-title-row">
              <h3 className="option-title">5. Cricket Schedule</h3>
              <span className="option-badge-schedule">
                <Calendar size={11} /> FIXTURES & DATES
              </span>
            </div>
            <p className="option-desc">
              Explore international calendar, upcoming bilateral series, T20 league dates, venues & countdown timers.
            </p>
          </div>
          <ChevronRight size={22} className="option-card-arrow" />
        </div>

        {/* Option 6: Cricket News & Video Highlights */}
        <div
          id="option-cricket-news"
          className="option-choice-card highlight-glow"
          onClick={() => onViewChange && onViewChange('news')}
        >
          <div className="option-card-icon-box news-icon">
            <Newspaper size={26} />
          </div>
          <div className="option-card-body">
            <div className="option-title-row">
              <h3 className="option-title">6. Cricket News & Videos</h3>
              <span className="option-badge-news">
                <Film size={11} /> BREAKING & HIGHLIGHTS
              </span>
            </div>
            <p className="option-desc">
              Breaking international stories, viral match moments, powerplay highlights, expert analysis & interviews.
            </p>
          </div>
          <ChevronRight size={22} className="option-card-arrow" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
