import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./components/QueryProvider";
import { brandName } from "./lib/utils";

export const metadata: Metadata = {
  title: `${brandName} — Privacy-first secret sharing`,
  description:
    "Generate a secure link that destroys its content the instant it's read.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}