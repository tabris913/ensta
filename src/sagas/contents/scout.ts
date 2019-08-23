import { scoutActions } from '../../actions';
import { IScout } from '../../models/scout';
import saga, { ContentSaga } from './content';

const sagas = saga('scout', scoutActions);

export const scoutSaga: ContentSaga<IScout> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
