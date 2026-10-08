import React, { useState } from 'react';
import {
  Tv,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Radio,
  Users,
  Settings,
  Share2,
  Sparkles,
  Flame,
  MessageSquare,
  Send,
} from 'lucide-react';

const MATCHES = [
  {
    id: 'match-1',
    tournament: 'ICC Champions Trophy 2026 • Final',
    team1: { name: 'India', code: 'IND', score: '284/4', overs: '42.3', flag: '🇮🇳' },
    team2: { name: 'Australia', code: 'AUS', score: 'Yet to bat', overs: '', flag: '🇦🇺' },
    status: 'LIVE',
    venue: 'Lord\'s Cricket Ground, London',
    viewers: '2.4M',
    streamQuality: '1080p 60fps',
  },
  {
    id: 'match-2',
    tournament: 'T20 World League • Match 18',
    team1: { name: 'England', code: 'ENG', score: '182/6', overs: '20.0', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    team2: { name: 'South Africa', code: 'RSA', score: '136/3', overs: '14.2', flag: '🇿🇦' },
    status: 'LIVE',
    venue: 'Newlands, Cape Town',
    viewers: '890K',
    streamQuality: '1080p',
  },
  {
    id: 'match-3',
    tournament: 'Super Series • 2nd ODI',
    team1: { name: 'Pakistan', code: 'PAK', score: '312/8', overs: '50.0', flag: '🇵🇰' },
    team2: { name: 'New Zealand', code: 'NZ', score: '198/4', overs: '32.1', flag: '🇳🇿' },
    status: 'LIVE',
    venue: 'Eden Park, Auckland',
    viewers: '620K',
    streamQuality: '720p',
  },
];

export const LiveStreaming = () => {
  const [selectedMatch, setSelectedMatch] = useState(MATCHES[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const [chatMessages, setChatMessages] = useState([
    { user: 'RohitFan99', text: 'Kohli is looking in absolute sublime touch today! 🔥', time: '15:32' },
    { user: 'CricketNerd', text: 'Cummins bowling tight lines outside off stump.', time: '15:33' },
    { user: 'Sam_Aus', text: 'Need a wicket right now or this reaches 330+', time: '15:34' },
    { user: 'Aarav18', text: 'WHAT A SHOT! Straight down the ground for FOUR!', time: '15:35' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        user: 'You',
        text: newMsg.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMsg('');
  };

  return (
    <div className="cricket-feature-container">
      {/* Match Selector Strip */}
      <div className="stream-matches-selector">
        {MATCHES.map((match) => (
          <div
            key={match.id}
            className={`stream-match-pill ${selectedMatch.id === match.id ? 'active' : ''}`}
            onClick={() => setSelectedMatch(match)}
          >
            <div className="pill-top">
              <span className="live-badge-pulse">
                <span className="pulse-dot"></span> LIVE
              </span>
              <span className="pill-viewers">
                <Users size={12} /> {match.viewers}
              </span>
            </div>
            <div className="pill-teams">
              <span>{match.team1.flag} {match.team1.code} {match.team1.score}</span>
              <span className="vs-divider">vs</span>
              <span>{match.team2.flag} {match.team2.code}</span>
            </div>
            <div className="pill-tournament">{match.tournament}</div>
          </div>
        ))}
      </div>

      {/* Main Broadcast Studio Area */}
      <div className="stream-layout-grid">
        {/* Video Player Display */}
        <div className="stream-player-panel">
          <div className="video-player-wrapper">
            {/* Simulated Live Stream Viewport */}
            <div className={`video-screen ${isPlaying ? 'screen-live' : 'screen-paused'}`}>
              <div className="stadium-graphic-overlay">
                <div className="broadcast-watermark">
                  <span className="channel-badge">CRI<span className="gradient-text">CHAX</span> LIVE HD</span>
                  <span className="fps-tag">{quality}</span>
                </div>

                {/* Score Ticker Overlay on Stream */}
                <div className="stream-overlay-scorebar">
                  <div className="scorebar-team">
                    <span className="flag">{selectedMatch.team1.flag}</span>
                    <span className="team-name">{selectedMatch.team1.code}</span>
                    <span className="runs">{selectedMatch.team1.score}</span>
                    {selectedMatch.team1.overs && <span className="overs">({selectedMatch.team1.overs} ov)</span>}
                  </div>
                  <div className="scorebar-vs">v</div>
                  <div className="scorebar-team">
                    <span className="flag">{selectedMatch.team2.flag}</span>
                    <span className="team-name">{selectedMatch.team2.code}</span>
                    <span className="runs">{selectedMatch.team2.score}</span>
                  </div>
                  <div className="scorebar-status">
                    <span className="live-dot-red"></span> CRR: 6.72 • Project: 338
                  </div>
                </div>

                {!isPlaying && (
                  <div className="paused-overlay">
                    <button className="big-play-btn" onClick={() => setIsPlaying(true)}>
                      <Play size={36} fill="#ffffff" />
                    </button>
                    <span>Stream Paused</span>
                  </div>
                )}
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="player-controls-bar">
              <div className="controls-left">
                <button
                  type="button"
                  className="control-btn"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  type="button"
                  className="control-btn"
                  onClick={() => setIsMuted((prev) => !prev)}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <div className="live-indicator-tag">
                  <span className="red-dot"></span> LIVE BROADCAST
                </div>
              </div>

              <div className="controls-right">
                <div className="quality-selector">
                  {['1080p', '720p', '480p'].map((q) => (
                    <button
                      key={q}
                      type="button"
                      className={`quality-btn ${quality === q ? 'active' : ''}`}
                      onClick={() => setQuality(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <button type="button" className="control-btn" title="Full Screen">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Match Title & Info */}
          <div className="stream-info-card">
            <div className="stream-title-row">
              <div>
                <h2 className="match-title">
                  {selectedMatch.team1.name} vs {selectedMatch.team2.name} - {selectedMatch.tournament}
                </h2>
                <p className="match-venue">📍 {selectedMatch.venue}</p>
              </div>
              <div className="stream-stats-tags">
                <span className="viewers-badge">
                  <Users size={14} /> {selectedMatch.viewers} Watching
                </span>
                <span className="server-status-badge">
                  <Radio size={14} /> Ultra-low Latency (0.4s)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat & Fan Reactions Panel */}
        <div className="stream-chat-panel">
          <div className="chat-header">
            <div className="chat-title">
              <MessageSquare size={16} />
              <span>Live Match Discussion</span>
            </div>
            <span className="chat-online-count">1.4k active</span>
          </div>

          <div className="chat-messages-container">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message-item ${msg.user === 'You' ? 'my-message' : ''}`}>
                <div className="chat-message-meta">
                  <span className="chat-username">{msg.user}</span>
                  <span className="chat-time">{msg.time}</span>
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <form className="chat-input-row" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Send message to live fans..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="chat-text-input"
            />
            <button type="submit" className="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveStreaming;
