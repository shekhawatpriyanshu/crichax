import express from "express";
import jwt from "jsonwebtoken";
import { register } from "../../controller/auth/register.js";
import { login } from "../../controller/auth/login.js";
import prisma from "../../config/prisma.js";
import {
    generateTokens,
    setTokenCookies,
    clearTokenCookies
} from "../../config/tokens.js";

const router = express.Router();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "crichax_access_secret_key_10m_2026";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "crichax_refresh_secret_key_7d_2026";

// Public auth routes (set access & refresh tokens in cookies)
router.post("/register", register);
router.post("/login", login);

// Refresh Token route: validates 7-day refresh token and issues a new 10-minute access token in cookies
router.post(["/refresh", "/refresh-token"], async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Refresh token not provided"
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

        // Fetch user to ensure account is still active
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        if (!user) {
            clearTokenCookies(res);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate fresh access token (10m) and refreshed 7d token
        const tokens = generateTokens(user);

        // Store new tokens in cookies
        setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

        return res.status(200).json({
            success: true,
            message: "Tokens refreshed successfully",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });

    } catch (error) {
        clearTokenCookies(res);
        return res.status(403).json({
            success: false,
            message: "Invalid or expired refresh token. Please log in again."
        });
    }
});

// Protected route: get current logged-in user profile from access token cookie or Bearer header
router.get("/me", async (req, res) => {
    try {
        // Read from cookie first, fall back to Authorization header
        let token = req.cookies?.accessToken;

        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Access token missing"
            });
        }

        const decoded = jwt.verify(token, ACCESS_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Access token expired or invalid"
        });
    }
});

// Logout: clears both accessToken and refreshToken cookies
router.post("/logout", (req, res) => {
    clearTokenCookies(res);
    return res.status(200).json({
        success: true,
        message: "Logged out successfully and token cookies cleared"
    });
});

export default router;