import { z } from 'zod';

import { CharacterEndpointSchema } from 'src/modules/characters/validators/CharacterEndpoint.schema';
import { InfoSchema } from 'src/modules/shared/validators/Info.schema';

export const CharacterPaginatedEndpointSchema = z.object({
  info: InfoSchema,
  results: z.array(CharacterEndpointSchema),
});
