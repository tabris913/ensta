import { History } from 'history';
import * as R from 'ramda';

import * as Character from '../constants/json/character.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { ICharacter } from '../models/character';
import { IEvent } from '../models/event';
import { IScout } from '../models/scout';
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
    .map(c => c.content[0])
    .reduce(
      (list, es) => {
        const content = es.startsWith('e')
          ? getEvent(es)
          : es.startsWith('sp')
          ? getSpecial(es)
          : es.startsWith('uc')
          ? getUnitCollection(es)
          : es.startsWith('s')
          ? getScout(es)
          : undefined;

        return content ? list.concat(content) : list;
      },
      [] as Array<IEvent | IScout>
    );
