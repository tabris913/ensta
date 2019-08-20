import { ICard } from '../models/card';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const cardActions = contentActionsBuilder<ICard>({
  saveContent: ActionTypes.CARD_SAVE_CONTENT,
  getList: ActionTypes.CARD_GET_LIST,
  changeListPage: ActionTypes.CARD_CHANGE_LIST_PAGE,
});
