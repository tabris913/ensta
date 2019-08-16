import { IContentState } from '../../models/ContentState';
import { IEvent, ISpecial, IUnitCollection } from '../../models/event';
import { contentReducerBuilder } from './content';

const initialEventValue: IEvent | ISpecial | IUnitCollection = {
  uid: '',
  name: '',
  start: '',
  end: '',
  description: '',
  description_short: undefined,
  bonus: { ranking: { 5: [], 4: [], 3: [], 2: [], 1: [] }, point: { 5: [], 4: [], 3: [], 2: [], 1: [] } },
  banner: [],
  relation: undefined,
  img: undefined,
  acquirableCards: [],
  revivalEvents: [],
};

export interface IEventState extends IContentState<IEvent | ISpecial | IUnitCollection> {}
export const reducer = contentReducerBuilder<IEvent | ISpecial | IUnitCollection>(initialEventValue);
