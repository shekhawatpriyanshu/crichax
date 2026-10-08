// ICC Official Team Rankings Data for Men & Women across all major formats
const RANKINGS_DATA = {
  men: {
    test: [
      { rank: 1, team: "India", code: "IND", flag: "🇮🇳", matches: 38, points: 4578, rating: 120, trend: "same" },
      { rank: 2, team: "Australia", code: "AUS", flag: "🇦🇺", matches: 37, points: 4292, rating: 116, trend: "same" },
      { rank: 3, team: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", matches: 43, points: 4515, rating: 105, trend: "up" },
      { rank: 4, team: "South Africa", code: "RSA", flag: "🇿🇦", matches: 29, points: 3016, rating: 104, trend: "down" },
      { rank: 5, team: "New Zealand", code: "NZ", flag: "🇳🇿", matches: 32, points: 3104, rating: 97, trend: "same" },
      { rank: 6, team: "Sri Lanka", code: "SL", flag: "🇱🇰", matches: 30, points: 2580, rating: 86, trend: "up" },
      { rank: 7, team: "Pakistan", code: "PAK", flag: "🇵🇰", matches: 28, points: 2324, rating: 83, trend: "down" },
      { rank: 8, team: "West Indies", code: "WI", flag: "🌴", matches: 31, points: 2356, rating: 76, trend: "same" },
      { rank: 9, team: "Bangladesh", code: "BAN", flag: "🇧🇩", matches: 27, points: 1782, rating: 66, trend: "same" },
      { rank: 10, team: "Ireland", code: "IRE", flag: "🇮🇪", matches: 10, points: 280, rating: 28, trend: "same" }
    ],
    odi: [
      { rank: 1, team: "India", code: "IND", flag: "🇮🇳", matches: 48, points: 5856, rating: 122, trend: "same" },
      { rank: 2, team: "Australia", code: "AUS", flag: "🇦🇺", matches: 42, points: 4872, rating: 116, trend: "same" },
      { rank: 3, team: "South Africa", code: "RSA", flag: "🇿🇦", matches: 36, points: 3960, rating: 110, trend: "up" },
      { rank: 4, team: "Pakistan", code: "PAK", flag: "🇵🇰", matches: 34, points: 3604, rating: 106, trend: "down" },
      { rank: 5, team: "New Zealand", code: "NZ", flag: "🇳🇿", matches: 38, points: 3838, rating: 101, trend: "same" },
      { rank: 6, team: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", matches: 37, points: 3515, rating: 95, trend: "same" },
      { rank: 7, team: "Sri Lanka", code: "SL", flag: "🇱🇰", matches: 46, points: 4278, rating: 93, trend: "up" },
      { rank: 8, team: "Bangladesh", code: "BAN", flag: "🇧🇩", matches: 40, points: 3440, rating: 86, trend: "same" },
      { rank: 9, team: "Afghanistan", code: "AFG", flag: "🇦🇫", matches: 31, points: 2542, rating: 82, trend: "up" },
      { rank: 10, team: "West Indies", code: "WI", flag: "🌴", matches: 38, points: 2736, rating: 72, trend: "down" }
    ],
    t20i: [
      { rank: 1, team: "India", code: "IND", flag: "🇮🇳", matches: 68, points: 18020, rating: 265, trend: "same" },
      { rank: 2, team: "Australia", code: "AUS", flag: "🇦🇺", matches: 51, points: 13056, rating: 256, trend: "same" },
      { rank: 3, team: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", matches: 49, points: 12250, rating: 250, trend: "up" },
      { rank: 4, team: "West Indies", code: "WI", flag: "🌴", matches: 54, points: 13392, rating: 248, trend: "up" },
      { rank: 5, team: "South Africa", code: "RSA", flag: "🇿🇦", matches: 48, points: 11808, rating: 246, trend: "down" },
      { rank: 6, team: "New Zealand", code: "NZ", flag: "🇳🇿", matches: 56, points: 13440, rating: 240, trend: "same" },
      { rank: 7, team: "Pakistan", code: "PAK", flag: "🇵🇰", matches: 58, points: 13804, rating: 238, trend: "down" },
      { rank: 8, team: "Sri Lanka", code: "SL", flag: "🇱🇰", matches: 45, points: 10350, rating: 230, trend: "same" },
      { rank: 9, team: "Bangladesh", code: "BAN", flag: "🇧🇩", matches: 52, points: 11700, rating: 225, trend: "same" },
      { rank: 10, team: "Afghanistan", code: "AFG", flag: "🇦🇫", matches: 42, points: 9324, rating: 222, trend: "up" }
    ]
  },
  women: {
    odi: [
      { rank: 1, team: "Australia", code: "AUS", flag: "🇦🇺", matches: 32, points: 5216, rating: 163, trend: "same" },
      { rank: 2, team: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", matches: 35, points: 4480, rating: 128, trend: "same" },
      { rank: 3, team: "South Africa", code: "RSA", flag: "🇿🇦", matches: 33, points: 3795, rating: 115, trend: "up" },
      { rank: 4, team: "India", code: "IND", flag: "🇮🇳", matches: 30, points: 3210, rating: 107, trend: "down" },
      { rank: 5, team: "New Zealand", code: "NZ", flag: "🇳🇿", matches: 29, points: 2726, rating: 94, trend: "same" },
      { rank: 6, team: "West Indies", code: "WI", flag: "🌴", matches: 28, points: 2436, rating: 87, trend: "same" },
      { rank: 7, team: "Sri Lanka", code: "SL", flag: "🇱🇰", matches: 22, points: 1782, rating: 81, trend: "up" },
      { rank: 8, team: "Bangladesh", code: "BAN", flag: "🇧🇩", matches: 24, points: 1848, rating: 77, trend: "same" },
      { rank: 9, team: "Pakistan", code: "PAK", flag: "🇵🇰", matches: 29, points: 1972, rating: 68, trend: "down" },
      { rank: 10, team: "Ireland", code: "IRE", flag: "🇮🇪", matches: 25, points: 1550, rating: 62, trend: "same" }
    ],
    t20i: [
      { rank: 1, team: "Australia", code: "AUS", flag: "🇦🇺", matches: 45, points: 13275, rating: 295, trend: "same" },
      { rank: 2, team: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", matches: 48, points: 13440, rating: 280, trend: "same" },
      { rank: 3, team: "India", code: "IND", flag: "🇮🇳", matches: 52, points: 13780, rating: 265, trend: "up" },
      { rank: 4, team: "New Zealand", code: "NZ", flag: "🇳🇿", matches: 42, points: 10542, rating: 251, trend: "up" },
      { rank: 5, team: "South Africa", code: "RSA", flag: "🇿🇦", matches: 44, points: 10692, rating: 243, trend: "down" },
      { rank: 6, team: "West Indies", code: "WI", flag: "🌴", matches: 39, points: 9165, rating: 235, trend: "same" },
      { rank: 7, team: "Sri Lanka", code: "SL", flag: "🇱🇰", matches: 41, points: 9184, rating: 224, trend: "up" },
      { rank: 8, team: "Pakistan", code: "PAK", flag: "🇵🇰", matches: 46, points: 9890, rating: 215, trend: "down" },
      { rank: 9, team: "Bangladesh", code: "BAN", flag: "🇧🇩", matches: 43, points: 8643, rating: 201, trend: "same" },
      { rank: 10, team: "Ireland", code: "IRE", flag: "🇮🇪", matches: 34, points: 6426, rating: 189, trend: "same" }
    ]
  }
};

export const getRankings = async (category = "men", format = "odi") => {
  const cat = (category || "men").toLowerCase();
  const fmt = (format || "odi").toLowerCase();

  const categoryData = RANKINGS_DATA[cat] || RANKINGS_DATA.men;
  const list = categoryData[fmt] || categoryData.odi || [];

  return {
    category: cat,
    format: fmt,
    count: list.length,
    lastUpdated: "2026-10-08",
    rankings: list
  };
};

export default {
  getRankings
};
