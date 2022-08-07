import { z } from 'zod';
import { CharacterEndpointSchema } from './CharacterEndpoint';

export const CharacterListGetEndpointSchema = z.array(CharacterEndpointSchema);

export interface CharacterListGetEndpoint
  extends z.infer<typeof CharacterListGetEndpointSchema> {}
