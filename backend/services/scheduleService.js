// Curated comprehensive international & franchise cricket schedule fixtures
const FIXTURES_DATABASE = [
  {
    id: "sch-1",
    series: "India Tour of South Africa 2026",
    matchNumber: "1st T20I",
    category: "international",
    format: "t20",
    team1: { name: "India", code: "IND", flag: "🇮🇳" },
    team2: { name: "South Africa", code: "RSA", flag: "🇿🇦" },
    date: "2026-10-09",
    timeGMT: "13:30",
    timeDisplay: "Tomorrow, 7:00 PM IST",
    countdown: "Starts in 26 hours",
    venue: "Kingsmead, Durban",
    city: "Durban, South Africa",
    broadcast: "CriChax HD 1",
    status: "Upcoming"
  },
  {
    id: "sch-2",
    series: "Trans-Tasman Trophy 2026",
    matchNumber: "1st ODI",
    category: "international",
    format: "odi",
    team1: { name: "Australia", code: "AUS", flag: "🇦🇺" },
    team2: { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
    date: "2026-10-10",
    timeGMT: "04:00",
    timeDisplay: "Friday, 9:30 AM IST",
    countdown: "Starts in 2 days",
    venue: "Melbourne Cricket Ground (MCG)",
    city: "Melbourne, Australia",
    broadcast: "CriChax HD 2",
    status: "Upcoming"
  },
  {
    id: "sch-3",
    series: "India Tour of South Africa 2026",
    matchNumber: "2nd T20I",
    category: "international",
    format: "t20",
    team1: { name: "India", code: "IND", flag: "🇮🇳" },
    team2: { name: "South Africa", code: "RSA", flag: "🇿🇦" },
    date: "2026-10-11",
    timeGMT: "13:30",
    timeDisplay: "Sunday, 7:00 PM IST",
    countdown: "Starts in 3 days",
    venue: "St George's Park, Gqeberha",
    city: "Port Elizabeth, South Africa",
    broadcast: "CriChax HD 1",
    status: "Upcoming"
  },
  {
    id: "sch-4",
    series: "England Summer Tour 2026",
    matchNumber: "1st Test (Day 1)",
    category: "international",
    format: "test",
    team1: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    team2: { name: "Pakistan", code: "PAK", flag: "🇵🇰" },
    date: "2026-10-12",
    timeGMT: "10:00",
    timeDisplay: "Monday, 3:30 PM IST",
    countdown: "Starts in 4 days",
    venue: "Headingley, Leeds",
    city: "Leeds, England",
    broadcast: "CriChax HD 3",
    status: "Upcoming"
  },
  {
    id: "sch-5",
    series: "Caribbean T20 International Series",
    matchNumber: "3rd T20I",
    category: "international",
    format: "t20",
    team1: { name: "West Indies", code: "WI", flag: "🌴" },
    team2: { name: "Sri Lanka", code: "SL", flag: "🇱🇰" },
    date: "2026-10-13",
    timeGMT: "18:30",
    timeDisplay: "Tuesday, 11:30 PM IST",
    countdown: "Starts in 5 days",
    venue: "Kensington Oval, Bridgetown",
    city: "Bridgetown, Barbados",
    broadcast: "CriChax HD 2",
    status: "Upcoming"
  },
  {
    id: "sch-6",
    series: "Trans-Tasman Trophy 2026",
    matchNumber: "2nd ODI",
    category: "international",
    format: "odi",
    team1: { name: "Australia", code: "AUS", flag: "🇦🇺" },
    team2: { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
    date: "2026-10-14",
    timeGMT: "03:30",
    timeDisplay: "Wednesday, 9:00 AM IST",
    countdown: "Starts in 6 days",
    venue: "Sydney Cricket Ground (SCG)",
    city: "Sydney, Australia",
    broadcast: "CriChax HD 2",
    status: "Upcoming"
  },
  {
    id: "sch-7",
    series: "Border-Gavaskar Trophy 2026",
    matchNumber: "1st Test",
    category: "international",
    format: "test",
    team1: { name: "Australia", code: "AUS", flag: "🇦🇺" },
    team2: { name: "India", code: "IND", flag: "🇮🇳" },
    date: "2026-10-18",
    timeGMT: "02:30",
    timeDisplay: "Oct 18, 8:00 AM IST",
    countdown: "Starts in 10 days",
    venue: "Optus Stadium, Perth",
    city: "Perth, Australia",
    broadcast: "CriChax HD 1",
    status: "Upcoming"
  },
  {
    id: "sch-8",
    series: "Indian Premier League (IPL)",
    matchNumber: "Match 1 • Opening Clash",
    category: "league",
    format: "t20",
    team1: { name: "Chennai Super Kings", code: "CSK", flag: "🦁" },
    team2: { name: "Mumbai Indians", code: "MI", flag: "🔵" },
    date: "2026-10-22",
    timeGMT: "14:00",
    timeDisplay: "Oct 22, 7:30 PM IST",
    countdown: "Starts in 14 days",
    venue: "Wankhede Stadium, Mumbai",
    city: "Mumbai, India",
    broadcast: "CriChax 4K Broadcast",
    status: "Upcoming"
  },
  {
    id: "sch-9",
    series: "Indian Premier League (IPL)",
    matchNumber: "Match 2",
    category: "league",
    format: "t20",
    team1: { name: "Royal Challengers Bengaluru", code: "RCB", flag: "🔴" },
    team2: { name: "Kolkata Knight Riders", code: "KKR", flag: "🟣" },
    date: "2026-10-23",
    timeGMT: "14:00",
    timeDisplay: "Oct 23, 7:30 PM IST",
    countdown: "Starts in 15 days",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    city: "Bengaluru, India",
    broadcast: "CriChax 4K Broadcast",
    status: "Upcoming"
  },
  {
    id: "sch-10",
    series: "ICC Champions Trophy 2026",
    matchNumber: "Semi-Final 1",
    category: "icc",
    format: "odi",
    team1: { name: "India", code: "IND", flag: "🇮🇳" },
    team2: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    date: "2026-10-28",
    timeGMT: "08:30",
    timeDisplay: "Oct 28, 2:00 PM IST",
    countdown: "Starts in 20 days",
    venue: "Eden Gardens, Kolkata",
    city: "Kolkata, India",
    broadcast: "CriChax Worldwide Live",
    status: "Upcoming"
  }
];

export const getSchedule = async (category = "all", format = "all", searchQuery = "") => {
  let list = [...FIXTURES_DATABASE];

  // Category filter
  if (category && category !== "all") {
    list = list.filter((item) => item.category === category);
  }

  // Format filter
  if (format && format !== "all") {
    list = list.filter((item) => item.format === format);
  }

  // Search filter
  const q = (searchQuery || "").toLowerCase().trim();
  if (q) {
    list = list.filter(
      (item) =>
        item.series.toLowerCase().includes(q) ||
        item.team1.name.toLowerCase().includes(q) ||
        item.team2.name.toLowerCase().includes(q) ||
        item.team1.code.toLowerCase().includes(q) ||
        item.team2.code.toLowerCase().includes(q) ||
        item.venue.toLowerCase().includes(q)
    );
  }

  return {
    category,
    format,
    count: list.length,
    fixtures: list
  };
};

export default {
  getSchedule
};
