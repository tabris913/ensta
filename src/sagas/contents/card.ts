import { cardActions } from '../../actions';
import { ICard } from '../../models/card';
import saga, { ContentSaga } from './content';

const sagas = saga('card', cardActions);

export const cardSaga: ContentSaga<ICard> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
