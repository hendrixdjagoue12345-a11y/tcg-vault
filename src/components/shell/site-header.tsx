"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./site-header.module.css";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/favoris", label: "Favoris" },
  { href: "/preferences", label: "Préférences" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href="/" onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden="true">
            T
          </span>
          <span>TCG Vault</span>
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">Ouvrir ou fermer le menu</span>
          <span aria-hidden="true">{open ? "Fermer" : "Menu"}</span>
        </button>

        <nav
          id="main-navigation"
          aria-label="Navigation principale"
          className={`${styles.navigation} ${open ? styles.open : ""}`}
        >
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={active ? styles.active : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
