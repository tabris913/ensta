import { eventActions } from '../../actions';
import { IEvent, ISpecial, IUnitCollection } from '../../models/event';
import saga, { ContentSaga } from './content';

const sagas = saga('event', eventActions);

export const eventSaga: ContentSaga<IEvent | ISpecial | IUnitCollection> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
