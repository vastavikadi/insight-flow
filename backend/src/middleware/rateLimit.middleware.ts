import rateLimit from "express-rate-limit";

export const analyticsRateLimit = rateLimit({
  windowMs: 60 * 1000,

  max: 500,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    error: "Too many requests",
  },
});

export const ingestionLimiter = rateLimit({
  windowMs: 60 * 1000,

  max: 2000,

  standardHeaders: true,

  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests",
  },
});

export const sessionLimiter = rateLimit({
  windowMs: 60 * 1000,

  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests",
  },
});
