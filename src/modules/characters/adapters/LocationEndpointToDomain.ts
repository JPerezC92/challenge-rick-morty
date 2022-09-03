import { LocationEndpoint } from 'src/modules/characters/dto/OriginOrLocation.schema';
import { Location } from 'src/modules/characters/models/Character';
import { parseIdFromUrl } from 'src/modules/shared/utils/parseIdFromUrl';

export function LocationEndpointToDomain(locationEndpoint: LocationEndpoint) {
  return new Location({
    id: parseIdFromUrl(locationEndpoint.url),
    name: locationEndpoint.name,
  });
}
