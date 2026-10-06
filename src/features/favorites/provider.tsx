"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CardSummary, FavoriteCard } from "@/features/catalog/types";
import {
  FAVORITES_STORAGE_KEY,
  readFavorites,
  writeFavorites,
} from "./storage";

type FavoritesContextValue = {
  favorites: FavoriteCard[];
  ready: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (card: CardSummary) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteCard[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydratation volontaire après montage : localStorage n’existe pas côté serveur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(readFavorites(localStorage.getItem(FAVORITES_STORAGE_KEY)));
    setReady(true);

    const syncTabs = (event: StorageEvent) => {
      if (event.key === FAVORITES_STORAGE_KEY) {
        setFavorites(readFavorites(event.newValue));
      }
    };

    window.addEventListener("storage", syncTabs);
    return () => window.removeEventListener("storage", syncTabs);
  }, []);

  const toggleFavorite = useCallback((card: CardSummary) => {
    setFavorites((current) => {
      const exists = current.some((favorite) => favorite.id === card.id);
      const next = exists
        ? current.filter((favorite) => favorite.id !== card.id)
        : [
            ...current,
            {
              id: card.id,
              localId: card.localId,
              name: card.name,
              imageUrl: card.imageUrl,
            },
          ];

      try {
        writeFavorites(next);
      } catch {
        // L’interface reste utilisable si le stockage est désactivé ou saturé.
      }
      return next;
    });
  }, []);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((favorite) => favorite.id)),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      ready,
      isFavorite: (id: string) => favoriteIds.has(id),
      toggleFavorite,
    }),
    [favoriteIds, favorites, ready, toggleFavorite],
  );

  return <FavoritesContext value={value}>{children}</FavoritesContext>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites doit être utilisé dans FavoritesProvider.");
  return context;
}
