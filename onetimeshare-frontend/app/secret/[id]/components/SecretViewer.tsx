"use client";

import { useGetShareDetails } from "@/lib/api/shares/useGetShareDetails";
import { Card } from "./Card";

export function SecretViewer({ id }: { id: string }) {
  const { data, isLoading, isError, error } = useGetShareDetails(id);

  if (isLoading) return <Card state="loading" id={id} goneMessage={null} needPassphrase={false} />;

  if (isError || data?.openedAt || data?.expiredAt) {
    const errMsg = (error as Error)?.message ?? null;
    const isGone = errMsg?.includes("viewed or expired") || !!data?.openedAt || !!data?.expiredAt;
    return <Card state={isGone ? "gone" : "notfound"} id={id} goneMessage={errMsg} needPassphrase={false} />;
  }

  return <Card state="ready" id={id} goneMessage={null} needPassphrase={data?.needPassphrase ?? false} />;
}