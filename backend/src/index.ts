import "dotenv/config";
import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import mongoose from "mongoose";
import { appRouter } from "./routers";
import { createContext } from "./trpc";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

import { MongoMemoryServer } from "mongodb-memory-server";

app.get("/", (req, res) => {
  res.send("ZamGo Backend API is running");
});

const PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI;

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
