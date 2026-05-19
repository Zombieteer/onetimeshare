import { VaultShell } from "@/components/VaultShell";
import { brandName } from "@/lib/utils";

export const metadata = {
  title: `About — ${brandName}`,
  description: `Learn how ${brandName} keeps your sensitive information private with self-destructing, encrypted one-time links.`,
};

const FAQS = [
  {
    q: "Why would I use this?",
    a: "When you send passwords or private links via email or chat, copies of that information are stored in many places — inboxes, logs, backups. If you use a one-time link instead, the information exists for a single viewing only. It can't be read by someone else later, and it leaves no trace in chat histories or email archives. Think of it as a self-destructing note.",
  },
  {
    q: "What happens if the link is never opened?",
    a: "If the link is not used, it deletes itself automatically after the time limit you set — defaulting to burn-on-read if no expiry is chosen. Your data stays secure even if the link is lost, forgotten, or never delivered.",
  },
  {
    q: "Can the developers read my secrets?",
    a: "No. Your secret is encrypted before it is stored and can only be accessed via the one-time link. Once the link is opened or the time limit expires, the ciphertext is permanently overwritten. There is nothing left to read.",
  },
  {
    q: "How does the passphrase option work?",
    a: "When you set a passphrase, it becomes part of the encryption key. We store only a secure hash of the passphrase — never the passphrase itself. Without the original passphrase, the secret cannot be decrypted, even by us. The security of your secret depends on keeping the passphrase and the link in separate channels.",
  },
  {
    q: "Can I retrieve a secret that has already been opened?",
    a: "No. We display it once and then permanently delete it. After that, it is gone forever — by design.",
  },
  {
    q: "How do you handle law enforcement or third-party data requests?",
    a: "We designed the system so that we don't have data to hand over. Secrets are deleted after viewing, and we don't retain access logs beyond what is operationally necessary. In most cases, there is simply nothing to provide.",
  },
];

export default function AboutPage() {
  return (
    <VaultShell>
      <div className="mx-auto max-w-3xl px-6 py-24 space-y-12">

        {/* Hero */}
        <section className="space-y-6 animate-vault-rise">
          <div className="inline-flex items-center gap-2 border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80">
            <span className="size-1 animate-ember rounded-full bg-cyan" />
            About
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            Built for information that<br />
            <span className="text-cyan">shouldn't stick around.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {brandName} is a simple, secure way to share sensitive information — passwords, keys, private messages — via a link that destroys itself the moment it's read.
          </p>
        </section>

        <Divider />

        {/* How it works */}
        <section className="space-y-10">
          <SectionLabel label="How it works" />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "You write a secret",
                body: "Paste any sensitive text — a password, an API key, a private note. Set an expiry and an optional passphrase.",
              },
              {
                n: "02",
                title: "We encrypt it",
                body: "Your secret is encrypted with AES-256-GCM before it ever leaves your browser. We store only the ciphertext.",
              },
              {
                n: "03",
                title: "One read, then gone",
                body: "The recipient opens the link once. The moment it's read, the ciphertext is permanently overwritten. No second chances.",
              },
            ].map((step) => (
              <div key={step.n} className="space-y-3 border border-hairline p-6">
                <div className="font-mono text-xs text-cyan">{step.n}</div>
                <h3 className="font-medium text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Why it matters */}
        <section className="space-y-6">
          <SectionLabel label="Why it matters" />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Passwords and private links shared over email or chat don't disappear when the conversation ends. They linger in inboxes, notification histories, server logs, and backups — sometimes for years. Any one of those copies is a potential exposure point.
            </p>
            <p>
             {brandName} eliminates that surface. Your message is automatically deleted after a single retrieval and leaves no trace in chat histories, email archives, or our own servers. There is nothing to leak because there is nothing left.
            </p>
            <p>
              We don't ask you to create an account. We don't run analytics on your payloads. We don't know what you're sharing or who you're sharing it with. That's intentional.
            </p>
          </div>
        </section>

        <Divider />

        {/* Trust */}
        <section className="space-y-6">
          <SectionLabel label="Why trust us" />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "We can't read your secrets",
                body: "Encryption happens server-side with a key we don't retain after the secret is created. Even if we wanted to, we couldn't decrypt your content.",
              },
              {
                title: "Passphrases are never stored",
                body: "We store only a secure hash of your passphrase. The hash cannot be reversed or used to decrypt your secret.",
              },
              {
                title: "Deleted means deleted",
                body: "When a secret is read or expires, the ciphertext is overwritten. There is no soft-delete, no archive, no recovery path.",
              },
              {
                title: "No payload logging",
                body: "We do not log, inspect, or analyse the content of secrets. Your data is a black box to us from the moment it's submitted.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-hairline p-5 space-y-2">
                <h3 className="text-md font-medium text-foreground">{item.title}</h3>
                <p className="text-md leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <section className="space-y-8">
          <SectionLabel label="FAQ" />
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-b border-hairline pb-6 last:border-0 last:pb-0 space-y-2">
                <h3 className="font-medium text-foreground">{faq.q}</h3>
                <p className="text-md leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </VaultShell>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="font-mono text-[14px] uppercase tracking-[0.3em] text-cyan/80">
      // {label}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-hairline" />;
}