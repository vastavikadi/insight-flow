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

router.get(
  "/events",
  analyticsRateLimit,
  asyncHandler(
    AnalyticsController.getEventDistribution,
  ),
);

router.get(
  "/funnel",

  analyticsRateLimit,

  asyncHandler(
    AnalyticsController.getConversionFunnel,
  ),
);

router.get(
  "/timeline",

  analyticsRateLimit,

  asyncHandler(
    AnalyticsController.getTimeline,
  ),
);

router.get(
  "/products",

  analyticsRateLimit,

  asyncHandler(
    AnalyticsController.getProductAnalytics,
  ),
);

router.get(
  "/top-events",

  analyticsRateLimit,

  asyncHandler(
    AnalyticsController.getTopEvents,
  ),
);

router.get(
  "/export-sessions",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.exportSessions)
);

export default router;