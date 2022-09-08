import { z } from 'zod';

export const LocationSchema = z.object({
  name: z.string(),
  url: z.string(),
});
