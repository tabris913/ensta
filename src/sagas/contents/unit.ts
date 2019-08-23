import { unitActions } from '../../actions';
import { IUnit } from '../../models/unit';
import saga, { ContentSaga } from './content';

const sagas = saga('unit', unitActions);

export const unitSaga: ContentSaga<IUnit> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
