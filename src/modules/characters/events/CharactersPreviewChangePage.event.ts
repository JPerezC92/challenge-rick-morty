import { CustomEventFactory } from 'src/modules/shared/events/CustomEventFactory';

export type CharactersPreviewChangePage = typeof CharactersPreviewChangePage;

export const CharactersPreviewChangePage = CustomEventFactory<number>(
  'Characters:PreviewChangePage'
);
