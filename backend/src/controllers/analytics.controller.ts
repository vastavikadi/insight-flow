import { Request, Response } from "express";

import { AnalyticsService } from "../services/analytics.service.js";

import { EventService } from "../services/event.service.js";
import { getPagination } from "../utils/pagination.js";

export class AnalyticsController {
  static getOverview = async (req: Request, res: Response) => {
    const data = await AnalyticsService.getOverview();

    res.json({
      success: true,
      data,
    });
  };

  static getSessions = async (req: Request, res: Response) => {
    const { page, limit } = getPagination(
      req.query.page as string,
      req.query.limit as string,
    );

    const query = {
      page,
      limit,
      search: req.query.search as string,
      sortBy: req.query.sortBy as any,
      sortOrder: req.query.sortOrder as any,
    };

    const { sessions, total } = await AnalyticsService.getSessions(query);

    return res.json({
      success: true,
      data: sessions,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  };

  static getHeatmap = async (req: Request, res: Response) => {
    const pageUrl = req.query.page as string;

    const data = await EventService.getHeatmap(pageUrl);

    res.json({
      success: true,
      data,
    });
  };

  static getPageAnalytics = async (req: Request, res: Response) => {
    const data = await AnalyticsService.getPageAnalytics();

    res.json({
      success: true,
      data,
    });
  };
}
