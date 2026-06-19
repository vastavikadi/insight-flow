import { Router } from "express";

import { SessionController } from "../controllers/session.controller.js";
import { sessionLimiter } from "../middleware/rateLimit.middleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get(
  "/:sessionId",
  sessionLimiter,
  asyncHandler(SessionController.getJourney),
);

export default router;
