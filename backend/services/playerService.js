import axios from "axios";

// Curated comprehensive dataset of world-renowned cricket superstars & legends
const PLAYERS_DATABASE = [
  {
    id: "virat-kohli",
    name: "Virat Kohli",
    fullName: "Virat Kohli",
    nickname: "King Kohli / Run Machine",
    country: "India",
    countryCode: "IND",
    flag: "🇮🇳",
    jerseyNumber: 18,
    role: "Top-order Batter",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    born: "Nov 5, 1988 (Age 37)",
    birthPlace: "Delhi, India",
    teams: ["India", "Royal Challengers Bengaluru", "Delhi"],
    iccRank: { odi: 3, test: 12, t20i: "Retired from T20I" },
    highlights: [
      "80+ International Centuries",
      "Most runs in a single ODI World Cup (765 runs in 2023)",
      "ICC Player of the Decade (2011-2020)",
      "T20 World Cup 2024 Champion & Final Player of the Match"
    ],
    stats: {
      test: { matches: 118, innings: 200, runs: 9040, highest: "254*", avg: 48.86, sr: 55.6, hundreds: 29, fifties: 31 },
      odi: { matches: 295, innings: 283, runs: 13906, highest: "183", avg: 58.18, sr: 93.54, hundreds: 50, fifties: 72 },
      t20i: { matches: 125, innings: 117, runs: 4188, highest: "122*", avg: 48.69, sr: 137.04, hundreds: 1, fifties: 38 },
      ipl: { matches: 252, innings: 244, runs: 8004, highest: "113*", avg: 38.67, sr: 131.97, hundreds: 8, fifties: 55 }
    },
    bowling: {
      wickets: 9,
      best: "1/13",
      economy: 6.22
    },
    recentForm: ["84 (76)", "101* (98)", "47 (52)", "85 (92)", "121 (110)"]
  },
  {
    id: "rohit-sharma",
    name: "Rohit Sharma",
    fullName: "Rohit Gurunath Sharma",
    nickname: "Hitman",
    country: "India",
    countryCode: "IND",
    flag: "🇮🇳",
    jerseyNumber: 45,
    role: "Opening Batter / Captain",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm offbreak",
    born: "Apr 30, 1987 (Age 39)",
    birthPlace: "Nagpur, Maharashtra",
    teams: ["India", "Mumbai Indians", "Deccan Chargers"],
    iccRank: { odi: 2, test: 15, t20i: "Retired from T20I" },
    highlights: [
      "Only batter with 3 Double Centuries in ODI cricket (Record 264)",
      "T20 World Cup 2024 Winning Captain",
      "5x IPL Winning Captain",
      "Most sixes in International cricket (600+ sixes)"
    ],
    stats: {
      test: { matches: 64, innings: 111, runs: 4278, highest: "212", avg: 42.78, sr: 56.4, hundreds: 12, fifties: 18 },
      odi: { matches: 265, innings: 257, runs: 10866, highest: "264", avg: 49.16, sr: 92.44, hundreds: 31, fifties: 57 },
      t20i: { matches: 159, innings: 151, runs: 4231, highest: "121*", avg: 32.05, sr: 140.89, hundreds: 5, fifties: 32 },
      ipl: { matches: 257, innings: 252, runs: 6628, highest: "109*", avg: 29.72, sr: 131.14, hundreds: 2, fifties: 43 }
    },
    bowling: {
      wickets: 15,
      best: "4/6 (IPL hat-trick)",
      economy: 7.9
    },
    recentForm: ["57 (39)", "92 (41)", "68 (48)", "131 (84)", "87 (101)"]
  },
  {
    id: "jasprit-bumrah",
    name: "Jasprit Bumrah",
    fullName: "Jasprit Jasbirsingh Bumrah",
    nickname: "Boom Boom / Yorker King",
    country: "India",
    countryCode: "IND",
    flag: "🇮🇳",
    jerseyNumber: 93,
    role: "Right-arm Fast Bowler",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    born: "Dec 6, 1993 (Age 32)",
    birthPlace: "Ahmedabad, Gujarat",
    teams: ["India", "Mumbai Indians", "Gujarat"],
    iccRank: { test: 1, odi: 4, t20i: 2 },
    highlights: [
      "No. 1 Test Bowler in the World",
      "Player of the Tournament (T20 World Cup 2024)",
      "Deadliest reverse swing and toe-crushing yorker specialist",
      "Fastest Indian pacer to 150 Test wickets"
    ],
    stats: {
      test: { matches: 40, innings: 76, runs: 280, highest: "34*", avg: 7.36, sr: 44.2, hundreds: 0, fifties: 0 },
      odi: { matches: 89, innings: 88, runs: 56, highest: "14*", avg: 4.66, sr: 38.0, hundreds: 0, fifties: 0 },
      t20i: { matches: 70, innings: 69, runs: 12, highest: "7", avg: 4.0, sr: 60.0, hundreds: 0, fifties: 0 },
      ipl: { matches: 133, innings: 133, runs: 68, highest: "16*", avg: 8.5, sr: 80.0, hundreds: 0, fifties: 0 }
    },
    bowling: {
      testWickets: 173,
      odiWickets: 149,
      t20iWickets: 89,
      iplWickets: 165,
      bestTest: "6/27",
      bestODI: "6/19",
      bestT20I: "3/7",
      economy: 4.59
    },
    recentForm: ["2/21 (4 ov)", "3/14 (4 ov)", "4/46 (16 ov)", "6/45 (15 ov)", "2/18 (4 ov)"]
  },
  {
    id: "ms-dhoni",
    name: "MS Dhoni",
    fullName: "Mahendra Singh Dhoni",
    nickname: "Captain Cool / Thala / Mahi",
    country: "India",
    countryCode: "IND",
    flag: "🇮🇳",
    jerseyNumber: 7,
    role: "Wicketkeeper Batter / Finisher",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    born: "Jul 7, 1981 (Age 45)",
    birthPlace: "Ranchi, Jharkhand",
    teams: ["India", "Chennai Super Kings", "Rising Pune Supergiant"],
    iccRank: { odi: "Legend", test: "Legend", t20i: "Legend" },
    highlights: [
      "Only Captain to win all 3 ICC White Ball Trophies (T20 WC 2007, CWC 2011, CT 2013)",
      "5x IPL Champion Captain with CSK",
      "World-record lightning stumping time (0.08 seconds)",
      "Legendary 91* in 2011 World Cup Final with iconic winning six"
    ],
    stats: {
      test: { matches: 90, innings: 144, runs: 4876, highest: "224", avg: 38.09, sr: 59.11, hundreds: 6, fifties: 33 },
      odi: { matches: 350, innings: 297, runs: 10773, highest: "183*", avg: 50.57, sr: 87.56, hundreds: 10, fifties: 73 },
      t20i: { matches: 98, innings: 85, runs: 1617, highest: "56", avg: 37.6, sr: 126.13, hundreds: 0, fifties: 2 },
      ipl: { matches: 264, innings: 229, runs: 5243, highest: "84*", avg: 39.13, sr: 137.53, hundreds: 0, fifties: 24 }
    },
    bowling: {
      wickets: 1,
      best: "1/14",
      catches: 829,
      stumpings: 195
    },
    recentForm: ["26* (9)", "20* (4)", "37* (16)", "18* (7)", "44* (18)"]
  },
  {
    id: "pat-cummins",
    name: "Pat Cummins",
    fullName: "Patrick James Cummins",
    nickname: "Cummo",
    country: "Australia",
    countryCode: "AUS",
    flag: "🇦🇺",
    jerseyNumber: 30,
    role: "Right-arm Fast Bowler / Captain",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    born: "May 8, 1993 (Age 33)",
    birthPlace: "Westmead, Sydney",
    teams: ["Australia", "Sunrisers Hyderabad", "New South Wales"],
    iccRank: { test: 3, odi: 8, t20i: 14 },
    highlights: [
      "ICC World Test Championship 2023 Winning Captain",
      "ICC Cricket World Cup 2023 Winning Captain",
      "Back-to-back Hat-tricks in T20 World Cup 2024",
      "Allan Border Medalist"
    ],
    stats: {
      test: { matches: 62, innings: 118, runs: 1295, highest: "64*", avg: 16.6, sr: 51.0, hundreds: 0, fifties: 2 },
      odi: { matches: 88, innings: 56, runs: 450, highest: "36", avg: 12.16, sr: 78.4, hundreds: 0, fifties: 0 },
      t20i: { matches: 57, innings: 32, runs: 178, highest: "28", avg: 11.86, sr: 134.8, hundreds: 0, fifties: 0 },
      ipl: { matches: 58, innings: 41, runs: 515, highest: "56*", avg: 17.75, sr: 152.8, hundreds: 0, fifties: 3 }
    },
    bowling: {
      testWickets: 269,
      odiWickets: 141,
      t20iWickets: 66,
      iplWickets: 63,
      bestTest: "6/23",
      bestODI: "5/70",
      bestT20I: "3/15",
      economy: 4.88
    },
    recentForm: ["3/19 (4 ov)", "3/28 (4 ov)", "4/38 (14 ov)", "2/34 (10 ov)", "1/28 (4 ov)"]
  },
  {
    id: "travis-head",
    name: "Travis Head",
    fullName: "Travis Michael Head",
    nickname: "Heady",
    country: "Australia",
    countryCode: "AUS",
    flag: "🇦🇺",
    jerseyNumber: 62,
    role: "Aggressive Opening Batter",
    battingStyle: "Left-hand bat",
    bowlingStyle: "Right-arm offbreak",
    born: "Dec 29, 1993 (Age 32)",
    birthPlace: "Adelaide, South Australia",
    teams: ["Australia", "Sunrisers Hyderabad", "South Australia"],
    iccRank: { t20i: 1, odi: 5, test: 10 },
    highlights: [
      "No. 1 Ranked T20I Batter in the World",
      "Player of the Match in both WTC Final 2023 & ODI World Cup Final 2023",
      "Century in ODI World Cup Final (137 vs IND)",
      "Record powerplay destructiveness in IPL & International cricket"
    ],
    stats: {
      test: { matches: 49, innings: 81, runs: 3173, highest: "175", avg: 41.75, sr: 64.8, hundreds: 7, fifties: 16 },
      odi: { matches: 69, innings: 66, runs: 2645, highest: "154*", avg: 44.08, sr: 105.7, hundreds: 6, fifties: 16 },
      t20i: { matches: 38, innings: 37, runs: 1098, highest: "91", avg: 34.31, sr: 158.44, hundreds: 0, fifties: 6 },
      ipl: { matches: 25, innings: 25, runs: 772, highest: "102", avg: 35.09, sr: 187.83, hundreds: 1, fifties: 5 }
    },
    bowling: {
      wickets: 28,
      best: "4/10",
      economy: 5.6
    },
    recentForm: ["80 (23)", "154* (129)", "59 (23)", "34 (18)", "137 (120)"]
  },
  {
    id: "babar-azam",
    name: "Babar Azam",
    fullName: "Mohammad Babar Azam",
    nickname: "Bobby",
    country: "Pakistan",
    countryCode: "PAK",
    flag: "🇵🇰",
    jerseyNumber: 56,
    role: "Top-order Anchor Batter",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm offbreak",
    born: "Oct 15, 1994 (Age 31)",
    birthPlace: "Lahore, Punjab",
    teams: ["Pakistan", "Peshawar Zalmi", "Karachi Kings"],
    iccRank: { odi: 1, t20i: 4, test: 9 },
    highlights: [
      "Ranked No. 1 ODI Batter for over 1000 days",
      "Most centuries for Pakistan in T20I cricket (3 centuries)",
      "Highest run scorer in PSL history",
      "Classic trademark cover drive specialist"
    ],
    stats: {
      test: { matches: 55, innings: 102, runs: 3998, highest: "196", avg: 44.42, sr: 54.8, hundreds: 9, fifties: 26 },
      odi: { matches: 117, innings: 114, runs: 5729, highest: "158", avg: 56.72, sr: 88.75, hundreds: 19, fifties: 32 },
      t20i: { matches: 123, innings: 116, runs: 4145, highest: "122", avg: 41.03, sr: 129.08, hundreds: 3, fifties: 36 },
      psl: { matches: 90, innings: 88, runs: 3504, highest: "115", avg: 45.5, sr: 127.4, hundreds: 2, fifties: 33 }
    },
    bowling: {
      wickets: 2,
      best: "1/1",
      economy: 6.0
    },
    recentForm: ["74 (65)", "62 (48)", "104 (110)", "41 (35)", "37 (32)"]
  },
  {
    id: "joe-root",
    name: "Joe Root",
    fullName: "Joseph Edward Root",
    nickname: "Rooty",
    country: "England",
    countryCode: "ENG",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    jerseyNumber: 66,
    role: "Middle-order Master Batter",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm offbreak",
    born: "Dec 30, 1990 (Age 35)",
    birthPlace: "Sheffield, Yorkshire",
    teams: ["England", "Yorkshire", "Rajasthan Royals"],
    iccRank: { test: 1, odi: 18, t20i: 45 },
    highlights: [
      "Most Test Centuries for England (35+ Test hundreds)",
      "Surpassed 12,500+ Test Runs",
      "ICC Cricket World Cup 2019 Champion",
      "Part of the modern cricket 'Fab Four'"
    ],
    stats: {
      test: { matches: 149, innings: 272, runs: 12754, highest: "262*", avg: 51.22, sr: 56.8, hundreds: 35, fifties: 64 },
      odi: { matches: 171, innings: 160, runs: 6522, highest: "133*", avg: 47.6, sr: 86.8, hundreds: 16, fifties: 39 },
      t20i: { matches: 32, innings: 30, runs: 893, highest: "90*", avg: 35.72, sr: 126.3, hundreds: 0, fifties: 5 },
      ipl: { matches: 3, innings: 1, runs: 10, highest: "10", avg: 10.0, sr: 66.6, hundreds: 0, fifties: 0 }
    },
    bowling: {
      wickets: 70,
      best: "5/8 (vs India in Ahmedabad)",
      economy: 4.2
    },
    recentForm: ["143 (206)", "103 (121)", "87 (110)", "122* (274)", "68 (88)"]
  },
  {
    id: "kane-williamson",
    name: "Kane Williamson",
    fullName: "Kane Stuart Williamson",
    nickname: "Captain Kane",
    country: "New Zealand",
    countryCode: "NZ",
    flag: "🇳🇿",
    jerseyNumber: 22,
    role: "Top-order Anchor Batter",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm offbreak",
    born: "Aug 8, 1990 (Age 36)",
    birthPlace: "Tauranga, Bay of Plenty",
    teams: ["New Zealand", "Gujarat Titans", "Sunrisers Hyderabad"],
    iccRank: { test: 2, odi: 6, t20i: 18 },
    highlights: [
      "ICC World Test Championship 2021 Inaugural Winning Captain",
      "Player of the Tournament (CWC 2019)",
      "Over 32 Test Centuries for New Zealand",
      "Known worldwide as 'Cricket's Ultimate Gentleman'"
    ],
    stats: {
      test: { matches: 102, innings: 180, runs: 8881, highest: "251", avg: 54.48, sr: 51.4, hundreds: 32, fifties: 35 },
      odi: { matches: 165, innings: 157, runs: 6810, highest: "148", avg: 48.64, sr: 81.3, hundreds: 13, fifties: 45 },
      t20i: { matches: 93, innings: 90, runs: 2575, highest: "95", avg: 33.44, sr: 123.08, hundreds: 0, fifties: 18 },
      ipl: { matches: 79, innings: 77, runs: 2128, highest: "89", avg: 36.68, sr: 126.06, hundreds: 0, fifties: 18 }
    },
    bowling: {
      wickets: 37,
      best: "4/44",
      economy: 4.8
    },
    recentForm: ["104 (198)", "133* (260)", "76 (82)", "69 (93)", "85 (48)"]
  },
  {
    id: "rashid-khan",
    name: "Rashid Khan",
    fullName: "Rashid Khan Arman",
    nickname: "Magician",
    country: "Afghanistan",
    countryCode: "AFG",
    flag: "🇦🇫",
    jerseyNumber: 19,
    role: "Leg-spin Bowler & Explosive Finisher",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm legbreak googly",
    born: "Sep 20, 1998 (Age 28)",
    birthPlace: "Nangarhar, Afghanistan",
    teams: ["Afghanistan", "Gujarat Titans", "Adelaide Strikers"],
    iccRank: { t20i: 1, odi: 3, test: 20 },
    highlights: [
      "Fastest to 100 ODI wickets in cricket history (44 matches)",
      "Over 600+ T20 wickets worldwide (Highest by any spinner)",
      "Led Afghanistan to historic T20 World Cup 2024 Semi-finals",
      "Unpickable quick arm googly"
    ],
    stats: {
      test: { matches: 5, innings: 7, runs: 106, highest: "51", avg: 15.14, sr: 80.0, hundreds: 0, fifties: 1 },
      odi: { matches: 105, innings: 85, runs: 1324, highest: "60*", avg: 19.47, sr: 105.8, hundreds: 0, fifties: 5 },
      t20i: { matches: 93, innings: 58, runs: 460, highest: "48*", avg: 14.37, sr: 130.3, hundreds: 0, fifties: 0 },
      ipl: { matches: 121, innings: 62, runs: 543, highest: "79*", avg: 14.67, sr: 156.48, hundreds: 0, fifties: 1 }
    },
    bowling: {
      t20iWickets: 152,
      odiWickets: 190,
      iplWickets: 149,
      bestODI: "7/18",
      bestT20I: "5/3",
      bestIPL: "4/24 (Hat-trick)",
      economy: 6.1
    },
    recentForm: ["4/17 (4 ov)", "3/19 (4 ov)", "2/21 (4 ov)", "3/24 (10 ov)", "5/19 (9 ov)"]
  },
  {
    id: "sachin-tendulkar",
    name: "Sachin Tendulkar",
    fullName: "Sachin Ramesh Tendulkar",
    nickname: "Master Blaster / God of Cricket",
    country: "India",
    countryCode: "IND",
    flag: "🇮🇳",
    jerseyNumber: 10,
    role: "All-time Greatest Batter",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm legbreak / offbreak",
    born: "Apr 24, 1973 (Age 53)",
    birthPlace: "Mumbai, Maharashtra",
    teams: ["India", "Mumbai Indians", "Mumbai"],
    iccRank: { test: "Hall of Fame", odi: "Hall of Fame", t20i: "Hall of Fame" },
    highlights: [
      "100 International Centuries (World Record)",
      "34,357 International Runs (Highest in cricket history)",
      "First male cricketer to score 200 in an ODI (vs South Africa, 2010)",
      "ICC Cricket World Cup 2011 Champion & Bharat Ratna recipient"
    ],
    stats: {
      test: { matches: 200, innings: 329, runs: 15921, highest: "248*", avg: 53.78, sr: 54.0, hundreds: 51, fifties: 68 },
      odi: { matches: 463, innings: 452, runs: 18426, highest: "200*", avg: 44.83, sr: 86.23, hundreds: 49, fifties: 96 },
      t20i: { matches: 1, innings: 1, runs: 10, highest: "10", avg: 10.0, sr: 83.3, hundreds: 0, fifties: 0 },
      ipl: { matches: 78, innings: 78, runs: 2334, highest: "100*", avg: 34.83, sr: 119.81, hundreds: 1, fifties: 13 }
    },
    bowling: {
      wickets: 201,
      best: "5/32",
      economy: 5.1
    },
    recentForm: ["Retired Legend • Career Average 53.8"]
  }
];

export const searchPlayers = async (query = "") => {
  const cleanQuery = (query || "").trim().toLowerCase();

  // If search query is empty, return top featured popular players
  if (!cleanQuery) {
    return PLAYERS_DATABASE.slice(0, 6);
  }

  // Local comprehensive search
  const matched = PLAYERS_DATABASE.filter((player) => {
    return (
      player.name.toLowerCase().includes(cleanQuery) ||
      player.fullName.toLowerCase().includes(cleanQuery) ||
      player.country.toLowerCase().includes(cleanQuery) ||
      player.role.toLowerCase().includes(cleanQuery) ||
      (player.nickname && player.nickname.toLowerCase().includes(cleanQuery))
    );
  });

  return matched;
};

export const getPlayerById = async (playerId) => {
  const found = PLAYERS_DATABASE.find(
    (p) => p.id.toLowerCase() === (playerId || "").toLowerCase()
  );
  return found || null;
};

export default {
  searchPlayers,
  getPlayerById
};
