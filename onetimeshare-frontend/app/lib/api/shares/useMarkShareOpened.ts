import { useMutation } from "@tanstack/react-query";
import { markShareOpened } from "./shares";

export function useMarkShareOpened() {
  return useMutation({
    mutationFn: ({ id, passphrase }: { id: string; passphrase: string }) =>
      markShareOpened(id, passphrase),
  });
}