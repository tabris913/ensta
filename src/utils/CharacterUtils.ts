import { History } from 'history';

import * as Character from '../constants/json/character.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { ICharacter } from '../models/character';

export const getCharacter = (uid: string): ICharacter | undefined => {
  if (Object.keys(Character.character).includes(uid)) return Character.character[uid];
  return undefined;
};

export const getCharacters = () => {
  const list: ICharacter[] = [];

  characterIds
    .map(getCharacter)
    .filter(c => c !== undefined)
    .map(c => list.push(c!));
  return list;
};

export const characterIds = Object.keys(Character.character);

export const toCharacter = (history: History, uid: string) =>
  history.push(toPublicUrl(PageName.CHARACTER, undefined, { id: uid }));
