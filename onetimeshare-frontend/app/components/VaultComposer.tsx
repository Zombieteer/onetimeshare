"use client";

import { Clock, Eye, EyeOff, Lock } from "lucide-react";
import { useCallback, useState } from "react";
import { useCreateShare } from "@/lib/api/shares/useCreateShare";
import { lifetimeToTtl } from "@/lib/api/shares/shares";
import clsx from "clsx";

type Lifetime = "burn" | "1h" | "4h" | "24h" | "7d";

const LIFETIMES: { value: Lifetime; label: string }[] = [
  { value: "burn", label: "Burn on read" },
  { value: "1h", label: "1 hour" },
  { value: "4h", label: "4 hour" },
  { value: "24h", label: "24 hours" },
  { value: "7d", label: "7 days" },
];

export function VaultComposer() {
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [secret, setSecret] = useState("");
  const [lifetime, setLifetime] = useState<Lifetime>("burn");
  const [passphrase, setPassphrase] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: createShare, isPending } = useCreateShare();

  const onSeal = useCallback(() => {
    setError(null);
    if (!secret.trim()) {
      setError("Nothing to seal — Add a secret first.");
      return;
    }

    createShare(
      {
        region: "usa",
        secret,
        passphrase,
        ttl: lifetimeToTtl(lifetime),
      },
      {
        onSuccess: (data) => {
          const url = data.url;
          setShareUrl(url);
          setSecret("");
          setPassphrase("");
        },
        onError: (err) => {
          setError(err.message ?? "Could not seal the secret. Try again.");
        },
      }
    );
  }, [secret, lifetime, passphrase, createShare]);

  const reset = () => {
    setShareUrl(null);
    setCopied(false);
  };

  const copy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (shareUrl) {
    return <RevealPanel url={shareUrl} copied={copied} copy={copy} reset={reset} />;
  }

  return (
    <ComposerPanel
      setShowPassphrase={setShowPassphrase}
      showPassphrase={showPassphrase}
      secret={secret}
      setSecret={setSecret}
      lifetime={lifetime}
      setLifetime={setLifetime}
      passphrase={passphrase}
      setPassphrase={setPassphrase}
      sealing={isPending}
      onSeal={onSeal}
      error={error}
    />
  );
}

function ComposerPanel(props: {
  setShowPassphrase: (v: boolean) => void;
  showPassphrase: boolean
  secret: string;
  setSecret: (v: string) => void;
  lifetime: Lifetime;
  setLifetime: (v: Lifetime) => void;
  passphrase: string;
  setPassphrase: (v: string) => void;
  sealing: boolean;
  onSeal: () => void;
  error: string | null;
}) {
  return (
    <div className="relative animate-vault-rise">
      <div className="absolute -inset-0.5 bg-cyan/10 opacity-30 blur-2xl" />
      <div className="relative animate-pulse-border overflow-hidden border border-cyan/20 bg-vault p-1">
        <div className="scan-line absolute inset-0 pointer-events-none" />

        <div className="p-6 md:p-8">
          <div className="mb-4 flex items-end justify-between">
            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/70">
              Create Secret Link
            </label>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
              · AES-256-GCM ·
            </span>
          </div>

          <textarea
            value={props.secret}
            onChange={(e) => props.setSecret(e.target.value)}
            placeholder="Paste a password, secret message or private link here..."
            spellCheck={false}
            className="h-48 w-full resize-none border-none bg-transparent font-mono text-base text-foreground placeholder:text-steel/60 focus:outline-none focus:ring-0"
          />

          <div className="grid grid-cols-1 gap-4 border-t border-hairline pt-6 md:grid-cols-3">
            <Field label={`Auto-Destruct`} icon={<Clock className="size-3" />}>
              <select
                value={props.lifetime}
                onChange={(e) => props.setLifetime(e.target.value as Lifetime)}
                className="w-full border border-hairline bg-ink p-2 font-mono text-sm text-foreground outline-none focus:border-cyan/60"
              >
                {LIFETIMES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Passphrase" icon={<Lock className="size-3"/>}>
            <div className="relative">
              <input
                type={props.showPassphrase ? "text" : "password"}
                value={props.passphrase}
                onChange={(e) => props.setPassphrase(e.target.value)}
                placeholder="(Optional)"
                className="w-full border border-hairline bg-ink p-2 pr-9 font-mono text-sm text-foreground outline-none placeholder:text-steel/50 focus:border-cyan/60"
              />
              <button
                type="button"
                onClick={() => props.setShowPassphrase(!props.showPassphrase)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-steel transition-colors hover:text-cyan"
              >
                {props.showPassphrase
                  ? <EyeOff className="size-3.5" />
                  : <Eye className="size-3.5" />
                }
              </button>
            </div>
          </Field>
            <div className="flex items-end">
              <button
                onClick={props.onSeal}
                disabled={props.sealing}
                className="cursor-pointer group relative h-[38px] w-full overflow-hidden bg-cyan font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
              >
                {props.sealing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block size-3 animate-dial rounded-full border-2 border-ink border-r-transparent" />
                    Sealing
                  </span>
                ) : (
                  "Generate Secure Link"
                )}
              </button>
            </div>
          </div>

          {props.error && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-destructive">
              {props.error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function RevealPanel({
  url,
  copied,
  copy,
  reset,
}: {
  url: string;
  copied: boolean;
  copy: () => void;
  reset: () => void;
}) {
  return (
    <div className="relative animate-vault-rise">
      <div className="absolute -inset-0.5 bg-cyan/20 opacity-40 blur-2xl" />
      <div className="relative border border-cyan/30 bg-vault">
        <div className="scan-line absolute inset-0 pointer-events-none" />
        <div className="flex items-center justify-between border-b border-hairline px-6 py-3">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            <span className="size-1.5 animate-ember rounded-full bg-green-500 shadow-[0_0_8px_var(--cyan)]" />
            Seal · Active
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
            One-time link
          </span>
        </div>

        <div className="p-6 md:p-8">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
            Share your secret link with others.
          </p>
          <div className="flex items-stretch border border-hairline bg-ink">
            <code className="flex-1 truncate px-4 py-3 font-mono text-sm text-foreground">
              {url}
            </code>
            <button
              onClick={copy}
              className={clsx(
                "border-l border-hairline px-4 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors hover:bg-cyan/20",
                copied ? "hover:bg-green-400 bg-green-300 text-black font-bold" : "bg-cyan/10 text-cyan"
              )}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
            Share this link through a separate channel. Once it's opened, the
            ciphertext is overwritten on our servers and the only key — the
            fragment after the{" "}
            <code className="font-mono text-cyan">#</code> — never reached us.
          </p> */}

          <button
            onClick={reset}
            className="mt-8 border border-cyan/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            Seal another secret
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
      {icon}{label}
      </span>
      {children}
    </div>
  );
}
