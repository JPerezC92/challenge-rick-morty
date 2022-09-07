import { z } from 'zod';

import { InfoSchema } from 'src/modules/shared/endpointValidators/Info.schema';
import { CharacterEndpointSchema } from './CharacterEndpoint';

export const CharacterGetEndpointSchema = z.object({
  info: InfoSchema,
  results: z.array(CharacterEndpointSchema),
});

export interface CharacterGetEndpoint
  extends z.infer<typeof CharacterGetEndpointSchema> {}
