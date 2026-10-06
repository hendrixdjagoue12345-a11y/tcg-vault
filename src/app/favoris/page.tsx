"use client";

import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/features/catalog/components/card-grid";
import { useFavorites } from "@/features/favorites/provider";

export default function FavoritesPage() {
  const { favorites, ready } = useFavorites();

  return (
    <main id="main-content" className="container page-section">
      <SectionHeading eyebrow="Collection locale" title="Vos cartes favorites.">
        <p>
          Cette sélection est enregistrée dans votre navigateur et reste
          disponible après le rechargement de la page.
        </p>
      </SectionHeading>

      {!ready ? (
        <p className="status-message" aria-live="polite">
          Lecture de votre sélection…
        </p>
      ) : favorites.length > 0 ? (
        <CardGrid cards={favorites} />
      ) : (
        <EmptyState
          title="Votre collection est encore vide."
          action={
            <Link className="button button--primary" href="/catalogue">
              Découvrir les cartes
            </Link>
          }
        >
          <p>Ajoutez une carte avec le bouton en forme d’étoile.</p>
        </EmptyState>
      )}
    </main>
  );
}
