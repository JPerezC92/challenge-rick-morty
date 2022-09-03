import { z } from 'zod';
import { EpisodeEndpointSchema } from './EpisodeEndpoint';

export const EpisodesGetManyEndpointSchema = z.array(EpisodeEndpointSchema);

export interface EpisodesGetManyEndpoint
  extends z.infer<typeof EpisodesGetManyEndpointSchema> {}
