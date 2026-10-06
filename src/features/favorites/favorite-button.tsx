"use client";

import type { CardSummary } from "@/features/catalog/types";
import { useFavorites } from "./provider";
import styles from "./favorite-button.module.css";

type FavoriteButtonProps = {
  card: CardSummary;
  compact?: boolean;
};

export function FavoriteButton({ card, compact = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, ready } = useFavorites();
  const selected = ready && isFavorite(card.id);

  return (
    <button
      className={`${styles.button} ${compact ? styles.compact : ""}`}
      type="button"
      aria-pressed={selected}
      aria-label={
        selected
          ? `Retirer ${card.name} des favoris`
          : `Ajouter ${card.name} aux favoris`
      }
      onClick={() => toggleFavorite(card)}
      disabled={!ready}
    >
      <span aria-hidden="true">{selected ? "★" : "☆"}</span>
      {compact
        ? null
        : selected
          ? "Retirer des favoris"
          : "Ajouter aux favoris"}
    </button>
  );
}
