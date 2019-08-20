import { characterActions } from '../../actions';
import { ICharacter } from '../../models/character';
import saga, { ContentSaga } from './content';

export const characterSaga: ContentSaga<ICharacter> = {
  saveContent: saga('character', characterActions).saveContent(),
};
