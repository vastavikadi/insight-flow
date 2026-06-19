import { Router }
from "express";

import { AnalyticsController }
from "../controllers/analytics.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { analyticsRateLimit } from "../middleware/rateLimit.middleware.js";
import { validateQuery } from "../middleware/validateQuery.middleware.js";
import { SessionQuerySchema } from "../validators/session.validator.js";

const router = Router();

router.get(
  "/overview",
  analyticsRateLimit,
  asyncHandler(
    AnalyticsController.getOverview
  )
);

router.get(
  "/sessions",
  analyticsRateLimit,
  validateQuery(
    SessionQuerySchema
  ),
  asyncHandler(AnalyticsController.getSessions)
);

router.get(
  "/heatmap",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.getHeatmap)
);

router.get(
  "/pages",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.getPageAnalytics)
);

export default router;