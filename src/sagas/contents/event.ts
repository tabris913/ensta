import { eventActions } from '../../actions';
import { IEvent, ISpecial, IUnitCollection } from '../../models/event';
import saga, { ContentSaga } from './content';

export const eventSaga: ContentSaga<IEvent | ISpecial | IUnitCollection> = {
  saveContent: saga('event', eventActions).saveContent(),
};
