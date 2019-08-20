import { unitActions } from '../../actions';
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

export interface IUnitState extends IContentState<IUnit> {}
export const reducer = contentReducerBuilder(unitActions, initialUnitValue);
