import { cardActions } from '../../actions';
import { ICard } from '../../models/card';
import saga, { ContentSaga } from './content';

const actions = saga('card', cardActions);

export const cardSaga: ContentSaga<ICard> = {
  saveContent: actions.saveContent(),
  getList: actions.getList(),
  changeListPage: actions.changeListPage(),
};
