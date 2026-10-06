import Link from "next/link";
import type { CatalogQuery } from "../types";
import styles from "./catalog-filters.module.css";

type CatalogFiltersProps = {
  query: CatalogQuery;
};

const categories = [
  { value: "", label: "Toutes les catégories" },
  { value: "Pokemon", label: "Pokémon" },
  { value: "Trainer", label: "Dresseur" },
  { value: "Energy", label: "Énergie" },
];

export function CatalogFilters({ query }: CatalogFiltersProps) {
  return (
    <form action="/catalogue" method="get" className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="catalog-search">Nom de la carte</label>
        <input
          id="catalog-search"
          type="search"
          name="q"
          defaultValue={query.q}
          placeholder="Ex. Pikachu"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="catalog-category">Catégorie</label>
        <select
          id="catalog-category"
          name="category"
          defaultValue={query.category}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <button className="button button--primary" type="submit">
        Rechercher
      </button>
      <Link className={styles.reset} href="/catalogue">
        Réinitialiser
      </Link>
    </form>
  );
}
