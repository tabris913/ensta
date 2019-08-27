import { ContentName } from '../constants/ContentName';
import { cardActions } from './card';
import { characterActions } from './character';
import { ContentActions } from './content';
import { eventActions } from './event';
import { scoutActions } from './scout';
import { unitActions } from './unit';

export { cardActions, characterActions, eventActions, scoutActions, unitActions };

export const contentActions: { [K in ContentName]: ContentActions<any, any> } = {
  event: eventActions,
  scout: scoutActions,
  unit: unitActions,
  character: characterActions,
  card: cardActions,
};
