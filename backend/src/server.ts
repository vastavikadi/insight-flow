import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;

async function startServer() {
  try {
    await connectDB();

    server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

async function shutdown() {
  logger.info("Shutting down...");

  if (server) {
    server.close(async () => {
      await mongoose.disconnect();

      logger.info("Mongo disconnected");

      process.exit(0);
    });
  } else {
    await mongoose.disconnect();
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();