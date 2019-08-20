import { unitActions } from '../../actions';
import { IUnit } from '../../models/unit';
import saga, { ContentSaga } from './content';

export const unitSaga: ContentSaga<IUnit> = { saveContent: saga('unit', unitActions).saveContent() };
