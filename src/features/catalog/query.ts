import type { CatalogQuery } from "./types";

type SearchParams = Record<string, string | string[] | undefined>;

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export function normaliseCatalogQuery(params: SearchParams): CatalogQuery {
  const rawPage = Number(firstValue(params.page));

  return {
    q: firstValue(params.q)?.trim().slice(0, 80) ?? "",
    category: firstValue(params.category)?.trim().slice(0, 30) ?? "",
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
  };
}

export function createCatalogHref(query: CatalogQuery, page: number) {
  const params = new URLSearchParams();

  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (page > 1) params.set("page", String(page));

  const suffix = params.toString();
  return suffix ? `/catalogue?${suffix}` : "/catalogue";
}
