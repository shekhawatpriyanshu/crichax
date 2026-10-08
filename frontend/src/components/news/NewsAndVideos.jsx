import React, { useState, useEffect } from 'react';
import { getNewsAndVideos } from '../../services/newsService';
import {
  Newspaper,
  Video,
  Play,
  Flame,
  Clock,
  Eye,
  Sparkles,
  Search,
  X,
  ChevronRight,
  User,
  Share2,
  BookOpen,
  Film
} from 'lucide-react';

export const NewsAndVideos = () => {
  const [activeTab, setActiveTab] = useState('news'); // 'news' | 'videos'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getNewsAndVideos(activeTab, activeCategory, searchQuery);
        if (data) {
          setNewsList(data.news || []);
          setVideosList(data.videos || []);
        }
      } catch (err) {
        console.error('Error fetching news & videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, activeCategory, searchQuery]);

  const categories = [
    { key: 'all', label: 'All Updates' },
    { key: 'International', label: 'International' },
    { key: 'IPL', label: 'IPL & T20 Leagues' },
    { key: 'Test', label: 'Test Matches' },
    { key: "Women's", label: "Women's Cricket" },
  ];

  return (
    <div className="news-videos-component-container">
      {/* Top Header Banner */}
      <div className="news-header-strip">
        <div className="news-title-meta">
          <div className="news-badge-pill">
            <Sparkles size={13} /> CRICHAX MEDIA & BROADCAST
          </div>
          <h2 className="news-main-heading">
            Cricket News & <span className="gradient-text">Video Highlights</span>
          </h2>
          <p className="news-subheading">
            Breaking international stories, viral match moments, powerplay highlights, and press conferences.
          </p>
        </div>

        {/* Primary View Switcher: News vs Videos */}
        <div className="media-view-switcher">
          <button
            type="button"
            className={`media-toggle-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper size={16} />
            <span>Articles & News ({newsList.length})</span>
          </button>
          <button
            type="button"
            className={`media-toggle-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <Video size={16} />
            <span>Video Highlights ({videosList.length})</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Category Chips + Search Box */}
      <div className="news-toolbar-bar">
        {/* Category Pills */}
        <div className="news-category-pills">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`news-cat-chip ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="news-search-box">
          <Search size={16} className="search-ico" />
          <input
            type="text"
            className="news-search-input"
            placeholder={activeTab === 'news' ? "Search cricket news..." : "Search video highlights..."}
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

      {/* Content Rendering */}
      {isLoading ? (
        <div className="news-loading-box">
          <div className="news-spinner"></div>
          <span>Loading latest cricket media...</span>
        </div>
      ) : (
        <>
          {/* TAB 1: NEWS ARTICLES GRID */}
          {activeTab === 'news' && (
            <div className="news-articles-grid">
              {newsList.length === 0 ? (
                <div className="news-empty-state">
                  <Newspaper size={36} className="empty-ico" />
                  <p>No news articles found matching your criteria.</p>
                </div>
              ) : (
                newsList.map((article) => (
                  <article
                    key={article.id}
                    className="news-card"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="news-cover-wrapper">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="news-cover-img"
                        loading="lazy"
                      />
                      <div className="news-badges-overlay">
                        <span className="news-category-tag">{article.category}</span>
                        {article.trending && (
                          <span className="news-trending-tag">
                            <Flame size={12} /> TRENDING
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="news-card-body">
                      <h3 className="news-card-title">{article.title}</h3>
                      <p className="news-card-snippet">{article.snippet}</p>

                      <div className="news-tags-row">
                        {article.tags.map((tag, idx) => (
                          <span key={idx} className="news-mini-tag">#{tag}</span>
                        ))}
                      </div>

                      <div className="news-card-footer">
                        <div className="news-author-meta">
                          <User size={13} />
                          <span>{article.author}</span>
                        </div>
                        <div className="news-time-meta">
                          <Clock size={13} />
                          <span>{article.publishedAt} • {article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {/* TAB 2: VIDEO HIGHLIGHTS GRID */}
          {activeTab === 'videos' && (
            <div className="videos-grid">
              {videosList.length === 0 ? (
                <div className="news-empty-state">
                  <Film size={36} className="empty-ico" />
                  <p>No video highlights found matching your criteria.</p>
                </div>
              ) : (
                videosList.map((video) => (
                  <div
                    key={video.id}
                    className="video-card"
                    onClick={() => setActiveVideoModal(video)}
                  >
                    <div className="video-thumb-wrapper">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="video-thumb-img"
                        loading="lazy"
                      />
                      <div className="play-button-overlay">
                        <div className="play-button-circle">
                          <Play size={20} className="play-icon" />
                        </div>
                      </div>
                      <span className="video-duration-pill">{video.duration}</span>
                      <span className="video-badge-pill">{video.badge}</span>
                    </div>

                    <div className="video-card-body">
                      <span className="video-tournament-text">{video.tournament}</span>
                      <h4 className="video-title">{video.title}</h4>

                      <div className="video-meta-row">
                        <span className="video-views-text">
                          <Eye size={13} /> {video.views}
                        </span>
                        <span className="video-date-text">
                          <Clock size={13} /> {video.publishedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* FULL ARTICLE MODAL */}
      {selectedArticle && (
        <div className="media-modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="article-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-nav">
              <span className="modal-cat-tag">{selectedArticle.category}</span>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setSelectedArticle(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body-scrollable">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="article-modal-banner"
              />
              <h2 className="article-modal-title">{selectedArticle.title}</h2>

              <div className="article-modal-meta-row">
                <span>By <strong>{selectedArticle.author}</strong></span>
                <span>•</span>
                <span>{selectedArticle.publishedAt}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="article-modal-full-text">
                <p className="article-lead-p">{selectedArticle.snippet}</p>
                <p>{selectedArticle.content}</p>
              </div>

              <div className="article-modal-tags">
                {selectedArticle.tags.map((t, idx) => (
                  <span key={idx} className="tag-pill">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="media-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="video-player-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <span className="video-modal-badge">{activeVideoModal.badge}</span>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setActiveVideoModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="video-frame-container">
              <div className="mock-video-player">
                <img
                  src={activeVideoModal.thumbnail}
                  alt={activeVideoModal.title}
                  className="mock-video-bg"
                />
                <div className="mock-video-overlay-state">
                  <div className="pulsing-play-btn">
                    <Play size={28} />
                  </div>
                  <h3>Streaming: {activeVideoModal.title}</h3>
                  <p>{activeVideoModal.tournament} • Broadcast HD Feed</p>
                </div>
              </div>
            </div>

            <div className="video-modal-info">
              <h3 className="video-modal-title">{activeVideoModal.title}</h3>
              <div className="video-modal-stats">
                <span><Eye size={13} /> {activeVideoModal.views}</span>
                <span>•</span>
                <span><Clock size={13} /> {activeVideoModal.publishedAt}</span>
                <span>•</span>
                <span>HD 1080p 60fps</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAndVideos;
