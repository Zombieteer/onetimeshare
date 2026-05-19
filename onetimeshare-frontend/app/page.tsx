import { VaultComposer } from "./components/VaultComposer";
import { VaultShell } from "./components/VaultShell";

// All metadata, static markup, and layout live here.
// The interactive bits are delegated to <VaultComposer />.

export const metadata = {
  title: "Vault — Privacy-first secret sharing",
  description:
    "Generate a secure link that destroys its content the instant it's read.",
};

export default function Home() {
  return (
    <VaultShell>
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-10">
        {/* Static hero — rendered on the server, zero JS cost */}
        <div className="mb-16 text-center animate-vault-rise">
          <div className="mb-5 inline-flex items-center gap-2 border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80">
            <span className="size-1 animate-ember rounded-full bg-cyan" />
            Privacy-first architecture
          </div>
          <h1 className="text-balance text-4xl font-medium tracking-tight text-foreground md:text-6xl">
            Sensitive data,{" "}
            <p className="text-cyan">Signed. Sealed. Delivered.</p>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
            Generate a secure link that destroys its content
            the instant it's read.
          </p>
        </div>

        {/*
          All interactivity (useState, useCallback, clipboard, etc.)
          lives inside this single client boundary.
        */}
        <VaultComposer />

        {/* Static feature grid — server-rendered, no hydration needed */}
        <FeatureGrid />
      </section>
    </VaultShell>
  );
}

function FeatureGrid() {
  const features = [
    {
      n: "01",
      tag: "Per-secret encryption",
      title: "We can't read it",
      body: "Every secret is encrypted with a unique key. Decryption keys stay on the application server, never in the database — limiting exposure if a breach occurs.",
    },
    {
      n: "02",
      tag: "Ephemeral",
      title: "Absolute deletion",
      body: "The first read atomically marks the secret consumed and wipes the secret. There is no second chance to retrieve it.",
    },
    {
      n: "03",
      tag: "Quiet",
      title: "No trace",
      body: "No accounts, no analytics on payloads, no IP logging. Your secure exchange leaves no usable footprint behind.",
    },
  ];

  return (
    <div className="mt-28 grid gap-12 md:grid-cols-3">
      {features.map((f) => (
        <div key={f.n} className="space-y-3">
          <div className="font-mono text-xs text-cyan">
            {f.n} // {f.tag}
          </div>
          <h3 className="text-lg font-medium text-foreground">{f.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
        </div>
      ))}
    </div>
  );
}
