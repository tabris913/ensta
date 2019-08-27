import { Action } from 'typescript-fsa';
import { ContentActions } from '../../actions/content';
import { ContentName } from '../../constants/ContentName';
import { IContent } from '../../models/content';
import { IContentRequest } from '../../models/request/ContentRequest';
import { IListRequest } from '../../models/request/ListRequest';

export interface ContentSaga<T extends IContent> {
  getContent: (action: Action<IContentRequest>) => IterableIterator<any>;
  saveContent: (action: Action<T>) => IterableIterator<any>;
  getList: (action: Action<IListRequest>) => IterableIterator<any>;
  changeListPage: (action: Action<number>) => IterableIterator<any>;
}

const saga = <T extends IContent>(contentName: ContentName, actions: ContentActions<T>) => ({
  getContent: () =>
    function*(action: Action<IContentRequest>): IterableIterator<any> {
      console.log(`get ${contentName} content`);
      yield null;
    },
  saveContent: () =>
    function*(action: Action<T>): IterableIterator<any> {
      console.log(`save ${contentName} content`);
      yield null;
    },
  getList: () =>
    function*(action: Action<IListRequest>): IterableIterator<any> {
      console.log(`get ${contentName} list`);
      yield null;
    },
  changeListPage: () =>
    function*(action: Action<number>): IterableIterator<any> {
      console.log(`change page of ${contentName} list`);
      yield null;
    },
});

export default saga;
