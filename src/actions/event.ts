import { INormalEvent, ISpecialEvent, IUnitCollection } from '../models/event';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const eventActions = contentActionsBuilder<INormalEvent | ISpecialEvent | IUnitCollection>({
  getContent: ActionTypes.EVENT_GET_CONTENT,
  saveContent: ActionTypes.EVENT_SAVE_CONTENT,
  getList: ActionTypes.EVENT_GET_LIST,
  changeListPage: ActionTypes.EVENT_CHANGE_LIST_PAGE,
});
