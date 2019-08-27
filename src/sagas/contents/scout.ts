import { scoutActions } from '../../actions';
import { IScout } from '../../models/scout';
import { IScoutAdditionalState } from '../../reducers/contents/scout';
import saga, { ContentSaga } from './content';

const sagas = saga('scout', scoutActions);

export const scoutSaga: ContentSaga<IScout, IScoutAdditionalState> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
