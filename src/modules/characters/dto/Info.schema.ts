import { z } from 'zod';

export const InfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
});

export interface Info extends z.infer<typeof InfoSchema> {}
