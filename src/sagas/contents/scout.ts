import { scoutActions } from '../../actions';
import { IScout } from '../../models/scout';
import saga, { ContentSaga } from './content';

export const scoutSaga: ContentSaga<IScout> = { saveContent: saga('scout', scoutActions).saveContent() };
