"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useMarkShareCopied } from "@/lib/api/shares/useMarkShareCopied";

export function SecretBox({ id, secret }: { id: string; secret: string }) {
  const [copied, setCopied] = useState(false);
  const { mutate: markCopied } = useMarkShareCopied();

  const copy = async () => {
    await navigator.clipboard.writeText(secret);
    if (!copied) markCopied(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-cyan/20 bg-ink p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
          Decrypted secret
        </p>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors text-cyan/80 cursor-pointer hover:text-cyan"
        >
          {copied
            ? <><Check className="size-3 text-green-400" /><span className="text-green-400">Copied</span></>
            : <><Copy className="size-3" />Copy to clipboard</>
          }
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-all font-mono text-sm text-foreground">
        {secret}
      </pre>
    </div>
  );
}