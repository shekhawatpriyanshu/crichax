import express from "express";
import {
  handleSearchPlayers,
  handleGetPlayerDetails
} from "../controller/players/playerController.js";

const router = express.Router();

// Search players: GET /api/players/search?query=...
router.get("/search", handleSearchPlayers);

// Player details: GET /api/players/:id
router.get("/:id", handleGetPlayerDetails);

export default router;
