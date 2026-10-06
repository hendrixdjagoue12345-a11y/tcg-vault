import { NextResponse } from "next/server";
import { getCards } from "@/features/catalog/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json(
      { error: "Le paramètre q doit contenir au moins deux caractères." },
      { status: 400 },
    );
  }

  try {
    const result = await getCards({ q: q.slice(0, 80), category: "", page: 1 });
    return NextResponse.json(
      { data: result.items.slice(0, 5) },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "La recherche est momentanément indisponible." },
      { status: 502 },
    );
  }
}
