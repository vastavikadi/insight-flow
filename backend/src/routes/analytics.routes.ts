import { Router } from "express";

import { AnalyticsController } from "../controllers/analytics.controller";
import { asyncHandler } from "../middleware/asyncHandler";
import { analyticsRateLimit } from "../middleware/rateLimit.middleware";
import { validateQuery } from "../middleware/validateQuery.middleware";
import { SessionQuerySchema } from "../validators/session.validator";

const router = Router();

/**
 * @swagger
 * /api/analytics/overview:
 *   get:
 *     summary: Get analytics overview
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Analytics overview
 */
router.get(
  "/overview",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.getOverview),
);

/**
 * @swagger
 * /api/analytics/sessions:
 *   get:
 *     summary: Get analytics sessions
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Session Analytics
 */

router.get(
  "/sessions",
  analyticsRateLimit,
  validateQuery(SessionQuerySchema),
  asyncHandler(AnalyticsController.getSessions),
);

/**
 * @swagger
 * /api/analytics/heatmap:
 *   get:
 *     summary: Get analytics heatmap
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Analytics through heatmap
 */

router.get(
  "/heatmap",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.getHeatmap),
);

/**
 * @swagger
 * /api/analytics/pages:
 *   get:
 *     summary: Get analytics pages
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Pages analytics
 */

router.get(
  "/pages",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.getPageAnalytics),
);

/**
 * @swagger
 * /api/analytics/events:
 *   get:
 *     summary: Get analytics events
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Event analytics
 */

router.get(
  "/events",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.getEventDistribution),
);

/**
 * @swagger
 * /api/analytics/funnel:
 *   get:
 *     summary: Get analytics funnel
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Funnel analytics
 */

router.get(
  "/funnel",

  analyticsRateLimit,

  asyncHandler(AnalyticsController.getConversionFunnel),
);

/**
 * @swagger
 * /api/analytics/timeline:
 *   get:
 *     summary: Get analytics timeline
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Timeline Analytics
 */

router.get(
  "/timeline",

  analyticsRateLimit,

  asyncHandler(AnalyticsController.getTimeline),
);

/**
 * @swagger
 * /api/analytics/products:
 *  get:
 *    summary: Get analytics for products
 *    tags:
 *     - Analytics
 *    responses:
 *      200:
 *       description: Product analytics
 */

router.get(
  "/products",

  analyticsRateLimit,

  asyncHandler(AnalyticsController.getProductAnalytics),
);

/**
 * @swagger
 * /api/analytics/top-events:
 *  get:
 *   summary: Get top events
 *   tags:
 *     - Analytics
 *   responses:
 *     200:
 *      description: Top events analytics
 */

router.get(
  "/top-events",

  analyticsRateLimit,

  asyncHandler(AnalyticsController.getTopEvents),
);

/**
 * @swagger
 * /api/analytics/export-sessions:
 *  get:
 *    summary: Export all session data as CSV
 *    tags:
 *      - Analytics
 *  responses:
 *    200:
 *      description: CSV file containing session data
 */

router.get(
  "/export-sessions",
  analyticsRateLimit,
  asyncHandler(AnalyticsController.exportSessions),
);

export default router;
