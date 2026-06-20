import { Request, Response } from "express";

import { AnalyticsService } from "../services/analytics.service.js";

import { EventService } from "../services/event.service.js";
import { getPagination, getDateFilters } from "../utils/pagination.js";

export class AnalyticsController {
  private static getDateFilters(
  req: Request,
) {
  return {
    startDate:
      req.query.startDate as string,

    endDate:
      req.query.endDate as string,
  };
  }
  
  static getOverview = async (req: Request, res: Response) => {
    const {
  startDate,
  endDate,
} =
  AnalyticsController.getDateFilters(
    req,
  );

const data =
  await AnalyticsService.getOverview(
    startDate,
    endDate,
  );

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
    const pageUrl = req.query.pageUrl as string;

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

  static getEventDistribution =
  async (
    req: Request,
    res: Response,
  ) => {

    const data =
      await AnalyticsService.getEventDistribution();

    res.json({
      success: true,
      data,
    });
  };

  static getConversionFunnel =
  async (
    req: Request,
    res: Response,
  ) => {

    const data =
      await AnalyticsService.getConversionFunnel();

    res.json({
      success: true,
      data,
    });
  };

  static getTimeline =
  async (
    req: Request,
    res: Response,
  ) => {

    const {
  startDate,
  endDate,
} =
  AnalyticsController.getDateFilters(
    req,
  );

    const data =
      await AnalyticsService.getTimeline(
        startDate, endDate
      );

    res.json({
      success: true,
      data,
    });
  };

  static getProductAnalytics =
  async (
    req: Request,
    res: Response,
  ) => {
    const {
  startDate,
  endDate,
} =
  AnalyticsController.getDateFilters(
    req,
  );

    const data =
      await AnalyticsService.getProductAnalytics(startDate, endDate);

    res.json({
      success: true,
      data,
    });
  };

  static getTopEvents =
  async (
    req: Request,
    res: Response,
  ) => {
    const {
  startDate,
  endDate,
} =
  AnalyticsController.getDateFilters(
    req,
  );

    const data =
      await AnalyticsService.getTopEvents(startDate, endDate,);

    res.json({
      success: true,
      data,
    });
  };
}
