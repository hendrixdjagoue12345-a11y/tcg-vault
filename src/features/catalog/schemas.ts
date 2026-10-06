import { z } from "zod";

const imageSchema = z.string().url().nullish();

export const cardBriefSchema = z.object({
  id: z.string().min(1),
  localId: z.union([z.string(), z.number()]),
  name: z.string().min(1),
  image: imageSchema,
});

export const cardBriefListSchema = z.array(cardBriefSchema);

const attackSchema = z.object({
  name: z.string().min(1),
  cost: z.array(z.string()).optional().default([]),
  damage: z.union([z.string(), z.number()]).nullish(),
  effect: z.string().nullish(),
});

export const cardDetailSchema = cardBriefSchema.extend({
  category: z.string().optional().default("Inconnue"),
  illustrator: z.string().nullish(),
  rarity: z.string().nullish(),
  hp: z.union([z.string(), z.number()]).nullish(),
  types: z.array(z.string()).optional().default([]),
  description: z.string().nullish(),
  effect: z.string().nullish(),
  set: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
  attacks: z.array(attackSchema).optional().default([]),
});

export type CardBriefDto = z.infer<typeof cardBriefSchema>;
export type CardDetailDto = z.infer<typeof cardDetailSchema>;
