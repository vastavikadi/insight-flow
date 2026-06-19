import { Request, Response } from "express";
import { EventService } from "../services/event.service.js";
import { EventDTO } from "../dto/event.dto.js";
import { getPagination } from "../utils/pagination.js";

export class SessionController {
  static getJourney = async (req: Request, res: Response) => {
    const { page, limit } = getPagination(
      req.query.page as string,
      req.query.limit as string,
    );

    const data = await EventService.getSessionJourney(
      req.params.sessionId as string,
      page,
      limit,
    );

    return res.json({
      success: true,

      page,

      limit,

      total: data.total,

      data: data.events.map(EventDTO.toResponse),
    });
  };
}
