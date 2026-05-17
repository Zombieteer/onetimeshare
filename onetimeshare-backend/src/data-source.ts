import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { env } from "./config/env.js";
import { TypeOrmWinstonLogger } from "./config/typeorm-logger.js";

const typeormLogLevels = ["query", "error", "warn", "migration", "schema"] as const;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: false,
  logging: env.db.logging ? [...typeormLogLevels] : false,
  logger: env.db.logging ? new TypeOrmWinstonLogger() : undefined,
  entities: [`${import.meta.dirname}/entities/**/*.{ts,js}`],
  migrations: [`${import.meta.dirname}/migrations/**/*.{ts,js}`],
  ssl: env.db.ssl ? { rejectUnauthorized: false } : undefined,
  namingStrategy: new SnakeNamingStrategy(),
});
