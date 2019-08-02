import * as Scout from '../constants/json/scout.json';
import { IScout } from '../models/scout';

export const getScout = (uid: string): IScout | undefined => {
  if (Object.keys(Scout.scout).includes(uid)) return Scout.scout[uid];
  return undefined;
};

export const scoutIds = Object.keys(Scout.scout);
