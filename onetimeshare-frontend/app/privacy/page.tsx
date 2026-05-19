import { VaultShell } from "@/components/VaultShell";
import { brandName, privacyEmail } from "@/lib/utils";

export const metadata = {
  title: `Privacy — ${brandName}`,
  description: `How ${brandName} handles your data, your secrets, and your privacy.`,
};

const SECTIONS = [
  {
    id: "what-we-collect",
    label: "What we collect",
    title: "Minimal by design",
    content: [
      {
        heading: "When you use the service",
        body: "We collect standard web server information — browser type, and the date and time of each request. This is collected from all visitors and is used solely to monitor service health and protect against abuse. We do not build profiles from this data.",
      },
      {
        heading: "When you create a secret",
        body: "We store the encrypted ciphertext of your secret, a secure hash of your passphrase if you set one, your chosen expiry setting. We do not store your secret in plaintext at any point. We do not store the passphrase itself — only an irreversible hash used to verify it at the time of reveal.",
      },
      {
        heading: "What we never collect",
        body: "We do not collect the contents of your secret in readable form. We do not require an account, an email address, or any personal information to use this service. We do not run analytics on your payloads. We do not track you across other websites.",
      },
    ],
  },
  {
    id: "how-secrets-work",
    label: "How secrets are handled",
    title: "Encrypted, then gone",
    content: [
      {
        heading: "Encryption at rest",
        body: "Every secret is encrypted with AES-256-GCM before it is stored. The encryption key is derived from the passphrase you provide. If no passphrase is set, a key is generated server-side for that session. Either way, the stored ciphertext cannot be read without the key.",
      },
      {
        heading: "Deletion on read",
        body: "The moment a secret is opened, the ciphertext is permanently overwritten. There is no soft delete, no archive, and no recovery path. Once a secret is gone, it is gone for everyone — including us.",
      },
      {
        heading: "Expiry",
        body: "Secrets that are never opened are automatically deleted after the expiry time you set. The default is burn-on-read. Expired ciphertext is wiped on the same schedule. Nothing lingers.",
      },
    ],
  },
  {
    id: "sharing",
    label: "Data sharing",
    title: "We do not sell your data",
    content: [
      {
        heading: "Third parties",
        body: "We do not sell, rent, or trade any information with third parties for commercial purposes. We do not display advertising. We do not share payload data with anyone.",
      },
      {
        heading: "Infrastructure providers",
        body: "We use a small number of infrastructure providers — hosting, networking, and DDoS protection — who process data on our behalf under strict confidentiality agreements. These providers do not have access to the plaintext of your secrets.",
      },
      {
        heading: "Law enforcement",
        body: "We may be required to respond to valid legal requests such as court orders or subpoenas. Where permitted by law, we will make a reasonable effort to notify affected users. In most cases, because secrets are deleted after viewing and we retain minimal metadata, there is little or nothing to disclose.",
      },
    ],
  },
  {
    id: "cookies",
    label: "Cookies",
    title: "No tracking cookies",
    content: [
      {
        heading: "What we use",
        body: "We use only essential session cookies required for the service to function. We do not use Google Analytics, Facebook Pixel, or any third-party tracking scripts. We do not use cookies to track your behaviour across other websites.",
      },
      {
        heading: "Your options",
        body: "Because we only use essential cookies, disabling cookies may affect the ability to use certain parts of the service. No consent banner is shown because we do not set non-essential cookies.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    title: "How we protect your information",
    content: [
      {
        heading: "Transmission",
        body: "All connections to FadeNote are encrypted with TLS. Data in transit is never sent in plaintext.",
      },
      {
        heading: "Storage",
        body: "Secrets are encrypted at rest using AES-256-GCM. Passphrases are stored only as secure hashes and cannot be reversed or used to decrypt content.",
      },
      {
        heading: "Limitations",
        body: "No method of electronic storage is 100% secure. We apply industry-standard practices and work continuously to improve our security posture, but we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "your-rights",
    label: "Your rights",
    title: "Control over your data",
    content: [
      {
        heading: "Access and deletion",
        body: "Because we do not require an account, we have no user profile to access or delete. The only data associated with a secret is the encrypted ciphertext and a minimal metadata record — both of which are automatically deleted when the secret is read or expires.",
      },
      {
        heading: "Contact",
        body: `If you have questions or concerns about how your data is handled, you can reach us at ${privacyEmail}. We will respond within 30 days.`,
      },
    ],
  },
  {
    id: "changes",
    label: "Changes",
    title: "Updates to this policy",
    content: [
      {
        heading: "How we notify you",
        body: "We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated effective date. We encourage you to review this page periodically. Continued use of the service after changes are posted constitutes acceptance of the updated policy.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <VaultShell>
      <div className="mx-auto max-w-3xl px-6 py-24 space-y-12">

        {/* Hero */}
        <section className="space-y-6 animate-vault-rise">
          <div className="inline-flex items-center gap-2 border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80">
            <span className="size-1 animate-ember rounded-full bg-cyan" />
            Privacy
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            Your data belongs<br />
            <span className="text-cyan">to you. Not us.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {brandName} is built around a simple principle: collect as little as possible, keep it only as long as necessary, and delete it completely when the job is done.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel">
            Effective date: May 19, 2026
          </p>
        </section>

        {/* Summary cards */}
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { n: "01", title: "No account required", body: "We never ask for your name, email, or any personal information." },
            { n: "02", title: "No payload logging", body: "We do not read, log, or analyse the content of your secrets." },
            { n: "03", title: "Auto-deleted", body: "Secrets are permanently wiped on read or on expiry. Nothing lingers." },
          ].map((card) => (
            <div key={card.n} className="border border-hairline p-5 space-y-2">
              <div className="font-mono text-xs text-cyan">{card.n}</div>
              <h3 className="text-md font-medium text-foreground">{card.title}</h3>
              <p className="text-md leading-relaxed text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </section>

        <Divider />

        {/* TOC */}
        <section className="space-y-4">
          <SectionLabel label="Contents" />
          <ul className="space-y-2">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-steel transition-colors hover:text-cyan"
                >
                  <span className="text-cyan/50">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <section key={section.id} id={section.id} className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <SectionLabel label={`${String(i + 1).padStart(2, "0")} · ${section.label}`} />
              <h2 className="text-2xl font-medium text-foreground">{section.title}</h2>
            </div>
            <div className="space-y-6">
              {section.content.map((block) => (
                <div key={block.heading} className="border-l-2 border-cyan/20 pl-5 space-y-1">
                  <h3 className="text-md font-medium text-foreground">{block.heading}</h3>
                  <p className="text-md leading-relaxed text-muted-foreground">{block.body}</p>
                </div>
              ))}
            </div>
            {i < SECTIONS.length - 1 && <Divider />}
          </section>
        ))}

        {/* Contact */}
        <section className="border border-hairline p-8 space-y-4">
          <SectionLabel label="Questions" />
          <h2 className="text-xl font-medium text-foreground">Get in touch</h2>
          <p className="text-md leading-relaxed text-muted-foreground">
            If you have questions or concerns about this Privacy Policy or how we handle your data, contact us at{" "}
            <a
              href={`mailto:${privacyEmail}.com`}
              className="text-cyan transition-colors hover:text-cyan/80"
            >
              {privacyEmail}
            </a>
            . We will respond within 30 days.
          </p>
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