import { IScout } from '../models/scout';
import { IScoutAdditionalState } from '../reducers/contents/scout';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const scoutActions = contentActionsBuilder<IScout, IScoutAdditionalState>({
  getContent: ActionTypes.SCOUT_GET_CONTENT,
  saveContent: ActionTypes.SCOUT_SAVE_CONTENT,
  getList: ActionTypes.SCOUT_GET_LIST,
  changeListPage: ActionTypes.SCOUT_CHANGE_LIST_PAGE,
});
