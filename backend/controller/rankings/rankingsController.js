import { getRankings } from "../../services/rankingsService.js";

export const handleGetRankings = async (req, res) => {
  try {
    const { category = "men", format = "odi" } = req.query;
    const data = await getRankings(category, format);

    return res.status(200).json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error("Get Rankings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch ICC rankings",
      error: error.message
    });
  }
};

export default {
  handleGetRankings
};
