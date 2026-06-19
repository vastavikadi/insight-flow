import pinoHttp from "pino-http";
import { RequestHandler } from "express";

import { logger } from "../utils/logger.js";

const pinoMiddleware = pinoHttp({
  logger,
});

export const loggerMiddleware: RequestHandler =
  (req, res, next) => {
    pinoMiddleware(req, res);
    next();
  };