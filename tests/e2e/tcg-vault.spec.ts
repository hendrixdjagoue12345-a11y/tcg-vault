import { expect, test } from "@playwright/test";

test("l’accueil présente le parcours principal", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Votre collection commence ici." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explorer le catalogue" }),
  ).toBeVisible();
});

test("une préférence est validée par la Server Action", async ({ page }) => {
  await page.goto("/preferences");
  await page.getByLabel("Compacte").check();
  await page.getByLabel("Réduite").check();
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(
    page.getByText("Vos préférences ont été enregistrées côté serveur."),
  ).toBeVisible();
});

test("un favori local peut être retiré de la collection", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "tcg-vault:favorites:v1",
      JSON.stringify([
        { id: "demo-25", localId: "25", name: "Pikachu démo", imageUrl: null },
      ]),
    );
  });
  await page.goto("/favoris");
  await expect(
    page.getByRole("heading", { name: "Pikachu démo" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Retirer Pikachu démo des favoris" })
    .click();
  await expect(
    page.getByText("Votre collection est encore vide."),
  ).toBeVisible();
});
