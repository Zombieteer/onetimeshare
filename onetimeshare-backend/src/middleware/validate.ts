import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema, ValidationOptions } from "joi";
import { AppError } from "../errors/app-error.js";

type RequestTarget = "body" | "params" | "query";

export interface ValidationSchema {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

const defaultOptions: ValidationOptions = {
  abortEarly: false,
  stripUnknown: true,
};

export function validate(schema: ValidationSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const targets: RequestTarget[] = ["body", "params", "query"];

    for (const target of targets) {
      const joiSchema = schema[target];
      if (!joiSchema) continue;

      const { error, value } = joiSchema.validate(req[target], defaultOptions);

      if (error) {
        return next(
          new AppError(400, "Validation failed", {
            errors: error.details.map((d) => ({
              field: d.path.join("."),
              message: d.message,
            })),
          }),
        );
      }

      req[target] = value;
    }

    next();
  };
}
