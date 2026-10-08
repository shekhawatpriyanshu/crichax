import React, { useState, useEffect, useCallback, useRef } from 'react';
import LiveScoreboard from '../components/cricket/LiveScoreboard';
import { getLiveMatches } from '../services/matchService';
import {
  Radio,
  CheckCircle2,
  Calendar,
  XCircle,
  ArrowLeft,
  ChevronRight,
  Trophy,
  Clock,
  MapPin,
  TrendingUp,
  RefreshCw,
  Globe,
  Zap,
  AlertCircle
} from 'lucide-react';

// Static historical/future data for other tabs
const STATIC_MATCHES_DATA = {
  completed: [
    {
      id: 'comp-1',
      tournament: 'Asia Cup 2026 • Match 12',
      team1: { name: 'India', code: 'IND', flag: '🇮🇳', score: '178/4', overs: '18.2' },
      team2: { name: 'Pakistan', code: 'PAK', flag: '🇵🇰', score: '174/7', overs: '20.0' },
      venue: 'Dubai International Stadium',
      result: 'India won by 6 wickets (with 10 balls remaining)',
      potm: 'Virat Kohli 82* (53)',
      date: 'Yesterday',
    },
    {
      id: 'comp-2',
      tournament: 'The Ashes ODI Series • 3rd ODI',
      team1: { name: 'Australia', code: 'AUS', flag: '🇦🇺', score: '342/7', overs: '50.0' },
      team2: { name: 'England', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: '298', overs: '47.4' },
      venue: 'Sydney Cricket Ground',
      result: 'Australia won by 44 runs',
      potm: 'Travis Head 112 (95)',
      date: '2 Oct 2026',
    },
    {
      id: 'comp-3',
      tournament: 'International T20 Series • 2nd T20I',
      team1: { name: 'South Africa', code: 'RSA', flag: '🇿🇦', score: '215/3', overs: '20.0' },
      team2: { name: 'West Indies', code: 'WI', flag: '🌴', score: '188/8', overs: '20.0' },
      venue: 'Centurion Park',
      result: 'South Africa won by 27 runs',
      potm: 'Heinrich Klaasen 68 (28)',
      date: '28 Sep 2026',
    },
  ],
  upcoming: [
    {
      id: 'up-1',
      tournament: 'India Tour of South Africa • 1st T20I',
      team1: { name: 'India', code: 'IND', flag: '🇮🇳' },
      team2: { name: 'South Africa', code: 'RSA', flag: '🇿🇦' },
      venue: 'Kingsmead, Durban',
      scheduled: 'Tomorrow, 7:00 PM IST',
      countdown: 'Starts in 26 hours',
    },
    {
      id: 'up-2',
      tournament: 'Trans-Tasman Trophy • 1st ODI',
      team1: { name: 'Australia', code: 'AUS', flag: '🇦🇺' },
      team2: { name: 'New Zealand', code: 'NZ', flag: '🇳🇿' },
      venue: 'Melbourne Cricket Ground',
      scheduled: 'Friday, 9:30 AM IST',
      countdown: 'Starts in 2 days',
    },
    {
      id: 'up-3',
      tournament: 'England Summer Tour • 1st Test',
      team1: { name: 'England', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      team2: { name: 'Pakistan', code: 'PAK', flag: '🇵🇰' },
      venue: 'Headingley, Leeds',
      scheduled: 'Sunday, 3:30 PM IST',
      countdown: 'Starts in 4 days',
    },
  ],
  cancelled: [
    {
      id: 'canc-1',
      tournament: 'Tri-Nation Cup • Match 4',
      team1: { name: 'Sri Lanka', code: 'SL', flag: '🇱🇰' },
      team2: { name: 'Bangladesh', code: 'BAN', flag: '🇧🇩' },
      venue: 'Pallekele International Cricket Stadium, Kandy',
      reason: 'Match Abandoned without a ball bowled due to persistent tropical rain',
      date: 'Yesterday',
    },
    {
      id: 'canc-2',
      tournament: 'Desert Cup • Match 2',
      team1: { name: 'Afghanistan', code: 'AFG', flag: '🇦🇫' },
      team2: { name: 'Ireland', code: 'IRE', flag: '🇮🇪' },
      venue: 'Sharjah Cricket Stadium',
      reason: 'Cancelled due to severe sandstorm & unplayable pitch conditions',
      date: '30 Sep 2026',
    },
  ],
};

export const MatchesPage = ({ onBackToDashboard }) => {
  // 4 tabs: 'live' | 'completed' | 'upcoming' | 'cancelled'
  const [activeFilter, setActiveFilter] = useState('live');
  const [selectedMatchScorecard, setSelectedMatchScorecard] = useState(null);

  // Live Matches State from Backend API
  const [liveMatches, setLiveMatches] = useState([]);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState('Connecting...');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchLiveMatches = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    setApiError(null);

    try {
      const response = await getLiveMatches();
      if (response && response.matches) {
        setLiveMatches(response.matches);
        setDataSource(response.source === 'cricapi' ? 'Official CricAPI Feed' : 'Worldwide Live Cricket Network');
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Error fetching live matches:', err);
      setApiError('Unable to sync live scores. Showing cached live feed.');
    } finally {
      setIsLoadingLive(false);
      if (isManualRefresh) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchLiveMatches();
  }, [fetchLiveMatches]);

  // Polling every 20s if auto-refresh is active and filter is 'live'
  useEffect(() => {
    if (!autoRefresh || activeFilter !== 'live') return;

    const timer = setInterval(() => {
      fetchLiveMatches(false);
    }, 20000);

    return () => clearInterval(timer);
  }, [autoRefresh, activeFilter, fetchLiveMatches]);

  const filterOptions = [
    { key: 'live', label: 'Worldwide Live', count: liveMatches.length, icon: Radio, color: '#dc2626' },
    { key: 'completed', label: 'Completed', count: STATIC_MATCHES_DATA.completed.length, icon: CheckCircle2, color: '#16a34a' },
    { key: 'upcoming', label: 'Upcoming', count: STATIC_MATCHES_DATA.upcoming.length, icon: Calendar, color: '#0284c7' },
    { key: 'cancelled', label: 'Cancelled', count: STATIC_MATCHES_DATA.cancelled.length, icon: XCircle, color: '#64748b' },
  ];

  return (
    <div className="matches-page-container">

      {apiError && (
        <div className="api-notice-banner warning">
          <AlertCircle size={16} />
          <span>{apiError}</span>
        </div>
      )}

      {/* If detailed scorecard is opened for a specific match, show it */}
      {selectedMatchScorecard ? (
        <div className="match-scorecard-detail-view">
          <div className="scorecard-return-strip">
            <div className="match-banner-headline">
              <span className="current-match-badge">
                Viewing Detailed Scorecard: <strong>{selectedMatchScorecard.name || `${selectedMatchScorecard.team1?.name} vs ${selectedMatchScorecard.team2?.name}`}</strong>
              </span>
              <span className="match-venue-pill">
                <MapPin size={12} /> {selectedMatchScorecard.venue}
              </span>
            </div>
            <button
              type="button"
              className="btn-exit-scorecard"
              onClick={() => setSelectedMatchScorecard(null)}
            >
              Close Scorecard
            </button>
          </div>
          <LiveScoreboard />
        </div>
      ) : (
        <>
          {/* 4 Options Filter Tabs: Live | Completed | Upcoming | Cancelled */}
          <div className="matches-filter-tabs-bar" role="tablist">
            {filterOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeFilter === opt.key;
              return (
                <button
                  key={opt.key}
                  id={`matches-tab-${opt.key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`matches-filter-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(opt.key)}
                >
                  <span className="tab-icon-wrapper" style={{ color: isActive ? '#ffffff' : opt.color }}>
                    <Icon size={16} />
                  </span>
                  <span className="tab-label-text">{opt.label}</span>
                  <span className={`tab-count-badge ${opt.key}`}>
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Matches List Grid */}
          <div className="matches-grid-list">
            {/* Live Filter Selected */}
            {activeFilter === 'live' && (
              <>
                {isLoadingLive ? (
                  <div className="matches-loading-state">
                    <div className="spinner-loader"></div>
                    <p>Fetching real-time worldwide cricket matches...</p>
                  </div>
                ) : liveMatches.length === 0 ? (
                  <div className="matches-empty-state">
                    <Radio size={36} className="empty-icon" />
                    <h3>No Live Matches Right Now</h3>
                    <p>Check the Upcoming tab for scheduled fixtures starting later today.</p>
                  </div>
                ) : (
                  liveMatches.map((m) => (
                    <div key={m.id || m.externalId} className="match-card match-card-live">
                      <div className="card-top-info">
                        <span className="match-tournament-tag">
                          <Trophy size={13} /> {m.seriesName || m.tournament || 'International Cricket'}
                        </span>
                        <div className="match-status-pills-row">
                          <span className="match-type-pill">{m.matchType || 'ODI'}</span>
                          <span className="live-pill-animated">
                            <span className="live-dot-pulse"></span> LIVE
                          </span>
                        </div>
                      </div>

                      <div className="match-teams-vertical">
                        {/* Team 1 */}
                        <div className="match-team-row">
                          <div className="team-meta">
                            <span className="flag-icon">{m.team1?.flag || '🏏'}</span>
                            <span className="team-title">{m.team1?.name}</span>
                            {m.team1?.shortName && (
                              <span className="team-code-badge">{m.team1?.shortName}</span>
                            )}
                          </div>
                          <div className="score-meta">
                            <span className="score-runs">{m.team1?.score || 'Yet to bat'}</span>
                          </div>
                        </div>

                        {/* Team 2 */}
                        <div className="match-team-row">
                          <div className="team-meta">
                            <span className="flag-icon">{m.team2?.flag || '🏏'}</span>
                            <span className="team-title">{m.team2?.name}</span>
                            {m.team2?.shortName && (
                              <span className="team-code-badge">{m.team2?.shortName}</span>
                            )}
                          </div>
                          <div className="score-meta">
                            <span className="score-runs">{m.team2?.score || 'Yet to bat'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status ticker & run rates */}
                      <div className="match-status-ticker">
                        <span className="status-note">{m.statusText || m.status}</span>
                        <div className="rates-row">
                          {m.crr && <span className="rate-badge">{m.crr}</span>}
                          {m.projected && <span className="rate-badge">{m.projected}</span>}
                        </div>
                      </div>

                      <div className="match-card-footer">
                        <span className="venue-text" title={m.venue}>
                          <MapPin size={13} /> {m.venue || 'International Ground'}
                        </span>
                        <button
                          type="button"
                          className="btn-view-scorecard"
                          onClick={() => setSelectedMatchScorecard(m)}
                        >
                          <span>Full Scorecard</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* Completed Filter */}
            {activeFilter === 'completed' &&
              STATIC_MATCHES_DATA.completed.map((m) => (
                <div key={m.id} className="match-card match-card-completed">
                  <div className="card-top-info">
                    <span className="match-tournament-tag">
                      <Trophy size={13} /> {m.tournament}
                    </span>
                    <span className="completed-pill">
                      <CheckCircle2 size={12} /> COMPLETED
                    </span>
                  </div>

                  <div className="match-teams-vertical">
                    <div className="match-team-row">
                      <div className="team-meta">
                        <span className="flag-icon">{m.team1.flag}</span>
                        <span className="team-title">{m.team1.name}</span>
                      </div>
                      <div className="score-meta">
                        <span className="score-runs">{m.team1.score}</span>
                        <span className="score-overs">({m.team1.overs} ov)</span>
                      </div>
                    </div>

                    <div className="match-team-row">
                      <div className="team-meta">
                        <span className="flag-icon">{m.team2.flag}</span>
                        <span className="team-title">{m.team2.name}</span>
                      </div>
                      <div className="score-meta">
                        <span className="score-runs">{m.team2.score}</span>
                        <span className="score-overs">({m.team2.overs} ov)</span>
                      </div>
                    </div>
                  </div>

                  <div className="match-result-banner">
                    <strong>Result:</strong> {m.result}
                  </div>

                  <div className="match-card-footer">
                    <span className="potm-text">
                      ⭐ POTM: {m.potm}
                    </span>
                    <span className="venue-text">
                      <MapPin size={13} /> {m.venue}
                    </span>
                  </div>
                </div>
              ))}

            {/* Upcoming Filter */}
            {activeFilter === 'upcoming' &&
              STATIC_MATCHES_DATA.upcoming.map((m) => (
                <div key={m.id} className="match-card match-card-upcoming">
                  <div className="card-top-info">
                    <span className="match-tournament-tag">
                      <Trophy size={13} /> {m.tournament}
                    </span>
                    <span className="upcoming-pill">
                      <Clock size={12} /> {m.countdown}
                    </span>
                  </div>

                  <div className="upcoming-versus-box">
                    <div className="upcoming-team">
                      <span className="upcoming-flag">{m.team1.flag}</span>
                      <span className="upcoming-name">{m.team1.name}</span>
                    </div>
                    <span className="upcoming-vs-badge">VS</span>
                    <div className="upcoming-team">
                      <span className="upcoming-flag">{m.team2.flag}</span>
                      <span className="upcoming-name">{m.team2.name}</span>
                    </div>
                  </div>

                  <div className="match-card-footer">
                    <span className="scheduled-time">
                      <Calendar size={13} /> {m.scheduled}
                    </span>
                    <span className="venue-text">
                      <MapPin size={13} /> {m.venue}
                    </span>
                  </div>
                </div>
              ))}

            {/* Cancelled Filter */}
            {activeFilter === 'cancelled' &&
              STATIC_MATCHES_DATA.cancelled.map((m) => (
                <div key={m.id} className="match-card match-card-cancelled">
                  <div className="card-top-info">
                    <span className="match-tournament-tag">
                      <Trophy size={13} /> {m.tournament}
                    </span>
                    <span className="cancelled-pill">
                      <XCircle size={12} /> CANCELLED
                    </span>
                  </div>

                  <div className="upcoming-versus-box">
                    <div className="upcoming-team">
                      <span className="upcoming-flag">{m.team1.flag}</span>
                      <span className="upcoming-name">{m.team1.name}</span>
                    </div>
                    <span className="upcoming-vs-badge">VS</span>
                    <div className="upcoming-team">
                      <span className="upcoming-flag">{m.team2.flag}</span>
                      <span className="upcoming-name">{m.team2.name}</span>
                    </div>
                  </div>

                  <div className="cancelled-reason-box">
                    <span>⚠️ {m.reason}</span>
                  </div>

                  <div className="match-card-footer">
                    <span className="venue-text">
                      <MapPin size={13} /> {m.venue}
                    </span>
                    <span className="date-text">{m.date}</span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MatchesPage;
