import crypto from "crypto";

import {
  Request,
  Response,
  NextFunction,
} from "express";

export const requestIdMiddleware =
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const requestId =
      crypto.randomUUID();

    req.requestId =
      requestId;

    res.setHeader(
      "X-Request-ID",
      requestId
    );

    next();
  };