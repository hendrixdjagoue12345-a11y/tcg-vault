import { z } from "zod";

const imageSchema = z.string().url().nullish();

const roleSchema = z.object({
  uuid: z.string(),
  displayName: z.string(),
  description: z.string(),
  displayIcon: imageSchema,
});

const abilitySchema = z.object({
  slot: z.string(),
  displayName: z.string().nullish(),
  description: z.string().nullish(),
  displayIcon: imageSchema,
});

export const agentSchema = z.object({
  uuid: z.string().min(1),
  displayName: z.string().min(1),
  description: z.string(),
  displayIcon: imageSchema,
  fullPortrait: imageSchema,
  role: roleSchema.nullish(),
  abilities: z.array(abilitySchema),
});

export const agentListSchema = z.array(agentSchema);

export type AgentDto = z.infer<typeof agentSchema>;