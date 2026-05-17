import { createCipheriv, createDecipheriv, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { AppError } from "../errors/app-error.js";

export const SUPPORTED_ENCRYPTION_TYPES = ["aes-256-gcm"] as const;
export type EncryptionType = (typeof SUPPORTED_ENCRYPTION_TYPES)[number];

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const KEY_LENGTH = 32;

export interface EncryptionPayload {
  encryptedSecret: string;
  encryptionKey: string;
  encryptionType: EncryptionType;
}

interface EncryptionKeyMeta {
  iv: string;
  salt: string;
  authTag: string;
}

function deriveKey(passphase: string, salt: Buffer): Buffer {
  return scryptSync(passphase, salt, KEY_LENGTH);
}

function assertEncryptionType(encryptionType: string): asserts encryptionType is EncryptionType {
  if (!SUPPORTED_ENCRYPTION_TYPES.includes(encryptionType as EncryptionType)) {
    throw new AppError(
      400,
      `Unsupported encryption type. Supported: ${SUPPORTED_ENCRYPTION_TYPES.join(", ")}`,
    );
  }
}

export function encryptSecret(
  plaintext: string,
  passphase: string,
  encryptionType: EncryptionType = "aes-256-gcm",
): EncryptionPayload {
  assertEncryptionType(encryptionType);

  const salt = randomBytes(SALT_LENGTH);
  const key = deriveKey(passphase, salt);
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const meta: EncryptionKeyMeta = {
    iv: iv.toString("base64"),
    salt: salt.toString("base64"),
    authTag: authTag.toString("base64"),
  };

  return {
    encryptedSecret: ciphertext.toString("base64"),
    encryptionKey: JSON.stringify(meta),
    encryptionType,
  };
}

export function decryptSecret(
  encryptedSecret: string,
  encryptionKey: string,
  passphase: string,
  encryptionType: EncryptionType,
): string {
  assertEncryptionType(encryptionType);

  let meta: EncryptionKeyMeta;
  try {
    meta = JSON.parse(encryptionKey) as EncryptionKeyMeta;
  } catch {
    throw new AppError(500, "Invalid encryption metadata stored for share");
  }

  const { iv, salt, authTag } = meta;

  if (!iv || !salt || !authTag) {
    throw new AppError(500, "Incomplete encryption metadata stored for share");
  }

  try {
    const key = deriveKey(passphase, Buffer.from(salt, "base64"));
    const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, "base64"));
    decipher.setAuthTag(Buffer.from(authTag, "base64"));

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedSecret, "base64")),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch {
    throw new AppError(401, "Invalid passphase or corrupted secret");
  }
}

export function hashPassphase(passphase: string): string {
  const salt = randomBytes(SALT_LENGTH);
  const hash = scryptSync(passphase, salt, KEY_LENGTH);
  return `${salt.toString("base64")}:${hash.toString("base64")}`;
}

export function verifyPassphase(storedHash: string, providedPassphase: string): void {
  const [saltB64, hashB64] = storedHash.split(":");

  if (!saltB64 || !hashB64) {
    throw new AppError(500, "Invalid passphase hash stored for share");
  }

  const hash = scryptSync(providedPassphase, Buffer.from(saltB64, "base64"), KEY_LENGTH);
  const expected = Buffer.from(hashB64, "base64");

  if (hash.length !== expected.length || !timingSafeEqual(hash, expected)) {
    throw new AppError(401, "Invalid passphase");
  }
}
