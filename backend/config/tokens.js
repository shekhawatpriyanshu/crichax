import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "crichax_access_secret_key_10m_2026";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "crichax_refresh_secret_key_7d_2026";

// 10 minutes in milliseconds
export const ACCESS_TOKEN_MAX_AGE = 10 * 60 * 1000;

// 7 days in milliseconds
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export const generateTokens = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: "10m"
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: "7d"
    });

    return { accessToken, refreshToken };
};

export const setTokenCookies = (res, accessToken, refreshToken) => {
    const isProduction = process.env.NODE_ENV === "production";

    // Set 10-minute access token cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: ACCESS_TOKEN_MAX_AGE
    });

    // Set 7-day refresh token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: REFRESH_TOKEN_MAX_AGE
    });
};

export const clearTokenCookies = (res) => {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict"
    });
};
