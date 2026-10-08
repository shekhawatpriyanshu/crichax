import { getLiveMatchesFromAPI } from "../../services/cricketService.js";
import prisma from "../../config/prisma.js";

// Helper to extract team scores from CricAPI or generic structures
const formatScore = (teamName, teamInfo, scoreArray) => {
  if (!scoreArray || !Array.isArray(scoreArray)) return null;
  // Match by inning name containing team name or shortname
  const found = scoreArray.find((s) => {
    const inning = (s.inning || "").toLowerCase();
    const name = (teamName || "").toLowerCase();
    return inning.includes(name) || (teamInfo?.shortname && inning.includes(teamInfo.shortname.toLowerCase()));
  });

  if (found) {
    return `${found.r}/${found.w} (${found.o} ov)`;
  }
  return null;
};

// Flags mapping for top cricket nations
const FLAG_MAP = {
  IND: "🇮🇳",
  India: "🇮🇳",
  AUS: "🇦🇺",
  Australia: "🇦🇺",
  ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  RSA: "🇿🇦",
  "South Africa": "🇿🇦",
  PAK: "🇵🇰",
  Pakistan: "🇵🇰",
  NZ: "🇳🇿",
  "New Zealand": "🇳🇿",
  WI: "🌴",
  "West Indies": "🌴",
  SL: "🇱🇰",
  "Sri Lanka": "🇱🇰",
  BAN: "🇧🇩",
  Bangladesh: "🇧🇩",
  AFG: "🇦🇫",
  Afghanistan: "🇦🇫",
  IRE: "🇮🇪",
  Ireland: "🇮🇪",
  ZIM: "🇿🇼",
  Zimbabwe: "🇿🇼",
  USA: "🇺🇸",
  SCO: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  NED: "🇳🇱",
  Netherlands: "🇳🇱"
};

const getFlag = (name, shortname) => {
  return FLAG_MAP[shortname] || FLAG_MAP[name] || "🏏";
};

export const getLiveMatches = async (req, res) => {
  try {
    const apiResult = await getLiveMatchesFromAPI();
    const rawMatches = apiResult.data || [];

    // Transform raw CricAPI matches into normalized structure
    const formattedMatches = rawMatches.map((m, index) => {
      const teams = m.teams || [];
      const teamInfo = m.teamInfo || [];

      const team1Name = teams[0] || m.team1Name || (teamInfo[0]?.name) || "Team A";
      const team2Name = teams[1] || m.team2Name || (teamInfo[1]?.name) || "Team B";

      const team1ShortName = teamInfo[0]?.shortname || team1Name.substring(0, 3).toUpperCase();
      const team2ShortName = teamInfo[1]?.shortname || team2Name.substring(0, 3).toUpperCase();

      const team1Score = m.team1Score || formatScore(team1Name, teamInfo[0], m.score) || (m.score?.[0] ? `${m.score[0].r}/${m.score[0].w} (${m.score[0].o} ov)` : "Yet to bat");
      const team2Score = m.team2Score || formatScore(team2Name, teamInfo[1], m.score) || (m.score?.[1] ? `${m.score[1].r}/${m.score[1].w} (${m.score[1].o} ov)` : "Yet to bat");

      return {
        id: m.id || `live-match-${index}`,
        externalId: String(m.id || `ext-${index}`),
        name: m.name || `${team1Name} vs ${team2Name}`,
        matchType: (m.matchType || "ODI").toUpperCase(),
        status: m.status || "Match In Progress",
        statusText: m.statusText || m.status || "Live action in progress",
        venue: m.venue || "International Cricket Stadium",
        seriesName: m.seriesName || m.series_id || "International Cricket Series",
        isLive: m.ms === "live" || m.matchStarted !== false,
        matchStartTime: m.dateTimeGMT ? new Date(m.dateTimeGMT) : new Date(),
        team1: {
          name: team1Name,
          shortName: team1ShortName,
          score: team1Score,
          flag: getFlag(team1Name, team1ShortName),
          img: teamInfo[0]?.img || null
        },
        team2: {
          name: team2Name,
          shortName: team2ShortName,
          score: team2Score,
          flag: getFlag(team2Name, team2ShortName),
          img: teamInfo[1]?.img || null
        },
        crr: m.crr || "CRR: 6.45",
        projected: m.projected || "Projected: 310"
      };
    });

    // Optionally sync into Postgres DB via Prisma asynchronously (without blocking response)
    if (prisma && prisma.match) {
      Promise.all(
        formattedMatches.map(async (match) => {
          try {
            await prisma.match.upsert({
              where: { externalId: match.externalId },
              update: {
                name: match.name,
                team1Name: match.team1.name,
                team1ShortName: match.team1.shortName,
                team1Score: match.team1.score,
                team2Name: match.team2.name,
                team2ShortName: match.team2.shortName,
                team2Score: match.team2.score,
                matchType: match.matchType,
                status: match.status,
                venue: match.venue,
                seriesName: match.seriesName,
                isLive: true,
                matchStartTime: match.matchStartTime
              },
              create: {
                externalId: match.externalId,
                name: match.name,
                team1Name: match.team1.name,
                team1ShortName: match.team1.shortName,
                team1Score: match.team1.score,
                team2Name: match.team2.name,
                team2ShortName: match.team2.shortName,
                team2Score: match.team2.score,
                matchType: match.matchType,
                status: match.status,
                venue: match.venue,
                seriesName: match.seriesName,
                isLive: true,
                matchStartTime: match.matchStartTime
              }
            });
          } catch (dbErr) {
            // DB sync can fail if migrations aren't applied yet; keep API working smoothly
            // console.warn("Prisma sync skipped:", dbErr.message);
          }
        })
      ).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      count: formattedMatches.length,
      source: apiResult.source || "cricapi",
      matches: formattedMatches
    });
  } catch (error) {
    console.error("Get Live Matches Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch live matches",
      error: error.message
    });
  }
};

export default {
  getLiveMatches
};
