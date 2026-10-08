// Curated Breaking Cricket News & Match Video Highlights
const NEWS_ARTICLES = [
  {
    id: "news-1",
    title: "Champions Trophy 2026: Team India Begins Rigorous Training Camp Ahead of Mega Clash",
    snippet: "Head coach outlines high-intensity fielding drills and power-hitting strategies as the Men in Blue gear up for the blockbuster ICC tournament.",
    content: "The Indian cricket team arrived at the venue today to kickstart their pre-tournament preparation camp. With Kohli and Rohit showing vintage form during practice net sessions, the team management is looking focused on fielding sharp catching units and testing yorker executions at the death.",
    category: "International",
    author: "CriChax Editorial Desk",
    publishedAt: "1 hour ago",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    tags: ["Champions Trophy", "Team India", "ICC", "Rohit Sharma"],
    trending: true
  },
  {
    id: "news-2",
    title: "Border-Gavaskar Trophy: Perth Pitch Expected to Offer Fiery Pace and Steep Bounce",
    snippet: "Curators at the Optus Stadium confirm a fast, lively wicket with 10mm green grass cover designed to challenge top-order batters.",
    content: "The Optus Stadium pitch curator has confirmed that the opening Test of the Border-Gavaskar Trophy will feature significant pace and steep bounce. Fast bowling units from both Australia and India will be eager to exploit conditions under overcast skies.",
    category: "Test Cricket",
    author: "Senior Cricket Analyst",
    publishedAt: "3 hours ago",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1531415074868-036b1c57e359?w=800&auto=format&fit=crop&q=80",
    tags: ["BGT 2026", "Perth Test", "Australia", "Jasprit Bumrah"],
    trending: true
  },
  {
    id: "news-3",
    title: "IPL Mega Auction 2026: Key Retentions Revealed, High Stakes for Overseas All-Rounders",
    snippet: "Franchises lock in their core squads as aggressive bidding battles await the upcoming blockbuster auction weekend in Dubai.",
    content: "With retention windows officially closed, all 10 franchises have preserved their marquee captains and local match-winners. Massive purse balances remain available for explosive overseas stars, death bowlers, and emerging power-hitters.",
    category: "IPL",
    author: "CriChax Insider",
    publishedAt: "5 hours ago",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=800&auto=format&fit=crop&q=80",
    tags: ["IPL 2026", "Auction", "CSK", "MI", "RCB"],
    trending: false
  },
  {
    id: "news-4",
    title: "Travis Head Shines with Blistering Century in Trans-Tasman ODI Series Opener",
    snippet: "Australia's fearless opener sets MCG alight with a 68-ball hundred, dismantling the opposition with brutal boundary hitting.",
    content: "Travis Head continued his sensational white-ball dominance, plundering bowlers all across the Melbourne Cricket Ground with fearless strokeplay. His innings included 14 fours and 6 towering sixes, lifting the Aussies to a massive first-innings total.",
    category: "International",
    author: "Global Cricket Wire",
    publishedAt: "8 hours ago",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    tags: ["Australia", "Travis Head", "ODI", "New Zealand"],
    trending: false
  },
  {
    id: "news-5",
    title: "Women's Cricket Revolution: Record Broadcast Viewership Reported for T20 World Cup",
    snippet: "ICC reports over 40% surge in global viewership as nail-biting finishes and elite athletic standards captivate millions worldwide.",
    content: "Women's international cricket reached historic milestones this season, registering staggering broadcast numbers across digital and television networks. Stadium attendances in England, Australia, and India continue to break all previous tournament records.",
    category: "Women's Cricket",
    author: "ICC Media Relations",
    publishedAt: "12 hours ago",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=800&auto=format&fit=crop&q=80",
    tags: ["Women Cricket", "ICC T20", "Broadcast Records"],
    trending: false
  }
];

const VIDEO_HIGHLIGHTS = [
  {
    id: "vid-1",
    title: "India vs Australia Final Highlights • Epic Thriller & Climax Overs",
    tournament: "ICC Champions Trophy 2026",
    duration: "14:28",
    views: "2.4M views",
    publishedAt: "Yesterday",
    badge: "MATCH HIGHLIGHTS",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // embeddable format
    category: "Highlights"
  },
  {
    id: "vid-2",
    title: "Virat Kohli's Masterclass 84* Under Pressure • Complete Strokeplay Reel",
    tournament: "ICC Final Special",
    duration: "08:45",
    views: "1.8M views",
    publishedAt: "1 day ago",
    badge: "PLAYER SPOTLIGHT",
    thumbnail: "https://images.unsplash.com/photo-1531415074868-036b1c57e359?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Highlights"
  },
  {
    id: "vid-3",
    title: "Jasprit Bumrah's Unplayable Yorkers & 4-Wicket Destruction Reel",
    tournament: "T20 World Series",
    duration: "06:12",
    views: "1.1M views",
    publishedAt: "2 days ago",
    badge: "BOWLING SPELL",
    thumbnail: "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Highlights"
  },
  {
    id: "vid-4",
    title: "Post-Match Press Conference: Captain & Coach React to Historic Win",
    tournament: "Media Briefing",
    duration: "18:50",
    views: "640K views",
    publishedAt: "3 days ago",
    badge: "PRESS CONFERENCE",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Interviews"
  },
  {
    id: "vid-5",
    title: "Top 10 Greatest Catches & Run-Outs of the Cricket Season",
    tournament: "CriChax Top 10",
    duration: "11:20",
    views: "3.2M views",
    publishedAt: "4 days ago",
    badge: "TOP 10 MOMENTS",
    thumbnail: "https://images.unsplash.com/photo-1531415074868-036b1c57e359?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Highlights"
  }
];

export const getNewsAndVideos = async (type = "all", category = "all", query = "") => {
  let articles = [...NEWS_ARTICLES];
  let videos = [...VIDEO_HIGHLIGHTS];

  const q = (query || "").toLowerCase().trim();

  if (category && category !== "all") {
    articles = articles.filter((a) => a.category.toLowerCase().includes(category.toLowerCase()));
    videos = videos.filter((v) => v.category.toLowerCase().includes(category.toLowerCase()) || v.badge.toLowerCase().includes(category.toLowerCase()));
  }

  if (q) {
    articles = articles.filter((a) => a.title.toLowerCase().includes(q) || a.snippet.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)));
    videos = videos.filter((v) => v.title.toLowerCase().includes(q) || v.tournament.toLowerCase().includes(q) || v.badge.toLowerCase().includes(q));
  }

  return {
    type,
    category,
    newsCount: articles.length,
    videosCount: videos.length,
    news: articles,
    videos: videos
  };
};

export default {
  getNewsAndVideos
};
