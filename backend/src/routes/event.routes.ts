import { Router } from "express";

import { EventController } from "../controllers/event.controller";

import { validate } from "../middleware/validate.middleware";

import { BulkEventSchema } from "../validators/event.validator";
import { ingestionLimiter } from "../middleware/rateLimit.middleware";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/events/bulk:
 *   post:
 *    summary: Ingest bulk events
 *    tags:
 *      - Events
 *    requestBody:
 *      required: true
 *    content:
 *      application/json:
 *    schema:
 *      $ref: '#/components/schemas/BulkEvent'
 *    responses:
 *      200:
 *        description: Events ingested successfully
 */

router.post(
  "/bulk",
  ingestionLimiter,
  validate(BulkEventSchema),
  asyncHandler(EventController.ingestEvents),
);

export default router;
