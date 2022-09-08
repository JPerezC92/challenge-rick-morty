import { z } from 'zod';

import { CharacterEndpointSchema } from 'src/modules/characters/validators/CharacterEndpoint.schema';

export const CharacterListEndpointSchema = z.array(CharacterEndpointSchema);
