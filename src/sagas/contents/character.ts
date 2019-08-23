import { characterActions } from '../../actions';
import { ICharacter } from '../../models/character';
import saga, { ContentSaga } from './content';

const sagas = saga('character', characterActions);

export const characterSaga: ContentSaga<ICharacter> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
