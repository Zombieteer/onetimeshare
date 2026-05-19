import Link from "next/link";

export function VaultShell({ children, showFooter = true, showHeader = true }: { children: React.ReactNode, showHeader?: boolean, showFooter?: boolean }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] grid-bg opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan/20 blur-[140px]" />

      {showHeader &&
        <nav className="z-10 flex items-center justify-between border-b border-hairline px-6 py-5 md:px-10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative grid size-9 place-items-center rounded-sm bg-cyan shadow-[0_0_20px_-2px_var(--cyan-soft)]">
              <div className="size-4 border-2 border-ink" />
              <div className="absolute -inset-1 rounded-sm border border-cyan/40 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <span className="font-mono text-lg font-bold uppercase tracking-tighter text-foreground">
              Onyx Crypt
            </span>
          </Link>
          <div className="hidden items-center gap-8 font-mono text-[12px] uppercase tracking-[0.25em] text-steel md:flex">
            <Link href="/" className="transition-colors hover:text-cyan">About</Link>
            <Link href="/" className="transition-colors hover:text-cyan">Docs</Link>
          </div>
          <div className="flex items-center gap-2 border border-hairline px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.25em] text-steel">
            <span className="size-1.5 animate-ember rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
            Network · Online
          </div>
        </nav>
      }

      <main className="relative z-10">{children}</main>

      {showFooter &&
        <footer className="relative z-10 mt-24 border-t border-hairline bg-vault/40 py-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel">
              © 2026 Onyx Crypt. All rights reserved
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel flex gap-4">
              <Link href="/" className="transition-colors hover:text-cyan">Privacy</Link>
              <Link href="/" className="transition-colors hover:text-cyan">Terms</Link>
              <Link href="/" className="transition-colors hover:text-cyan">Security</Link>
              <Link href="/" className="transition-colors hover:text-cyan">Feedback</Link>
            </div>
          </div>
        </footer>
      }
    </div>
  );
}
