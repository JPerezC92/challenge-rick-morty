import { z } from 'zod';

import { EpisodeListEndpointSchema } from 'src/modules/episodes/validators/EpisodeListEndpoint.schema';
import { InfoSchema } from 'src/modules/shared/validators/Info.schema';

export const EpisodePaginatedEndpointSchema = z.object({
  info: InfoSchema,
  results: EpisodeListEndpointSchema,
});
