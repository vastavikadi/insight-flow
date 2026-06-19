import { Request, Response } from "express";

import { EventService } from "../services/event.service.js";

import { ApiResponse } from "../utils/ApiResponse.js";

export class EventController {
  static ingestEvents = async (req: Request, res: Response) => {
    const result = await EventService.ingestEvents(req.body.events);

    return res.status(201).json({
      success: true,

      requestId: req.requestId,

      data: result,
    });
  };
}
