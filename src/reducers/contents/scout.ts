import { scoutActions } from '../../actions';
import { ICard } from '../../models/card';
import { IContentAdditionalState } from '../../models/content';
import { IContentState } from '../../models/ContentState';
import { IScout } from '../../models/scout';
import { contentReducerBuilder } from './content';

const initialScoutValue: IScout = {
  uid: '',
  name: '',
  description: '',
  start: '',
  end: '',
  cards: { 5: [], 4: [], 3: [], 2: [], 1: [] },
  relation: undefined,
  banner: undefined,
  img: undefined,
  type: '',
};

export interface IScoutState extends IContentState<IScout, IScoutAdditionalState> {}
export interface IScoutAdditionalState extends IContentAdditionalState {
  card: ICard[];
}
export const reducer = contentReducerBuilder(scoutActions, initialScoutValue);
