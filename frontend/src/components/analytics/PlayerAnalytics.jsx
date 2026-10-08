import React, { useState, useEffect, useRef } from 'react';
import { searchPlayers } from '../../services/playerService';
import {
  Search,
  Trophy,
  Activity,
  Zap,
  Target,
  User,
  Award,
  X,
  Sparkles,
  BarChart3,
  Calendar,
  Flame,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

const QUICK_SUGGESTIONS = [
  'Virat Kohli',
  'Rohit Sharma',
  'Jasprit Bumrah',
  'MS Dhoni',
  'Travis Head',
  'Pat Cummins',
  'Babar Azam',
  'Sachin Tendulkar',
];

export const PlayerAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFormatTab, setActiveFormatTab] = useState('all'); // 'all' | 'odi' | 't20i' | 'test' | 'ipl'
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef(null);

  // Load default featured player on mount
  useEffect(() => {
    const loadDefaultPlayer = async () => {
      try {
        const results = await searchPlayers('Virat Kohli');
        if (results && results.length > 0) {
          setSelectedPlayer(results[0]);
        }
      } catch (err) {
        console.error('Error loading initial player:', err);
      }
    };
    loadDefaultPlayer();
  }, []);

  // Handle Search Input Change
  const handleSearch = async (queryText) => {
    setSearchQuery(queryText);
    if (!queryText.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = await searchPlayers(queryText);
      setSearchResults(results);
      if (results.length === 1 && results[0].name.toLowerCase() === queryText.toLowerCase().trim()) {
        setSelectedPlayer(results[0]);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
    setSearchQuery(player.name);
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <section className="player-analytics-section" id="player-analytics">
      {/* Section Header */}
      <div className="analytics-section-header">
        <div className="analytics-badge-row">
          <span className="analytics-pill">
            <Sparkles size={13} /> PLAYER INTELLIGENCE & ANALYTICS
          </span>
          <span className="analytics-db-tag">10,000+ Cricket Profiles</span>
        </div>
        <h2 className="analytics-heading">
          Cricket Player <span className="gradient-text">Deep-Dive Analytics</span>
        </h2>
        <p className="analytics-subheading">
          Search any international cricket legend or active superstar to unlock full career records, batting & bowling metrics, ICC rankings, and recent form.
        </p>
      </div>

      {/* Search Input Box Card */}
      <div className="player-search-card">
        <div className="search-input-wrapper">
          <Search size={22} className="search-input-icon" />
          <input
            ref={searchInputRef}
            id="player-search-input"
            type="text"
            className="player-search-field"
            placeholder="Type player name... (e.g. Virat Kohli, Rohit Sharma, Jasprit Bumrah, Babar Azam)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchResults.length > 0) {
                handleSelectPlayer(searchResults[0]);
              }
            }}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-clear-search"
              onClick={handleClearSearch}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
          {isSearching && (
            <div className="search-mini-spinner"></div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="quick-suggestions-row">
          <span className="quick-label">
            <TrendingUp size={13} /> Trending:
          </span>
          <div className="quick-chips-list">
            {QUICK_SUGGESTIONS.map((name) => (
              <button
                key={name}
                type="button"
                className={`chip-btn ${selectedPlayer?.name === name ? 'active' : ''}`}
                onClick={() => {
                  handleSearch(name);
                  // Load player directly
                  searchPlayers(name).then((res) => {
                    if (res && res.length > 0) {
                      handleSelectPlayer(res[0]);
                    }
                  });
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Dropdown List (if multiple results or user typing) */}
        {searchResults.length > 0 && hasSearched && (
          <div className="search-results-dropdown">
            <span className="dropdown-title">Matching Players ({searchResults.length})</span>
            <div className="results-list">
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  className="result-item"
                  onClick={() => handleSelectPlayer(p)}
                >
                  <span className="result-flag">{p.flag}</span>
                  <div className="result-info">
                    <span className="result-name">{p.name}</span>
                    <span className="result-meta">{p.country} • {p.role}</span>
                  </div>
                  <span className="result-pick-action">View Analytics &rarr;</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSearched && searchResults.length === 0 && !isSearching && (
          <div className="search-no-results">
            <p>No player found matching "<strong>{searchQuery}</strong>". Try clicking one of the trending chips above.</p>
          </div>
        )}
      </div>

      {/* Player Profile Details Card */}
      {selectedPlayer && (
        <div className="player-details-card">
          {/* Card Top Banner / Bio */}
          <div className="player-profile-header">
            <div className="player-avatar-box">
              <span className="avatar-flag">{selectedPlayer.flag}</span>
              {selectedPlayer.jerseyNumber && (
                <span className="jersey-badge">#{selectedPlayer.jerseyNumber}</span>
              )}
            </div>

            <div className="player-primary-info">
              <div className="player-title-row">
                <h3 className="player-name-display">{selectedPlayer.fullName || selectedPlayer.name}</h3>
                {selectedPlayer.nickname && (
                  <span className="player-nickname-tag">"{selectedPlayer.nickname}"</span>
                )}
              </div>
              <div className="player-tags-row">
                <span className="info-tag-country">
                  {selectedPlayer.flag} {selectedPlayer.country}
                </span>
                <span className="info-tag-role">
                  <User size={13} /> {selectedPlayer.role}
                </span>
                <span className="info-tag-born">
                  <Calendar size={13} /> {selectedPlayer.born}
                </span>
              </div>
            </div>

            {/* ICC Rankings Badge Box */}
            {selectedPlayer.iccRank && (
              <div className="icc-ranks-box">
                <span className="rank-box-title">
                  <Trophy size={13} /> ICC RANKINGS
                </span>
                <div className="ranks-row">
                  {selectedPlayer.iccRank.odi && (
                    <div className="rank-chip">
                      <span className="rank-type">ODI</span>
                      <span className="rank-val">
                        {typeof selectedPlayer.iccRank.odi === 'number' ? `#${selectedPlayer.iccRank.odi}` : selectedPlayer.iccRank.odi}
                      </span>
                    </div>
                  )}
                  {selectedPlayer.iccRank.test && (
                    <div className="rank-chip">
                      <span className="rank-type">TEST</span>
                      <span className="rank-val">
                        {typeof selectedPlayer.iccRank.test === 'number' ? `#${selectedPlayer.iccRank.test}` : selectedPlayer.iccRank.test}
                      </span>
                    </div>
                  )}
                  {selectedPlayer.iccRank.t20i && (
                    <div className="rank-chip">
                      <span className="rank-type">T20I</span>
                      <span className="rank-val">
                        {typeof selectedPlayer.iccRank.t20i === 'number' ? `#${selectedPlayer.iccRank.t20i}` : selectedPlayer.iccRank.t20i}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="player-kpi-bar">
            <div className="kpi-cell">
              <span className="kpi-label">Batting Style</span>
              <span className="kpi-value">{selectedPlayer.battingStyle}</span>
            </div>
            <div className="kpi-cell">
              <span className="kpi-label">Bowling Style</span>
              <span className="kpi-value">{selectedPlayer.bowlingStyle || 'Right-arm medium'}</span>
            </div>
            <div className="kpi-cell">
              <span className="kpi-label">Birth Place</span>
              <span className="kpi-value">{selectedPlayer.birthPlace || selectedPlayer.country}</span>
            </div>
            <div className="kpi-cell">
              <span className="kpi-label">Major Teams</span>
              <span className="kpi-value teams-pill-list">
                {selectedPlayer.teams ? selectedPlayer.teams.join(', ') : selectedPlayer.country}
              </span>
            </div>
          </div>

          {/* Batting Career Records Across Formats */}
          <div className="format-stats-container">
            <div className="format-tabs-header">
              <h4 className="format-title">
                <BarChart3 size={16} /> International & Franchise Batting Career
              </h4>
              <div className="format-tab-buttons">
                {['all', 'odi', 'test', 't20i', 'ipl'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    className={`fmt-tab-btn ${activeFormatTab === fmt ? 'active' : ''}`}
                    onClick={() => setActiveFormatTab(fmt)}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Table */}
            <div className="stats-table-wrapper">
              <table className="player-stats-table">
                <thead>
                  <tr>
                    <th>Format</th>
                    <th>Matches</th>
                    <th>Innings</th>
                    <th>Runs</th>
                    <th>High Score</th>
                    <th>Average</th>
                    <th>Strike Rate</th>
                    <th>100s</th>
                    <th>50s</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(selectedPlayer.stats || {}).map(([key, st]) => {
                    if (activeFormatTab !== 'all' && activeFormatTab !== key) return null;
                    return (
                      <tr key={key} className={activeFormatTab === key ? 'highlight-row' : ''}>
                        <td className="format-name-cell">
                          <span className={`format-indicator ${key}`}></span>
                          {key.toUpperCase()}
                        </td>
                        <td>{st.matches}</td>
                        <td>{st.innings}</td>
                        <td className="runs-cell">
                          <strong>{st.runs.toLocaleString()}</strong>
                        </td>
                        <td>{st.highest}</td>
                        <td className="avg-cell">{st.avg}</td>
                        <td>{st.sr}</td>
                        <td>
                          <span className="century-badge">{st.hundreds}</span>
                        </td>
                        <td>
                          <span className="fifty-badge">{st.fifties}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bowling & Accolades Row */}
          <div className="player-extra-grid">
            {/* Bowling Career Stats */}
            {selectedPlayer.bowling && (
              <div className="bowling-card">
                <div className="card-sub-header">
                  <Target size={16} />
                  <span>Bowling Record</span>
                </div>
                <div className="bowling-grid">
                  <div className="bowling-stat">
                    <span className="b-label">Wickets</span>
                    <span className="b-val">
                      {selectedPlayer.bowling.testWickets
                        ? `${selectedPlayer.bowling.testWickets} (Test) | ${selectedPlayer.bowling.odiWickets} (ODI)`
                        : selectedPlayer.bowling.wickets}
                    </span>
                  </div>
                  <div className="bowling-stat">
                    <span className="b-label">Best Bowling</span>
                    <span className="b-val">
                      {selectedPlayer.bowling.bestTest || selectedPlayer.bowling.best || 'N/A'}
                    </span>
                  </div>
                  <div className="bowling-stat">
                    <span className="b-label">Economy</span>
                    <span className="b-val">{selectedPlayer.bowling.economy || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Form Tracker */}
            {selectedPlayer.recentForm && (
              <div className="recent-form-card">
                <div className="card-sub-header">
                  <Flame size={16} />
                  <span>Recent Innings / Form</span>
                </div>
                <div className="recent-scores-row">
                  {selectedPlayer.recentForm.map((score, idx) => (
                    <span key={idx} className="recent-score-chip">
                      {score}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Highlights & Milestones */}
          {selectedPlayer.highlights && selectedPlayer.highlights.length > 0 && (
            <div className="player-highlights-box">
              <span className="highlights-title">
                <Award size={15} /> Key Milestones & World Records
              </span>
              <div className="highlights-list">
                {selectedPlayer.highlights.map((item, idx) => (
                  <div key={idx} className="highlight-item">
                    <CheckCircle2 size={15} className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default PlayerAnalytics;
