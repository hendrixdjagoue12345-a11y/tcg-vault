import "server-only";
import { env } from "@/lib/env";
import { ExternalApiError } from "./errors";

const REVALIDATE_SECONDS = 60 * 60;

function buildUrl(path: string, params?: URLSearchParams) {
  const base = env.TCGDEX_BASE_URL.replace(/\/$/, "");
  const url = new URL(`${base}/${env.TCGDEX_LANGUAGE}/${path}`);

  if (params) url.search = params.toString();
  return url;
}

export async function fetchTcgdex(
  path: string,
  params?: URLSearchParams,
): Promise<unknown> {
  const response = await fetch(buildUrl(path, params), {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new ExternalApiError(
      `TCGdex a répondu avec le statut ${response.status}.`,
      response.status,
    );
  }

  return response.json();
}
