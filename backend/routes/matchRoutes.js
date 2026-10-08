import express from "express";
import { getLiveMatches } from "../controller/matches/matchController.js";

const router = express.Router();

// GET /api/matches/live - worldwide live cricket matches
router.get("/live", getLiveMatches);

export default router;
