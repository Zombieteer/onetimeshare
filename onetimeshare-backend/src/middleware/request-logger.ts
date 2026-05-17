import type { Request, Response, NextFunction } from "express";
import { createChildLogger } from "../config/logger.js";

// Defer child logger generation until the first request hits
let httpLog: ReturnType<typeof createChildLogger>;
const getHttpLog = () => {
  if (!httpLog) {
    httpLog = createChildLogger("http");
  }
  return httpLog;
};

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const log = getHttpLog();
  const start = Date.now();

  log.info(`Incoming ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    const meta = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs,
    };

    if (res.statusCode >= 500) {
      log.error("outgoing response", meta);
    } else if (res.statusCode >= 400) {
      log.warn("outgoing response", meta);
    } else {
      log.info("outgoing response", meta);
    }
  });

  next();
}