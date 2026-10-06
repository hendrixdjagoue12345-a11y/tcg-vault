import { z } from "zod";
import type { FavoriteCard } from "@/features/catalog/types";

export const FAVORITES_STORAGE_KEY = "tcg-vault:favorites:v1";

const favoriteSchema = z.object({
  id: z.string().min(1),
  localId: z.string(),
  name: z.string().min(1),
  imageUrl: z.string().url().nullable(),
});

const favoritesSchema = z.array(favoriteSchema).max(100);

export function readFavorites(rawValue: string | null): FavoriteCard[] {
  if (!rawValue) return [];

  try {
    const parsed: unknown = JSON.parse(rawValue);
    const result = favoritesSchema.safeParse(parsed);
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

export function writeFavorites(favorites: FavoriteCard[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}
