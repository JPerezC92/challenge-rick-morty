import { z } from 'zod';

import { EpisodesGetManyEndpointSchema } from 'src/modules/episodes/dto/EpisodesGetManyEndpoint';
import { InfoSchema } from 'src/modules/shared/endpointValidators/Info.schema';

export const EpisodesGetAllEndpointSchema = z.object({
  info: InfoSchema,
  results: EpisodesGetManyEndpointSchema,
});
