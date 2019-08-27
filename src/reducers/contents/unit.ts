import { unitActions } from '../../actions';
import { IContentAdditionalState } from '../../models/content';
import { IContentState } from '../../models/ContentState';
import { IUnit } from '../../models/unit';
import { contentReducerBuilder } from './content';

const initialUnitValue: IUnit = {
  uid: '',
  name: '',
  description: undefined,
  description_short: undefined,
  en: '',
  member: [],
  color: undefined,
  logo: 'undefined',
};

export interface IUnitState extends IContentState<IUnit, IUnitAdditionalState> {}
export interface IUnitAdditionalState extends IContentAdditionalState {}
export const reducer = contentReducerBuilder(unitActions, initialUnitValue);
