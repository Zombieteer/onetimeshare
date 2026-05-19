"use client";

import { useState } from "react";
import Link from "next/link";
import { useMarkShareOpened } from "@/lib/api/shares/useMarkShareOpened";
import { PassphraseModal } from "./PassphraseModal";
import { SecretBox } from "./SecretBox";

type State = "loading" | "ready" | "gone" | "notfound";
export type { State };

const BADGES: Record<State, string> = {
  loading:  "Checking...",
  ready:    "Sealed message",
  gone:     "Unavailable",
  notfound: "Not found",
};

const TITLES: Record<State, string> = {
  loading:  "Locating your secret",
  ready:    "Click to reveal",
  gone:     "This secret is gone",
  notfound: "Nothing here",
};

const BODIES: Record<State, string> = {
  loading:  "Please wait while we verify the seal.",
  ready:    "This message will be permanently destroyed after you view it.",
  gone:     "",   // filled dynamically
  notfound: "This secret doesn't exist or the link is invalid.",
};

export function Card({
  state,
  id,
  goneMessage,
  needPassphrase,
}: {
  state: State;
  id: string;
  goneMessage: string | null;
  needPassphrase: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);
  const [passphraseError, setPassphraseError] = useState<string | null>(null);
  const { mutate: markOpened, isPending } = useMarkShareOpened();

  const reveal = (passphrase: string) => {
    setPassphraseError(null);
    markOpened(
      { id, passphrase },
      {
        onSuccess: (data) => { setSecret(data.secret); setShowModal(false); },
        onError: (err) => {
          const msg = (err as Error).message;
          setPassphraseError(
            msg?.includes("passphrase") ? "Incorrect passphrase. Try again." : (msg ?? "Could not reveal secret.")
          );
        },
      }
    );
  };

  const badge = state === "ready" && secret ? "Decrypted" : BADGES[state];
  const title = state === "ready" && secret ? "Your secret" : TITLES[state];
  const body  = state === "gone" ? (goneMessage ?? "It has already been viewed or has expired.") : BODIES[state];

  return (
    <>
      {showModal && (
        <PassphraseModal
          error={passphraseError}
          isPending={isPending}
          onSubmit={reveal}
          onClose={() => { setShowModal(false); setPassphraseError(null); }}
        />
      )}

      <div className="relative w-full">
        <div className="absolute -inset-0.5 bg-cyan/10 opacity-30 blur-2xl" />
        <div className="relative overflow-hidden border border-cyan/20 bg-vault">
          <div className="scan-line absolute inset-0 pointer-events-none" />

          <div className="flex items-center justify-between border-b border-hairline px-6 py-3">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              <span className="size-1.5 animate-ember rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
              {badge}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
              One-time access
            </span>
          </div>

          <div className="space-y-6 p-8">
            <div>
              <h1 className="text-xl font-medium text-foreground">{title}</h1>
              {body && <p className="mt-2 text-sm text-muted-foreground">{body}</p>}
            </div>

            {secret && <SecretBox id={id} secret={secret} />}

            {state === "ready" && !secret && (
              <button
                type="button"
                onClick={() => needPassphrase ? setShowModal(true) : reveal("")}
                disabled={isPending}
                className="cursor-pointer h-[38px] w-full overflow-hidden bg-cyan font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block size-3 animate-dial rounded-full border-2 border-ink border-r-transparent" />
                    Decrypting
                  </span>
                ) : "Reveal secret →"}
              </button>
            )}

            {(state === "gone" || state === "notfound") && (
              <div className="flex gap-3">
                <Link
                  href="/"
                  className="flex-1 h-[38px] flex items-center justify-center border border-hairline font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-cyan/60 hover:text-cyan"
                >
                  Return home
                </Link>
                <Link
                  href="/"
                  className="flex-1 h-[38px] flex items-center justify-center bg-cyan font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all hover:brightness-110"
                >
                  Create a secret
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}