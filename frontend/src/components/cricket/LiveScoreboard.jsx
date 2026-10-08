import React, { useState } from 'react';
import {
  Trophy,
  Activity,
  Flame,
  Clock,
  RefreshCw,
  TrendingUp,
  ShieldAlert,
  BarChart2,
  Calendar,
} from 'lucide-react';

const LIVE_BALLS = [
  { ball: '42.3', bowler: 'Cummins', batsman: 'Hardik Pandya', runs: 4, type: 'boundary', text: 'FOUR! Dispatched through extra cover! Sits back and creams it through the gap with pure authority.' },
  { ball: '42.2', bowler: 'Cummins', batsman: 'Hardik Pandya', runs: 1, type: 'single', text: 'Back of a length, tapped gently wide of point for a quick single.' },
  { ball: '42.1', bowler: 'Cummins', batsman: 'Virat Kohli', runs: 1, type: 'single', text: 'Full on middle, pushed to long-on to turn the strike over. Kohli moves to 92.' },
  { ball: '41.6', bowler: 'Starc', batsman: 'Virat Kohli', runs: 6, type: 'six', text: 'SIX! Glorious pickup whip over deep mid-wicket! That was in the slot and punished deep into the crowd.' },
  { ball: '41.5', bowler: 'Starc', batsman: 'Virat Kohli', runs: 0, type: 'dot', text: 'Beaten! Steams in with an inswinging yorker, dug out just in time.' },
  { ball: '41.4', bowler: 'Starc', batsman: 'KL Rahul', runs: 0, type: 'wicket', text: 'WICKET! KL Rahul c Carey b Starc 38 (34). Thick outside edge flies straight to the wicketkeeper!' },
];

export const LiveScoreboard = () => {
  const [activeTab, setActiveTab] = useState('commentary'); // 'commentary' | 'scorecard' | 'stats'
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="cricket-feature-container">
      {/* Primary Score Banner */}
      <div className="scoreboard-main-card">
        <div className="scoreboard-header-top">
          <div className="tournament-tag">
            <Trophy size={14} />
            <span>ICC Champions Trophy Final • Lord's Cricket Ground</span>
          </div>
          <div className="score-actions-top">
            <span className="live-status-pill">
              <span className="pulse-dot"></span> LIVE • INNINGS 1
            </span>
            <button
              type="button"
              className={`score-refresh-btn ${isRefreshing ? 'spinning' : ''}`}
              onClick={handleRefresh}
              title="Refresh Live Scores"
            >
              <RefreshCw size={14} />
              <span>Auto-refreshing</span>
            </button>
          </div>
        </div>

        {/* Big Teams Score Row */}
        <div className="match-score-spotlight">
          {/* Team 1: Batting */}
          <div className="spotlight-team batting">
            <div className="team-flag-badge">🇮🇳</div>
            <div className="team-score-details">
              <span className="team-title">India</span>
              <div className="score-number-row">
                <span className="big-runs">284/4</span>
                <span className="big-overs">(42.3 / 50 ov)</span>
              </div>
              <span className="crr-badge">CRR: 6.72 • Projected: 342</span>
            </div>
          </div>

          <div className="match-versus-badge">VS</div>

          {/* Team 2: Fielding */}
          <div className="spotlight-team fielding">
            <div className="team-score-details align-right">
              <span className="team-title">Australia</span>
              <div className="score-number-row">
                <span className="yet-to-bat-text">Yet to Bat</span>
              </div>
              <span className="fielding-tag">Australia chose to bowl first</span>
            </div>
            <div className="team-flag-badge">🇦🇺</div>
          </div>
        </div>

        {/* Recent Balls Ticker */}
        <div className="recent-over-ticker">
          <span className="over-label">This Over (Over 43):</span>
          <div className="balls-ticker-row">
            <span className="ball-circle single">1</span>
            <span className="ball-circle boundary">4</span>
            <span className="ball-circle six">6</span>
            <span className="ball-circle dot">0</span>
            <span className="ball-circle single">1</span>
            <span className="ball-circle boundary">4</span>
          </div>
        </div>
      </div>

      {/* Crease Status: Current Batsmen & Bowler Grid */}
      <div className="crease-status-grid">
        {/* Batsmen on Crease */}
        <div className="crease-card">
          <div className="crease-card-title">
            <Flame size={16} />
            <span>Batter on Crease</span>
          </div>
          <table className="crease-table">
            <thead>
              <tr>
                <th>Batter</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>
              </tr>
            </thead>
            <tbody>
              <tr className="on-strike-row">
                <td>
                  <strong>Virat Kohli</strong> <span className="strike-star">*</span>
                </td>
                <td className="runs-cell">92</td>
                <td>78</td>
                <td>9</td>
                <td>2</td>
                <td>117.9</td>
              </tr>
              <tr>
                <td>
                  <strong>Hardik Pandya</strong>
                </td>
                <td className="runs-cell">34</td>
                <td>21</td>
                <td>3</td>
                <td>2</td>
                <td>161.9</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Current Bowler */}
        <div className="crease-card">
          <div className="crease-card-title">
            <Activity size={16} />
            <span>Current Bowler</span>
          </div>
          <table className="crease-table">
            <thead>
              <tr>
                <th>Bowler</th>
                <th>O</th>
                <th>M</th>
                <th>R</th>
                <th>W</th>
                <th>ECON</th>
              </tr>
            </thead>
            <tbody>
              <tr className="on-strike-row">
                <td>
                  <strong>Pat Cummins</strong> <span className="strike-star">*</span>
                </td>
                <td>8.3</td>
                <td>1</td>
                <td>52</td>
                <td className="wicket-cell">2</td>
                <td>6.11</td>
              </tr>
              <tr>
                <td>Mitchell Starc</td>
                <td>9.0</td>
                <td>0</td>
                <td>64</td>
                <td className="wicket-cell">1</td>
                <td>7.11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Tabs for Deep Match Center */}
      <div className="match-center-tabs">
        <button
          type="button"
          className={`mc-tab ${activeTab === 'commentary' ? 'active' : ''}`}
          onClick={() => setActiveTab('commentary')}
        >
          Ball-by-Ball Commentary
        </button>
        <button
          type="button"
          className={`mc-tab ${activeTab === 'scorecard' ? 'active' : ''}`}
          onClick={() => setActiveTab('scorecard')}
        >
          Full Scorecard
        </button>
        <button
          type="button"
          className={`mc-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Partnership & Key Stats
        </button>
      </div>

      {/* Active Tab Content Area */}
      <div className="match-tab-content-panel">
        {activeTab === 'commentary' && (
          <div className="commentary-list">
            {LIVE_BALLS.map((item, idx) => (
              <div key={idx} className={`commentary-row ${item.type}`}>
                <div className="commentary-ball-badge">
                  <span className="ball-num">{item.ball}</span>
                  <span className={`ball-outcome-pill ${item.type}`}>
                    {item.type === 'wicket' ? 'W' : item.runs}
                  </span>
                </div>
                <div className="commentary-body">
                  <p className="commentary-lead">
                    <strong>{item.bowler}</strong> to <strong>{item.batsman}</strong>
                  </p>
                  <p className="commentary-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'scorecard' && (
          <div className="full-scorecard-view">
            <h4 className="scorecard-section-title">India 1st Innings</h4>
            <table className="scorecard-full-table">
              <thead>
                <tr>
                  <th>Batter</th>
                  <th>Dismissal</th>
                  <th>R</th>
                  <th>B</th>
                  <th>4s</th>
                  <th>6s</th>
                  <th>SR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Rohit Sharma (c)</strong></td>
                  <td className="dismissal-text">b Hazlewood</td>
                  <td>54</td>
                  <td>46</td>
                  <td>6</td>
                  <td>2</td>
                  <td>117.4</td>
                </tr>
                <tr>
                  <td><strong>Shubman Gill</strong></td>
                  <td className="dismissal-text">c Maxwell b Cummins</td>
                  <td>31</td>
                  <td>28</td>
                  <td>4</td>
                  <td>0</td>
                  <td>110.7</td>
                </tr>
                <tr className="highlight-current">
                  <td><strong>Virat Kohli</strong> *</td>
                  <td className="dismissal-text batting-active">not out</td>
                  <td>92</td>
                  <td>78</td>
                  <td>9</td>
                  <td>2</td>
                  <td>117.9</td>
                </tr>
                <tr>
                  <td><strong>Shreyas Iyer</strong></td>
                  <td className="dismissal-text">c Smith b Zampa</td>
                  <td>24</td>
                  <td>29</td>
                  <td>2</td>
                  <td>0</td>
                  <td>82.8</td>
                </tr>
                <tr>
                  <td><strong>KL Rahul (wk)</strong></td>
                  <td className="dismissal-text">c Carey b Starc</td>
                  <td>38</td>
                  <td>34</td>
                  <td>3</td>
                  <td>1</td>
                  <td>111.8</td>
                </tr>
                <tr className="highlight-current">
                  <td><strong>Hardik Pandya</strong> *</td>
                  <td className="dismissal-text batting-active">not out</td>
                  <td>34</td>
                  <td>21</td>
                  <td>3</td>
                  <td>2</td>
                  <td>161.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="partnership-stats-view">
            <div className="partnership-box">
              <span className="partnership-title">Current Partnership: 5th Wicket</span>
              <div className="partnership-bar-wrapper">
                <div className="partnership-meta">
                  <span>Hardik Pandya (34 off 21)</span>
                  <span className="total-partnership">59 runs (37 balls)</span>
                  <span>Virat Kohli (25 off 16)</span>
                </div>
                <div className="partnership-visual-bar">
                  <div className="pv-fill left" style={{ width: '58%' }}></div>
                  <div className="pv-fill right" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>

            <div className="fall-of-wickets-row">
              <span className="fow-title">Fall of Wickets:</span>
              <p className="fow-text">
                1-72 (Gill, 9.4 ov), 2-108 (Rohit, 16.2 ov), 3-156 (Iyer, 25.1 ov), 4-225 (Rahul, 36.2 ov)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScoreboard;
