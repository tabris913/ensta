import { cardActions } from '../../actions';
import { ICard } from '../../models/card';
import { IContentAdditionalState } from '../../models/content';
import { IContentState } from '../../models/ContentState';
import { contentReducerBuilder } from './content';

const initialCardValue: ICard = {
  uid: '',
  name: '',
  character: '',
  rank: 1,
  type: 'Da',
  date: '',
  skill: undefined,
  parameter: undefined,
  content: [],
  bonus: undefined,
  img: [],
  remarks: '',
};

export interface ICardState extends IContentState<ICard, ICardAdditionalState> {}
export interface ICardAdditionalState extends IContentAdditionalState {}
export const reducer = contentReducerBuilder(cardActions, initialCardValue);
