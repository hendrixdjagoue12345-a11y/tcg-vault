import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <strong>TCG Vault</strong>
          <p>Un projet guide Next.js, TypeScript et CSS.</p>
        </div>
        <div className={styles.links}>
          <Link href="/catalogue">Explorer</Link>
          <a href="https://tcgdex.dev/" target="_blank" rel="noreferrer">
            Données : TCGdex
          </a>
        </div>
      </div>
    </footer>
  );
}
