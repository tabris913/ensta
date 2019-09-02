import { History } from 'history';

import * as Scout from '../constants/json/scout.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { IContent } from '../models/content.js';
import { ScoutType } from '../models/Main.js';
import { IScout } from '../models/scout';

export const getScout = (uid: string): IScout | undefined => {
  if (Object.keys(Scout.scout).includes(uid)) return Scout.scout[uid];
  return undefined;
};

export const getScouts = () => {
  const list: IScout[] = [];

  scoutIds
    .map(getScout)
    .filter(s => s !== undefined)
    .map(s => list.push(s!));
  return list;
};

export const scoutIds = Object.keys(Scout.scout);

export const toScout = (history: History, uid: string, type?: ScoutType) =>
  history.push(toPublicUrl(PageName.SCOUT, [uid], type ? { type: type } : {}));

export const getCharacterScout = (uid: string) => getScouts().filter(s => s.cards['5'].includes(uid));

export const isScout = (content: IContent): content is IScout =>
  content.uid.startsWith('s') && !content.uid.startsWith('sp');

export const isScoutUid = (uid: string) => uid.startsWith('s') && !uid.startsWith('sp');
