import { z } from 'zod';

import { LocationSchema } from 'src/modules/characters/validators/Location.schema';
import { Status } from 'src/modules/characters/models/Status';

export const CharacterEndpointSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.nativeEnum(Status),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: LocationSchema,
  location: LocationSchema,
  image: z.string(),
  episode: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});
