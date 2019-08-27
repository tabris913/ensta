import { ICardState } from '../reducers/contents/card';
import { ICharacterState } from '../reducers/contents/character';
import { IEventState } from '../reducers/contents/event';
import { IScoutState } from '../reducers/contents/scout';
import { IUnitState } from '../reducers/contents/unit';
import { IContent, IContentAdditionalState } from './content';
import { EventType } from './Main';

export interface IContentState<T extends IContent, A extends IContentAdditionalState> {
  content?: T;
  listPage?: number;
  list?: T[];
  type?: EventType;
  additional?: A;
}

export interface IContentsState {
  event: IEventState;
  scout: IScoutState;
  unit: IUnitState;
  character: ICharacterState;
  card: ICardState;
}
