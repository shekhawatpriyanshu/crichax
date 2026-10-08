import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/authRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import rankingsRoutes from "./routes/rankingsRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

const app = express();

// Middlewares
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root health check endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CriChax Backend API is running",
        version: "1.0.0"
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Match routes
app.use("/api/matches", matchRoutes);

// Player analytics routes
app.use("/api/players", playerRoutes);

// ICC Team Rankings routes
app.use("/api/rankings", rankingsRoutes);

// Cricket Schedule & Fixtures routes
app.use("/api/schedule", scheduleRoutes);

// Cricket News & Videos routes
app.use("/api/news", newsRoutes);

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Server Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

export default app;
