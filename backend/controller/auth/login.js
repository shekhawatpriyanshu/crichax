import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";
import { generateTokens, setTokenCookies } from "../../config/tokens.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const trimmedEmail = email.trim().toLowerCase();

        // Find user by email using Prisma
        const user = await prisma.user.findUnique({
            where: {
                email: trimmedEmail
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate Access Token (10m) & Refresh Token (7d)
        const { accessToken, refreshToken } = generateTokens(user);

        // Set both tokens in secure httpOnly cookies
        setTokenCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default login;