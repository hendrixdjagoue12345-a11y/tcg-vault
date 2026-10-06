"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import styles from "./quick-search.module.css";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      localId: z.string(),
      name: z.string(),
      imageUrl: z.string().url().nullable(),
    }),
  ),
});

type SearchState =
  | { status: "idle"; cards: [] }
  | { status: "loading"; cards: [] }
  | { status: "success"; cards: z.infer<typeof responseSchema>["data"] }
  | { status: "error"; cards: []; message: string };

export function QuickSearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({
    status: "idle",
    cards: [],
  });

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      setState({ status: "idle", cards: [] });
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setState({ status: "loading", cards: [] });

      try {
        const response = await fetch(
          `/api/cartes?q=${encodeURIComponent(trimmedQuery)}`,
          {
            signal: controller.signal,
          },
        );
        if (!response.ok) throw new Error(`Statut HTTP ${response.status}`);

        const parsed = responseSchema.safeParse(await response.json());
        if (!parsed.success) throw new Error("Réponse interne invalide");

        setState({ status: "success", cards: parsed.data.data });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setState({
          status: "error",
          cards: [],
          message:
            "La recherche rapide ne répond pas. Utilisez le catalogue complet.",
        });
      }
    }, 350);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <section className={styles.section} aria-labelledby="quick-search-title">
      <div>
        <p className="eyebrow">Route Handler</p>
        <h2 id="quick-search-title">Essayez sans quitter l’accueil.</h2>
        <p>
          Ce champ client appelle réellement <code>/api/cartes</code>, qui
          valide la requête avant d’interroger le service partagé.
        </p>
      </div>

      <div className={styles.searchBox}>
        <label htmlFor="quick-search">Rechercher une carte</label>
        <input
          id="quick-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Saisissez au moins 2 caractères"
          autoComplete="off"
        />

        <div className={styles.results} aria-live="polite">
          {state.status === "idle" ? (
            <p>Exemple : Pikachu, Dracaufeu…</p>
          ) : null}
          {state.status === "loading" ? <p>Recherche en cours…</p> : null}
          {state.status === "error" ? (
            <p role="alert">{state.message}</p>
          ) : null}
          {state.status === "success" && state.cards.length === 0 ? (
            <p>Aucune carte trouvée.</p>
          ) : null}
          {state.status === "success"
            ? state.cards.map((card) => (
                <Link key={card.id} href={`/catalogue/${card.id}`}>
                  <span>{card.name}</span>
                  <small>#{card.localId}</small>
                </Link>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
