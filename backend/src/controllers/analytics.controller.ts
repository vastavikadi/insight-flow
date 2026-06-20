import { Request, Response } from "express";

import { AnalyticsService } from "../services/analytics.service";
import { ApiResponse } from "../utils/ApiResponse";
import { EventService } from "../services/event.service";
import { getPagination } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

export class AnalyticsController {
  private static buildDateFilter(req: Request) {
    return {
      startDate: req.query.startDate as string,

      endDate: req.query.endDate as string,
    };
  }

  static getOverview = async (req: Request, res: Response) => {
    const { startDate, endDate } = AnalyticsController.buildDateFilter(req);
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Missing required query parameters: startDate and endDate",
          ),
        );
    }

    const data = await AnalyticsService.getOverview(startDate, endDate);

    if (!data) {
      return res
        .status(404)
        .json(new ApiError(404, "No data found for the given date range"));
    }

    res.json(new ApiResponse(true, req.requestId, data));
  };

  static getSessions = async (req: Request, res: Response) => {
    const { page, limit } = getPagination(
      req.query.page as string,
      req.query.limit as string,
    );

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Invalid pagination parameters: page and limit must be positive integers",
          ),
        );
    }

    const query = {
      page,
      limit,
      search: req.query.search as string,
      sortBy: req.query.sortBy as any,
      sortOrder: req.query.sortOrder as any,
    };

    const { sessions, total } = await AnalyticsService.getSessions(query);

    return res.json(
      new ApiResponse(true, req.requestId, sessions, {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }),
    );
  };

  static getHeatmap = async (req: Request, res: Response) => {
    const pageUrl = req.query.pageUrl as string;

    const data = await EventService.getHeatmap(pageUrl);

    res.json(new ApiResponse(true, req.requestId, data));
  };

  static getPageAnalytics = async (req: Request, res: Response) => {
    const data = await AnalyticsService.getPageAnalytics();

    res.json(new ApiResponse(true, req.requestId, data));
  };

  static getEventDistribution = async (req: Request, res: Response) => {
    const data = await AnalyticsService.getEventDistribution();

    res.json(new ApiResponse(true, req.requestId, data));
  };

  static getConversionFunnel = async (req: Request, res: Response) => {
    const data = await AnalyticsService.getConversionFunnel();

    res.json(new ApiResponse(true, req.requestId, data));
  };

  static getTimeline = async (req: Request, res: Response) => {
    const { startDate, endDate } = AnalyticsController.buildDateFilter(req);

    const data = await AnalyticsService.getTimeline(startDate, endDate);

    res.json(new ApiResponse(true, req.requestId, data));
  };

  static getProductAnalytics = async (req: Request, res: Response) => {
    const { startDate, endDate } = AnalyticsController.buildDateFilter(req);

    const data = await AnalyticsService.getProductAnalytics(startDate, endDate);

    res.json(new ApiResponse(true, req.requestId, data));
  };

  static getTopEvents = async (req: Request, res: Response) => {
    const { startDate, endDate } = AnalyticsController.buildDateFilter(req);

    const data = await AnalyticsService.getTopEvents(startDate, endDate);

    res.json(new ApiResponse(true, req.requestId, data));
  };

  //export all sessions at once
  static exportSessions = async (req: Request, res: Response) => {
    const query = {
      page: 1,
      limit: 100000,
      search: req.query.search as string,
      sortBy: req.query.sortBy as any,
      sortOrder: req.query.sortOrder as any,
    };
    const { sessions } = await AnalyticsService.getSessions(query);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="sessions.csv"');
    res.json(new ApiResponse(true, req.requestId, sessions));
  };
}
