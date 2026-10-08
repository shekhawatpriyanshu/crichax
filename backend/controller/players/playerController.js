import { searchPlayers, getPlayerById } from "../../services/playerService.js";

export const handleSearchPlayers = async (req, res) => {
  try {
    const { query } = req.query;
    const players = await searchPlayers(query);

    return res.status(200).json({
      success: true,
      count: players.length,
      query: query || "",
      players
    });
  } catch (error) {
    console.error("Player Search Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search players",
      error: error.message
    });
  }
};

export const handleGetPlayerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await getPlayerById(id);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    return res.status(200).json({
      success: true,
      player
    });
  } catch (error) {
    console.error("Get Player Details Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch player details",
      error: error.message
    });
  }
};

export default {
  handleSearchPlayers,
  handleGetPlayerDetails
};
