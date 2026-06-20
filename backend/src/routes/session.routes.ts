import { Router } from "express";

import { SessionController } from "../controllers/session.controller";
import { sessionLimiter } from "../middleware/rateLimit.middleware";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/sessions/:sessionId:
 *   get:
 *    summary: Get session journey
 *    tags:
 *      - Sessions
 *    parameters:
 *      - in: path
 *        name: sessionId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Session journey retrieved successfully
 */

router.get(
  "/:sessionId",
  sessionLimiter,
  asyncHandler(SessionController.getJourney),
);

export default router;
