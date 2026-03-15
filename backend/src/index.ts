import "dotenv/config";
import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import mongoose from "mongoose";
import { appRouter } from "./routers";
import { createContext } from "./trpc";

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

// Simple JSON health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// Catch-all for failed API matches to ensure we return JSON, not a string
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found", path: req.path });
});

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
  }

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
    .connect(MONGO_URI)
    .then(() => {
      console.log("📦 Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

startServer();
