import { Action } from 'typescript-fsa';
import { ContentActions } from '../../actions/content';
import { ContentName } from '../../constants/ContentName';
import { IContent } from '../../models/content';

export interface ContentSaga<T extends IContent> {
  saveContent: (action: Action<T>) => IterableIterator<any>;
  getList: (action: Action<string>) => IterableIterator<any>;
  changeListPage: (action: Action<number>) => IterableIterator<any>;
}

const saga = <T extends IContent>(contentName: ContentName, actions: ContentActions<T>) => ({
  saveContent: () =>
    function*(action: Action<T>): IterableIterator<any> {
      console.log(`save ${contentName} content`);
      actions.saveContent(action.payload);
    },
  getList: () =>
    function*(action: Action<string>): IterableIterator<any> {
      console.log(`get ${contentName} list`);
      actions.getList(action.payload);
    },
  changeListPage: () =>
    function*(action: Action<number>): IterableIterator<any> {
      console.log(`change page of ${contentName} list`);
      actions.changeListPage(action.payload);
    },
});

export default saga;
