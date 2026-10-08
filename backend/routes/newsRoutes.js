import express from "express";
import { handleGetNewsAndVideos } from "../controller/news/newsController.js";

const router = express.Router();

// GET /api/news?type=all|news|videos&category=all|international|ipl|editorial&query=...
router.get("/", handleGetNewsAndVideos);

export default router;
