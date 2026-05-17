import winston from "winston";
import { env } from "./env.js";

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

const prettyFormat = printf(({ level, message, timestamp, service, context, ...meta }) => {
  const prefix = [timestamp, service, context].filter(Boolean).join(" | ");
  const metaKeys = Object.keys(meta).filter((k) => k !== "stack");
  const metaStr = metaKeys.length ? ` ${JSON.stringify(meta)}` : "";
  return `${prefix} ${level}: ${message}${metaStr}`;
});

const consoleFormat =
  env.log.format === "json"
    ? combine(timestamp(), errors({ stack: true }), json())
    : combine(
        colorize({ all: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        prettyFormat,
      );

export const logger = winston.createLogger({
  level: env.log.level,
  defaultMeta: { service: env.log.service },
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ format: consoleFormat }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({ format: consoleFormat }),
  ],
});

export function createChildLogger(context: string) {
  return logger.child({ context });
}
