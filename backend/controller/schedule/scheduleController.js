import { getSchedule } from "../../services/scheduleService.js";

export const handleGetSchedule = async (req, res) => {
  try {
    const { category = "all", format = "all", query = "" } = req.query;
    const data = await getSchedule(category, format, query);

    return res.status(200).json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error("Get Schedule Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cricket schedule",
      error: error.message
    });
  }
};

export default {
  handleGetSchedule
};
