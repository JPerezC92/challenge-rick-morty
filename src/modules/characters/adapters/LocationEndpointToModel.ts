import { LocationEndpoint } from 'src/modules/characters/dto/LocationEndpoint';
import { Location } from 'src/modules/characters/models/Character';
import { parseIdFromUrl } from 'src/modules/shared/utils/parseIdFromUrl';

export function LocationEndpointToModel(
  locationEndpoint: LocationEndpoint
): Location {
  return new Location({
    id: parseIdFromUrl(locationEndpoint.url),
    name: locationEndpoint.name,
  });
}
