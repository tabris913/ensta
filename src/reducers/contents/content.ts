import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ContentActions } from '../../actions/content';
import { IContent } from '../../models/content';
import { IContentState } from '../../models/ContentState';
import { getCard, getCards } from '../../utils/CardUtils';
import { getCharacter, getCharacters } from '../../utils/CharacterUtils';
import { getEvent, getEvents } from '../../utils/EventUtils';
import { getScout, getScouts } from '../../utils/ScoutUtils';
import { getSpecial, getSpecials } from '../../utils/SpecialUtils';
import { getUnitCollection, getUnitCollections } from '../../utils/UCUtils';
import { getUnit, getUnits } from '../../utils/UnitUtils';

export const contentReducerBuilder = <T extends IContent>(actions: ContentActions<T>, initialValue: T) =>
  reducerWithInitialState<IContentState<T>>({})
    .caseWithAction(actions.getContent, (state, action) => {
      switch (action.payload.contentName) {
        case 'event':
          switch (action.payload.type) {
            case 'special':
              return { ...state, content: getSpecial(action.payload.uid) as any, type: action.payload.type };
            case 'uc':
              console.log('get');
              return { ...state, content: getUnitCollection(action.payload.uid) as any, type: action.payload.type };
            default:
              return { ...state, content: getEvent(action.payload.uid) as any, type: action.payload.type };
          }
        case 'scout':
          return { ...state, content: getScout(action.payload.uid) as any };
        case 'unit':
          return { ...state, content: getUnit(action.payload.uid) };
        case 'character':
          return { ...state, content: getCharacter(action.payload.uid) };
        case 'card':
          return { ...state, content: getCard(action.payload.uid) };
        default:
          return { ...state };
      }
    })
    .caseWithAction(actions.saveContent, (state, action) => ({ ...state, content: action.payload }))
    .caseWithAction(actions.getList, (state, action) => {
      switch (action.payload.contentName) {
        case 'event':
          switch (action.payload.type) {
            case 'special':
              return { ...state, list: getSpecials() as any, type: action.payload.type };
            case 'uc':
              return { ...state, list: getUnitCollections() as any, type: action.payload.type };
            default:
              return { ...state, list: getEvents() as any, type: action.payload.type };
          }
        case 'scout':
          return { ...state, list: getScouts() as any };
        case 'unit':
          return { ...state, list: getUnits() };
        case 'character':
          return { ...state, list: getCharacters() };
        case 'card':
          return { ...state, list: getCards() };
        default:
          return { ...state };
      }
    })
    .caseWithAction(actions.changeListPage, (state, action) => ({ ...state, listPage: action.payload }));
