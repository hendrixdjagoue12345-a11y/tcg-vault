import { describe, expect, it } from "vitest";
import { readFavorites } from "@/features/favorites/storage";

describe("readFavorites", () => {
  it("relit une sélection valide", () => {
    const raw = JSON.stringify([
      { id: "demo-1", localId: "1", name: "Démo", imageUrl: null },
    ]);
    expect(readFavorites(raw)).toHaveLength(1);
  });

  it("ignore un JSON invalide ou une structure inattendue", () => {
    expect(readFavorites("{invalide")).toEqual([]);
    expect(readFavorites(JSON.stringify([{ id: 42 }]))).toEqual([]);
  });
});
