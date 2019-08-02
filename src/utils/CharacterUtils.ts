import * as Character from '../constants/json/character.json';
import { ICharacter } from '../models/character';

export const getCharacter = (uid: string): ICharacter | undefined => {
  if (Object.keys(Character.character).includes(uid)) return Character.character[uid];
  return undefined;
};

export const characterIds = Object.keys(Character.character);
