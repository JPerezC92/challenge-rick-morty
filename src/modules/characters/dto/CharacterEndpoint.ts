import { z } from 'zod';

import { CharacterEndpointSchema } from 'src/modules/characters/validators/CharacterEndpoint.schema';

export interface CharacterEndpoint
  extends z.infer<typeof CharacterEndpointSchema> {}
