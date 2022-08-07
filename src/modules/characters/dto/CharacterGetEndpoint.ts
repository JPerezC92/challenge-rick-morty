import { z } from 'zod';
import { CharacterEndpointSchema } from './CharacterEndpoint';
import { InfoSchema } from './Info.schema';

export const CharacterGetEndpointSchema = z.object({
  info: InfoSchema,
  results: z.array(CharacterEndpointSchema),
});

export interface CharacterGetEndpoint
  extends z.infer<typeof CharacterGetEndpointSchema> {}
