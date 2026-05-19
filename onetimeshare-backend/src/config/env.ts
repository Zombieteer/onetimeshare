import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const nodeEnv = process.env.NODE_ENV ?? "development";

export const env = {
  nodeEnv,
  port: Number(process.env.PORT) || 8000,
  log: {
    level: process.env.LOG_LEVEL ?? (nodeEnv === "production" ? "info" : "debug"),
    format: (process.env.LOG_FORMAT ?? (nodeEnv === "production" ? "json" : "pretty")) as
      | "json"
      | "pretty",
    service: process.env.LOG_SERVICE ?? "onetimeshare-backend",
  },
  db: {
    host: required("DB_HOST"),
    port: Number(process.env.DB_PORT) || 5432,
    username: required("DB_USERNAME"),
    password: required("DB_PASSWORD"),
    database: required("DB_NAME"),
    ssl: process.env.DB_SSL === "true",
    logging: process.env.DB_LOGGING === "true",
  },
  domain: process.env.DOMAIN,
  corsOrigin: process.env.CORS_ORIGIN,
};
