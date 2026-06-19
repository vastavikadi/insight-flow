import { Request, Response, NextFunction } from "express";

import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));

      return res.status(400).json({
        success: false,
        errors: error.errors ?? [],
      });
    }
  };
