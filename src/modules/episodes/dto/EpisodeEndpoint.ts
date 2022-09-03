import { z } from 'zod';

export const EpisodeEndpointSchema = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.string(),
  episode: z.string(),
  characters: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export interface EpisodeEndpoint
  extends z.infer<typeof EpisodeEndpointSchema> {}
