import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/features/catalog/components/card-grid";
import { CatalogFilters } from "@/features/catalog/components/catalog-filters";
import {
  createCatalogHref,
  normaliseCatalogQuery,
} from "@/features/catalog/query";
import { getCards } from "@/features/catalog/service";

export const dynamic = "force-dynamic";

type CataloguePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CataloguePage({
  searchParams,
}: CataloguePageProps) {
  const query = normaliseCatalogQuery(await searchParams);
  const result = await getCards(query);

  return (
    <main id="main-content" className="container page-section">
      <SectionHeading
        eyebrow="Catalogue"
        title="Trouvez votre prochaine carte."
      >
        <p>
          Recherchez par nom, filtrez par catégorie puis ouvrez une fiche pour
          découvrir ses caractéristiques.
        </p>
      </SectionHeading>

      <CatalogFilters query={query} />

      {result.items.length > 0 ? (
        <>
          <p className="result-summary" aria-live="polite">
            Page {result.page} · {result.items.length} carte
            {result.items.length > 1 ? "s" : ""} affichée
            {result.items.length > 1 ? "s" : ""}
          </p>
          <CardGrid cards={result.items} />
          <nav className="pagination" aria-label="Pagination du catalogue">
            {result.page > 1 ? (
              <Link
                className="button button--secondary"
                href={createCatalogHref(query, result.page - 1)}
              >
                Page précédente
              </Link>
            ) : (
              <span />
            )}
            {result.hasNextPage ? (
              <Link
                className="button button--secondary"
                href={createCatalogHref(query, result.page + 1)}
              >
                Page suivante
              </Link>
            ) : null}
          </nav>
        </>
      ) : (
        <EmptyState
          title="Aucune carte ne correspond à ces critères."
          action={
            <Link className="button button--primary" href="/catalogue">
              Effacer les filtres
            </Link>
          }
        >
          <p>Essayez un nom plus court ou choisissez une autre catégorie.</p>
        </EmptyState>
      )}
    </main>
  );
}
