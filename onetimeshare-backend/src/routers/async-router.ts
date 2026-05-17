import { Router, type IRouter, type RequestHandler, type RouterOptions } from "express";

function wrapHandler(handler: RequestHandler): RequestHandler {
  if (handler.length === 4) {
    return handler;
  }

  return (req, res, next) => {
    try {
      const result = handler(req, res, next) as void | Promise<void>;
      if (result instanceof Promise) {
        result.catch(next);
      }
    } catch (err) {
      next(err);
    }
  };
}

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "all"] as const;

export function createAsyncRouter(options?: RouterOptions): IRouter {
  const router = Router(options);

  for (const method of HTTP_METHODS) {
    const original = router[method].bind(router);

    router[method] = ((path: string, ...handlers: RequestHandler[]) => {
      return original(path, ...handlers.map(wrapHandler));
    }) as typeof original;
  }

  return router;
}
