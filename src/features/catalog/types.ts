export type CardSummary = {
  id: string;
  localId: string;
  name: string;
  imageUrl: string | null;
};

export type CardAttack = {
  name: string;
  cost: string[];
  damage: string | null;
  effect: string | null;
};

export type CardDetail = CardSummary & {
  category: string;
  rarity: string | null;
  illustrator: string | null;
  hp: number | null;
  types: string[];
  description: string | null;
  set: {
    id: string;
    name: string;
  };
  attacks: CardAttack[];
};

export type CatalogQuery = {
  q: string;
  category: string;
  page: number;
};

export type CatalogResult = {
  items: CardSummary[];
  page: number;
  hasNextPage: boolean;
};

export type FavoriteCard = Pick<CardSummary, "id" | "name" | "imageUrl">;
