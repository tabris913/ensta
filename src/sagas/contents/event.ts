import { eventActions } from '../../actions';
import { IEvent } from '../../models/event';
import { IEventAdditionalState } from '../../reducers/contents/event';
import saga, { ContentSaga } from './content';

const sagas = saga('event', eventActions);

export const eventSaga: ContentSaga<IEvent, IEventAdditionalState> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
