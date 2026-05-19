import type { Request, Response, NextFunction } from "express";
import { createChildLogger } from "../config/logger.js";

let httpLog: ReturnType<typeof createChildLogger>;
const getHttpLog = () => {
  if (!httpLog) httpLog = createChildLogger("http");
  return httpLog;
};

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const log = getHttpLog();
  const start = Date.now();

  log.info(`→ ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    origin: req.headers["origin"] ?? null,
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
      origin: req.headers["origin"] ?? null,
      allowOrigin: res.getHeader("access-control-allow-origin") ?? null,
    };

    const msg = `← ${req.method} ${req.originalUrl} ${res.statusCode} (${durationMs}ms)`;

    if (res.statusCode >= 500) {
      log.error(msg, meta);
    } else if (res.statusCode >= 400) {
      log.warn(msg, meta);
    } else {
      log.info(msg, meta);
    }
  });

  next();
}