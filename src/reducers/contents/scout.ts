import { IContentState } from '../../models/ContentState';
import { IScout } from '../../models/scout';
import { contentReducerBuilder } from './content';

export interface IScoutState extends IContentState<IScout> {}
export const reducer = contentReducerBuilder();
