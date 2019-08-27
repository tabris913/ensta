import { IEvent } from '../models/event';
import { IEventAdditionalState } from '../reducers/contents/event';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const eventActions = contentActionsBuilder<IEvent, IEventAdditionalState>({
  getContent: ActionTypes.EVENT_GET_CONTENT,
  saveContent: ActionTypes.EVENT_SAVE_CONTENT,
  getList: ActionTypes.EVENT_GET_LIST,
  changeListPage: ActionTypes.EVENT_CHANGE_LIST_PAGE,
});
