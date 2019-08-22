import { IUnit } from '../models/unit';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const unitActions = contentActionsBuilder<IUnit>({
  saveContent: ActionTypes.UNIT_SAVE_CONTENT,
  getList: ActionTypes.UNIT_GET_LIST,
  changeListPage: ActionTypes.UNIT_CHANGE_LIST_PAGE,
});
