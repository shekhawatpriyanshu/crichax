import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD || ""),
});

pool.on("connect", () => {
    console.log("PostgreSQL client connected");
});

pool.on("error", (error) => {
    console.error("PostgreSQL unexpected error on idle client:", error);
});

// Test connection immediately on load
pool.query("SELECT NOW()")
    .then((res) => {
        console.log("✅ Connected to PostgreSQL database:", process.env.DB_NAME);
    })
    .catch((err) => {
        console.error("❌ Failed to connect to PostgreSQL:", err.message);
    });

export default pool;