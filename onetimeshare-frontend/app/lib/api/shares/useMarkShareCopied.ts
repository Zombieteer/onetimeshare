import { useMutation } from "@tanstack/react-query";
import { markShareCopied } from "./shares";

export function useMarkShareCopied() {
  return useMutation({
    mutationFn: (id: string) => markShareCopied(id),
  });
}