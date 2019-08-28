import { characterActions } from '../../actions';
import { ICard } from '../../models/card';
import { ICharacter } from '../../models/character';
import { IContentAdditionalState } from '../../models/content';
import { IContentState } from '../../models/ContentState';
import { INormalEvent } from '../../models/event';
import { IScout } from '../../models/scout';
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

export interface ICharacterState extends IContentState<ICharacter, ICharacterAdditionalState> {}
export interface ICharacterAdditionalState extends IContentAdditionalState {
  event: INormalEvent[];
  scout: IScout[];
  card: ICard[];
}
export const reducer = contentReducerBuilder(characterActions, initialCharacterValue);
