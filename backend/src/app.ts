import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import eventRoutes from "./routes/event.routes";
import sessionRoutes from "./routes/session.routes";
import analyticsRoutes from "./routes/analytics.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { requestIdMiddleware } from "./middleware/requestId.middleware";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(requestIdMiddleware);

app.use(loggerMiddleware);

app.use(
  express.json({
    limit: "5mb",
  }),
);

app.use("/api/events", eventRoutes);

app.use("/api/sessions", sessionRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use(
  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec),
);

app.get("/health", (_, res) => {
  res.json({
    success: true,

    status: "healthy",

    uptime: process.uptime(),

    memory: process.memoryUsage(),

    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",

    timestamp: new Date(),
  });
});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
