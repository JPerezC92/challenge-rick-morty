import { z } from 'zod';

import { LocationSchema } from 'src/modules/characters/validators/Location.schema';

export interface LocationEndpoint extends z.infer<typeof LocationSchema> {}
