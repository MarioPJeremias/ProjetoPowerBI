import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./db/schema.js";
import { getDatabricksConnection, closeConnection } from "./db/databricks.js";
import studentRoutes from "./routes/studentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import financialRoutes from "./routes/financialRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "Server is running" });
});

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/financial", financialRoutes);
app.use("/api/salary", salaryRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((error: any, req: Request, res: Response) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// Initialize and start server
async function startServer() {
  try {
    console.log("🚀 Starting Academia Babel API Server...");

    // Test Databricks connection
    await getDatabricksConnection();

    // Initialize database
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await closeConnection();
  process.exit(0);
});

startServer();
