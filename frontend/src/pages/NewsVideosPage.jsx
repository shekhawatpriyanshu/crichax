import React from 'react';
import NewsAndVideos from '../components/news/NewsAndVideos';
import { ArrowLeft, Newspaper } from 'lucide-react';

export const NewsVideosPage = ({ onBackToDashboard }) => {
  return (
    <div className="news-page-container">
      {/* Top Header Row with Back Button */}
      <div className="news-page-header-nav">
        <button
          type="button"
          id="btn-back-from-news"
          className="btn-back-hub"
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
        <div className="news-page-badge">
          <span className="live-pill-animated">
            <Newspaper size={13} /> OFFICIAL NEWS & MEDIA
          </span>
        </div>
      </div>

      {/* Main News & Videos Component */}
      <NewsAndVideos />
    </div>
  );
};

export default NewsVideosPage;
