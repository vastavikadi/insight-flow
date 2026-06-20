import { Request, Response } from "express";

import { EventService } from "../services/event.service";

import { ApiResponse } from "../utils/ApiResponse";

export class EventController {
  static ingestEvents = async (req: Request, res: Response) => {
    const result = await EventService.ingestEvents(req.body.events);

    return res.json(new ApiResponse(true, req.requestId, result));
  };
}
