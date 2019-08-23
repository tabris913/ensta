import actionCreatorFactory, { ActionCreator } from 'typescript-fsa';
import { IContent } from '../models/content';

export interface ContentActions<T extends IContent> {
  getContent: ActionCreator<T>;
  saveContent: ActionCreator<T>;
  getList: ActionCreator<string>;
  changeListPage: ActionCreator<number>;
}

export const contentActionsBuilder = <T extends IContent>(
  actionTypeMap: { [P in keyof ContentActions<T>]: string }
): ContentActions<T> => ({
  getContent: actionCreatorFactory()<T>(actionTypeMap.getContent),
  saveContent: actionCreatorFactory()<T>(actionTypeMap.saveContent),
  getList: actionCreatorFactory()<string>(actionTypeMap.getList),
  changeListPage: actionCreatorFactory()<number>(actionTypeMap.changeListPage),
});
