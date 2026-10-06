import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { FavoriteButton } from "@/features/favorites/favorite-button";
import { FavoritesProvider } from "@/features/favorites/provider";

const card = {
  id: "demo-25",
  localId: "25",
  name: "Pikachu démo",
  imageUrl: null,
};

describe("FavoriteButton", () => {
  beforeEach(() => localStorage.clear());

  it("ajoute puis retire une carte de l’état partagé", async () => {
    render(
      <FavoritesProvider>
        <FavoriteButton card={card} />
      </FavoritesProvider>,
    );

    const button = screen.getByRole("button", { name: /ajouter pikachu/i });
    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("tcg-vault:favorites:v1")).toContain("demo-25");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
