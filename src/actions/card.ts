import { ICard } from '../models/card';
import { ICardAdditionalState } from '../reducers/contents/card';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const cardActions = contentActionsBuilder<ICard, ICardAdditionalState>({
  getContent: ActionTypes.CARD_GET_CONTENT,
  saveContent: ActionTypes.CARD_SAVE_CONTENT,
  getList: ActionTypes.CARD_GET_LIST,
  changeListPage: ActionTypes.CARD_CHANGE_LIST_PAGE,
});
