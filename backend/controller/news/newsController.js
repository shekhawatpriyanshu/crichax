import { getNewsAndVideos } from "../../services/newsService.js";

export const handleGetNewsAndVideos = async (req, res) => {
  try {
    const { type = "all", category = "all", query = "" } = req.query;
    const data = await getNewsAndVideos(type, category, query);

    return res.status(200).json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error("Get News & Videos Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cricket news and videos",
      error: error.message
    });
  }
};

export default {
  handleGetNewsAndVideos
};
