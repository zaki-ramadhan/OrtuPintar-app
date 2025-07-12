// scripts/setupDatabase.js
import { db } from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  try {
    console.log("🚀 Setting up database...");

    // Read SQL file
    const sqlFile = path.join(__dirname, "../database/schema.sql");
    const sql = fs.readFileSync(sqlFile, "utf8");

    // Split by semicolon and execute each statement
    const statements = sql.split(";").filter((stmt) => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        await db.query(statement);
        console.log("✅ Executed:", statement.substring(0, 50) + "...");
      }
    }

    console.log("✅ Database setup completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();
