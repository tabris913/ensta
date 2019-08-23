import { Action } from 'typescript-fsa';
import { ContentActions } from '../../actions/content';
import { ContentName } from '../../constants/ContentName';
import { IContent } from '../../models/content';
import { IContentRequest } from '../../models/request/ContentRequest';
import { getCharacter } from '../../utils/CharacterUtils';
import { getEvent } from '../../utils/EventUtils';
import { getScout } from '../../utils/ScoutUtils';
import { getSpecial } from '../../utils/SpecialUtils';
import { getUnitCollection } from '../../utils/UCUtils';
import { getUnit } from '../../utils/UnitUtils';

export interface ContentSaga<T extends IContent> {
  getContent: (action: Action<IContentRequest>) => IterableIterator<any>;
  saveContent: (action: Action<T>) => IterableIterator<any>;
  getList: (action: Action<string>) => IterableIterator<any>;
  changeListPage: (action: Action<number>) => IterableIterator<any>;
}

const saga = <T extends IContent>(contentName: ContentName, actions: ContentActions<T>) => ({
  getContent: () =>
    function*(action: Action<IContentRequest>): IterableIterator<any> {
      console.log(`get ${contentName} content`);

      const req = action.payload;

      let getter;
      switch (contentName) {
        case 'event':
          switch (req.type) {
            case undefined:
            case '':
              getter = getEvent;
              break;
            case 'special':
              getter = getSpecial;
              break;
            case 'uc':
              getter = getUnitCollection;
              break;
            default:
              throw {};
          }
          break;
        case 'scout':
          getter = getScout;
          break;
        case 'unit':
          getter = getUnit;
          break;
        case 'character':
          getter = getCharacter;
          break;
        case 'card':
          getter = getUnit;
          break;
        default:
          throw {};
      }

      const res = getter(req.uid);

      if (!!res) {
        actions.getContent(res as any);
        yield null;
      } else throw {};
    },
  saveContent: () =>
    function*(action: Action<T>): IterableIterator<any> {
      console.log(`save ${contentName} content`);
      actions.saveContent(action.payload);
      yield null;
    },
  getList: () =>
    function*(action: Action<string>): IterableIterator<any> {
      console.log(`get ${contentName} list`);
      actions.getList(action.payload);
      yield null;
    },
  changeListPage: () =>
    function*(action: Action<number>): IterableIterator<any> {
      console.log(`change page of ${contentName} list`);
      actions.changeListPage(action.payload);
      yield null;
    },
});

export default saga;
