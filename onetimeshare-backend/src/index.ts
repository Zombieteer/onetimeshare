// 💡 CRITICAL: Load environment variables before anything else evaluates!
import { env } from "./config/env.js"; 
import "reflect-metadata";

import express from "express";
import { BaseEntity } from "typeorm";
import { AppDataSource } from "./data-source.js";
import { logger } from "./config/logger.js";
import { requestLogger } from "./middleware/request-logger.js";
import { responseMiddleware } from "./middleware/response.js";
import { errorHandler } from "./middleware/error-handler.js";
import { registerRouters } from "./routers/index.js";
import cors  from "cors"

async function bootstrap() {
  await AppDataSource.initialize();
  BaseEntity.useDataSource(AppDataSource);

  logger.info("Database connected", {
    host: env.db.host,
    database: env.db.database,
  });

  const app = express();

  app.use(cors({
    origin: env.nodeEnv === "production"
      ? env.domain
      : env.corsOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

  app.use(express.json());
  app.use(requestLogger);
  app.use(responseMiddleware);

  app.get("/health", (_req, res) => {
    res.sendApiResponse({
      status: "ok",
      database: AppDataSource.isInitialized ? "connected" : "disconnected",
    });
  });

  registerRouters(app);

  app.use(errorHandler);

  app.listen(env.port, () => {
    logger.info("Server started", {
      port: env.port,
      url: `http://localhost:${env.port}`,
      nodeEnv: env.nodeEnv,
    });
  });
}

bootstrap().catch((err) => {
  logger.error("Failed to start server", { error: err });
  process.exit(1);
});