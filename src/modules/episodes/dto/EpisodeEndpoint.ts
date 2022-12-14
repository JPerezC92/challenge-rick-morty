import { z } from 'zod';

import { EpisodeEndpointSchema } from 'src/modules/episodes/validators/EpisodeEndpoint.schema';

export interface EpisodeEndpoint
  extends z.infer<typeof EpisodeEndpointSchema> {}
