import { eventActions } from '../../actions';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../../models/event';
import saga, { ContentSaga } from './content';

const sagas = saga('event', eventActions);

export const eventSaga: ContentSaga<INormalEvent | ISpecialEvent | IUnitCollection> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
