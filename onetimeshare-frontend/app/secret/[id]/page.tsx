import { VaultShell } from "@/components/VaultShell";
import { SecretViewer } from "./components/SecretViewer";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SecretPage({ params }: Props) {
  const { id } = await params;

  return (
    <VaultShell showHeader={false} showFooter={false}>
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-6 py-24">
        <SecretViewer id={id} />
      </section>
    </VaultShell>
  );
}