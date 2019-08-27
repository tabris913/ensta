import { ContentName } from '../../constants/ContentName';
import { cardSaga } from './card';
import { characterSaga } from './character';
import { ContentSaga } from './content';
import { eventSaga } from './event';
import { scoutSaga } from './scout';
import { unitSaga } from './unit';

export { cardSaga, characterSaga, eventSaga, scoutSaga, unitSaga };

export const contentSagas: { [K in ContentName]: ContentSaga<any, any> } = {
  event: eventSaga,
  scout: scoutSaga,
  unit: unitSaga,
  character: characterSaga,
  card: cardSaga,
};
