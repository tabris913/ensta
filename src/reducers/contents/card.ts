import { ICard } from '../../models/card';
import { IContentState } from '../../models/ContentState';
import { contentReducerBuilder } from './content';

export interface ICardState extends IContentState<ICard> {}
export const reducer = contentReducerBuilder();
