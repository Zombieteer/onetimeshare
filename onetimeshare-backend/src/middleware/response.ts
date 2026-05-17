import type { Request, Response, NextFunction } from "express";
import { buildSuccessResponse } from "../utils/api-response.js";

export function responseMiddleware(_req: Request, res: Response, next: NextFunction) {
  res.sendApiResponse = function sendApiResponse<T>(data: T, statusCode = 200) {
    return this.status(statusCode).json(buildSuccessResponse(data, statusCode));
  };

  next();
}
