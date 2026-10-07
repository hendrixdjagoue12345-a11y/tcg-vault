export type AgentSummary = {
  id: string;
  name: string;
  imageUrl: string | null;
  role: string | null;
};

export type AgentAbility = {
  name: string;
  description: string;
  imageUrl: string | null;
};

export type AgentDetail = AgentSummary & {
  description: string;
  fullPortraitUrl: string | null;
  abilities: AgentAbility[];
};

export type CatalogQuery = {
  q: string;
  category: string;
  page: number;
};

export type CatalogResult = {
  items: AgentSummary[];
  page: number;
  hasNextPage: boolean;
};

export type FavoriteAgent = Pick<
  AgentSummary,
  "id" | "name" | "imageUrl" | "role"
>;