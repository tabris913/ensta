import { History } from 'history';
import * as R from 'ramda';

import * as Character from '../constants/json/character.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { ICharacter, ICharacterHistory } from '../models/character';
import { getCharacterCard } from './CardUtils';
import { getEvent } from './EventUtils';
import { getScout } from './ScoutUtils';
import { getSpecial } from './SpecialUtils';
import { getUnitCollection } from './UCUtils';

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

export const toCharacter = (history: History, uid: string) => history.push(toPublicUrl(PageName.CHARACTER, [uid]));

export const getCharacterHistory = (uid: string) =>
  getCharacterCard(uid)
    .filter(c => !R.isEmpty(c.content))
    .reduce(
      (list, c) => {
        const es = c.content[0];
        const content = es.startsWith('e')
          ? getEvent(es)
          : es.startsWith('sp')
          ? getSpecial(es)
          : es.startsWith('uc')
          ? getUnitCollection(es)
          : es.startsWith('s')
          ? getScout(es)
          : undefined;

        return content ? list.concat({ content: content, rarelity: c.rank }) : list;
      },
      [] as ICharacterHistory[]
    );
