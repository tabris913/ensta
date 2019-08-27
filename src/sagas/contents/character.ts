import { characterActions } from '../../actions';
import { ICharacter } from '../../models/character';
import { ICharacterAdditionalState } from '../../reducers/contents/character';
import saga, { ContentSaga } from './content';

const sagas = saga('character', characterActions);

export const characterSaga: ContentSaga<ICharacter, ICharacterAdditionalState> = {
  getContent: sagas.getContent(),
  saveContent: sagas.saveContent(),
  getList: sagas.getList(),
  changeListPage: sagas.changeListPage(),
};
