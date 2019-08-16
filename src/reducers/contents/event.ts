import { IContentState } from '../../models/ContentState';
import { IEvent, ISpecial, IUnitCollection } from '../../models/event';
import { contentReducerBuilder } from './content';

export interface IEventState extends IContentState<IEvent | ISpecial | IUnitCollection> {}
export const reducer = contentReducerBuilder();
