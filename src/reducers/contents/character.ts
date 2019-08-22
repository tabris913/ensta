import { characterActions } from '../../actions';
import { ICharacter } from '../../models/character';
import { IContentState } from '../../models/ContentState';
import { contentReducerBuilder } from './content';

const initialCharacterValue: ICharacter = {
  uid: '',
  name: '',
  birthday: '',
  bloodType: undefined,
  height: 0,
  weight: 0,
  catchPhrase: '',
  favorite: undefined,
  unfavorite: undefined,
  imgs: [],
  club: undefined,
  class: undefined,
  unit: [],
};

export interface ICharacterState extends IContentState<ICharacter> {}
export const reducer = contentReducerBuilder(characterActions, initialCharacterValue);
