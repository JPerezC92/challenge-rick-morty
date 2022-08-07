import { z } from 'zod';
import { OriginOrLocationScheme } from './OriginOrLocation.schema';

export const CharacterEndpointSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: OriginOrLocationScheme,
  location: OriginOrLocationScheme,
  image: z.string(),
  episode: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export interface CharacterEndpoint
  extends z.infer<typeof CharacterEndpointSchema> {}
