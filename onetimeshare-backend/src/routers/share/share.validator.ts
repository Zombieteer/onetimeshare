import Joi from "joi";
import { MacroRegion } from "../../entities/share/macro-region.enum.js";
import { SUPPORTED_ENCRYPTION_TYPES } from "../../utils/encryption.js";

const macroRegions = Object.values(MacroRegion);

const idParam = Joi.string().uuid({ version: "uuidv4" }).required().messages({
  "string.guid": "id must be a valid UUID v4",
});

export const shareValidators = {
  createBody: Joi.object({
    region: Joi.string()
      .valid(...macroRegions)
      .required()
      .messages({
        "any.only": `region must be one of: ${macroRegions.join(", ")}`,
      }),
    secret: Joi.string().required().messages({
      "any.required": "secret is required",
    }),
    passphrase: Joi.string().max(512).required().allow(''),
    encryptionType: Joi.string()
      .valid(...SUPPORTED_ENCRYPTION_TYPES)
      .default("aes-256-gcm"),
    ttl: Joi.number().integer().min(1).max(86400 * 30).required().messages({
      "number.min": "ttl must be at least 1 second",
      "number.max": "ttl cannot exceed 30 days",
    }),
  }),

  idParams: Joi.object({
    id: idParam,
  }),

  markOpenedByIdBody: Joi.object({
    passphrase: Joi.string().max(512).required().allow(''),
    openedAt: Joi.date().iso().optional(),
  }),

  markCopiedBody: Joi.object({
    copiedAt: Joi.date().iso().optional(),
  }),
};
