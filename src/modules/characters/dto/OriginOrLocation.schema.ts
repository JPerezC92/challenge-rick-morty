import { z } from 'zod';

export const OriginOrLocationScheme = z.object({
  name: z.string(),
  url: z.string(),
});

export interface LocationEndpoint
  extends z.infer<typeof OriginOrLocationScheme> {}
