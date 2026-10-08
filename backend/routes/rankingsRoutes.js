import express from "express";
import { handleGetRankings } from "../controller/rankings/rankingsController.js";

const router = express.Router();

// GET /api/rankings?category=men|women&format=test|odi|t20i
router.get("/", handleGetRankings);

export default router;
