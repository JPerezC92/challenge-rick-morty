import { CustomEventFactory } from 'src/modules/shared/events/CustomEventFactory';

export type CharactersPreviewPagesLoadEvent =
  typeof CharactersPreviewPagesLoadEvent;

export const CharactersPreviewPagesLoadEvent = CustomEventFactory<number>(
  'Characters:PreviewPagesLoad'
);
