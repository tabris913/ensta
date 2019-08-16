import { ICharacter } from '../../models/character';
import { IContentState } from '../../models/ContentState';
import { contentReducerBuilder } from './content';

export interface ICharacterState extends IContentState<ICharacter> {}
export const reducer = contentReducerBuilder();
