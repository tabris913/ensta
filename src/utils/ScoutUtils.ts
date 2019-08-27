import { History } from 'history';

import * as Scout from '../constants/json/scout.json';
import PageName, { toPublicUrl } from '../constants/PageName';
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
  history.push(toPublicUrl(PageName.SCOUT, undefined, type ? { id: uid, type: type } : { id: uid }));
