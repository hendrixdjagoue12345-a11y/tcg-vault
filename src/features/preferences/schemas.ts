import { z } from "zod";

export const preferencesSchema = z.object({
  density: z.enum(["comfort", "compact"]),
  motion: z.enum(["full", "reduced"]),
});

export type Preferences = z.infer<typeof preferencesSchema>;
