import type { Express } from "express";
import shareRouter from "./share/index.js";

export { createAsyncRouter } from "./async-router.js";
export { shareRouter };

export function registerRouters(app: Express) {
  app.use("/api/shares", shareRouter);
}
