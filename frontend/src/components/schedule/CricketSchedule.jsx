import React, { useState, useEffect } from 'react';
import { getCricketSchedule } from '../../services/scheduleService';
import {
  Calendar,
  Clock,
  MapPin,
  Tv,
  Bell,
  Check,
  Search,
  Trophy,
  Sparkles,
  X,
  Radio,
  ChevronRight
} from 'lucide-react';

export const CricketSchedule = () => {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'international' | 'league' | 'icc'
  const [activeFormat, setActiveFormat] = useState('all'); // 'all' | 't20' | 'odi' | 'test'
  const [searchQuery, setSearchQuery] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState({});

  useEffect(() => {
    const fetchFixtures = async () => {
      setIsLoading(true);
      try {
        const data = await getCricketSchedule(activeCategory, activeFormat, searchQuery);
        if (data && data.fixtures) {
          setFixtures(data.fixtures);
        }
      } catch (err) {
        console.error('Error fetching schedule:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFixtures();
  }, [activeCategory, activeFormat, searchQuery]);

  const toggleReminder = (id) => {
    setReminders((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categoryOptions = [
    { key: 'all', label: 'All Fixtures' },
    { key: 'international', label: 'Bilateral Series' },
    { key: 'league', label: 'T20 Leagues (IPL)' },
    { key: 'icc', label: 'ICC Tournaments' },
  ];

  const formatOptions = [
    { key: 'all', label: 'All Formats' },
    { key: 't20', label: 'T20' },
    { key: 'odi', label: 'ODI' },
    { key: 'test', label: 'Test' },
  ];

  return (
    <div className="schedule-component-container">
      {/* Top Banner */}
      <div className="schedule-header-strip">
        <div className="schedule-title-meta">
          <div className="schedule-badge-pill">
            <Calendar size={13} /> OFFICIAL FIXTURES CALENDAR
          </div>
          <h2 className="schedule-main-heading">
            Cricket Match <span className="gradient-text">Schedule & Fixtures</span>
          </h2>
          <p className="schedule-subheading">
            Track upcoming bilateral series, T20 franchise matches, and ICC tournaments with venue details and countdown timers.
          </p>
        </div>

        {/* Category Selector */}
        <div className="schedule-category-tabs">
          {categoryOptions.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`schedule-cat-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar: Formats + Search */}
      <div className="schedule-toolbar-bar">
        {/* Format Filter */}
        <div className="schedule-format-pills">
          {formatOptions.map((fmt) => (
            <button
              key={fmt.key}
              type="button"
              className={`schedule-fmt-chip ${activeFormat === fmt.key ? 'active' : ''}`}
              onClick={() => setActiveFormat(fmt.key)}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="schedule-search-box">
          <Search size={16} className="search-ico" />
          <input
            type="text"
            className="schedule-search-input"
            placeholder="Search by team, stadium, or tournament..."
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

      {/* Fixtures List */}
      <div className="fixtures-list-container">
        {isLoading ? (
          <div className="schedule-loading-box">
            <div className="schedule-spinner"></div>
            <span>Loading upcoming cricket fixtures...</span>
          </div>
        ) : fixtures.length === 0 ? (
          <div className="schedule-empty-box">
            <Calendar size={36} className="empty-cal-icon" />
            <h3>No Fixtures Found</h3>
            <p>Try resetting your filters or clearing search query.</p>
          </div>
        ) : (
          <div className="fixtures-grid">
            {fixtures.map((m) => {
              const isReminded = reminders[m.id];
              return (
                <div key={m.id} className="fixture-card">
                  {/* Card Header */}
                  <div className="fixture-card-top">
                    <span className="fixture-tournament-tag">
                      <Trophy size={13} /> {m.series} • {m.matchNumber}
                    </span>
                    <div className="fixture-status-tags">
                      <span className={`fmt-pill ${m.format}`}>{m.format.toUpperCase()}</span>
                      <span className="countdown-pill">
                        <Clock size={11} /> {m.countdown}
                      </span>
                    </div>
                  </div>

                  {/* Versus Teams Body */}
                  <div className="fixture-teams-row">
                    {/* Team 1 */}
                    <div className="fixture-team-block">
                      <span className="fixture-flag">{m.team1.flag}</span>
                      <span className="fixture-team-name">{m.team1.name}</span>
                      <span className="fixture-team-code">{m.team1.code}</span>
                    </div>

                    <div className="fixture-vs-circle">
                      <span>VS</span>
                    </div>

                    {/* Team 2 */}
                    <div className="fixture-team-block">
                      <span className="fixture-flag">{m.team2.flag}</span>
                      <span className="fixture-team-name">{m.team2.name}</span>
                      <span className="fixture-team-code">{m.team2.code}</span>
                    </div>
                  </div>

                  {/* Time & Venue Meta Strip */}
                  <div className="fixture-meta-strip">
                    <div className="meta-item">
                      <Calendar size={13} />
                      <span>{m.timeDisplay}</span>
                    </div>
                    <div className="meta-item" title={m.venue}>
                      <MapPin size={13} />
                      <span>{m.venue}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="fixture-card-footer">
                    <div className="broadcast-channel-tag">
                      <Tv size={12} />
                      <span>{m.broadcast}</span>
                    </div>
                    <button
                      type="button"
                      className={`btn-reminder-toggle ${isReminded ? 'active' : ''}`}
                      onClick={() => toggleReminder(m.id)}
                    >
                      {isReminded ? (
                        <>
                          <Check size={13} />
                          <span>Reminder Set</span>
                        </>
                      ) : (
                        <>
                          <Bell size={13} />
                          <span>Remind Me</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CricketSchedule;
