import type { CardDetail, CardSummary } from "./types";
import type { CardBriefDto, CardDetailDto } from "./schemas";

const imageUrl = (baseUrl: string | null | undefined) =>
  baseUrl ? `${baseUrl}/high.webp` : null;

export function toCardSummary(card: CardBriefDto): CardSummary {
  return {
    id: card.id,
    localId: String(card.localId),
    name: card.name,
    imageUrl: imageUrl(card.image),
  };
}

export function toCardDetail(card: CardDetailDto): CardDetail {
  const parsedHp = card.hp == null ? null : Number(card.hp);

  return {
    ...toCardSummary(card),
    category: card.category,
    rarity: card.rarity ?? null,
    illustrator: card.illustrator ?? null,
    hp: Number.isFinite(parsedHp) ? parsedHp : null,
    types: card.types,
    description: card.description ?? card.effect ?? null,
    set: card.set,
    attacks: card.attacks.map((attack) => ({
      name: attack.name,
      cost: attack.cost,
      damage: attack.damage == null ? null : String(attack.damage),
      effect: attack.effect ?? null,
    })),
  };
}
