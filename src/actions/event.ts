import { IEvent, ISpecial, IUnitCollection } from '../models/event';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const eventActions = contentActionsBuilder<IEvent | ISpecial | IUnitCollection>({
  saveContent: ActionTypes.EVENT_SAVE_CONTENT,
  getList: ActionTypes.EVENT_GET_LIST,
  changeListPage: ActionTypes.EVENT_CHANGE_LIST_PAGE,
});
