import { Router } from "express";

import { EventController } from "../controllers/event.controller.js";

import { validate } from "../middleware/validate.middleware.js";

import { BulkEventSchema } from "../validators/event.validator.js";
import { ingestionLimiter } from "../middleware/rateLimit.middleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post(
  "/bulk",
  ingestionLimiter,
  validate(BulkEventSchema),
  asyncHandler(EventController.ingestEvents),
);

export default router;
