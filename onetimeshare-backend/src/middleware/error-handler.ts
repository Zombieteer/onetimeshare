import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
import { logger } from "../config/logger.js";
import { buildErrorResponse } from "../utils/api-response.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error("Unhandled error", { error: err });
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(buildErrorResponse(err.statusCode, err.message, err.details ?? null));
  }

  logger.error("Unhandled error", { error: err });

  return res.status(500).json(buildErrorResponse(500, "Internal server error"));
}
