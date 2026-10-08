import express from "express";
import { handleGetSchedule } from "../controller/schedule/scheduleController.js";

const router = express.Router();

// GET /api/schedule?category=all|international|league|icc&format=all|t20|odi|test&query=...
router.get("/", handleGetSchedule);

export default router;
