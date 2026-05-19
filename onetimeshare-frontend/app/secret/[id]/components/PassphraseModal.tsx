"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { createPortal } from "react-dom";

export function PassphraseModal({
  error,
  isPending,
  onSubmit,
  onClose,
}: {
  error: string | null;
  isPending: boolean;
  onSubmit: (passphrase: string) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="absolute -inset-0.5 bg-cyan/10 opacity-40 blur-2xl" />
        <div className="relative overflow-hidden border border-cyan/30 bg-vault">
          <div className="scan-line absolute inset-0 pointer-events-none" />

          <div className="flex items-center justify-between border-b border-hairline px-6 py-3">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              <Lock className="size-3" />
              Passphrase required
            </span>
            <button type="button" onClick={onClose} className="text-steel transition-colors hover:text-cyan">
              <X className="size-4" />
            </button>
          </div>

          <div className="space-y-6 p-6">
            <p className="text-sm text-muted-foreground">
              This secret is passphrase-protected. Enter it below to reveal the contents.
            </p>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  autoFocus
                  type={show ? "text" : "password"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSubmit(value)}
                  placeholder="Enter passphrase"
                  className="w-full border border-hairline bg-ink p-2 pr-9 font-mono text-sm text-foreground outline-none placeholder:text-steel/50 focus:border-cyan/60"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-steel transition-colors hover:text-cyan"
                >
                  {show ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
              {error && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-destructive">{error}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-[38px] border border-hairline font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onSubmit(value)}
                disabled={isPending || !value.trim()}
                className="flex-1 h-[38px] bg-cyan font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block size-3 animate-dial rounded-full border-2 border-ink border-r-transparent" />
                    Revealing
                  </span>
                ) : "Reveal →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}