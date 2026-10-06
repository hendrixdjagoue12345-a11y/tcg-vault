import { describe, expect, it } from "vitest";
import {
  createCatalogHref,
  normaliseCatalogQuery,
} from "@/features/catalog/query";

describe("normaliseCatalogQuery", () => {
  it("nettoie et limite les paramètres provenant de l’URL", () => {
    expect(
      normaliseCatalogQuery({ q: "  pika  ", category: "Pokemon", page: "2" }),
    ).toEqual({ q: "pika", category: "Pokemon", page: 2 });
  });

  it("revient à la première page si la valeur est invalide", () => {
    expect(normaliseCatalogQuery({ page: "-4" }).page).toBe(1);
  });
});

describe("createCatalogHref", () => {
  it("conserve les filtres lors d’un changement de page", () => {
    expect(
      createCatalogHref({ q: "Pikachu", category: "Pokemon", page: 1 }, 3),
    ).toBe("/catalogue?q=Pikachu&category=Pokemon&page=3");
  });
});
