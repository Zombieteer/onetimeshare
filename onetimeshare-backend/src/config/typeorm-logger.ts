import type { Logger as TypeOrmLogger } from "typeorm";
import { createChildLogger } from "./logger.js";

const log = createChildLogger("typeorm");

export class TypeOrmWinstonLogger implements TypeOrmLogger {
  logQuery(query: string, parameters?: unknown[]) {
    log.debug("query executed", { query, parameters });
  }

  logQueryError(error: string | Error, query: string, parameters?: unknown[]) {
    log.error("query failed", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      query,
      parameters,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    log.warn("slow query", { timeMs: time, query, parameters });
  }

  logSchemaBuild(message: string) {
    log.info("schema build", { message });
  }

  logMigration(message: string) {
    log.info("migration", { message });
  }

  log(level: "log" | "info" | "warn", message: unknown) {
    const text = typeof message === "string" ? message : JSON.stringify(message);
    switch (level) {
      case "warn":
        log.warn(text);
        break;
      case "info":
        log.info(text);
        break;
      default:
        log.debug(text);
    }
  }
}
