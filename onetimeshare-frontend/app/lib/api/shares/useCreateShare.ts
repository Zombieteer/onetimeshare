// lib/api/useCreateShare.ts
import { useMutation } from "@tanstack/react-query";
import { createShare, type CreateSharePayload } from "./shares";

export function useCreateShare() {
  return useMutation({
    mutationFn: (payload: CreateSharePayload) => createShare(payload),
  });
}