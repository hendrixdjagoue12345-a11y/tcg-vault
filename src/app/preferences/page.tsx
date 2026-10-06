import { cookies } from "next/headers";
import { SectionHeading } from "@/components/ui/section-heading";
import { PreferenceForm } from "@/features/preferences/preference-form";
import { preferencesSchema } from "@/features/preferences/schemas";

export default async function PreferencesPage() {
  const cookieStore = await cookies();
  const parsed = preferencesSchema.safeParse({
    density: cookieStore.get("tcg-vault-density")?.value ?? "comfort",
    motion: cookieStore.get("tcg-vault-motion")?.value ?? "full",
  });

  const defaults = parsed.success
    ? parsed.data
    : { density: "comfort" as const, motion: "full" as const };

  return (
    <main id="main-content" className="container page-section">
      <SectionHeading eyebrow="Server Action" title="Réglez votre expérience.">
        <p>
          Ce formulaire fonctionne sans Route Handler intermédiaire. La Server
          Action valide les données, écrit des cookies puis demande la
          revalidation de la page.
        </p>
      </SectionHeading>
      <PreferenceForm defaults={defaults} />
    </main>
  );
}
