import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onyx Crypt — Zero-knowledge secret sharing",
  description:
    "Generate a cryptographically secure link that destroys its content the instant it's read.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
