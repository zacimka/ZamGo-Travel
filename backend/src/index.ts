import "dotenv/config";
import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import mongoose from "mongoose";
import { appRouter } from "./routers";
import { createContext } from "./trpc";
import { User } from "./models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

// Update CORS to allow your production frontend
// allow all origins for debugging, but should be narrowed down later
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Log all requests to help debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Simple JSON health check with DB status
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    version: "debug-1.2", 
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    dbState: mongoose.connection.readyState,
    time: new Date().toISOString() 
  });
});

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// Implementation of the suggested /api/admin/login route
app.post("/api/admin/login", async (req, res) => {
  // Check if DB is connected first
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
        success: false, 
        message: "Database is not connected. Please check your MongoDB Atlas whitelist and URI.",
        readyState: mongoose.connection.readyState 
    });
  }

  try {
    const { email, password } = req.body;

    // We use User model which is the defined model in this project
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Login failed: user not found", email);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      console.error("Login failed: password mismatch", email);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET || 'secret', { expiresIn: "1h" });
    res.json({ success: true, token, role: user.role });

  } catch (err) {
    console.error("Exact login error:", err);
    res.status(500).json({ 
        success: false, 
        message: "Internal server error",
        errorInfo: err instanceof Error ? err.message : String(err)
    });
  }
});

// Catch-all for failed API matches - placed AFTER valid routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found", path: req.path });
});


// Protect REST routes with JWT
const authenticateAdmin = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

// REST route for testing bookings in Postman easily
app.get("/api/admin/bookings", authenticateAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
});

import { Booking } from "./models/Booking";
import { MongoMemoryServer } from "mongodb-memory-server";

app.get("/", (req, res) => {
  res.send("ZamGo Backend API is running");
});

const PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI;
let usingMemory = false;

const startServer = async () => {
  if (!MONGO_URI) {
    console.log(
      "No MONGO_URI provided in environment. Starting in-memory MongoDB server...",
    );
    const mongod = await MongoMemoryServer.create();
    MONGO_URI = mongod.getUri();
    console.log(`In-memory database started at ${MONGO_URI}`);
  } else {
    console.log("MONGO_URI loaded from environment");
    // Log a masked version for safety
    console.log(`MONGO_URI start: ${MONGO_URI.substring(0, 20)}...`);
  }

  console.log(`JWT_SECRET status: ${process.env.JWT_SECRET ? "Loaded" : "NOT LOADED - using fallback"}`);

  // Start the HTTP server regardless of whether the DB connection succeeds.
  const server = app.listen(PORT, () => {
    console.log(`🚀 Backend server listening on port ${PORT}`);
  });

  server.on("error", (error: any) => {
    if (error?.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Make sure PORT is not hard-coded (e.g., in \`.env\`) and that Render is using its assigned PORT.`,
      );
      process.exit(1);
    }
    console.error("Server error:", error);
  });

  mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000, // Detect failure faster
      maxPoolSize: 10,
    })
    .then(() => {
      console.log("📦 Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

startServer();
