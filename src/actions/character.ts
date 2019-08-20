import { ICharacter } from '../models/character';
import { contentActionsBuilder } from './content';
import { ActionTypes } from './types';

export const characterActions = contentActionsBuilder<ICharacter>({
  saveContent: ActionTypes.CHARACTER_SAVE_CONTENT,
  getList: ActionTypes.CHARACTER_GET_LIST,
  changeListPage: ActionTypes.CHARACTER_CHANGE_LIST_PAGE,
});
