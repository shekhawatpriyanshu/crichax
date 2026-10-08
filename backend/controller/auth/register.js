import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";
import { generateTokens, setTokenCookies } from "../../config/tokens.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedName = name.trim();

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: trimmedEmail
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in PostgreSQL via Prisma
        const user = await prisma.user.create({
            data: {
                name: trimmedName,
                email: trimmedEmail,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        // Generate Access Token (10 min) & Refresh Token (7 days)
        const { accessToken, refreshToken } = generateTokens(user);

        // Store both tokens in secure httpOnly cookies
        setTokenCookies(res, accessToken, refreshToken);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            accessToken,
            refreshToken,
            user
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default register;