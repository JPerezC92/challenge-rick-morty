import { CustomEventFactory } from 'src/modules/shared/events/CustomEventFactory';

export type CharactersPreviewPaginationLoaded =
  typeof CharactersPreviewPaginationLoaded;

export const CharactersPreviewPaginationLoaded = CustomEventFactory(
  'Characters:PaginationPreviewLoaded'
);
