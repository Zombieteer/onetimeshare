import Link from "next/link";
import { VaultShell } from "@/components/VaultShell";
import { brandName } from "@/lib/utils";

export const metadata = {
  title: `Feedback — ${brandName}`,
  description: `Send feedback to the ${brandName} team.`,
};

export default function FeedbackPage() {
  return (
    <VaultShell>
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="space-y-8 animate-vault-rise">

          <div className="inline-flex items-center gap-2 border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80">
            <span className="size-1 animate-ember rounded-full bg-cyan" />
            Feedback
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[14px] uppercase tracking-[0.3em] text-cyan/80">
              // Under construction
            </p>
            <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
              This page is<br />
              <span className="text-cyan">coming soon.</span>
            </h1>
            <p className="mx-auto max-w-md text-lg leading-relaxed text-muted-foreground">
              We're working on a feedback form.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              className="h-[38px] flex items-center justify-center bg-cyan px-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all hover:brightness-110"
            >
              Return home
            </Link>
          </div>

        </div>
      </div>
    </VaultShell>
  );
}