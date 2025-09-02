import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

import customersRouter from "./routes/customers.js";
import addressesRouter from "./routes/addresses.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database file path
const DB_FILE = join("db", "database.sqlite");

// Initialize SQLite database
const db = new sqlite3.Database(DB_FILE, async (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");

    // Check if fresh DB required
    if (!existsSync(DB_FILE) || process.env.RESET_DB === "true") {
      try {
        const initSQL = readFileSync(join("db", "init.sql"), "utf8");
        db.exec(initSQL, (error) => {
          if (error) {
            console.error("❌ Error initializing DB:", error.message);
          } else {
            console.log("🎉 Database initialized with demo data.");
          }
        });
      } catch (e) {
        console.error("❌ Could not read init.sql:", e.message);
      }
    }
  }
});

// Pass DB to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/api/customers", customersRouter);
app.use("/api/addresses", addressesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

app.get("/", (req, res) => {
  res.send("✅ Backend server is running. Try /customers or /addresses");
});

});
