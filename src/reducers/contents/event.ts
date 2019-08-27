import { eventActions } from '../../actions';
import { IContentState } from '../../models/ContentState';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../../models/event';
import { contentReducerBuilder } from './content';

const initialEventValue: INormalEvent | ISpecialEvent | IUnitCollection = {
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

export interface IEventState extends IContentState<INormalEvent | ISpecialEvent | IUnitCollection> {}
export const reducer = contentReducerBuilder<INormalEvent | ISpecialEvent | IUnitCollection>(
  eventActions,
  initialEventValue
);
