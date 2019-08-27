import { cardActions } from '../../actions';
import { ICard } from '../../models/card';
import { ICardAdditionalState } from '../../reducers/contents/card';
import saga, { ContentSaga } from './content';

const sagas = saga('card', cardActions);

export const cardSaga: ContentSaga<ICard, ICardAdditionalState> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
