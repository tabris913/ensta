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
};

export interface IScoutState extends IContentState<IScout> {}
export const reducer = contentReducerBuilder(initialScoutValue);
