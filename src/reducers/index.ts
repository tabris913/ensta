import { connectRouter, LocationChangeAction, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';

import * as contentsReducers from './contents';
import { ICardState } from './contents/card';
import { ICharacterState } from './contents/character';
import { IEventState } from './contents/event';
import { IScoutState } from './contents/scout';
import { IUnitState } from './contents/unit';

export interface IStoreState {
  router: Reducer<RouterState, LocationChangeAction>;
  contents: {
    event: IEventState;
    scout: IScoutState;
    unit: IUnitState;
    character: ICharacterState;
    card: ICardState;
  };
}

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    contents: combineReducers({ ...contentsReducers }),
  });
