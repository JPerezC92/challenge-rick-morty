import { z } from 'zod';

import { EpisodeEndpointSchema } from 'src/modules/episodes/validators/EpisodeEndpoint.schema';

export const EpisodeListEndpointSchema = z.array(EpisodeEndpointSchema);
