import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IContent } from '../../models/content';
import { IContentState } from '../../models/ContentState';

export const contentReducerBuilder = <T extends IContent>(initialValue: T) =>
  reducerWithInitialState<IContentState<T>>({ content: initialValue, listPage: 1 });
