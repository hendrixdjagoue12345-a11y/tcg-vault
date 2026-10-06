import "server-only";
import { z } from "zod";
import { ExternalApiError, InvalidApiDataError } from "./errors";
import { fetchTcgdex } from "./api";
import { toCardDetail, toCardSummary } from "./mappers";
import { cardBriefListSchema, cardDetailSchema } from "./schemas";
import type {
  CardDetail,
  CardSummary,
  CatalogQuery,
  CatalogResult,
} from "./types";

const PAGE_SIZE = 12;

function parseOrThrow<T>(result: z.ZodSafeParseResult<T>): T {
  if (!result.success) {
    throw new InvalidApiDataError(
      `La réponse TCGdex ne respecte pas le contrat attendu : ${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
}

export async function getCards(query: CatalogQuery): Promise<CatalogResult> {
  const params = new URLSearchParams({
    "pagination:page": String(query.page),
    "pagination:itemsPerPage": String(PAGE_SIZE + 1),
    "sort:field": "name",
    "sort:order": "ASC",
  });

  if (query.q) params.set("name", query.q);
  if (query.category) params.set("category", `eq:${query.category}`);

  const json = await fetchTcgdex("cards", params);
  const cards = parseOrThrow(cardBriefListSchema.safeParse(json));

  return {
    items: cards.slice(0, PAGE_SIZE).map(toCardSummary),
    page: query.page,
    hasNextPage: cards.length > PAGE_SIZE,
  };
}

export async function getCard(id: string): Promise<CardDetail | null> {
  try {
    const json = await fetchTcgdex(`cards/${encodeURIComponent(id)}`);
    return toCardDetail(parseOrThrow(cardDetailSchema.safeParse(json)));
  } catch (error) {
    if (error instanceof ExternalApiError && error.status === 404) return null;
    throw error;
  }
}

export async function getFeaturedCards(): Promise<CardSummary[]> {
  const result = await getCards({ q: "Pikachu", category: "", page: 1 });
  return result.items.slice(0, 4);
}
