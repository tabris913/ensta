import { unitActions } from '../../actions';
import { IUnit } from '../../models/unit';
import { IUnitAdditionalState } from '../../reducers/contents/unit';
import saga, { ContentSaga } from './content';

const sagas = saga('unit', unitActions);

export const unitSaga: ContentSaga<IUnit, IUnitAdditionalState> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
