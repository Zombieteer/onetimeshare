const SENSITIVE_KEYS = new Set([
  "secret",
  "passphrase",
  "passphrase",
  "password",
  "encryptedSecret",
  "encryptionKey",
  "token",
  "authorization",
]);

const REDACTED = "[REDACTED]";

export function redactForLog<T>(value: T): T {
  return redactValue(value) as T;
}

function redactValue(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(redactValue);
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [
        key,
        SENSITIVE_KEYS.has(key) ? REDACTED : redactValue(val),
      ]),
    );
  }

  return value;
}
