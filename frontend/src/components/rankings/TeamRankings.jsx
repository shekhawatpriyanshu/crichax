import React, { useState, useEffect } from 'react';
import { getTeamRankings } from '../../services/rankingsService';
import {
  Trophy,
  Crown,
  Medal,
  Sparkles,
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Globe,
  Users,
  Activity,
  X
} from 'lucide-react';

export const TeamRankings = () => {
  const [selectedCategory, setSelectedCategory] = useState('men'); // 'men' | 'women'
  const [selectedFormat, setSelectedFormat] = useState('odi'); // 'odi' | 't20i' | 'test'
  const [rankingsList, setRankingsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  // When category changes, if women is selected and format was 'test', reset to 'odi'
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'women' && selectedFormat === 'test') {
      setSelectedFormat('odi');
    }
  };

  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true);
      try {
        const data = await getTeamRankings(selectedCategory, selectedFormat);
        if (data && data.rankings) {
          setRankingsList(data.rankings);
          setLastUpdated(data.lastUpdated || 'Current Season');
        }
      } catch (err) {
        console.error('Error fetching rankings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, [selectedCategory, selectedFormat]);

  // Filter rankings by search query
  const filteredRankings = rankingsList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.team.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  const top3 = filteredRankings.slice(0, 3);

  return (
    <div className="rankings-component-container">
      {/* Header Banner */}
      <div className="rankings-header-strip">
        <div className="rankings-title-meta">
          <div className="rankings-badge-pill">
            <Trophy size={13} /> OFFICIAL ICC CRICKET RANKINGS
          </div>
          <h2 className="rankings-main-heading">
            World Cricket <span className="gradient-text">Team Standings</span>
          </h2>
          <p className="rankings-subheading">
            Official ICC team rankings for Men's and Women's international cricket across Test, ODI, and T20I formats.
          </p>
        </div>

        {/* Category Switcher: Men's vs Women's */}
        <div className="category-switcher-box">
          <button
            type="button"
            className={`category-toggle-btn ${selectedCategory === 'men' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('men')}
          >
            <span className="cat-icon">👨</span>
            <span>Men's Cricket</span>
          </button>
          <button
            type="button"
            className={`category-toggle-btn ${selectedCategory === 'women' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('women')}
          >
            <span className="cat-icon">👩</span>
            <span>Women's Cricket</span>
          </button>
        </div>
      </div>

      {/* Format Tabs & Search Filter Bar */}
      <div className="rankings-toolbar-bar">
        {/* Format Selector */}
        <div className="format-selection-group">
          {selectedCategory === 'men' && (
            <button
              type="button"
              className={`format-btn test-btn ${selectedFormat === 'test' ? 'active' : ''}`}
              onClick={() => setSelectedFormat('test')}
            >
              <span className="dot test-dot"></span>
              <span>TEST</span>
            </button>
          )}

          <button
            type="button"
            className={`format-btn odi-btn ${selectedFormat === 'odi' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('odi')}
          >
            <span className="dot odi-dot"></span>
            <span>ODI</span>
          </button>

          <button
            type="button"
            className={`format-btn t20i-btn ${selectedFormat === 't20i' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('t20i')}
          >
            <span className="dot t20i-dot"></span>
            <span>T20I</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="rankings-search-box">
          <Search size={16} className="search-ico" />
          <input
            type="text"
            className="rankings-search-input"
            placeholder="Search country (e.g. India, Australia)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-clear-search-mini"
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Top 3 Podium Spotlight (When not filtering or top 3 exist) */}
      {!searchQuery && top3.length >= 3 && !isLoading && (
        <div className="podium-container">
          {/* #2 Rank: Silver */}
          <div className="podium-card silver-card">
            <div className="podium-rank-tag">#2 SILVER</div>
            <div className="podium-flag-box">{top3[1].flag}</div>
            <h4 className="podium-team-name">{top3[1].team}</h4>
            <div className="podium-rating-box">
              <span className="podium-rating-num">{top3[1].rating}</span>
              <span className="podium-rating-lbl">ICC RATING</span>
            </div>
            <span className="podium-points-tag">{top3[1].points.toLocaleString()} pts • {top3[1].matches} matches</span>
          </div>

          {/* #1 Rank: Gold */}
          <div className="podium-card gold-card">
            <div className="gold-crown-wrapper">
              <Crown size={28} className="crown-icon" />
            </div>
            <div className="podium-rank-tag gold-tag">#1 WORLD CHAMPION</div>
            <div className="podium-flag-box gold-flag">{top3[0].flag}</div>
            <h3 className="podium-team-name gold-name">{top3[0].team}</h3>
            <div className="podium-rating-box">
              <span className="podium-rating-num gold-num">{top3[0].rating}</span>
              <span className="podium-rating-lbl">ICC RATING</span>
            </div>
            <span className="podium-points-tag gold-pts">{top3[0].points.toLocaleString()} pts • {top3[0].matches} matches</span>
          </div>

          {/* #3 Rank: Bronze */}
          <div className="podium-card bronze-card">
            <div className="podium-rank-tag">#3 BRONZE</div>
            <div className="podium-flag-box">{top3[2].flag}</div>
            <h4 className="podium-team-name">{top3[2].team}</h4>
            <div className="podium-rating-box">
              <span className="podium-rating-num">{top3[2].rating}</span>
              <span className="podium-rating-lbl">ICC RATING</span>
            </div>
            <span className="podium-points-tag">{top3[2].points.toLocaleString()} pts • {top3[2].matches} matches</span>
          </div>
        </div>
      )}

      {/* Full Rankings Table Card */}
      <div className="rankings-table-card">
        <div className="table-header-meta">
          <div className="table-headline">
            <Trophy size={16} />
            <span>
              {selectedCategory === 'men' ? "Men's" : "Women's"} {selectedFormat.toUpperCase()} Standings
            </span>
          </div>
          <span className="table-badge-count">{filteredRankings.length} Teams Ranked</span>
        </div>

        {isLoading ? (
          <div className="rankings-loading-box">
            <div className="rankings-spinner"></div>
            <span>Fetching official ICC standings...</span>
          </div>
        ) : filteredRankings.length === 0 ? (
          <div className="rankings-empty-state">
            <p>No team found matching "<strong>{searchQuery}</strong>".</p>
          </div>
        ) : (
          <div className="rankings-table-wrapper">
            <table className="rankings-data-table">
              <thead>
                <tr>
                  <th className="th-rank">Pos</th>
                  <th className="th-team">Team</th>
                  <th>Matches</th>
                  <th>Points</th>
                  <th className="th-rating">Rating</th>
                  <th className="th-trend">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredRankings.map((item) => {
                  const maxRating = rankingsList[0]?.rating || 300;
                  const ratingPercent = Math.min(100, Math.round((item.rating / maxRating) * 100));

                  return (
                    <tr key={item.code} className={`rank-row rank-${item.rank}`}>
                      {/* Rank Pos */}
                      <td className="td-rank">
                        <span className={`rank-number-badge ${item.rank <= 3 ? `top-${item.rank}` : ''}`}>
                          {item.rank}
                        </span>
                      </td>

                      {/* Team Name & Flag */}
                      <td className="td-team">
                        <div className="team-cell-wrapper">
                          <span className="team-flag-icon">{item.flag}</span>
                          <span className="team-title-text">{item.team}</span>
                          <span className="team-short-code">{item.code}</span>
                        </div>
                      </td>

                      {/* Matches */}
                      <td className="td-matches">{item.matches}</td>

                      {/* Points */}
                      <td className="td-points">{item.points.toLocaleString()}</td>

                      {/* Rating with Visual Bar */}
                      <td className="td-rating">
                        <div className="rating-cell-box">
                          <strong className="rating-digit">{item.rating}</strong>
                          <div className="rating-progress-track">
                            <div
                              className="rating-progress-bar"
                              style={{ width: `${ratingPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Trend */}
                      <td className="td-trend">
                        {item.trend === 'up' && (
                          <span className="trend-badge up" title="Moved up in rankings">
                            <ArrowUp size={13} /> Up
                          </span>
                        )}
                        {item.trend === 'down' && (
                          <span className="trend-badge down" title="Moved down in rankings">
                            <ArrowDown size={13} /> Down
                          </span>
                        )}
                        {item.trend === 'same' && (
                          <span className="trend-badge same" title="No change in position">
                            <Minus size={13} /> Same
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamRankings;
