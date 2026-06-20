import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError";

import { logger } from "../utils/logger";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error({
    requestId: req.requestId,

    message: err.message,

    stack: err.stack,
  });

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,

      error: err.message,

      details: err.details,
    });
  }

  return res.status(500).json({
    success: false,

    error: "Internal Server Error",
  });
};
