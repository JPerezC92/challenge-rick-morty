import { z } from 'zod';

export const OriginOrLocationScheme = z.object({
  name: z.string(),
  url: z.string(),
});
