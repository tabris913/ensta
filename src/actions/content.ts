import actionCreatorFactory, { ActionCreator } from 'typescript-fsa';
import { IContent } from '../models/content';
import { IContentRequest } from '../models/request/ContentRequest';
import { IListRequest } from '../models/request/ListRequest';

export interface ContentActions<T extends IContent> {
  getContent: ActionCreator<IContentRequest>;
  saveContent: ActionCreator<T>;
  getList: ActionCreator<IListRequest>;
  changeListPage: ActionCreator<number>;
}

export const contentActionsBuilder = <T extends IContent>(
  actionTypeMap: { [P in keyof ContentActions<T>]: string }
): ContentActions<T> => ({
  getContent: actionCreatorFactory()<IContentRequest>(actionTypeMap.getContent),
  saveContent: actionCreatorFactory()<T>(actionTypeMap.saveContent),
  getList: actionCreatorFactory()<IListRequest>(actionTypeMap.getList),
  changeListPage: actionCreatorFactory()<number>(actionTypeMap.changeListPage),
});
