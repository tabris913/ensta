import { IContentState } from '../../models/ContentState';
import { IUnit } from '../../models/unit';
import { contentReducerBuilder } from './content';

export interface IUnitState extends IContentState<IUnit> {}
export const reducer = contentReducerBuilder();
