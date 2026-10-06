import { describe, expect, it } from "vitest";
import { toCardDetail, toCardSummary } from "@/features/catalog/mappers";

describe("mappers TCGdex", () => {
  it("construit l’URL haute définition d’une carte", () => {
    expect(
      toCardSummary({
        id: "demo-1",
        localId: 1,
        name: "Carte démo",
        image: "https://assets.tcgdex.net/fr/demo/1",
      }),
    ).toEqual({
      id: "demo-1",
      localId: "1",
      name: "Carte démo",
      imageUrl: "https://assets.tcgdex.net/fr/demo/1/high.webp",
    });
  });

  it("transforme une fiche sans forcer les champs facultatifs", () => {
    const card = toCardDetail({
      id: "demo-2",
      localId: "2",
      name: "Support",
      category: "Trainer",
      types: [],
      set: { id: "demo", name: "Extension démo" },
      attacks: [],
    });

    expect(card.hp).toBeNull();
    expect(card.imageUrl).toBeNull();
    expect(card.rarity).toBeNull();
  });
});
