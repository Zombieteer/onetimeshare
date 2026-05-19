import { apiClient } from "../client";
import { ShareEntity } from "./types";

// lib/api/shares.ts
export type CreateSharePayload = {
  region: string;
  secret: string;
  passphrase?: string;
  encryptionType?: string;
  ttl: number;           // seconds
};

export type OpenedShare = {
  id: string;
  secret: string;
  openedAt: string;
};


const LIFETIME_TO_TTL: Record<string, number> = {
  burn: 1,        // burn-on-read — TTL is irrelevant, 1s as minimum
  "1h": 3600,
  "4h": 14400,
  "24h": 86400,
  "7d": 604800,
};

export function lifetimeToTtl(lifetime: string): number {
  return LIFETIME_TO_TTL[lifetime] ?? 1;
}

export function createShare(payload: CreateSharePayload): Promise<ShareEntity> {
  return apiClient<ShareEntity>("/shares", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getShareById(id: string): Promise<ShareEntity> {
  return apiClient<ShareEntity>(`/shares/${id}`);
}

export function markShareOpened(id: string, passphrase: string): Promise<OpenedShare> {
  return apiClient<OpenedShare>(`/shares/${id}/opened`, {
    method: "PATCH",
    body: JSON.stringify({ passphrase }),
  });
}

export function markShareCopied(id: string): Promise<void> {
  return apiClient<void>(`/shares/${id}/copied`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}