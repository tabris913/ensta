import { eventActions } from '../../actions';
import { ICard } from '../../models/card';
import { IContentAdditionalState } from '../../models/content';
import { IContentState } from '../../models/ContentState';
import { IEvent } from '../../models/event';
import { contentReducerBuilder } from './content';

const initialEventValue: IEvent = {
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

export interface IEventState extends IContentState<IEvent, IEventAdditionalState> {}
export interface IEventAdditionalState extends IContentAdditionalState {
  card: ICard[];
}
export const reducer = contentReducerBuilder<IEvent, IEventAdditionalState>(eventActions, initialEventValue);
