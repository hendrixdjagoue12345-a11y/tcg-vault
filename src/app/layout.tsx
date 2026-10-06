import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { FavoritesProvider } from "@/features/favorites/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TCG Vault",
    template: "%s | TCG Vault",
  },
  description:
    "Explorez des cartes Pokémon avec une interface TCG interactive.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#main-content">
          Aller au contenu
        </a>
        <FavoritesProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </FavoritesProvider>
      </body>
    </html>
  );
}
