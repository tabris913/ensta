import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ContentActions } from '../../actions/content';
import { IContent } from '../../models/content';
import { IContentState } from '../../models/ContentState';

export const contentReducerBuilder = <T extends IContent>(actions: ContentActions<T>, initialValue: T) =>
  reducerWithInitialState<IContentState<T>>({}).caseWithAction(actions.saveContent, (state, action) => ({
    ...state,
    content: action.payload,
  }));
